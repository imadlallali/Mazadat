#!/usr/bin/env powershell
# Mazadat - Run Frontend and Backend together
# This script starts both the React frontend and Spring Boot backend

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Mazadat - Frontend & Backend Starter" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Check if required tools are installed
function Test-Command {
    param($Command)
    $null = Get-Command $Command -ErrorAction SilentlyContinue
    return $?
}

Write-Host "[*] Checking prerequisites..." -ForegroundColor Cyan
$missing = @()

if (-not (Test-Command java)) {
    $missing += "Java 17+"
}
if (-not (Test-Command node)) {
    $missing += "Node.js"
}
if (-not (Test-Command npm)) {
    $missing += "npm"
}

if ($missing.Count -gt 0) {
    Write-Host "[!] Missing prerequisites:" -ForegroundColor Red
    foreach ($item in $missing) {
        Write-Host "    - $item" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Please install the missing tools and try again." -ForegroundColor Yellow
    exit 1
}

Write-Host "[✓] All prerequisites found" -ForegroundColor Green
Write-Host ""

# Get the script location
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootPath = $scriptPath

Write-Host "[*] Starting services..." -ForegroundColor Cyan
Write-Host ""

# Create two separate processes
Write-Host "Opening Backend (Spring Boot) on http://localhost:8080" -ForegroundColor Yellow
$backendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootPath\Mazadat'; & .\mvnw.cmd spring-boot:run" -PassThru -WindowStyle Normal

Start-Sleep -Seconds 2

Write-Host "Opening Frontend (React + Vite) on http://localhost:5173" -ForegroundColor Yellow
$frontendProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$rootPath\frontend'; npm run dev" -PassThru -WindowStyle Normal

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  Services are starting..." -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:8080" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C in either window to stop the respective service." -ForegroundColor Yellow
Write-Host "Close both windows to stop all services." -ForegroundColor Yellow
Write-Host ""

# Wait for either process to exit
$processArray = @($backendProcess, $frontendProcess)
while ($true) {
    foreach ($proc in $processArray) {
        if ($proc.HasExited) {
            Write-Host ""
            Write-Host "[!] One of the services has stopped." -ForegroundColor Red
            Write-Host "Cleaning up remaining processes..." -ForegroundColor Yellow

            # Stop remaining processes
            foreach ($p in $processArray) {
                if (-not $p.HasExited) {
                    Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
                }
            }
            exit 1
        }
    }
    Start-Sleep -Seconds 1
}

