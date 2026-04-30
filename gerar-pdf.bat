@echo off
echo Gerando apostila.pdf com Edge headless...
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" ^
  --headless ^
  --disable-gpu ^
  --print-to-pdf="C:\Users\mvvil\landing-concursos\apostila.pdf" ^
  --print-to-pdf-no-header ^
  "file:///C:/Users/mvvil/landing-concursos/apostila.html"
echo.
if exist "C:\Users\mvvil\landing-concursos\apostila.pdf" (
  echo PDF gerado com sucesso: apostila.pdf
) else (
  echo ERRO: PDF nao foi gerado.
)
pause
