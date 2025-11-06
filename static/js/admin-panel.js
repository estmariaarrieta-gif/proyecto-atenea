// ========================================
// PANEL DE ADMINISTRACIÓN - SALVAJE INDUMENTARY
// ========================================

// Verificar autenticación al cargar
document.addEventListener('DOMContentLoaded', function() {
    if (window.isAdminAuthenticated && window.isAdminAuthenticated()) {
        initAdminPanel();
    }
});

function initAdminPanel() {
    // Mostrar botón de admin
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) {
        adminBtn.style.display = 'flex';
        adminBtn.addEventListener('click', openAdminPanel);
    }
    
    // Event listeners del panel
    const closeAdminModal = document.getElementById('closeAdminModal');
    if (closeAdminModal) {
        closeAdminModal.addEventListener('click', closeAdminPanel);
    }
    
    // Tabs
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    
    // Productos
    const addProductBtn = document.getElementById('addProductBtn');
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => openProductForm());
    }
    
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }
    
    const cancelProductForm = document.getElementById('cancelProductForm');
    if (cancelProductForm) {
        cancelProductForm.addEventListener('click', closeProductForm);
    }
    
    const closeProductFormModal = document.getElementById('closeProductFormModal');
    if (closeProductFormModal) {
        closeProductFormModal.addEventListener('click', closeProductForm);
    }
    
    // Reservas
    const refreshBookingsBtn = document.getElementById('refreshBookingsBtn');
    if (refreshBookingsBtn) {
        refreshBookingsBtn.addEventListener('click', renderBookings);
    }
    
    // Cargar datos iniciales
    renderProducts();
    renderBookings();
}

function openAdminPanel() {
    const modal = document.getElementById('adminPanelModal');
    const overlay = document.getElementById('overlay');
    if (modal && overlay) {
        modal.classList.add('active');
        overlay.classList.add('active');
        renderProducts();
        renderBookings();
    }
}

function closeAdminPanel() {
    const modal = document.getElementById('adminPanelModal');
    const overlay = document.getElementById('overlay');
    if (modal && overlay) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
}

function switchTab(tabName) {
    // Actualizar tabs
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // Actualizar contenido
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `tab-${tabName}`);
    });
}

// ========== GESTIÓN DE PRODUCTOS ==========

