@echo off
setlocal

rem Keep this launcher ASCII-only so cmd.exe never misreads UTF-8 text.
powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0upload.ps1"
set "upload_exit_code=%ERRORLEVEL%"

echo.
pause
exit /b %upload_exit_code%
