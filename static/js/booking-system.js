// =====================================================
// SISTEMA DE RESERVAS - SALVAJE INDUMENTARY
// =====================================================

// ========== CONFIGURACIÓN DE DISPONIBILIDAD ==========
// ⚠️ IMPORTANTE: Aquí configuras los días y horas disponibles

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
        6: ['10:00', '11:00', '12:00', '14:00', '15:00']          // Sábado (horario reducido)
    },
    
    // Días específicos bloqueados (formato: 'YYYY-MM-DD')
    blockedDates: [
        // Ejemplos de fechas bloqueadas:
        // '2025-10-25', // 25 de octubre bloqueado
        // '2025-12-25', // Navidad
        // '2025-12-31', // Fin de año
    ],
    
    // Horarios específicos bloqueados por fecha
    blockedTimeSlots: {
        // Ejemplo: '2025-10-20': ['14:00', '15:00'] // 20 de octubre, 2pm y 3pm bloqueadas
    },
    
    // Número de WhatsApp para enviar la reserva (sin + ni espacios)
    whatsappNumber: '573112345678', // ⚠️ CAMBIA ESTE NÚMERO
    
    // Rango de fechas disponibles (meses hacia adelante)
    monthsAhead: 3
};

// ========== ESTADO GLOBAL DE LA RESERVA ==========
let bookingState = {
    currentStep: 1,
    selectedPlan: null,
    selectedPrice: 0,
    selectedDate: null,
    selectedTime: null,
    clientData: {}
};

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', () => {
    initBookingSystem();
});

function initBookingSystem() {
    // Event listeners para el modal
    const closeBookingModal = document.getElementById('closeBookingModal');
    if (closeBookingModal) {
        closeBookingModal.addEventListener('click', closeBooking);
    }
    
    // Event listeners para navegación entre pasos
    document.getElementById('goToStep2')?.addEventListener('click', () => goToStep(2));
    document.getElementById('goToStep3')?.addEventListener('click', () => goToStep(3));
    document.getElementById('goToStep4')?.addEventListener('click', () => goToStep(4));
    
    document.getElementById('backToStep1')?.addEventListener('click', () => goToStep(1));
    document.getElementById('backToStep2')?.addEventListener('click', () => goToStep(2));
    document.getElementById('backToStep3')?.addEventListener('click', () => goToStep(3));
    
    // Selección de plan
    document.querySelectorAll('.plan-option').forEach(option => {
        option.addEventListener('click', function() {
            selectPlan(this);
        });
    });
    
    // Confirmación final
    document.getElementById('confirmBooking')?.addEventListener('click', confirmBooking);
}

// ========== ABRIR MODAL DE RESERVAS ==========
window.openBookingModal = function(plan, price) {
    const modal = document.getElementById('bookingModal');
    const overlay = document.getElementById('overlay');
    
    if (modal && overlay) {
        // Reset state
        bookingState = {
            currentStep: 1,
            selectedPlan: plan,
            selectedPrice: price,
            selectedDate: null,
            selectedTime: null,
            clientData: {}
        };
        
        // Reset calendario al mes actual
        const today = new Date();
        currentCalendarMonth = today.getMonth();
        currentCalendarYear = today.getFullYear();
        
        // Pre-seleccionar el plan
        const planOption = document.querySelector(`.plan-option[data-plan="${plan}"]`);
        if (planOption) {
            selectPlan(planOption);
        }
        
        // Mostrar modal
        modal.classList.add('active');
        overlay.classList.add('active');
        
        // Reset al paso 1
        goToStep(1);
    }
};

// ========== CERRAR MODAL ==========
function closeBooking() {
    const modal = document.getElementById('bookingModal');
    const overlay = document.getElementById('overlay');
    
    if (modal && overlay) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
    
    // Reset
    bookingState = {
        currentStep: 1,
        selectedPlan: null,
        selectedPrice: 0,
        selectedDate: null,
        selectedTime: null,
        clientData: {}
    };
}