function renderProducts() {
    const container = document.getElementById('adminProductsList');
    if (!container) return;
    
    // Obtener productos del script principal
    const products = window.products || [];
    
    if (products.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-box-open"></i>
                <h3>No hay productos</h3>
                <p>Agrega tu primer producto para comenzar</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = products.map(product => `
        <div class="admin-product-card">
            <div class="admin-product-header">
                <h4 class="admin-product-name">${product.name}</h4>
                <div class="admin-product-actions">
                    <button class="edit-btn" onclick="editProduct(${product.id})" title="Editar">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="deleteProduct(${product.id})" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="admin-product-info">
                <div><strong>Categoría:</strong> ${getCategoryName(product.category)}</div>
                <div><strong>Precio:</strong> <span class="admin-product-price">$${product.price.toLocaleString('es-CO')} COP</span></div>
                ${product.originalPrice ? `<div><strong>Precio Original:</strong> $${product.originalPrice.toLocaleString('es-CO')} COP</div>` : ''}
                <div><strong>Calificación:</strong> ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</div>
                <div><strong>Estado:</strong> ${product.inStock ? 'En Stock' : 'Agotado'} | ${product.featured ? 'Destacado' : ''} ${product.onSale ? '| En Oferta' : ''}</div>
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        'arneses': 'Arneses',
        'jackets': 'Jackets',
        'lenceria': 'Lencería',
        'mascaras': 'Máscaras',
        'accesorios': 'Accesorios'
    };
    return names[category] || category;
}

function openProductForm(productId = null) {
    const modal = document.getElementById('productFormModal');
    const overlay = document.getElementById('overlay');
    const form = document.getElementById('productForm');
    const title = document.getElementById('productFormTitle');
    
    if (!modal || !overlay || !form) return;
    
    // Reset form
    form.reset();
    document.getElementById('productFormId').value = productId || '';
    document.getElementById('productInStock').checked = true;
    
    if (productId) {
        // Editar producto existente
        const products = window.products || [];
        const product = products.find(p => p.id === productId);
        if (product) {
            title.textContent = 'Editar Producto';
            document.getElementById('productName').value = product.name;
            document.getElementById('productCategory').value = product.category;
            document.getElementById('productPrice').value = product.price;
            document.getElementById('productOriginalPrice').value = product.originalPrice || '';
            document.getElementById('productImage').value = product.image;
            document.getElementById('productDescription').value = product.description;
            document.getElementById('productRating').value = product.rating;
            document.getElementById('productFeatured').checked = product.featured || false;
            document.getElementById('productOnSale').checked = product.onSale || false;
            document.getElementById('productInStock').checked = product.inStock !== false;
        }
    } else {
        title.textContent = 'Agregar Producto';
    }
    
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeProductForm() {
    const modal = document.getElementById('productFormModal');
    const overlay = document.getElementById('overlay');
    if (modal && overlay) {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    }
}

function handleProductSubmit(e) {
    e.preventDefault();
    
    const productId = document.getElementById('productFormId').value;
    const products = window.products || [];
    
    const productData = {
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        price: parseInt(document.getElementById('productPrice').value),
        originalPrice: document.getElementById('productOriginalPrice').value ? parseInt(document.getElementById('productOriginalPrice').value) : null,
        image: document.getElementById('productImage').value,
        description: document.getElementById('productDescription').value,
        rating: parseInt(document.getElementById('productRating').value),
        featured: document.getElementById('productFeatured').checked,
        onSale: document.getElementById('productOnSale').checked,
        inStock: document.getElementById('productInStock').checked
    };
    
    if (productId) {
        // Editar producto existente
        const index = products.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
        }
    } else {
        // Agregar nuevo producto
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({
            id: newId,
            ...productData
        });
    }
    
    // Guardar en localStorage
    localStorage.setItem('salvajeProducts', JSON.stringify(products));
    
    // Actualizar variable global
    window.products = products;
    
    // Recargar productos en la página
    if (window.renderProducts) {
        window.renderProducts(products);
    }
    
    // Recargar lista de admin
    renderProducts();
    closeProductForm();
    
    alert(productId ? 'Producto actualizado exitosamente' : 'Producto agregado exitosamente');
}

function editProduct(productId) {
    openProductForm(productId);
}

function deleteProduct(productId) {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;
    
    const products = window.products || [];
    const filtered = products.filter(p => p.id !== productId);
    
    // Guardar en localStorage
    localStorage.setItem('salvajeProducts', JSON.stringify(filtered));
    
    // Actualizar variable global
    window.products = filtered;
    
    // Recargar productos en la página
    if (window.renderProducts) {
        window.renderProducts(filtered);
    }
    
    // Recargar lista de admin
    renderProducts();
    
    alert('Producto eliminado exitosamente');
}

// ========== GESTIÓN DE RESERVAS ==========

function renderBookings() {
    const container = document.getElementById('adminBookingsList');
    if (!container) return;
    
    const bookings = JSON.parse(localStorage.getItem('salvajeBookings')) || [];
    
    if (bookings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-times"></i>
                <h3>No hay reservas</h3>
                <p>Aún no se han realizado reservas de sesiones fotográficas</p>
            </div>
        `;
        return;
    }
    
    // Ordenar por fecha (más recientes primero)
    const sortedBookings = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    container.innerHTML = sortedBookings.map(booking => {
        const date = new Date(booking.date + 'T00:00:00');
        const formattedDate = formatBookingDate(date);
        const createdAt = new Date(booking.createdAt);
        const formattedCreatedAt = formatBookingDate(createdAt, true);
        
        return `
            <div class="admin-booking-card">
                <div class="admin-booking-header">
                    <h4 class="admin-booking-title">${booking.planName}</h4>
                    <span class="admin-booking-status ${booking.status}">${booking.status}</span>
                </div>
                <div class="admin-booking-info">
                    <div class="admin-booking-info-item">
                        <span class="admin-booking-info-label">Fecha de Sesión</span>
                        <span class="admin-booking-info-value">${formattedDate}</span>
                    </div>
                    <div class="admin-booking-info-item">
                        <span class="admin-booking-info-label">Hora</span>
                        <span class="admin-booking-info-value">${booking.time}</span>
                    </div>
                    <div class="admin-booking-info-item">
                        <span class="admin-booking-info-label">Precio</span>
                        <span class="admin-booking-info-value">$${booking.price.toLocaleString('es-CO')} COP</span>
                    </div>
                    <div class="admin-booking-info-item">
                        <span class="admin-booking-info-label">Reserva realizada</span>
                        <span class="admin-booking-info-value">${formattedCreatedAt}</span>
                    </div>
                </div>
                <div class="admin-booking-client">
                    <h4>Datos del Cliente</h4>
                    <div class="admin-booking-client-info">
                        <div><strong>Nombre:</strong> ${booking.client.name}</div>
                        <div><strong>Email:</strong> ${booking.client.email}</div>
                        <div><strong>Teléfono:</strong> ${booking.client.phone}</div>
                        ${booking.client.notes ? `<div><strong>Notas:</strong> ${booking.client.notes}</div>` : ''}
                    </div>
                </div>
                <div class="admin-booking-actions">
                    ${booking.status === 'pendiente' ? `
                        <button class="confirm-btn" onclick="updateBookingStatus(${booking.id}, 'confirmada')">
                            <i class="fas fa-check"></i> Confirmar
                        </button>
                        <button class="cancel-btn" onclick="updateBookingStatus(${booking.id}, 'cancelada')">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                    ` : ''}
                    <button onclick="deleteBooking(${booking.id})">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function formatBookingDate(date, includeTime = false) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    let formatted = `${days[date.getDay()]}, ${date.getDate()} de ${months[date.getMonth()]} de ${date.getFullYear()}`;
    
    if (includeTime) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        formatted += ` a las ${hours}:${minutes}`;
    }
    
    return formatted;
}

function updateBookingStatus(bookingId, newStatus) {
    const bookings = JSON.parse(localStorage.getItem('salvajeBookings')) || [];
    const booking = bookings.find(b => b.id === bookingId);
    
    if (booking) {
        booking.status = newStatus;
        localStorage.setItem('salvajeBookings', JSON.stringify(bookings));
        renderBookings();
        alert(`Reserva ${newStatus === 'confirmada' ? 'confirmada' : 'cancelada'} exitosamente`);
    }
}

function deleteBooking(bookingId) {
    if (!confirm('¿Estás seguro de eliminar esta reserva?')) return;
    
    const bookings = JSON.parse(localStorage.getItem('salvajeBookings')) || [];
    const filtered = bookings.filter(b => b.id !== bookingId);
    localStorage.setItem('salvajeBookings', JSON.stringify(filtered));
    renderBookings();
    alert('Reserva eliminada exitosamente');
}

// Hacer funciones disponibles globalmente
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.updateBookingStatus = updateBookingStatus;
window.deleteBooking = deleteBooking;

