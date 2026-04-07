@echo off
REM Mazadat - Run Frontend and Backend together
REM This batch script starts both the React frontend and Spring Boot backend

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   Mazadat - Frontend ^& Backend Starter
echo ========================================
echo.

REM Check if Java is installed
where java >nul 2>nul
if errorlevel 1 (
    echo [!] Java 17+ is not installed or not in PATH
    echo Please install Java 17+ and try again.
    pause
    exit /b 1
)

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo [!] Node.js is not installed or not in PATH
    echo Please install Node.js and try again.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('java -version 2^>^&1') do (
    set "java_output=%%i"
    goto :java_done
)
:java_done
echo [+] Java found: %java_output%

    echo [+] Node.js found: %%i
)

for /f "tokens=*" %%i in ('npm -v') do (
    echo [+] npm found: %%i
)
echo [^>] Opening Backend (Spring Boot) on http://localhost:8080
timeout /t 1 /nobreak >nul
    pause
    exit /b 1
)

echo [*] Checking prerequisites...
java -version >nul 2>nul
REM Wait a bit for backend to start
timeout /t 5 /nobreak >nul
echo [^>] Opening Frontend (React + Vite) on http://localhost:5173
timeout /t 1 /nobreak >nul
echo [+] Node.js found
npm -v >nul 2>nul
echo [+] npm found
echo.

REM Get the current directory
setlocal enabledelayedexpansion
set "currentDir=%cd%"

echo [*] Starting services...
echo [i] Backend:  http://localhost:8080
echo [i] Frontend: http://localhost:5173
echo This window can be closed safely.
echo The services will continue running in their own windows.
echo.
echo [i] Check the new terminal windows for service output.
echo [i] Backend will show: "Tomcat started on port 8080"
echo [i] Frontend will show: "VITE vX.X.X ready in XXX ms"
echo.
echo [!] To stop services: Close both terminal windows or press Ctrl+C
echo.

timeout /t 10 /nobreak
echo.
echo ========================================
echo   Opening browser in 5 seconds...
echo ========================================
echo.

REM Try to open browser (Windows 10+)
timeout /t 5 /nobreak
start http://localhost:5173

echo [+] Browser should open at http://localhost:5173
echo Opening Backend (Spring Boot) on http://localhost:8080
start "Mazadat Backend" cmd /k "cd /d "%currentDir%\Mazadat" && mvnw.cmd spring-boot:run"

timeout /t 3 /nobreak

REM Start Frontend in a new window
echo Opening Frontend (React + Vite) on http://localhost:5173
start "Mazadat Frontend" cmd /k "cd /d "%currentDir%\frontend" && npm run dev"

echo.
echo ========================================
echo   Services are starting...
echo ========================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Close both windows to stop the services.
echo.

pause