// ========== SELECCIÓN DE PLAN ==========
function selectPlan(planElement) {
    // Remover selección anterior
    document.querySelectorAll('.plan-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Seleccionar nuevo
    planElement.classList.add('selected');
    
    // Guardar en estado
    bookingState.selectedPlan = planElement.dataset.plan;
    bookingState.selectedPrice = parseInt(planElement.dataset.price);
}

// ========== NAVEGACIÓN ENTRE PASOS ==========
function goToStep(step) {
    // Validaciones antes de avanzar
    if (step === 2 && !bookingState.selectedPlan) {
        alert('Por favor selecciona un plan primero');
        return;
    }
    
    if (step === 3 && !bookingState.selectedDate) {
        alert('Por favor selecciona una fecha primero');
        return;
    }
    
    if (step === 4 && !bookingState.selectedTime) {
        alert('Por favor selecciona una hora primero');
        return;
    }
    
    // Ocultar todos los pasos
    document.querySelectorAll('.booking-step').forEach(s => {
        s.style.display = 'none';
    });
    
    // Mostrar paso actual
    document.getElementById(`step${step}`).style.display = 'block';
    
    // Actualizar indicadores de progreso
    document.querySelectorAll('.booking-steps .step').forEach(s => {
        const stepNum = parseInt(s.dataset.step);
        s.classList.toggle('active', stepNum === step);
        s.classList.toggle('completed', stepNum < step);
    });
    
    // Ejecutar funciones específicas del paso
    if (step === 2) {
        renderCalendar();
    } else if (step === 3) {
        renderTimeSlots();
    } else if (step === 4) {
        renderSummary();
    }
    
    bookingState.currentStep = step;
}

// ========== VARIABLES DEL CALENDARIO ==========
let currentCalendarMonth = new Date().getMonth();
let currentCalendarYear = new Date().getFullYear();

// ========== RENDERIZAR CALENDARIO ==========
function renderCalendar() {
    const calendar = document.getElementById('calendar');
    if (!calendar) return;
    
    calendar.innerHTML = '';
    
    // Crear header del calendario
    const header = document.createElement('div');
    header.className = 'calendar-header';
    
    const monthYear = document.createElement('h4');
    monthYear.textContent = `${getFullMonthName(currentCalendarMonth)} ${currentCalendarYear}`;
    
    const nav = document.createElement('div');
    nav.className = 'calendar-nav';
    
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.onclick = () => changeMonth(-1);
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.onclick = () => changeMonth(1);
    
    // Deshabilitar botón anterior si estamos en el mes actual
    const today = new Date();
    if (currentCalendarYear === today.getFullYear() && currentCalendarMonth === today.getMonth()) {
        prevBtn.disabled = true;
    }
    
    // Deshabilitar botón siguiente si llegamos al límite
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + bookingConfig.monthsAhead);
    if (currentCalendarYear === maxDate.getFullYear() && currentCalendarMonth === maxDate.getMonth()) {
        nextBtn.disabled = true;
    }
    
    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    
    header.appendChild(monthYear);
    header.appendChild(nav);
    calendar.appendChild(header);
    
    // Crear días de la semana
    const weekdays = document.createElement('div');
    weekdays.className = 'calendar-weekdays';
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    dayNames.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-weekday';
        dayElement.textContent = day;
        weekdays.appendChild(dayElement);
    });
    calendar.appendChild(weekdays);
    
    // Crear grid del calendario
    const calendarGrid = document.createElement('div');
    calendarGrid.className = 'calendar-grid';
    
    // Obtener primer día del mes y número de días
    const firstDay = new Date(currentCalendarYear, currentCalendarMonth, 1);
    const lastDay = new Date(currentCalendarYear, currentCalendarMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
    // Agregar días vacíos al inicio
    for (let i = 0; i < startDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Agregar todos los días del mes
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentCalendarYear, currentCalendarMonth, day);
        const dayOfWeek = date.getDay();
        const dateString = date.toISOString().split('T')[0];
        
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.dataset.date = dateString;
        
        const dayNumber = document.createElement('span');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayElement.appendChild(dayNumber);
        
        // Marcar si es hoy
        if (date.toDateString() === todayDate.toDateString()) {
            dayElement.classList.add('today');
        }
        
        // Verificar si el día está disponible
        const isAvailable = bookingConfig.availableDays.includes(dayOfWeek) && 
                           !bookingConfig.blockedDates.includes(dateString) &&
                           date >= todayDate;
        
        if (isAvailable) {
            dayElement.classList.add('available');
            dayElement.addEventListener('click', function() {
                selectDate(this);
            });
        } else {
            dayElement.classList.add('disabled');
        }
        
        calendarGrid.appendChild(dayElement);
    }
    
    calendar.appendChild(calendarGrid);
}

// ========== CAMBIAR MES DEL CALENDARIO ==========
function changeMonth(direction) {
    currentCalendarMonth += direction;
    
    if (currentCalendarMonth > 11) {
        currentCalendarMonth = 0;
        currentCalendarYear++;
    } else if (currentCalendarMonth < 0) {
        currentCalendarMonth = 11;
        currentCalendarYear--;
    }
    
    renderCalendar();
}

// ========== SELECCIÓN DE FECHA ==========
function selectDate(dateElement) {
    // Remover selección anterior
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    // Seleccionar nueva fecha
    dateElement.classList.add('selected');
    
    // Guardar en estado
    bookingState.selectedDate = dateElement.dataset.date;
    
    // Habilitar botón siguiente
    document.getElementById('goToStep3').disabled = false;
}

