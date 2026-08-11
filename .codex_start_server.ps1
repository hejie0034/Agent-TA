param(
    [switch]$Stop,
    [switch]$CheckOnly,
    [int]$Port = 8012
)

$ErrorActionPreference = 'Stop'
$projectDir = $PSScriptRoot
$pidFile = Join-Path $projectDir '.server.pid'
$urlFile = Join-Path $projectDir '.server.url'
$outLog = Join-Path $projectDir 'server.out.log'
$errLog = Join-Path $projectDir 'server.err.log'
$envFile = Join-Path $projectDir '.env'
$envExample = Join-Path $projectDir '.env.example'

Set-Location -LiteralPath $projectDir

if ($Stop) {
    if (Test-Path -LiteralPath $pidFile) {
        $serverPid = [int](Get-Content -LiteralPath $pidFile -Raw)
        Stop-Process -Id $serverPid -Force -ErrorAction SilentlyContinue
        Remove-Item -LiteralPath $pidFile -Force -ErrorAction SilentlyContinue
        Remove-Item -LiteralPath $urlFile -Force -ErrorAction SilentlyContinue
        Write-Host 'Little Bee service stopped.'
    } else {
        Write-Host 'No running Little Bee service was found.'
    }
    exit 0
}

$pythonCommand = Get-Command python.exe -ErrorAction SilentlyContinue
$pythonArgs = @()
if (-not $pythonCommand) {
    $pythonCommand = Get-Command py.exe -ErrorAction SilentlyContinue
    $pythonArgs = @('-3')
}
if (-not $pythonCommand) {
    Write-Error 'Python was not found. Install Python 3.10 or newer and enable Add Python to PATH.'
}

& $pythonCommand.Source @pythonArgs --version
if ($LASTEXITCODE -ne 0) {
    Write-Error 'Python could not run correctly.'
}

if ($CheckOnly) {
    Write-Host 'Environment check passed: Python and project files are available.'
    exit 0
}

if (-not (Test-Path -LiteralPath $envFile)) {
    Copy-Item -LiteralPath $envExample -Destination $envFile
    Write-Host ''
    Write-Host 'A new .env file was created. Fill in DEEPSEEK_API_KEY, save it, then run the launcher again.' -ForegroundColor Yellow
    Start-Process notepad.exe -ArgumentList $envFile
    exit 1
}

$keyLine = Get-Content -LiteralPath $envFile | Where-Object { $_ -match '^\s*DEEPSEEK_API_KEY\s*=\s*.+$' } | Select-Object -First 1
if (-not $keyLine -or $keyLine -match '^\s*DEEPSEEK_API_KEY\s*=\s*$') {
    Write-Host 'Fill in DEEPSEEK_API_KEY in .env, then run the launcher again.' -ForegroundColor Yellow
    Start-Process notepad.exe -ArgumentList $envFile
    exit 1
}

& $pythonCommand.Source @pythonArgs -c 'import openpyxl' 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host 'Installing project dependencies...'
    & $pythonCommand.Source @pythonArgs -m pip install -r requirements.txt
    if ($LASTEXITCODE -ne 0) {
        Write-Error 'Dependency installation failed. Check the network and try again.'
    }
}

if (Test-Path -LiteralPath $pidFile) {
    $oldPid = [int](Get-Content -LiteralPath $pidFile -Raw)
    if (Get-Process -Id $oldPid -ErrorAction SilentlyContinue) {
        $existingUrl = "http://127.0.0.1:$Port/"
        Start-Process $existingUrl
        Write-Host "Little Bee is already running: $existingUrl"
        exit 0
    }
}

$arguments = @($pythonArgs) + @('web_agent.py', '--port', "$Port")
$process = Start-Process -FilePath $pythonCommand.Source -ArgumentList $arguments -WorkingDirectory $projectDir -RedirectStandardOutput $outLog -RedirectStandardError $errLog -WindowStyle Hidden -PassThru
Set-Content -LiteralPath $pidFile -Value $process.Id
$url = "http://127.0.0.1:$Port/"
Set-Content -LiteralPath $urlFile -Value $url

$ready = $false
for ($attempt = 0; $attempt -lt 30; $attempt++) {
    Start-Sleep -Milliseconds 500
    try {
        $health = Invoke-RestMethod -Uri "${url}api/health" -TimeoutSec 2
        if ($health.ok) {
            $ready = $true
            break
        }
    } catch {
        if (-not (Get-Process -Id $process.Id -ErrorAction SilentlyContinue)) { break }
    }
}

if (-not $ready) {
    Write-Error "Server startup failed. Check the log: $errLog"
}

Start-Process $url
Write-Host "Little Bee started: $url"
Write-Host 'Run the stop launcher when you want to stop the service.'
