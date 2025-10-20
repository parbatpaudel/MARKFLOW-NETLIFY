@echo off
echo Installing dependencies...
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo npm not found in PATH. Please install Node.js and npm first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)
npm install
if %errorlevel% equ 0 (
    echo Dependencies installed successfully!
    echo Starting development server...
    npm run dev
) else (
    echo Failed to install dependencies.
    pause
)
