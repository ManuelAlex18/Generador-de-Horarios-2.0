#!/usr/bin/env bash
# Script de compilación para Render
set -o errexit

# Instalar dependencias de Python
echo "Instalando dependencias de Python..."
pip install -r requirements.txt

# Instalar Playwright y navegadores (solo Chromium para ahorrar espacio)
echo "Instalando Playwright..."
pip install playwright
playwright install chromium

# Recopilar archivos estáticos
echo "Recopilando archivos estáticos..."
python manage.py collectstatic --no-input

# Ejecutar migraciones
echo "Ejecutando migraciones..."
python manage.py migrate

echo "Build completado exitosamente!"