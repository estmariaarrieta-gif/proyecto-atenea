# 🚀 Guía de Despliegue - SALVAJE Indumentary

## ⚠️ Importante: GitHub Pages vs Flask

**GitHub Pages NO puede ejecutar Flask** porque:
- GitHub Pages solo sirve archivos estáticos (HTML, CSS, JS)
- Flask requiere un servidor Python para ejecutarse
- Las rutas dinámicas y la base de datos necesitan backend

---

## 🌐 Opción 1: Desplegar en Render (GRATIS) ⭐ Recomendado

Render ofrece hosting gratuito para aplicaciones Flask.

### Paso 1: Preparar el repositorio

Los archivos ya están listos:
- ✅ `wsgi.py` - Punto de entrada WSGI
- ✅ `requirements.txt` - Dependencias Python
- ✅ `render.yaml` - Configuración de Render

### Paso 2: Crear cuenta en Render

1. Ve a https://render.com/
2. Haz clic en "Get Started for Free"
3. Inicia sesión con tu cuenta de GitHub

### Paso 3: Crear nuevo Web Service

1. En el dashboard de Render, click en "New +"
2. Selecciona "Web Service"
3. Conecta tu repositorio de GitHub: `proyecto-atenea`
4. Render detectará automáticamente el archivo `render.yaml`

### Paso 4: Configuración

Render usará automáticamente:
- **Build Command:** `pip install -r requirements.txt`
- **Start Command:** `gunicorn wsgi:app`
- **Python Version:** 3.11.0

### Paso 5: Variables de entorno (opcional)

En la sección "Environment", puedes agregar:
```
SECRET_KEY=tu-clave-secreta-muy-segura
ADMIN_USER=admin
ADMIN_PASS=tu-contraseña-segura
```

### Paso 6: Deploy

1. Click en "Create Web Service"
2. Render comenzará a construir y desplegar tu aplicación
3. En 2-3 minutos tendrás una URL como:
   `https://salvaje-indumentary.onrender.com`

---

## 🔧 Opción 2: Desplegar en PythonAnywhere (GRATIS)

### Paso 1: Crear cuenta

1. Ve a https://www.pythonanywhere.com/
2. Crea una cuenta gratuita

### Paso 2: Clonar repositorio

En la consola de PythonAnywhere:

```bash
git clone https://github.com/estmariaarrieta-gif/proyecto-atenea.git
cd proyecto-atenea
```

### Paso 3: Crear entorno virtual

```bash
mkvirtualenv --python=/usr/bin/python3.11 salvaje
pip install -r requirements.txt
```

### Paso 4: Configurar Web App

1. Ve a la pestaña "Web"
2. Click en "Add a new web app"
3. Selecciona "Manual configuration"
4. Python 3.11
5. En "WSGI configuration file", edita:

```python
import sys
path = '/home/tuusuario/proyecto-atenea'
if path not in sys.path:
    sys.path.append(path)

from wsgi import app as application
```

### Paso 5: Configurar carpetas estáticas

En la sección "Static files":
- URL: `/static/`
- Directory: `/home/tuusuario/proyecto-atenea/static`

### Paso 6: Reload

Click en "Reload" y tu sitio estará disponible en:
`https://tuusuario.pythonanywhere.com`

---

## 🐳 Opción 3: Desplegar con Docker en Railway (GRATIS)

### Paso 1: Crear Dockerfile

Ya existe en el README, pero aquí está el contenido:

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "wsgi:app"]
```

### Paso 2: Desplegar en Railway

1. Ve a https://railway.app/
2. Inicia sesión con GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Selecciona `proyecto-atenea`
5. Railway detectará el Dockerfile automáticamente
6. Click en "Deploy"

Tu sitio estará en: `https://tu-proyecto.up.railway.app`

---

## 📊 Comparación de Opciones

| Plataforma | Gratis | Python | Base de Datos | SSL | Custom Domain |
|------------|--------|--------|---------------|-----|---------------|
| **Render** | ✅ | ✅ | ✅ PostgreSQL | ✅ | ✅ |
| **PythonAnywhere** | ✅ | ✅ | ✅ MySQL | ✅ | ❌ (plan pago) |
| **Railway** | ✅ 500h/mes | ✅ | ✅ PostgreSQL | ✅ | ✅ |
| **Heroku** | ❌ (desde 2022) | ✅ | ✅ PostgreSQL | ✅ | ✅ |
| **GitHub Pages** | ✅ | ❌ | ❌ | ✅ | ✅ |

**Recomendación:** Usar **Render** por su simplicidad y características gratuitas.

---

## 🔐 Configuración de Seguridad para Producción

### Variables de entorno obligatorias

```bash
SECRET_KEY=genera-una-clave-aleatoria-muy-larga-y-segura
ADMIN_USER=tu-usuario-admin
ADMIN_PASS=tu-contraseña-segura-no-1234
FLASK_ENV=production
```

### Generar SECRET_KEY segura

```python
import secrets
print(secrets.token_hex(32))
```

---

## 📝 Notas Importantes

### ⚠️ Limitaciones de planes gratuitos

- **Render:** 
  - Servidor se duerme después de 15 min de inactividad
  - Primera carga puede tardar 30-60 segundos
  - 750 horas/mes gratis

- **PythonAnywhere:**
  - 1 aplicación web gratuita
  - CPU limitado
  - No custom domain en plan gratuito

- **Railway:**
  - 500 horas/mes gratis
  - $5 de crédito mensual

### ✅ Ventajas de Render (recomendado)

- ✅ Fácil de configurar
- ✅ Integración directa con GitHub
- ✅ Deploy automático en cada push
- ✅ SSL gratuito (HTTPS)
- ✅ Logs en tiempo real
- ✅ PostgreSQL gratuito

---

## 🐛 Troubleshooting

### Error: Application failed to start

**Solución:** Verificar que `wsgi.py` existe y que `gunicorn` está en `requirements.txt`

### Error: Module not found

**Solución:** Asegurar que todas las dependencias están en `requirements.txt`

### Error: Port binding failed

**Solución:** Usar `0.0.0.0` en lugar de `localhost` en producción

### Error: Static files not loading

**Solución:** Verificar que la configuración de `static_folder` en Flask es correcta

---

## 📚 Recursos Adicionales

- **Render Docs:** https://render.com/docs/web-services
- **PythonAnywhere Tutorial:** https://help.pythonanywhere.com/pages/Flask/
- **Railway Docs:** https://docs.railway.app/
- **Flask Deployment:** https://flask.palletsprojects.com/en/3.0.x/deploying/

---

## ✅ Checklist de Despliegue

- [ ] Crear cuenta en la plataforma elegida
- [ ] Conectar repositorio de GitHub
- [ ] Configurar variables de entorno
- [ ] Verificar que `requirements.txt` está actualizado
- [ ] Hacer push de todos los cambios
- [ ] Iniciar el deploy
- [ ] Probar la aplicación en la URL proporcionada
- [ ] Configurar dominio personalizado (opcional)
- [ ] Monitorear logs para errores
- [ ] Cambiar credenciales de admin por defecto

---

**🎉 ¡Tu aplicación Flask estará en línea y accesible desde cualquier lugar!**

