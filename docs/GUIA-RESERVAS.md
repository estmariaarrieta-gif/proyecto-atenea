# 📅 Guía: Sistema de Reservas de Sesiones Fotográficas

## ✨ ¿Qué se implementó?

Un **sistema completo de reservas** con calendario interactivo que permite a tus clientes:
1. Seleccionar el plan de sesión
2. Ver un calendario mensual con fechas disponibles
3. Seleccionar hora de su preferencia
4. Completar sus datos
5. Enviar la reserva por WhatsApp automáticamente

---

## 🎯 Características

✅ **Calendario Mensual Visual** → Tipo calendario tradicional con grid 7x7  
✅ **Fechas Disponibles Resaltadas** → Con punto dorado indicador  
✅ **Fechas No Disponibles Deshabilitadas** → Opacidad reducida, no clickeables  
✅ **Navegación Entre Meses** → Flechas izquierda/derecha  
✅ **Día Actual Marcado** → Borde especial dorado  
✅ **4 Pasos Guiados** → Con barra de progreso visual  
✅ **Resumen de Reserva** → Antes de confirmar  
✅ **Envío Automático a WhatsApp** → Mensaje pre-formateado  

---

## ⚙️ CONFIGURACIÓN (archivo `booking-system.js`)

### 📍 **Líneas 10-37: CONFIGURACIÓN PRINCIPAL**

```javascript
const bookingConfig = {
    // Días de la semana disponibles (0 = Domingo, 6 = Sábado)
    availableDays: [1, 2, 3, 4, 5, 6], // Lunes a Sábado
    
    // Horarios disponibles por día de la semana
    timeSlots: {
        1: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], // Lunes
        2: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], // Martes
        3: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], // Miércoles
        4: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], // Jueves
        5: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], // Viernes
        6: ['10:00', '11:00', '12:00', '14:00', '15:00']          // Sábado
    },
    
    // Fechas específicas bloqueadas
    blockedDates: [],
    
    // Horarios específicos bloqueados por fecha
    blockedTimeSlots: {},
    
    // Número de WhatsApp
    whatsappNumber: '573112345678', // ⚠️ CAMBIAR
    
    // Meses hacia adelante que se pueden reservar
    monthsAhead: 3
};
```

---

## 🔧 **CÓMO CONFIGURAR**

### 1. **Cambiar Días Disponibles**

```javascript
// Solo lunes a viernes:
availableDays: [1, 2, 3, 4, 5],

// Todos los días:
availableDays: [0, 1, 2, 3, 4, 5, 6],

// Solo fines de semana:
availableDays: [0, 6],
```

**Referencia:**
- 0 = Domingo
- 1 = Lunes
- 2 = Martes
- 3 = Miércoles
- 4 = Jueves
- 5 = Viernes
- 6 = Sábado

### 2. **Configurar Horarios por Día**

```javascript
timeSlots: {
    1: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], // Lunes
    2: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'], // Martes
    // ... etc
}
```

**Puedes personalizar cada día:**

```javascript
timeSlots: {
    1: ['10:00', '14:00', '16:00'], // Lunes: solo 3 horas
    2: ['09:00', '11:00', '13:00', '15:00', '17:00'], // Martes: más opciones
    5: ['18:00', '19:00', '20:00'], // Viernes: solo tardes
}
```

### 3. **Bloquear Fechas Específicas**

```javascript
blockedDates: [
    '2025-10-25', // 25 de octubre 2025
    '2025-12-25', // Navidad
    '2025-12-31', // Fin de año
    '2026-01-01', // Año nuevo
]
```

### 4. **Bloquear Horarios Específicos de una Fecha**

```javascript
blockedTimeSlots: {
    '2025-10-20': ['14:00', '15:00'], // 20 de octubre: 2pm y 3pm no disponibles
    '2025-11-15': ['09:00', '10:00', '11:00'], // 15 de noviembre: mañanas no disponibles
}
```

### 5. **Cambiar Número de WhatsApp** ⚠️ **IMPORTANTE**

```javascript
whatsappNumber: '573001234567', // SIN '+' ni espacios
```

**Formato:** `57` + `número sin espacios`
- Ejemplo: 300-123-4567 → `573001234567`

### 6. **Cambiar Rango de Reserva**

```javascript
monthsAhead: 3 // 3 meses hacia adelante
```

Puedes poner 1, 2, 3, 6, etc.

---

## 📋 **EJEMPLOS DE CONFIGURACIÓN**

### **Ejemplo 1: Estudio Normal (Lunes a Viernes)**

```javascript
availableDays: [1, 2, 3, 4, 5],

timeSlots: {
    1: ['09:00', '11:00', '14:00', '16:00'],
    2: ['09:00', '11:00', '14:00', '16:00'],
    3: ['09:00', '11:00', '14:00', '16:00'],
    4: ['09:00', '11:00', '14:00', '16:00'],
    5: ['09:00', '11:00', '14:00', '16:00']
},

blockedDates: [
    '2025-12-25',
    '2025-12-31',
    '2026-01-01'
]
```

### **Ejemplo 2: Solo Fines de Semana**

```javascript
availableDays: [6, 0], // Sábado y domingo

timeSlots: {
    6: ['10:00', '12:00', '14:00', '16:00'], // Sábado
    0: ['10:00', '12:00', '14:00', '16:00']  // Domingo
}
```

### **Ejemplo 3: Horarios Personalizados por Día**

