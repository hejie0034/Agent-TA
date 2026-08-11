@echo off
chcp 65001 >nul
title 小蜜蜂 Agent 停止器
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0.codex_start_server.ps1" -Stop
pause

