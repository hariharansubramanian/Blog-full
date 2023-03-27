@echo off
echo Installing Frontend Dependencies...
cd frontend
call npm install
cd ..

echo Installing Backend Dependencies...
cd Backend
call composer install --no-interaction --no-ansi --ignore-platform-reqs

echo Creating the Database...
call php artisan db:create

echo Running Database Migrations...
call php artisan migrate

echo Seeding the Database...
call php artisan db:seed

set /P run_apps="Do you want to run the React and PHP applications? (y/n): "

if /I "%run_apps%"=="y" (
    echo Starting Backend Server...
    start /b cmd /c "php artisan serve"

    cd ..

    echo Starting Frontend Server...
    cd frontend
    start /b cmd /c "npm start"

    echo All tasks completed! Both React and PHP applications are now running.
) else (
    echo Applications not started. You can start them manually later.
)

pause
This script now includes a user prompt asking whether to run the React and PHP applications. If the user inputs