```javascript
timeSlots: {
    1: ['14:00', '16:00', '18:00'], // Lunes: solo tardes
    2: ['09:00', '11:00'], // Martes: solo mañanas
    3: ['09:00', '11:00', '14:00', '16:00'], // Miércoles: todo el día
    4: [], // Jueves: cerrado
    5: ['18:00', '19:00', '20:00'], // Viernes: solo noches
    6: ['10:00', '12:00'] // Sábado: limitado
}
```

---

## 🎨 **CÓMO FUNCIONA PARA EL CLIENTE**

### **Paso 1: Selección de Plan**
- Cliente hace clic en "Reservar Sesión"
- Ve las 4 opciones de planes
- Selecciona uno (ya viene pre-seleccionado si hizo clic desde una tarjeta)

### **Paso 2: Selección de Fecha** 📅
- Ve un **calendario mensual completo**
- Días disponibles tienen un **punto dorado** debajo
- Días no disponibles están **opacos y deshabilitados**
- Día actual tiene **borde dorado**
- Puede navegar entre meses con **flechas**

### **Paso 3: Selección de Hora** 🕐
- Ve los horarios disponibles para la fecha seleccionada
- Formato de botones con icono de reloj
- Click para seleccionar

### **Paso 4: Datos del Cliente** 📝
- Ve un **resumen de su reserva**:
  - Plan seleccionado
  - Fecha completa (ej: "Lunes, 25 de octubre de 2025")
  - Hora
  - Precio total
- Completa su información:
  - Nombre
  - Email
  - Teléfono
  - Notas adicionales (opcional)
- Click en **"Confirmar Reserva por WhatsApp"**

### **Paso 5: Envío Automático** 📱
- Se abre WhatsApp automáticamente
- Mensaje pre-formateado con todos los datos
- Cliente solo debe enviar

---

## 📱 **MENSAJE DE WHATSAPP**

El cliente recibirá un mensaje así:

```
🔹 NUEVA RESERVA - SALVAJE INDUMENTARY 🔹

Plan: Sesión PREMIUM ($900.000)
Fecha: Lunes, 25 de octubre de 2025
Hora: 14:00
Total: $900.000 COP

👤 Datos del Cliente:
Nombre: María González
Email: maria@email.com
Teléfono: 3001234567

Notas: Quisiera usar lencería negra

---
_Reserva realizada desde: salvajeindumentary.co_
```

---

## 🎯 **CASOS DE USO COMUNES**

### **Caso 1: Reserva de Cliente ya Hecha**
¿Qué hacer cuando un cliente ya reservó por WhatsApp?

**Opción 1:** Agregar la fecha a `blockedDates`:
```javascript
blockedDates: [
    '2025-10-25', // María González - 14:00 - PREMIUM
]
```

**Opción 2:** Bloquear solo la hora:
```javascript
blockedTimeSlots: {
    '2025-10-25': ['14:00']
}
```

### **Caso 2: Día Completo Bloqueado**
Si tienes un evento o vacaciones:

```javascript
blockedDates: [
    '2025-12-24',
    '2025-12-25',
    '2025-12-26'
]
```

### **Caso 3: Reducir Horarios Temporalmente**
Si solo quieres trabajar medio día:

```javascript
timeSlots: {
    1: ['09:00', '11:00'], // Solo mañanas
    2: ['09:00', '11:00'],
    3: ['14:00', '16:00'], // Solo tardes
}
```

---

## 🔧 **MANTENIMIENTO**

### **Actualizar Regularmente:**
1. Revisar las reservas hechas
2. Agregar fechas/horarios bloqueados
3. Actualizar `blockedDates` y `blockedTimeSlots`

### **Al Inicio de Cada Mes:**
- Revisar agenda
- Actualizar días especiales
- Verificar horarios disponibles

---

## ⚠️ **IMPORTANTE: ANTES DE USAR**

✅ Cambiar el número de WhatsApp (línea 35):
```javascript
whatsappNumber: '57TU_NUMERO_AQUI',
```

✅ Configurar tus días disponibles

✅ Configurar tus horarios

✅ Probar el sistema completo antes de publicar

---

## 🧪 **CÓMO PROBAR**

1. **Recarga la página**: `Ctrl + Shift + R`
2. **Ve a la sección de Fotografía**
3. **Click en "Reservar Sesión"** en cualquier plan
4. **Navega por el calendario**:
   - Verifica que solo tus días estén disponibles
   - Prueba cambiar de mes
   - Verifica fechas bloqueadas
5. **Selecciona una fecha disponible**
6. **Verifica los horarios** que aparecen
7. **Completa el formulario**
8. **Click en confirmar** → Debe abrir WhatsApp

---

## 📊 **ARCHIVOS DEL SISTEMA**

```
✏️ index.html → Modal de reservas (líneas 587-729)
✏️ booking-system.js → Lógica completa del sistema (517 líneas)
✏️ marketplace-style.css → Estilos del calendario y modal (500+ líneas)
```

---

## 🎉 **¡Listo para Usar!**

Tu sistema de reservas está completamente funcional. Solo necesitas:
1. Cambiar el número de WhatsApp
2. Configurar tus horarios
3. ¡Empezar a recibir reservas!

---

## 💡 **Tips Profesionales**

✅ Mantén actualizado `blockedDates` semanalmente  
✅ Revisa WhatsApp regularmente  
✅ Confirma reservas rápidamente  
✅ Guarda registro de reservas confirmadas  
✅ Actualiza horarios según demanda  

---

¿Necesitas ayuda para configurar algo específico? ¡Pregúntame! 📅✨


