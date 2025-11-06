# 📋 Guía de Variaciones de Productos

## ¿Qué son las Variaciones?

Las variaciones te permiten ofrecer el mismo producto en diferentes opciones, como:
- **Tipo de cuero**: Vegano, Sintético, Genuino
- **Colores**: Negro, Marrón, Rojo
- **Tallas**: S, M, L, XL
- **Materiales**: Premium, Estándar, Elite

---

## 🎯 Cómo Agregar Variaciones a un Producto

### Estructura Básica

En el archivo `marketplace-script.js`, agrega el campo `variations` a cualquier producto:

```javascript
{
    id: 3,
    name: 'Cisne Negro',
    category: 'arneses',
    price: 190000,  // Precio base
    originalPrice: 290000,
    rating: 5,
    image: 'images/products/cine-negro.jpg',
    description: 'Diseño inspirado en la elegancia del cisne negro.',
    inStock: true,
    featured: true,
    onSale: true,
    variations: [  // ← AQUÍ AGREGAS LAS VARIACIONES
        {
            name: 'Cuero Vegano',       // Nombre completo
            priceAdjustment: 0,          // Sin costo adicional
            label: 'Vegan Sint',         // Etiqueta corta
            inStock: true                // Disponibilidad
        },
        {
            name: 'Cuero Premium',
            priceAdjustment: 50000,      // +$50,000 al precio base
            label: 'Premium',
            inStock: true
        }
    ]
}
```

### Parámetros de cada Variación

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `name` | String | Nombre completo de la variación | `"Cuero Vegano"` |
| `priceAdjustment` | Number | Ajuste de precio (+ o -) | `50000` |
| `label` | String | Etiqueta corta para mostrar | `"Vegan"` |
| `inStock` | Boolean | Si está disponible | `true` o `false` |

---

## 📝 Ejemplos de Uso

### Ejemplo 1: Jacket con 3 Tipos de Cuero

```javascript
{
    id: 6,
    name: 'Alligator',
    category: 'jackets',
    price: 310000,  // Precio base (Sintético)
    image: 'images/products/alligator.jpg',
    description: 'Jacket con textura alligator de alta calidad.',
    variations: [
        {
            name: 'Cuero Sintético',
            priceAdjustment: 0,        // Precio base
            label: 'Sintético',
            inStock: true
        },
        {
            name: 'Cuero Vegano',
            priceAdjustment: 30000,    // +$30,000
            label: 'Vegan',
            inStock: true
        },
        {
            name: 'Cuero Genuino',
            priceAdjustment: 150000,   // +$150,000
            label: 'Genuino',
            inStock: false             // Agotado
        }
    ]
}
```

**Precios Resultantes:**
- Sintético: $310,000
- Vegano: $340,000
- Genuino: $460,000 (Agotado)

### Ejemplo 2: Arnés con Colores

```javascript
{
    id: 10,
    name: 'Arnés Elite',
    price: 250000,
    variations: [
        {
            name: 'Negro Mate',
            priceAdjustment: 0,
            label: 'Negro',
            inStock: true
        },
        {
            name: 'Marrón Vintage',
            priceAdjustment: 20000,
            label: 'Marrón',
            inStock: true
        },
        {
            name: 'Rojo Intenso',
            priceAdjustment: 30000,
            label: 'Rojo',
            inStock: true
        }
    ]
}
```

### Ejemplo 3: Producto con Tallas

```javascript
{
    id: 12,
    name: 'Jacket Oversized',
    price: 400000,
    variations: [
        {
            name: 'Talla S',
            priceAdjustment: 0,
            label: 'S',
            inStock: false  // Agotado
        },
        {
            name: 'Talla M',
            priceAdjustment: 0,
            label: 'M',
            inStock: true
        },
        {
            name: 'Talla L',
            priceAdjustment: 0,
            label: 'L',
            inStock: true
        },
        {
            name: 'Talla XL',
            priceAdjustment: 25000,  // Talla grande +$25,000
            label: 'XL',
            inStock: true
        }
    ]
}
```

---

## 🎨 Personalizar la Etiqueta

Puedes cambiar la etiqueta "Tipo de Cuero:" editando la línea 411 en `marketplace-script.js`:

