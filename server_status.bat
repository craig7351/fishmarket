@echo off
echo Checking server status...
echo.

REM 檢查端口 5173 是否被使用
netstat -ano | findstr ":5173" >nul 2>&1
if %errorlevel% equ 0 (
    echo [STATUS] Server is RUNNING on port 5173
    echo.
    echo Process details:
    netstat -ano | findstr ":5173"
    echo.
    
    REM 嘗試獲取進程信息
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173"') do (
        set PID=%%a
        if defined PID (
            echo Process ID: %PID%
            tasklist /FI "PID eq %PID%" 2>nul
        )
    )
    
    echo.
    echo You can access the server at: http://localhost:5173
) else (
    echo [STATUS] Server is NOT RUNNING
    echo.
    echo Port 5173 is not in use.
    echo Run start.bat to start the development server.
)

echo.
echo Checking Node.js processes:
tasklist /FI "IMAGENAME eq node.exe" 2>nul | find /I "node.exe" >nul
if %errorlevel% equ 0 (
    echo.
    echo Active Node.js processes:
    tasklist /FI "IMAGENAME eq node.exe"
) else (
    echo No Node.js processes found.
)

echo.
pause