// ========== RENDERIZAR HORARIOS ==========
function renderTimeSlots() {
    const timeSlotsContainer = document.getElementById('timeSlots');
    const dateDisplay = document.getElementById('selectedDateDisplay');
    
    if (!timeSlotsContainer || !bookingState.selectedDate) return;
    
    timeSlotsContainer.innerHTML = '';
    
    // Mostrar fecha seleccionada
    const date = new Date(bookingState.selectedDate + 'T00:00:00');
    dateDisplay.textContent = `Fecha seleccionada: ${formatDate(date)}`;
    
    // Obtener horarios disponibles para el día de la semana
    const dayOfWeek = date.getDay();
    let availableSlots = bookingConfig.timeSlots[dayOfWeek] || [];
    
    // Filtrar horarios bloqueados para esta fecha específica
    const blockedSlots = bookingConfig.blockedTimeSlots[bookingState.selectedDate] || [];
    availableSlots = availableSlots.filter(slot => !blockedSlots.includes(slot));
    
    // Crear elementos de horario
    availableSlots.forEach(time => {
        const slotElement = document.createElement('div');
        slotElement.className = 'time-slot';
        slotElement.dataset.time = time;
        
        const timeIcon = document.createElement('i');
        timeIcon.className = 'fas fa-clock';
        
        const timeText = document.createElement('span');
        timeText.textContent = time;
        
        slotElement.appendChild(timeIcon);
        slotElement.appendChild(timeText);
        
        slotElement.addEventListener('click', function() {
            selectTime(this);
        });
        
        timeSlotsContainer.appendChild(slotElement);
    });
    
    if (availableSlots.length === 0) {
        timeSlotsContainer.innerHTML = '<p class="no-slots">No hay horarios disponibles para esta fecha.</p>';
    }
}

// ========== SELECCIÓN DE HORA ==========
function selectTime(timeElement) {
    // Remover selección anterior
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Seleccionar nueva hora
    timeElement.classList.add('selected');
    
    // Guardar en estado
    bookingState.selectedTime = timeElement.dataset.time;
    
    // Habilitar botón siguiente
    document.getElementById('goToStep4').disabled = false;
}

// ========== RENDERIZAR RESUMEN ==========
function renderSummary() {
    const planNames = {
        'esencia': 'Sesión ESENCIA',
        'elegant': 'Sesión ELEGANT',
        'premium': 'Sesión PREMIUM',
        'nacional': 'Plan NACIONAL'
    };
    
    document.getElementById('summaryPlan').textContent = planNames[bookingState.selectedPlan] || '';
    
    const date = new Date(bookingState.selectedDate + 'T00:00:00');
    document.getElementById('summaryDate').textContent = formatDate(date);
    document.getElementById('summaryTime').textContent = bookingState.selectedTime;
    document.getElementById('summaryTotal').textContent = formatPrice(bookingState.selectedPrice);
}

// ========== CONFIRMAR RESERVA ==========
function confirmBooking() {
    // Validar formulario
    const form = document.getElementById('bookingForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Recopilar datos del cliente
    bookingState.clientData = {
        name: document.getElementById('clientName').value,
        email: document.getElementById('clientEmail').value,
        phone: document.getElementById('clientPhone').value,
        notes: document.getElementById('clientNotes').value
    };
    
    // Crear mensaje para WhatsApp
    const planNames = {
        'esencia': 'Sesión ESENCIA ($350.000)',
        'elegant': 'Sesión ELEGANT ($570.000)',
        'premium': 'Sesión PREMIUM ($900.000)',
        'nacional': 'Plan NACIONAL ($1.500.000)'
    };
    
    const date = new Date(bookingState.selectedDate + 'T00:00:00');
    
    const message = `
🔹 *NUEVA RESERVA - SALVAJE INDUMENTARY* 🔹

*Plan:* ${planNames[bookingState.selectedPlan]}
*Fecha:* ${formatDate(date)}
*Hora:* ${bookingState.selectedTime}
*Total:* ${formatPrice(bookingState.selectedPrice)}

👤 *Datos del Cliente:*
Nombre: ${bookingState.clientData.name}
Email: ${bookingState.clientData.email}
Teléfono: ${bookingState.clientData.phone}
${bookingState.clientData.notes ? `\nNotas: ${bookingState.clientData.notes}` : ''}

---
_Reserva realizada desde: salvajeindumentary.co_
    `.trim();
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Guardar reserva en localStorage
    const booking = {
        id: Date.now(),
        plan: bookingState.selectedPlan,
        planName: planNames[bookingState.selectedPlan],
        price: bookingState.selectedPrice,
        date: bookingState.selectedDate,
        time: bookingState.selectedTime,
        client: bookingState.clientData,
        createdAt: new Date().toISOString(),
        status: 'pendiente'
    };
    
    // Obtener reservas existentes
    let bookings = JSON.parse(localStorage.getItem('salvajeBookings')) || [];
    bookings.push(booking);
    localStorage.setItem('salvajeBookings', JSON.stringify(bookings));
    
    // Abrir WhatsApp
    const whatsappURL = `https://wa.me/${bookingConfig.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
    
    // Cerrar modal después de un momento
    setTimeout(() => {
        closeBooking();
        alert('¡Gracias por tu reserva! Te hemos redirigido a WhatsApp para confirmar tu cita.');
    }, 1000);
}

// ========== FUNCIONES AUXILIARES ==========
function getDayName(date) {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return days[date.getDay()];
}

function getMonthName(date) {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return months[date.getMonth()];
}

function getFullMonthName(monthIndex) {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[monthIndex];
}

function formatDate(date) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    return `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
}

function formatPrice(price) {
    return `$${price.toLocaleString('es-CO')} COP`;
}

