@echo off
cd /d "%~dp0"
echo Starting server from: %CD%
npx http-server -p 8000 -o
