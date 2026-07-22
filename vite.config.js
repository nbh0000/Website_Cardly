import { defineConfig } from 'vite';
import { resolve } from 'node:path';
export default defineConfig({base:'/',build:{rollupOptions:{input:{index:resolve(import.meta.dirname,'index.html'),maker:resolve(import.meta.dirname,'maker.html'),resume:resolve(import.meta.dirname,'resume.html'),about:resolve(import.meta.dirname,'about.html'),contact:resolve(import.meta.dirname,'contact.html'),privacy:resolve(import.meta.dirname,'privacy.html'),terms:resolve(import.meta.dirname,'terms.html')}}}});
