@echo off
echo Starting Startup Benefits Platform...
echo.
echo [1/2] Starting Backend Server (Port 5000)...
start cmd /k "cd startup-benefits-backend && npm run dev"
echo.
timeout /t 3
echo.
echo [2/2] Starting Frontend Server (Port 3000)...
start cmd /k "cd startup-benefits-frontend && npm run dev"
echo.
echo Both servers are starting...
echo.
echo Wait 5-10 seconds, then open: http://localhost:3000
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause
