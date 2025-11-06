# SALVAJE Indumentary - Aplicación Flask

## Instalación

1. Instalar dependencias:
```bash
pip install -r requirements.txt
```

2. Ejecutar la aplicación:
```bash
python app.py
```

3. Abrir en el navegador:
```
http://localhost:5000
```

## Rutas Disponibles

### Públicas
- `/` - Catálogo principal de productos
- `/agregar_carrito/<id>` - Agregar producto al carrito
- `/carrito` - Ver carrito de compras
- `/actualizar_cantidad/<id>` - Actualizar cantidad en carrito (POST)
- `/vaciar_carrito` - Vaciar carrito (POST)

### Administración
- `/admin/login` - Login de administrador
- `/admin` - Panel de administración (requiere login)
- `/admin/agregar` - Agregar nuevo producto
- `/admin/editar/<id>` - Editar producto existente
- `/admin/eliminar/<id>` - Eliminar producto (POST)
- `/admin/logout` - Cerrar sesión

### API
- `/api/products` - Obtener productos en JSON
- `/api/bookings` - Obtener reservas en JSON (requiere admin)

## Credenciales de Administrador

Por defecto:
- Usuario: `admin`
- Contraseña: `1234`

Para cambiar, edita las constantes `ADMIN_USER` y `ADMIN_PASS` en `app.py`.

## Estructura de Archivos

```
.
├── app.py                      # Aplicación Flask principal
├── requirements.txt            # Dependencias Python
├── data/                      # Datos (se crea automáticamente)
│   ├── products.json          # Productos
│   └── bookings.json          # Reservas
├── templates/                 # Plantillas HTML
│   ├── base.html             # Plantilla base
│   ├── index.html            # Catálogo principal
│   ├── carrito.html          # Carrito de compras
│   ├── admin.html            # Panel de administración
│   ├── admin_login.html      # Login de admin
│   └── admin_producto_form.html  # Formulario de producto
└── static/                    # Archivos estáticos
    ├── marketplace-style.css  # Estilos CSS
    └── flash-messages.css     # Estilos de mensajes
```

## Notas

- Los productos se guardan en `data/products.json`
- Las reservas se guardan en `data/bookings.json`
- El carrito se guarda en la sesión del usuario
- Cambia `app.secret_key` en producción

