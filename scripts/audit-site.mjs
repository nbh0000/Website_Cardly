import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { requiredGuides } from "../src/guide-content.js";

const root = process.cwd();
const failures = [];
const note = (condition, message) => {
  if (!condition) failures.push(message);
};
const read = (path) => readFileSync(join(root, path), "utf8");
const match = (html, pattern) => html.match(pattern)?.[1]?.trim() || "";

const sitemap = read("sitemap.xml");
const publicSitemap = read("public/sitemap.xml");
note(sitemap === publicSitemap, "루트와 public sitemap.xml이 다릅니다.");
const urls = [
  ...sitemap.matchAll(/<loc>(https:\/\/cardly\.kr(?:\/[^<]*)?)<\/loc>/g),
].map((result) => result[1]);
note(urls.length === new Set(urls).size, "sitemap.xml에 중복 URL이 있습니다.");

const records = [];
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const file =
    pathname === "/" ? "index.html" : `${pathname.slice(1)}index.html`;
  note(
    existsSync(join(root, file)),
    `사이트맵 URL의 파일이 없습니다: ${url} → ${file}`,
  );
  if (!existsSync(join(root, file))) continue;
  const html = read(file);
  const title = match(html, /<title>([\s\S]*?)<\/title>/i);
  const description = match(
    html,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
  );
  const canonical = match(
    html,
    /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i,
  );
  const robots = match(
    html,
    /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i,
  );
  const h1 = match(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i).replace(/<[^>]+>/g, "");
  note(Boolean(title), `${file}: title이 없습니다.`);
  note(description.length >= 45, `${file}: meta description이 너무 짧습니다.`);
  note(canonical === url, `${file}: self canonical이 정확하지 않습니다.`);
  note(!robots.includes("noindex"), `${file}: 사이트맵 URL이 noindex입니다.`);
  note(Boolean(h1), `${file}: 검색엔진용 기본 H1이 없습니다.`);
  records.push({ file, title });

  for (const script of html.matchAll(
    /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      JSON.parse(script[1]);
    } catch {
      failures.push(`${file}: JSON-LD 문법이 잘못되었습니다.`);
    }
  }
}

const titleGroups = new Map();
for (const record of records) {
  titleGroups.set(record.title, [
    ...(titleGroups.get(record.title) || []),
    record,
  ]);
}
for (const [title, pages] of titleGroups) {
  note(
    pages.length === 1,
    `중복 title: "${title}" → ${pages.map((page) => page.file).join(", ")}`,
  );
}

const requiredGuideEntries = Object.entries(requiredGuides);
note(
  requiredGuideEntries.length === 12,
  `우선 상세 가이드는 12개여야 합니다: 현재 ${requiredGuideEntries.length}개`,
);
for (const [url, guide] of requiredGuideEntries) {
  const allText = JSON.stringify(guide);
  note(guide.sections.length >= 4, `${url}: H2 섹션이 4개 미만입니다.`);
  note(allText.length >= 1800, `${url}: 상세 콘텐츠 분량이 기준보다 짧습니다.`);
  note(
    allText.includes("bad") && allText.includes("good"),
    `${url}: 좋은 예/피할 예가 없습니다.`,
  );
  note(allText.includes("checklist"), `${url}: 체크리스트가 없습니다.`);
  note(
    Boolean(guide.description),
    `${url}: 고유 meta description 데이터가 없습니다.`,
  );
  note(
    Boolean(guide.published && guide.modified),
    `${url}: 작성일 또는 수정일이 없습니다.`,
  );
  const file =
    url === "/resume-example/"
      ? "resume-example/index.html"
      : `${url.slice(1)}index.html`;
  const html = read(file);
  note(
    html.includes('"@type":"Article"'),
    `${file}: Article 구조화 데이터가 없습니다.`,
  );
  note(
    html.includes('"@type":"BreadcrumbList"'),
    `${file}: Breadcrumb 구조화 데이터가 없습니다.`,
  );
}

const legacyFiles = [
  "maker.html",
  "resume.html",
  "invite.html",
  "about.html",
  "contact.html",
  "privacy.html",
  "terms.html",
];
for (const file of legacyFiles) {
  const html = read(file);
  note(
    /name=["']robots["'][^>]+noindex,follow/i.test(html),
    `${file}: 레거시 URL에 noindex가 없습니다.`,
  );
  note(
    /rel=["']canonical["']/i.test(html),
    `${file}: 통합 대상 canonical이 없습니다.`,
  );
}

for (const file of [
  "business-card/index.html",
  "resume/index.html",
  "invitation/index.html",
]) {
  note(
    !read(file).includes("googlesyndication"),
    `${file}: 편집기에서 광고 스크립트를 제거해야 합니다.`,
  );
}

const home = read("index.html");
note(
  home.includes("무료 이력서·명함 제작"),
  "홈 title/H1에 무료 이력서·명함 제작 문구가 없습니다.",
);
note(
  !match(
    home,
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i,
  ).includes("50"),
  "홈 description에 이력서 양식 50개 문구가 남아 있습니다.",
);
note(
  home.includes("https://cardly.kr/favicon.svg"),
  "홈 favicon이 절대 URL로 연결되지 않았습니다.",
);
note(
  home.includes("https://cardly.kr/cardly-logo.svg"),
  "Organization 로고 절대 URL이 없습니다.",
);

const robots = read("robots.txt");
note(
  robots.includes("Allow: /"),
  "robots.txt가 중요 콘텐츠 크롤링을 허용하지 않습니다.",
);
note(
  robots.includes("https://cardly.kr/sitemap.xml"),
  "robots.txt의 sitemap URL이 정확하지 않습니다.",
);
note(
  robots === read("public/robots.txt"),
  "루트와 public robots.txt가 다릅니다.",
);

const notFound = read("404.html");
note(notFound.includes("noindex,follow"), "404.html에 noindex가 없습니다.");

function htmlFiles(directory, output = []) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if ([".git", "dist", "node_modules"].includes(entry.name)) continue;
    const full = join(directory, entry.name);
    if (entry.isDirectory()) htmlFiles(full, output);
    else if (entry.name.endsWith(".html"))
      output.push(relative(root, full).replaceAll("\\", "/"));
  }
  return output;
}

const sitemapFiles = new Set(
  urls.map((url) => {
    const pathname = new URL(url).pathname;
    return pathname === "/" ? "index.html" : `${pathname.slice(1)}index.html`;
  }),
);
for (const file of htmlFiles(root)) {
  if (
    sitemapFiles.has(file) ||
    file === "404.html" ||
    legacyFiles.includes(file)
  )
    continue;
  const html = read(file);
  note(
    html.includes("noindex"),
    `${file}: 사이트맵 밖 공개 HTML은 noindex 또는 통합이 필요합니다.`,
  );
}

if (failures.length) {
  console.error(`SEO/content audit failed (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `SEO/content audit passed: ${urls.length} indexable URLs, ${requiredGuideEntries.length} detailed guides, ${legacyFiles.length} noindex legacy URLs.`,
);
