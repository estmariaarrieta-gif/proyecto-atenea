# Guía: Productos Destacados en Inicio

## 📋 Descripción

La sección de **Productos Destacados** se muestra en la página de Inicio junto con el Hero y las tarjetas de categorías. Esta sección permite resaltar los mejores productos de tu catálogo.

## 🎯 Ubicación

**Página:** Inicio (`#home`)

**Orden de visualización:**
1. Hero Slider (promociones)
2. **Productos Destacados** ← Nueva sección
3. Tarjetas de Categorías

## 🔧 Personalizar Productos Destacados

### Opción 1: Cambiar la Cantidad de Productos

**Archivo:** `marketplace-script.js` (línea ~1147)

```javascript
// Cambiar el número 6 por la cantidad deseada
const featuredProducts = products.slice(0, 6); // Mostrar 6 productos
```

**Ejemplos:**
- `products.slice(0, 4)` - Mostrar 4 productos
- `products.slice(0, 8)` - Mostrar 8 productos

### Opción 2: Seleccionar Productos Específicos por ID

```javascript
// En lugar de:
const featuredProducts = products.slice(0, 6);

// Usa:
const featuredIds = [1, 3, 5, 7, 9, 11]; // IDs de productos que quieres destacar
const featuredProducts = products.filter(p => featuredIds.includes(p.id));
```

### Opción 3: Destacar Productos con Mejores Reseñas

```javascript
// Ordenar por rating y seleccionar los mejores
const featuredProducts = products
    .filter(p => p.reviews && p.reviews.length > 0) // Solo productos con reseñas
    .sort((a, b) => {
        const avgA = a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length;
        const avgB = b.reviews.reduce((sum, r) => sum + r.rating, 0) / b.reviews.length;
        return avgB - avgA;
    })
    .slice(0, 6);
```

### Opción 4: Destacar Productos en Oferta

```javascript
// Mostrar solo productos con descuento
const featuredProducts = products
    .filter(p => p.onSale === true)
    .slice(0, 6);
```

### Opción 5: Marcar Productos como "Destacados" en los Datos

1. **Agrega un campo `featured` al producto:**

```javascript
{
    id: 1,
    name: "BONNIE",
    category: "arneses",
    price: 150000,
    featured: true, // ← Agregar este campo
    // ... resto de propiedades
}
```

2. **Filtra productos destacados:**

```javascript
const featuredProducts = products.filter(p => p.featured === true);
```

## 🎨 Personalizar Estilos

### Cambiar el Fondo de la Sección

**Archivo:** `marketplace-style.css` (línea ~624)

```css
.featured-products {
    padding: 80px 0;
    background: var(--bg-primary); /* Cambiar color aquí */
}
```

### Cambiar Espaciado entre Productos

**Archivo:** `marketplace-style.css` (línea ~657)

```css
.featured-grid {
    gap: 30px; /* Aumentar o disminuir el espacio */
}
```

### Cambiar Columnas del Grid

```css
.featured-grid {
    /* Actual: mínimo 280px por columna */
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    
    /* 3 columnas fijas: */
    grid-template-columns: repeat(3, 1fr);
    
    /* 4 columnas fijas: */
    grid-template-columns: repeat(4, 1fr);
}
```

## 📝 Modificar Título y Subtítulo

**Archivo:** `index.html` (línea ~135)

```html
<div class="section-header">
    <h2 class="section-title">Productos Destacados</h2>
    <p class="section-subtitle">Lo mejor de nuestra colección</p>
</div>
```

**Ejemplos de títulos alternativos:**
- "Bestsellers"
- "Lo Más Vendido"
- "Favoritos del Mes"
- "Nuevos Lanzamientos"
- "Recomendados para Ti"

## 🚀 Funcionalidades Incluidas

✅ **Animación de entrada:** Los productos aparecen con un efecto fade-in escalonado
✅ **Responsive:** Se adapta automáticamente a móvil, tablet y desktop
✅ **Interactividad:** Todos los botones funcionan (vista rápida, agregar al carrito)
✅ **Consistencia:** Usa las mismas tarjetas de producto que la sección principal

## 📱 Responsive

### Desktop
- Grid adaptable con mínimo 280px por producto
- 3-4 productos por fila (según tamaño de pantalla)

### Tablet
- 2-3 productos por fila

### Mobile
- 1-2 productos por fila
- Gap reducido a 20px

## 🎯 Ejemplos Completos

### Ejemplo 1: Top 4 Productos Más Caros

```javascript
const featuredProducts = products
    .sort((a, b) => b.price - a.price)
    .slice(0, 4);
```

### Ejemplo 2: Productos Aleatorios

```javascript
const shuffled = products.sort(() => 0.5 - Math.random());
const featuredProducts = shuffled.slice(0, 6);
```

### Ejemplo 3: Productos de una Categoría Específica

```javascript
const featuredProducts = products
    .filter(p => p.category === 'arneses')
    .slice(0, 6);
```

### Ejemplo 4: Mix de Categorías (2 de cada una)

```javascript
const arneses = products.filter(p => p.category === 'arneses').slice(0, 2);
const jackets = products.filter(p => p.category === 'jackets').slice(0, 2);
const lenceria = products.filter(p => p.category === 'lenceria').slice(0, 2);
const featuredProducts = [...arneses, ...jackets, ...lenceria];
```

## 💡 Tips

1. **Actualiza regularmente:** Cambia los productos destacados cada mes para mantener la frescura
2. **Equilibrio:** Mezcla productos de diferentes categorías
3. **Promociones:** Destaca productos en oferta para aumentar conversiones
4. **Nuevos productos:** Usa esta sección para lanzamientos
5. **Estacionalidad:** Adapta los productos a temporadas o fechas especiales

## 🔄 Actualizar Dinámicamente

Si quieres cambiar los productos destacados sin editar código:

1. Agrega un campo `featuredOrder` a cada producto
2. Ordena por ese campo
3. Cambia el orden desde la consola del navegador o un panel de administración

```javascript
const featuredProducts = products
    .filter(p => p.featuredOrder !== undefined)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
```

---

💡 **Nota:** Los cambios en `marketplace-script.js` requieren refrescar la página (F5) para ver los resultados.


