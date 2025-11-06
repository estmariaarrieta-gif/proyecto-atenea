# 📖 Guía: Sección "Sobre Nosotros"

## ✨ ¿Qué se agregó?

He creado una **sección "Sobre Nosotros"** elegante y profesional con la filosofía de SALVAJE que me compartiste.

---

## 🎨 Características de la Sección

### ✅ **Diseño Dividido (Split Layout)**
- **Izquierda:** Imagen representativa de tu marca
- **Derecha:** Texto con la filosofía de SALVAJE

### ✅ **Contenido Incluido**
```
SOBRE NOSOTROS

✦ SALVAJE es un concepto que nos pertenece a todos y todas.

✦ A pesar que nuestro racionamiento como seres humanos está 
  constantemente presente en cada uno de nuestros actos, los 
  instintos jamás serán modificados por más racionalistas que seamos.

✦ Nuestro instinto SALVAJE como seres sexuales está presente siempre, 
  manifestándose en todos nuestros pensamientos y actos hasta el 
  escenario íntimo como aspecto natural.

✦ Salvaje Indumentary parte de este concepto instintivo, tomando como 
  lenguaje de expresión la sensualidad y la elegancia a través de 
  prendas confecciones en cuero.

[Explorar Colección] → Botón que lleva a productos
```

### ✅ **Elementos Visuales**
- **Título grande** con línea decorativa dorada
- **Texto resaltado** para frases importantes
- **SALVAJE** en color dorado (accent color)
- **Statement final** en dorado con borde lateral
- **Hover effect** en la imagen (zoom suave)
- **Botón CTA** para explorar la colección
- **Fondo con degradado sutil** dorado

---

## 🖼️ Agregar la Imagen

### 📍 **Ubicación:**
```
pagina web/images/about-salvaje.jpg
```

### 📏 **Especificaciones:**
- **Dimensiones:** 800x1000px (proporción 4:5)
- **Formato:** JPG o PNG
- **Peso:** Máx. 500KB (optimizada para web)

### 🎯 **Contenido Sugerido:**
1. **Opción 1:** La imagen que me mostraste (arnés con logo SALVAJE) ✅ Recomendado
2. **Opción 2:** Fotografía de productos en cuero sobre fondo oscuro
3. **Opción 3:** Imagen artística/lifestyle que represente tu marca
4. **Opción 4:** Collage de tus productos más icónicos

### 📥 **Cómo Agregar:**

#### **Método 1: Desde tu computadora**
```
1. Guarda la imagen que quieras usar
2. Renómbrala a: about-salvaje.jpg
3. Colócala en: pagina web/images/
4. Recarga la página (Ctrl + Shift + R)
```

#### **Método 2: Desde tu sitio web**
```
1. Abre https://salvajeindumentary.co
2. Encuentra la imagen que quieras usar
3. Clic derecho → "Guardar imagen como..."
4. Guárdala como: about-salvaje.jpg
5. Colócala en: pagina web/images/
```

---

## 🧭 Navegación

### **Desde el Menú:**
1. Haz clic en **"Nosotros"** en el menú de navegación
2. La página hace scroll suave a la sección
3. Se actualiza el hash de la URL: `#nosotros`

### **Desde el Botón:**
- El botón **"Explorar Colección"** lleva directamente a los productos

### **URL Directa:**
```
http://localhost:8000/#nosotros
```
Puedes compartir este link y se abrirá directamente en la sección "Sobre Nosotros"

---

## 🎨 Diseño Responsive

### **Desktop (>968px):**
- Diseño de 2 columnas
- Imagen a la izquierda (40%)
- Texto a la derecha (60%)
- Espaciado generoso

### **Tablet (768px - 968px):**
- Diseño de 1 columna
- Imagen arriba (centrada, max 500px)
- Texto abajo
- Título centrado

### **Mobile (<768px):**
- Optimizado para pantallas pequeñas
- Padding reducido
- Fuentes ajustadas
- Botones centrados

---

## 💅 Personalización

### **Cambiar el Texto:**
Edita `index.html` (líneas 182-212):
```html
<div class="about-description">
    <p class="highlight">
        <strong>SALVAJE</strong> es un concepto...
    </p>
    <!-- Más párrafos aquí -->
</div>
```

### **Cambiar Estilos:**
Edita `marketplace-style.css` (líneas 599-768):

```css
/* Color del título */
.about-text .section-title {
    color: var(--text-primary);
    font-size: 48px;
}

/* Color del texto destacado */
.about-description p.brand-statement {
    color: var(--accent-color);
}
```

---

## 🎭 Elementos de Estilo

### **Tipografía:**
- **Título:** Playfair Display, 48px, espaciado 3px
- **Párrafos:** Poppins, 16px, línea 1.8
- **Highlight:** 18px, semi-bold
- **Statement:** 17px, cursiva

### **Colores:**
- **Texto principal:** `#e5e5e5` (gris claro)
- **Texto secundario:** `#b0b0b0` (gris medio)
- **Acentos:** `#d4af37` (dorado)
- **Fondo:** `#1a1a1a` (negro)

### **Efectos:**
- **Hover imagen:** Scale 1.05, transición 0.6s
- **Línea decorativa:** Degradado dorado 80px
- **Border statement:** 3px sólido dorado
- **Fondo:** Degradado dorado sutil 3% opacidad

---

## ✅ Checklist

Antes de publicar, verifica:

- [ ] Imagen agregada en `images/about-salvaje.jpg`
- [ ] La imagen se ve bien en desktop
- [ ] La imagen se ve bien en móvil
- [ ] El texto es legible y sin errores
- [ ] El botón "Explorar Colección" funciona
- [ ] La navegación desde el menú funciona
- [ ] El scroll suave funciona correctamente
- [ ] Los estilos se ven bien en tu navegador

---

## 🚀 Próximos Pasos

Si quieres expandir esta sección, puedes agregar:

1. **Más imágenes:** Galería de productos
2. **Video:** Presentación de la marca
3. **Timeline:** Historia de SALVAJE
4. **Equipo:** Fotos del equipo creativo
5. **Valores:** Íconos con valores de la marca
6. **Testimonios:** Opiniones de clientes

---

## 📸 Ejemplo Visual

La sección se ve así:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────────────┐     SOBRE NOSOTROS                   │
│  │              │     ══════════════                   │
│  │              │                                       │
│  │   IMAGEN     │     SALVAJE es un concepto que nos    │
│  │     DE       │     pertenece a todos y todas.        │
│  │    MARCA     │                                       │
│  │              │     A pesar que nuestro racionamiento │
│  │   (800x1000) │     como seres humanos...             │
│  │              │                                       │
│  │              │     Nuestro instinto SALVAJE...       │
│  │              │                                       │
│  │              │     │ Salvaje Indumentary parte de   │
│  └──────────────┘     │ este concepto instintivo...    │
│                                                         │
│                       [Explorar Colección]              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 💡 Tips

1. **Imagen de alta calidad:** Usa una imagen profesional que represente tu marca
2. **Optimiza el tamaño:** Comprime la imagen para carga rápida
3. **Consistencia:** Mantén el estilo visual con el resto del sitio
4. **Actualización:** Puedes cambiar el texto fácilmente editando el HTML

---

¿Necesitas ayuda con algo más de la sección "Sobre Nosotros"? 🎨


