@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo [Cardly] Node.js is not installed or is not available in PATH.
  echo Install Node.js LTS from https://nodejs.org/ and try again.
  pause
  exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
  echo [Cardly] npm is not available in PATH.
  pause
  exit /b 1
)

if not exist "node_modules\vite\bin\vite.js" (
  echo [Cardly] Installing required packages...
  call npm install
  if errorlevel 1 goto :error
)

echo [Cardly] Starting the development server...
echo [Cardly] Keep this window open while using the site.
start "Cardly Server" cmd /k "npm run dev -- --host 127.0.0.1 --port 5173 --strictPort"

powershell -NoProfile -Command "$ready=$false; for($i=0;$i -lt 30;$i++){ try { $r=Invoke-WebRequest -UseBasicParsing 'http://127.0.0.1:5173/' -TimeoutSec 1; if($r.StatusCode -eq 200){$ready=$true;break} } catch {}; Start-Sleep -Milliseconds 500 }; if(-not $ready){exit 1}"
if errorlevel 1 goto :error

start "" "http://127.0.0.1:5173/"
exit /b 0

:error
echo.
echo [Cardly] Failed to start. Review the error message above.
pause
exit /b 1
