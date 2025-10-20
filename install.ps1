# PowerShell script to install dependencies and start development server

Write-Host "Checking for Node.js and npm..." -ForegroundColor Green

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "npm not found. Please install Node.js and npm first." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Installing dependencies..." -ForegroundColor Green
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
    Write-Host "Starting development server..." -ForegroundColor Green
    npm run dev
} else {
    Write-Host "Failed to install dependencies." -ForegroundColor Red
    Read-Host "Press Enter to exit"
}
