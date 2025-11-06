# 🖤 SALVAJE Indumentary

**E-commerce de indumentaria alternativa y leather fashion** con panel de administración completo.

![Python](https://img.shields.io/badge/Python-3.11-blue)
![Flask](https://img.shields.io/badge/Flask-3.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📸 Características

- ✅ **Catálogo de productos** dinámico con categorías
- 🛒 **Carrito de compras** funcional con gestión de cantidades
- 👨‍💼 **Panel de administración** completo (CRUD de productos)
- 📅 **Sistema de reservas** para sesiones fotográficas
- 🏷️ **Gestión de ofertas** y productos destacados
- 🔐 **Autenticación** de administrador
- 📱 **Diseño responsive** para móviles y tablets
- 🎨 **UI moderna** con tema oscuro y acentos dorados

## 🏗️ Arquitectura

El proyecto utiliza una arquitectura modular con blueprints de Flask:

```
proyecto-atenea/
├── app/
│   ├── __init__.py          # Factory de aplicación
│   ├── config.py            # Configuraciones por entorno
│   ├── utils.py             # Utilidades compartidas
│   └── blueprints/
│       ├── catalogo.py      # Vista pública de productos
│       ├── carrito.py       # Carrito de compras
│       ├── admin.py         # Panel de administración
│       └── api.py           # Endpoints JSON
├── templates/               # Plantillas HTML (Jinja2)
│   ├── base.html
│   ├── index.html
│   ├── carrito.html
│   ├── admin.html
│   └── ...
├── static/
│   ├── css/
│   │   ├── marketplace-style.css
│   │   └── flash-messages.css
│   ├── js/
│   │   ├── marketplace-script.js
│   │   ├── booking-system.js
│   │   ├── admin-panel.js
│   │   └── auth.js
│   └── images/
│       ├── products/
│       ├── categories/
│       └── hero/
├── data/
│   ├── products.json        # Base de datos de productos
│   └── bookings.json        # Reservas
├── app.py                   # Entrada desarrollo
├── wsgi.py                  # Entrada producción
├── requirements.txt
└── README.md
```

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/estmariaarrieta-gif/proyecto-atenea.git
cd proyecto-atenea
```

### 2. Crear entorno virtual

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 3. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 4. Ejecutar en desarrollo

```bash
python app.py
```

La aplicación estará disponible en: **http://localhost:5000**

## 🔐 Panel de Administración

Accede al panel de administración en: **http://localhost:5000/admin/login**

**Credenciales por defecto:**
- Usuario: `admin`
- Contraseña: `1234`

### Funcionalidades del Admin:

- ✏️ Agregar, editar y eliminar productos
- 🏷️ Clasificar productos por categorías
- 💰 Marcar productos en oferta
- ⭐ Destacar productos en la página principal
- 🔄 Activar/desactivar disponibilidad
- 📅 Ver reservas de sesiones fotográficas

## 📦 Tecnologías Utilizadas

### Backend
- **Flask 3.0** - Framework web
- **Python 3.11** - Lenguaje
- **JSON** - Persistencia de datos

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos (variables CSS, Grid, Flexbox)
- **JavaScript (Vanilla)** - Interactividad
- **Font Awesome** - Iconos
- **Google Fonts** - Tipografía (Playfair Display, Poppins)

### Despliegue
- **Gunicorn** - Servidor WSGI para producción
- **WSGI** - Interfaz estándar Python

## 🌐 Despliegue en Producción

### Con Gunicorn

```bash
gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app
```

### Con Docker

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "wsgi:app"]
```

### Variables de entorno para producción

```bash
export FLASK_ENV=production
export SECRET_KEY="tu-clave-secreta-muy-segura"
export ADMIN_USER="admin"
export ADMIN_PASS="contraseña-segura"
```

## 🎯 API Endpoints

### Públicos
- `GET /` - Catálogo principal
- `GET /carrito` - Ver carrito de compras
- `GET /api/productos` - Lista de productos (JSON)
- `GET /api/categorias` - Categorías disponibles (JSON)

### Administración (requiere autenticación)
- `GET /admin` - Panel de administración
- `POST /admin/productos/agregar` - Agregar producto
- `PUT /admin/productos/editar/<id>` - Editar producto
- `DELETE /admin/productos/eliminar/<id>` - Eliminar producto
- `GET /admin/api/reservas` - Reservas registradas (JSON)

## 🛍️ Catálogo de Productos

### Categorías Disponibles
El sistema maneja 5 categorías principales de productos:
- **Arneses**: Diseños exclusivos en cuero premium
- **Jackets**: Chaquetas de cuero con estilo alternativo
- **Lencería**: Piezas únicas y atrevidas
- **Máscaras**: Accesorios premium para eventos
- **Accesorios**: Complementos ideales para cualquier outfit

## 👨‍💼 Panel de Administración

### Funcionalidades Principales
El panel de administración permite gestionar completamente el e-commerce:
- **CRUD de Productos**: Crear, leer, actualizar y eliminar productos
- **Gestión de Categorías**: Organizar productos por tipo
- **Control de Ofertas**: Activar/desactivar promociones
- **Gestión de Stock**: Marcar productos como disponibles o descartados
- **Visualización de Reservas**: Ver todas las sesiones fotográficas agendadas

## 📝 Estructura de Datos

### Producto
```json
{
  "id": 1,
  "name": "BONNIE",
  "category": "arneses",
  "price": 120000,
  "originalPrice": 200000,
  "image": "/static/images/products/bonnie.jpg",
  "description": "Arnés con diseño exclusivo en cuero premium",
  "rating": 5,
  "featured": true,
  "onSale": true,
  "inStock": true
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👥 Autor

**María Arrieta** - [@estmariaarrieta-gif](https://github.com/estmariaarrieta-gif)

---

**Proyecto Atenea** - Desarrollo de E-commerce SALVAJE Indumentary © 2025
