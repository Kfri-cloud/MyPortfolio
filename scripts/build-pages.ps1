$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$publishRoot = Join-Path $repoRoot 'docs'
$sourceHtml = Join-Path $repoRoot 'Script\main Script_test\index.html'

New-Item -ItemType Directory -Path $publishRoot -Force | Out-Null

# GitHub Pages serves only the selected /docs folder, so include its assets there.
foreach ($folder in @('css', 'js', 'images')) {
  $sourceFolder = Join-Path $repoRoot $folder
  Get-ChildItem -LiteralPath $sourceFolder -File -Recurse | ForEach-Object {
    $relativePath = $_.FullName.Substring($repoRoot.Length + 1)
    $destination = Join-Path $publishRoot $relativePath
    New-Item -ItemType Directory -Path (Split-Path $destination) -Force | Out-Null
    Copy-Item -LiteralPath $_.FullName -Destination $destination -Force
  }
}

$html = Get-Content -LiteralPath $sourceHtml -Raw -Encoding UTF8
$html = $html.Replace('../../css/', 'css/').Replace('../../js/', 'js/').Replace('../../images/', 'images/')
Set-Content -LiteralPath (Join-Path $publishRoot 'index.html') -Value $html -Encoding UTF8
