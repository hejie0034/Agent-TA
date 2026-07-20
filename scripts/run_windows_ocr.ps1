param(
  [string]$Source = ""
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($Source)) {
  $Source = -join ([char[]](0x622A, 0x56FE, 0x6559, 0x7A0B))
}

Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.FileAccessMode, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.Streams.IRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics.Imaging, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.SoftwareBitmap, Windows.Graphics.Imaging, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Media.Ocr.OcrResult, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Globalization.Language, Windows.Globalization, ContentType = WindowsRuntime] | Out-Null

$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
  $_.Name -eq "AsTask" -and
  $_.IsGenericMethod -and
  $_.GetParameters().Count -eq 1 -and
  $_.ToString().Contains("IAsyncOperation")
})[0]

function Await-WinRt($Operation, [type]$ResultType) {
  $task = $asTaskGeneric.MakeGenericMethod($ResultType).Invoke($null, @($Operation))
  $task.GetAwaiter().GetResult()
}

$root = (Resolve-Path $Source).Path
$language = [Windows.Globalization.Language]::new("zh-Hans-CN")
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($language)
if ($null -eq $engine) {
  throw "Windows OCR engine for zh-Hans-CN is not available."
}

$images = Get-ChildItem -Path $root -Recurse -File |
  Where-Object { $_.Extension -match '^\.(png|jpg|jpeg|webp|bmp)$' } |
  Sort-Object FullName

$results = [System.Collections.Generic.List[object]]::new()
foreach ($image in $images) {
  $text = ""
  $ok = $false
  $errorMessage = ""
  try {
    $file = Await-WinRt ([Windows.Storage.StorageFile]::GetFileFromPathAsync($image.FullName)) ([Windows.Storage.StorageFile])
    $stream = Await-WinRt ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
    try {
      $decoder = Await-WinRt ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
      $bitmap = Await-WinRt ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
      $result = Await-WinRt ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
      $text = [string]$result.Text
      $ok = $true
    } finally {
      if ($stream -ne $null) {
        $stream.Dispose()
      }
    }
  } catch {
    $errorMessage = $_.Exception.Message
  }

  $sidecar = [System.IO.Path]::ChangeExtension($image.FullName, ".ocr.txt")
  Set-Content -LiteralPath $sidecar -Value $text -Encoding UTF8
  $results.Add([pscustomobject]@{
    file = $image.FullName
    sidecar = $sidecar
    ok = $ok
    textLength = $text.Length
    error = $errorMessage
  })
}

$report = [pscustomobject]@{
  source = $root
  imageCount = $images.Count
  ocrCount = ($results | Where-Object { $_.textLength -gt 0 }).Count
  failedCount = ($results | Where-Object { -not $_.ok }).Count
  results = $results
}

$knowledgeDirName = -join ([char[]](0x5207, 0x7247, 0x8BFB, 0x53D6, 0x77E5, 0x8BC6, 0x5E93))
$reportDir = Join-Path (Split-Path $root -Parent) $knowledgeDirName
New-Item -ItemType Directory -Force -Path $reportDir | Out-Null
$reportPath = Join-Path $reportDir "windows_ocr_report.json"
$report | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $reportPath -Encoding UTF8
$report | ConvertTo-Json -Depth 3
