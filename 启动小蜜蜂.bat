@echo off
chcp 65001 >nul
title 小蜜蜂 Agent 启动器
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0.codex_start_server.ps1"
if errorlevel 1 pause

