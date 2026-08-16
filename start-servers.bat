@echo off
REM ShowRoom App - Start Both Backend & Frontend Servers
REM Usage: start-servers.bat

echo.
echo ========================================
echo   ShowRoom App - Starting Servers
echo ========================================
echo.

REM Get project root directory
set PROJECT_ROOT=%~dp0

REM Start Frontend in new window
echo Starting Frontend (Vite) on port 3001...
start "ShowRoom Frontend" /D "%PROJECT_ROOT%apps\web" cmd /k "npm run dev"

REM Wait a bit for frontend to start
timeout /t 3 /nobreak

REM Start Backend in new window
echo Starting Backend (NestJS) on port 3000...
start "ShowRoom Backend" /D "%PROJECT_ROOT%apps\backend" cmd /k "node dist/main.js"

echo.
echo ========================================
echo   Servers Starting...
echo ========================================
echo.
echo Frontend: http://localhost:3001
echo Backend:  http://localhost:3000
echo.
echo Windows opened two new terminal windows:
echo   - ShowRoom Frontend (port 3001)
echo   - ShowRoom Backend (port 3000)
echo.
echo To stop servers, close the terminal windows.
echo.
pause
