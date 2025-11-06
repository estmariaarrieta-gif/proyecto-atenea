# 🌐 Configuración de GitHub Pages

## 📋 Pasos para Activar GitHub Pages

### 1. Ir a la Configuración del Repositorio

1. Ve a tu repositorio en GitHub:
   ```
   https://github.com/estmariaarrieta-gif/proyecto-atenea
   ```

2. Click en la pestaña **"Settings"** (⚙️ Configuración)

### 2. Activar GitHub Pages

1. En el menú lateral izquierdo, busca la sección **"Pages"** (está en "Code and automation")

2. En la sección **"Build and deployment"**:
   - **Source:** Selecciona `Deploy from a branch`
   - **Branch:** Selecciona `main` 
   - **Folder:** Selecciona `/ (root)`

3. Click en **"Save"** (Guardar)

### 3. Esperar el Despliegue

GitHub Pages tardará 1-2 minutos en construir y desplegar tu sitio.

Verás un mensaje como:
```
✅ Your site is live at https://estmariaarrieta-gif.github.io/proyecto-atenea/
```

### 4. Acceder a tu Sitio

Tu sitio estático estará disponible en:
```
https://estmariaarrieta-gif.github.io/proyecto-atenea/
```

---

## 📁 Estructura de Archivos para GitHub Pages

GitHub Pages sirve el sitio web desde la raíz del repositorio (`/`) con esta estructura:

```
proyecto-atenea/
├── index.html                    # ⭐ Página principal (REQUERIDO)
├── static/
│   ├── css/
│   │   └── marketplace-style.css
│   ├── js/
│   │   ├── auth.js
│   │   ├── marketplace-script.js
│   │   ├── booking-system.js
│   │   └── admin-panel.js
│   └── images/
│       ├── products/
│       ├── categories/
│       └── about-salvaje.jpg
├── .nojekyll                     # Indica a GitHub que no use Jekyll
└── README.md
```

---

## ⚙️ Configuración Aplicada

### Archivos Actualizados:

✅ **`index.html`**
- Rutas actualizadas a `static/css/` y `static/js/`
- Rutas de imágenes actualizadas a `static/images/`
- Sin dependencias de Flask/Python
- Funciona 100% con HTML, CSS y JavaScript

✅ **`.nojekyll`**
- Archivo vacío que evita que GitHub Pages procese el sitio con Jekyll
- Permite servir archivos y carpetas que empiezan con guion bajo

✅ **Estructura de carpetas**
- `static/css/` - Estilos CSS
- `static/js/` - Scripts JavaScript
- `static/images/` - Imágenes del sitio

---

## 🔧 Verificar que Funciona

### 1. Verificar Build de GitHub Pages

1. Ve a: **Actions** → Busca "pages build and deployment"
2. Debe mostrar ✅ (checkmark verde)
3. Si hay error ❌, revisa los logs

### 2. Probar el Sitio

Abre tu sitio en el navegador:
```
https://estmariaarrieta-gif.github.io/proyecto-atenea/
```

**Deberías ver:**
- ✅ Página principal de SALVAJE Indumentary
- ✅ Estilos CSS cargados correctamente (fondo oscuro, dorado)
- ✅ Productos mostrados dinámicamente
- ✅ Carrito de compras funcional
- ✅ Sistema de reservas de sesiones fotográficas
- ✅ Panel de administración (login: admin / 1234)

---

## 🚨 Troubleshooting

### Problema: "404 - There isn't a GitHub Pages site here"

**Solución:**
1. Verifica que GitHub Pages esté activado en Settings → Pages
2. Asegúrate de haber seleccionado branch `main` y folder `/ (root)`
3. Espera 2-3 minutos para que se despliegue

---

### Problema: "El sitio carga pero sin estilos (CSS)"

**Solución:**
1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network" o "Red"
3. Busca errores 404 en archivos CSS o JS
4. Verifica que las rutas sean:
   - `static/css/marketplace-style.css`
   - `static/js/marketplace-script.js`

**Fix:**
```html
<!-- ✅ Correcto -->
<link rel="stylesheet" href="static/css/marketplace-style.css">
<script src="static/js/marketplace-script.js"></script>

<!-- ❌ Incorrecto -->
<link rel="stylesheet" href="/static/css/marketplace-style.css">
<script src="/static/js/marketplace-script.js"></script>
```

---

### Problema: "Las imágenes no cargan"

**Solución:**
1. Verifica que las imágenes estén en `static/images/products/`
2. Asegúrate de que los nombres coincidan EXACTAMENTE:
   - `bonnie.jpg` (no `Bonnie.jpg`)
   - Minúsculas vs mayúsculas importan en Linux (GitHub usa Linux)

**Verificar en el código:**
```javascript
// En marketplace-script.js
image: 'static/images/products/bonnie.jpg'  // ✅ Correcto
```

---

### Problema: "Los productos no aparecen"

**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores de JavaScript
3. Verifica que `marketplace-script.js` tenga los productos hardcodeados

**Los productos se cargan desde:**
- `localStorage` (si los guardaste previamente)
- O desde el código hardcodeado en `marketplace-script.js`

---

## 📝 Diferencias: Versión Flask vs Versión Estática

| Característica | Flask (Backend) | GitHub Pages (Estático) |
|----------------|----------------|------------------------|
| **Lenguaje Backend** | Python | Ninguno (solo JS) |
| **Base de Datos** | `data/products.json` | `localStorage` del navegador |
| **Admin Panel** | Guarda en archivo JSON | Guarda en localStorage |
| **Rutas** | `/`, `/carrito`, `/admin` | Todo en `index.html` (SPA) |
| **Despliegue** | Render, Heroku, PythonAnywhere | GitHub Pages |
| **Costo** | Gratis (con limitaciones) | 100% Gratis |
| **Velocidad** | Servidor procesa | Instantáneo (solo HTML/CSS/JS) |
| **Limitaciones** | Requiere servidor activo | No persistencia de datos entre sesiones |

---

## 🎯 Recomendaciones

### Para Desarrollo Local:
Usa la **versión Flask** con Python:
```bash
python app.py
```
- Permite guardar productos permanentemente
- Base de datos en archivos JSON
- Mejor para testing y desarrollo

### Para Hosting Gratuito:
Usa **GitHub Pages** con versión estática:
```
https://estmariaarrieta-gif.github.io/proyecto-atenea/
```
- 100% gratis sin límites
- Muy rápido (CDN de GitHub)
- Ideal para demos y portafolio

### Para Producción Real:
Usa **Render / PythonAnywhere** con Flask:
```
https://salvaje-indumentary.onrender.com
```
- Backend real con base de datos
- Persistencia de datos real
- Mejor para e-commerce real

---

## ✅ Checklist Post-Despliegue

- [ ] Sitio carga en `https://usuario.github.io/proyecto-atenea/`
- [ ] CSS se aplica correctamente (fondo oscuro, texto dorado)
- [ ] JavaScript funciona (productos se muestran)
- [ ] Imágenes cargan correctamente
- [ ] Carrito de compras funciona
- [ ] Sistema de reservas funciona
- [ ] Panel de admin funciona (login: admin / 1234)
- [ ] Responsive design funciona en móvil
- [ ] No hay errores 404 en la consola

---

## 🔗 Enlaces Útiles

- **Tu Repositorio:** https://github.com/estmariaarrieta-gif/proyecto-atenea
- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Troubleshooting Pages:** https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-404-errors-for-github-pages-sites

---

**📅 Última actualización:** 2025-11-06  
**🚀 Status:** Configuración completa y lista para desplegar

