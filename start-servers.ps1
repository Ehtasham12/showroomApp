# ShowRoom App - Start Both Backend & Frontend Servers
# Usage: .\start-servers.ps1

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  ShowRoom App - Starting Servers" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

$PROJECT_ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path

# Start Frontend in new PowerShell window
Write-Host "Starting Frontend (Vite) on port 3001..." -ForegroundColor Cyan
$frontendCmd = "cd '$($PROJECT_ROOT)\apps\web'; npm run dev; Read-Host 'Press Enter to close'"
Start-Process powershell -ArgumentList "-NoExit -Command `"$frontendCmd`"" -WindowStyle Normal

# Wait for frontend to start
Start-Sleep -Seconds 3

# Start Backend in new PowerShell window
Write-Host "Starting Backend (NestJS) on port 3000..." -ForegroundColor Cyan
$backendCmd = "cd '$($PROJECT_ROOT)\apps\backend'; node dist/main.js; Read-Host 'Press Enter to close'"
Start-Process powershell -ArgumentList "-NoExit -Command `"$backendCmd`"" -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Servers Starting..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:3001" -ForegroundColor Yellow
Write-Host "Backend:  http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Two new PowerShell windows opened:" -ForegroundColor Cyan
Write-Host "  - ShowRoom Frontend (port 3001)" -ForegroundColor White
Write-Host "  - ShowRoom Backend (port 3000)" -ForegroundColor White
Write-Host ""
Write-Host "To stop servers, close the terminal windows." -ForegroundColor Gray
Write-Host ""
