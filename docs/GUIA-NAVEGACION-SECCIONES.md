# Guía: Sistema de Navegación por Secciones Independientes

## 📋 Descripción General

El sistema de navegación ahora muestra cada sección de la página de manera independiente, como pestañas o vistas separadas, en lugar de tener todo en un scroll largo. Esto mejora significativamente la experiencia de usuario al mantener el foco en una sola sección a la vez.

## 🎯 Secciones Disponibles

### 1. **Inicio (Home)**
- **URL Hash:** `#home`
- **Contenido:** 
  - Hero slider con las promociones principales
  - Tarjetas de categorías para explorar productos
- **Vista por defecto:** Sí (se muestra al cargar la página)

### 2. **Productos**
- **URL Hash:** Varía según categoría (ej: `#arneses`, `#jackets`, `#lenceria`, etc.)
- **Contenido:** Grid de productos filtrados por categoría
- **Se activa cuando:** 
  - Haces clic en una categoría
  - Haces clic en un enlace de menú de productos

### 3. **Nosotros**
- **URL Hash:** `#nosotros`
- **Contenido:** Información sobre SALVAJE Indumentary
- **Se activa cuando:** Haces clic en "Nosotros" en el menú

### 4. **Sesión Fotográfica**
- **URL Hash:** `#fotografia`
- **Contenido:** 
  - Descripción de las sesiones fotográficas
  - Planes disponibles (Esencia, Elegant, Premium, Nacional)
  - Sistema de reservas
- **Se activa cuando:** Haces clic en "Sesión Fotográfica" en el menú

## 💡 Cómo Funciona

### Comportamiento de la Navegación

1. **Al cargar la página:** Se muestra la vista de Inicio (hero + categorías)

2. **Al hacer clic en el menú de navegación:**
   - Las secciones actuales se ocultan
   - La sección seleccionada se muestra con una animación suave
   - La página hace scroll automático hacia arriba

3. **Al hacer clic en una categoría:**
   - Se ocultan home/nosotros/fotografía
   - Se muestra la sección de productos
   - Se aplica el filtro de la categoría seleccionada

4. **Historial del navegador:**
   - Cada navegación actualiza la URL (ej: `#arneses`)
   - Los botones "Atrás" y "Adelante" funcionan correctamente

## 🎨 Efectos Visuales

### Animación de Entrada
Cada sección aparece con una animación suave:
```css
- Duración: 0.4 segundos
- Efecto: Fade in (de transparente a visible)
- Movimiento: Deslizamiento desde arriba (20px)
```

### Transición entre Secciones
- Las secciones se ocultan/muestran instantáneamente
- La opacidad crea una transición suave
- El scroll al top es animado (smooth)

## 🔧 Personalización

### Cambiar la Vista Inicial

Si deseas que otra sección sea la vista por defecto al cargar:

**En `index.html`:**
```html
<!-- Remover "active" de home y categorias -->
<section class="hero page-section" id="home">
<section class="categories page-section" id="categorias">

<!-- Agregar "active" a la sección deseada -->
<section class="about page-section active" id="nosotros">
```

**En `marketplace-script.js`:**
```javascript
// Línea 310 - Cambiar 'home' por la sección deseada
navigateToCategory('nosotros'); // o 'fotografia'
```

### Agregar una Nueva Sección

1. **Crear la sección en HTML:**
```html
<section class="mi-seccion page-section" id="mi-seccion">
    <div class="container">
        <!-- Tu contenido aquí -->
    </div>
</section>
```

2. **Agregar estilos en CSS:**
```css
.mi-seccion {
    padding: 100px 0;
    background: var(--bg-primary);
    min-height: calc(100vh - 80px);
}
```

3. **Actualizar la navegación en JavaScript:**
```javascript
// En la función navigateToCategory(), agregar:
if (category === 'mi-seccion') {
    const miSeccion = document.getElementById('mi-seccion');
    if (miSeccion) {
        miSeccion.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
}
```

4. **Agregar link en el menú:**
```html
<a href="#mi-seccion" class="nav-link">Mi Sección</a>
```

## 📱 Responsivo

El sistema funciona perfectamente en todos los dispositivos:
- **Desktop:** Navegación fluida con animaciones completas
- **Tablet:** Experiencia optimizada
- **Mobile:** Menú hamburguesa + navegación por secciones

## 🐛 Solución de Problemas

### La sección no se muestra
- Verifica que tenga la clase `page-section`
- Asegúrate de que el `id` coincida con el hash de la URL
- Revisa que la función `navigateToCategory` incluya tu sección

### El scroll no funciona correctamente
- Verifica que `window.scrollTo` esté presente en tu caso
- Asegúrate de que `behavior: 'smooth'` esté habilitado

### Las animaciones no se ven
- Verifica que el CSS incluya los `@keyframes fadeInSection`
- Asegura que la clase `.page-section.active` tenga la animación

## 🎯 Ventajas del Sistema

✅ **Mejor UX:** Enfoque en una sección a la vez
✅ **Menos scroll:** No hay que recorrer toda la página
✅ **Más rápido:** Carga solo el contenido visible
✅ **URLs compartibles:** Cada sección tiene su propia URL
✅ **Navegación intuitiva:** Similar a aplicaciones modernas
✅ **Responsive:** Funciona en todos los dispositivos

## 📝 Notas Importantes

- Las secciones con clase `page-section` sin `active` están ocultas (`display: none`)
- Solo una vista puede estar activa a la vez (productos, nosotros, o fotografía)
- La vista "home" es especial: muestra hero + categorías simultáneamente
- El carrito y los modales funcionan independientemente de la sección activa

---

💡 **Tip:** Esta arquitectura facilita agregar nuevas secciones sin afectar la navegación existente. Solo necesitas seguir el patrón de clases `page-section` y actualizar la función de navegación.


