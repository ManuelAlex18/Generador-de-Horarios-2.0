# Guía de Despliegue en Render

## Problemas Resueltos

### 1. Exportación de PDF e Imágenes
**Problema**: Las funciones de exportación no funcionaban en Render porque:
- Faltaba PyMuPDF para convertir PDF a imagen
- Los navegadores de Playwright no estaban instalados

**Solución implementada**:
- ✅ Agregado `pymupdf==1.24.0` al `requirements.txt`
- ✅ Creado script `render-install.sh` que instala navegadores de Playwright
- ✅ Agregados logs detallados para debugging

## Configuración Necesaria en Render

### Backend (Web Service)

1. **Build Command**: 
   ```bash
   chmod +x render-install.sh && ./render-install.sh
   ```
   
2. **Start Command**:
   ```bash
   gunicorn backend.wsgi:application
   ```

3. **Environment Variables** (ya configuradas):
   - `DATABASE_URL` - PostgreSQL connection
   - `DJANGO_SUPERUSER_USERNAME`
   - `DJANGO_SUPERUSER_PASSWORD`
   - `DJANGO_SUPERUSER_EMAIL`
   - `SECRET_KEY`
   - `CORS_ALLOWED_ORIGINS`
   - `IS_PRODUCTION=True`

### Frontend (Static Site)

1. **Build Command**:
   ```bash
   npm install && npm run build
   ```

2. **Publish Directory**:
   ```
   dist
   ```

3. **Environment Variables**:
   - `VITE_API_URL=https://generador-de-horarios-backend.onrender.com`

## ¿Qué hace render-install.sh?

El script realiza 5 pasos críticos (equivalente al Build Command original + Playwright):

1. **Instala dependencias de Python** (`pip install -r requirements.txt`)
   - Incluye Django, Playwright, PyMuPDF, etc.

2. **Instala Chromium con dependencias del sistema** (`playwright install --with-deps chromium`)
   - Playwright SOLO instala el paquete Python, NO los navegadores
   - Este comando descarga Chromium (~150MB) Y las dependencias del sistema
   - Usa `--with-deps` para evitar problemas de permisos en Render
   - Instala automáticamente: libfonts, libx11, y otras librerías necesarias

3. **Recolecta archivos estáticos** (`python manage.py collectstatic --no-input`)
   - Recopila CSS, JS, imágenes en un solo directorio para WhiteNoise

4. **Ejecuta migraciones** (`python manage.py migrate`)
   - Aplica cambios del modelo de datos a la base de datos PostgreSQL

5. **Crea superusuario** (`python manage.py create_superuser_if_none_exists`)
   - Crea el usuario admin automáticamente usando variables de entorno

### Configuración adicional de Playwright

El código ahora incluye argumentos específicos para ejecutar Chromium en entornos de servidor:
- `--no-sandbox`: Permite ejecutar Chrome sin sandbox (necesario en contenedores)
- `--disable-setuid-sandbox`: Evita problemas de permisos
- `--disable-dev-shm-usage`: Usa /tmp en lugar de /dev/shm (evita problemas de memoria compartida)
- `--disable-gpu`: Desactiva aceleración GPU (no disponible en servidores)

## Verificación

Después del despliegue, las exportaciones deberían funcionar:

### PDF Export
```
https://generador-de-horarios-backend.onrender.com/tasks/api/exportar-pdf-playwright/{schedule_id}/
```

### Imagen Export  
```
https://generador-de-horarios-backend.onrender.com/tasks/api/exportar-imagen-playwright/{schedule_id}/
```

Los logs en Render mostrarán:
```
===== EXPORTAR PDF: Schedule ID X =====
✅ Contexto construido exitosamente
✅ HTML renderizado exitosamente
🎭 Iniciando Playwright...
✅ PDF generado exitosamente
===== PDF EXPORTADO EXITOSAMENTE =====
```

## Nota Importante

Si Render muestra error al ejecutar `render-install.sh`, asegúrate de que:
1. El archivo tiene permisos de ejecución (`chmod +x`)
2. Usa formato Unix (LF, no CRLF)
3. La primera línea es exactamente `#!/bin/bash`

## Cambios Aplicados en este Commit

- ✅ Agregado PyMuPDF al requirements.txt
- ✅ Creado render-install.sh con instalación completa de Playwright
- ✅ Mejorado manejo de errores en views.py (funciones de exportación)
- ✅ Agregados logs detallados para debugging
