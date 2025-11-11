#!/usr/bin/env bash
# Script de compilación para Render
set -o errexit

echo "=== Iniciando build para Render ==="

# Instalar dependencias de Python
echo "📦 Instalando dependencias de Python..."
pip install -r requirements.txt

# Ejecutar migraciones PRIMERO (antes de collectstatic)
echo "🗄️  Ejecutando migraciones de base de datos..."
python manage.py migrate --noinput

# Recopilar archivos estáticos
echo "📁 Recopilando archivos estáticos..."
python manage.py collectstatic --no-input

# Instalar Playwright (opcional, puede fallar en plan free)
echo "🎭 Intentando instalar Playwright..."
pip install playwright || echo "⚠️  Playwright no se pudo instalar (no crítico)"
playwright install chromium || echo "⚠️  Chromium no se pudo instalar (no crítico)"

echo "✅ Build completado exitosamente!"