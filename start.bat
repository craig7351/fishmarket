@echo off
echo Starting development server...
echo.

REM 檢查 Node.js 是否安裝
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

REM 檢查是否已經有服務器在運行
netstat -ano | findstr ":5173" >nul 2>&1
if %errorlevel% equ 0 (
    echo Warning: Port 5173 is already in use.
    echo The server might already be running.
    echo.
    echo Attempting to stop existing server...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173"') do (
        taskkill /PID %%a /F >nul 2>&1
    )
    timeout /t 2 /nobreak >nul
)

REM 檢查 node_modules 是否存在
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM 檢查 vite 是否可用
if not exist "node_modules\.bin\vite.cmd" (
    if not exist "node_modules\.bin\vite" (
        echo Error: Vite is not installed. Installing dependencies...
        call npm install
        if %errorlevel% neq 0 (
            echo Error: Failed to install dependencies
            pause
            exit /b 1
        )
    )
)

REM 啟動開發服務器
echo.
echo Starting Vite development server...
echo Server will be available at http://localhost:5173
echo Press Ctrl+C to stop the server
echo.

REM 使用 npm run dev 啟動服務器（會阻塞直到停止）
npm run dev

REM 如果執行到這裡，說明服務器已經停止
echo.
echo Development server has stopped.
pause


