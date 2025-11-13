#!/bin/bash
# Script para instalar dependencias en Render

echo "🔧 Instalando dependencias de Python..."
pip install -r requirements.txt

echo "🎭 Instalando navegadores de Playwright con dependencias..."
# Usar --with-deps para instalar el navegador Y las dependencias del sistema en un solo comando
playwright install --with-deps chromium

echo "� Recolectando archivos estáticos..."
python manage.py collectstatic --no-input

echo "�🗄️ Ejecutando migraciones de base de datos..."
python manage.py migrate

echo "👤 Creando superusuario si no existe..."
python manage.py create_superuser_if_none_exists

echo "✅ Instalación completada"
