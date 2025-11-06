@echo off
echo ==================================================
echo   CONFIGURACION DE GIT - PROYECTO ATENEA
echo ==================================================
echo.

REM Verificar si Git esta instalado
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git no esta instalado
    echo.
    echo Por favor instala Git desde: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo [OK] Git esta instalado
echo.

REM Inicializar repositorio
echo Paso 1: Inicializando repositorio Git...
git init

REM Agregar README
echo.
echo Paso 2: Agregando README.md...
git add README.md

REM Configurar usuario (si no esta configurado)
git config user.name >nul 2>&1
if errorlevel 1 (
    echo.
    echo Configurando usuario de Git...
    git config --global user.name "María Arrieta"
    git config --global user.email "estmariaarrieta@gmail.com"
)

REM Primer commit
echo.
echo Paso 3: Realizando primer commit...
git commit -m "first commit - SALVAJE Indumentary E-commerce"

REM Renombrar rama a main
echo.
echo Paso 4: Renombrando rama a 'main'...
git branch -M main

REM Agregar remoto
echo.
echo Paso 5: Agregando repositorio remoto...
git remote add origin https://github.com/estmariaarrieta-gif/proyecto-atenea.git

REM Agregar todo el proyecto
echo.
echo Paso 6: Agregando todos los archivos del proyecto...
git add .

REM Segundo commit con todo el proyecto
echo.
echo Paso 7: Commit completo del proyecto...
git commit -m "feat: estructura completa Flask con blueprints modulares"

REM Push al remoto
echo.
echo Paso 8: Subiendo a GitHub...
git push -u origin main

echo.
echo ==================================================
echo   CONFIGURACION COMPLETADA
echo ==================================================
echo.
echo Tu proyecto ha sido subido a:
echo https://github.com/estmariaarrieta-gif/proyecto-atenea
echo.
pause

