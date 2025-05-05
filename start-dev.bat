@echo off
echo Starting HMPS School Management System Development Environment...
echo.
echo This will start both the frontend and backend servers
echo Press Ctrl+C twice to stop all servers when done
echo.
cd /d %~dp0
npm run dev-all
pause 