```javascript
<label class="variation-label">Tipo de Cuero:</label>
```

Cámbiala por:
```javascript
<label class="variation-label">Color:</label>
// o
<label class="variation-label">Talla:</label>
// o
<label class="variation-label">Material:</label>
```

---

## 💡 Consejos de UX

### 1. **Precio Base Claro**
El `price` debe ser el precio de la variación más económica o más común.

### 2. **Ajustes Positivos y Negativos**
Puedes usar ajustes negativos para descuentos:
```javascript
{
    name: 'Versión Básica',
    priceAdjustment: -30000,  // -$30,000
    label: 'Básica',
    inStock: true
}
```

### 3. **Limita las Opciones**
No pongas más de 5 variaciones para evitar confusión.

### 4. **Nombres Descriptivos**
- ✅ "Cuero Vegano Premium"
- ❌ "Opción 2"

### 5. **Marca Agotados Claramente**
Usa `inStock: false` para variaciones agotadas:
```javascript
{
    name: 'Cuero Genuino',
    priceAdjustment: 150000,
    label: 'Genuino',
    inStock: false  // Se mostrará como "Agotado"
}
```

---

## 🛒 Comportamiento en el Carrito

### Productos se Separan por Variación

Si un cliente agrega:
- 1x "Cisne Negro (Cuero Vegano)"
- 1x "Cisne Negro (Cuero Premium)"

Aparecerán como **2 items separados** en el carrito, cada uno con su precio correspondiente.

### Visualización en el Carrito

```
┌─────────────────────────────────┐
│ 🛍️ Carrito de Compras          │
├─────────────────────────────────┤
│ Cisne Negro [Cuero Vegano]      │
│ $190,000 x 2                    │
│ ─ + 🗑️                         │
├─────────────────────────────────┤
│ Cisne Negro [Cuero Premium]     │
│ $240,000 x 1                    │
│ ─ + 🗑️                         │
└─────────────────────────────────┘
```

---

## 🔧 Problemas Comunes

### Problema: Las variaciones no aparecen

**Solución:** Verifica que el array `variations` esté correctamente formateado con corchetes `[ ]` y comas entre elementos.

### Problema: El precio no se actualiza

**Solución:** Asegúrate de que `priceAdjustment` sea un número, no un string:
- ✅ `priceAdjustment: 50000`
- ❌ `priceAdjustment: "50000"`

### Problema: Los botones no se ven bien

**Solución:** Los estilos están en `marketplace-style.css` líneas 865-939. Puedes personalizar colores y tamaños ahí.

---

## 📊 Ejemplo Completo

```javascript
{
    id: 15,
    name: 'Arnés Personalizable',
    category: 'arneses',
    price: 180000,
    originalPrice: 250000,
    rating: 5,
    image: 'images/products/arnes-personalizable.jpg',
    description: 'Arnés totalmente personalizable con múltiples opciones.',
    inStock: true,
    featured: true,
    onSale: true,
    variations: [
        {
            name: 'Cuero Vegano Negro',
            priceAdjustment: 0,
            label: 'Vegan Negro',
            inStock: true
        },
        {
            name: 'Cuero Vegano Marrón',
            priceAdjustment: 0,
            label: 'Vegan Marrón',
            inStock: true
        },
        {
            name: 'Cuero Premium Negro',
            priceAdjustment: 60000,
            label: 'Premium Negro',
            inStock: true
        },
        {
            name: 'Cuero Premium Marrón',
            priceAdjustment: 60000,
            label: 'Premium Marrón',
            inStock: false
        }
    ]
}
```

---

## 🎯 Siguiente Paso

Para agregar variaciones a tus productos:

1. Abre `marketplace-script.js`
2. Busca el producto que quieras modificar (búsqueda por `id` o `name`)
3. Agrega el array `variations` siguiendo los ejemplos de arriba
4. Guarda el archivo
5. Recarga la página (`Ctrl + F5`)

¡Y listo! Tus productos ahora tendrán variaciones funcionales.

---

**¿Necesitas más ayuda?** Revisa los ejemplos de "Cisne Negro" (id: 3) y "Alligator" (id: 6) en el código. 🚀


