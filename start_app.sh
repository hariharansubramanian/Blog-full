#!/bin/bash

echo "Installing Frontend Dependencies..."
cd frontend
npm install
cd ..

echo "Installing Backend Dependencies..."
cd Backend
composer install --no-interaction --no-ansi --ignore-platform-reqs

echo "Creating the Database..."
php artisan db:create

echo "Running Database Migrations..."
php artisan migrate

echo "Seeding the Database..."
php artisan db:seed

read -p "Do you want to run the React and PHP applications? (y/n): " run_apps

if [ "$run_apps" == "y" ] || [ "$run_apps" == "Y" ]; then
  echo "Starting Backend Server..."
  cd ..
  php artisan serve &

  echo "Starting Frontend Server..."
  cd frontend
  npm start &

  echo "All tasks completed! Both React and PHP applications are now running."
else
  echo "Applications not started. You can start them manually later."
fi
