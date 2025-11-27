@echo off
echo Stopping development server...
echo.

REM 查找使用端口 5173 的進程
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":5173"') do (
    set PID=%%a
    if defined PID (
        echo Found process with PID: %PID%
        taskkill /PID %PID% /F >nul 2>&1
        if %errorlevel% equ 0 (
            echo Successfully stopped process %PID%
        ) else (
            echo Failed to stop process %PID%
        )
    )
)

REM 也嘗試停止所有 node.exe 進程（謹慎使用）
echo.
choice /C YN /M "Do you want to stop all Node.js processes"
if errorlevel 2 goto :end

taskkill /IM node.exe /F >nul 2>&1
if %errorlevel% equ 0 (
    echo All Node.js processes have been stopped
) else (
    echo No Node.js processes found or already stopped
)

:end
echo.
echo Done.
pause


