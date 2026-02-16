@echo off
title Valentine - Local Server
echo.
echo Starting server for Valentine site...
echo.
echo On your PHONE (same Wi-Fi), open your browser and go to:
echo   http://YOUR_IP:8080
echo.
echo Replace YOUR_IP with your PC's IP address.
echo To find it: run "ipconfig" and look for IPv4 under your Wi-Fi.
echo Example: http://192.168.1.105:8080
echo.
echo Press Ctrl+C to stop the server.
echo.
python -m http.server 8080 --bind 0.0.0.0
if errorlevel 1 (
  echo Python not found. Try: npx --yes serve -l 3000
  echo Then open http://YOUR_IP:3000 on your phone.
  pause
)
