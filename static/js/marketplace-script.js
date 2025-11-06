// ========================================
// SALVAJE Indumentary - Marketplace Script
// ========================================

// === Data de Productos ===
// Usar productos de Flask (window.products), si no existen usar localStorage, o por defecto
let products = window.products || JSON.parse(localStorage.getItem('salvajeProducts')) || [
    {
        id: 1,
        name: 'MEDIAS MALLA',
        category: 'lenceria',
        price: 60000,
        originalPrice: null,
        rating: 5,
        image: '/static/images/products/medias-malla.jpg',
        description: 'Medias de malla de alta calidad, perfectas para complementar cualquier outfit.',
        inStock: true,
        featured: true
    },
    {
        id: 2,
        name: 'BONNIE',
        category: 'arneses',
        price: 120000,
        originalPrice: 200000,
        rating: 5,
        image: '/static/images/products/bonnie.jpg',
        description: 'Línea Elite - Arnés Bonnie con diseño exclusivo en cuero premium.',
        inStock: true,
        featured: true,
        onSale: true,
        reviews: [
            {
                name: 'María González',
                rating: 5,
                date: '2025-01-15',
                comment: '¡Excelente calidad! El cuero es suave y los acabados son perfectos. Totalmente recomendado.',
                verified: true
            },
            {
                name: 'Carlos Ramírez',
                rating: 5,
                date: '2025-01-10',
                comment: 'Superó mis expectativas. El diseño es elegante y muy cómodo de usar. Vale cada peso.',
                verified: true
            },
            {
                name: 'Ana Martínez',
                rating: 4,
                date: '2025-01-05',
                comment: 'Muy bonito y bien hecho. Solo le doy 4 estrellas porque tardó un poco en llegar, pero el producto es excelente.',
                verified: true
            }
        ]
    },
    {
        id: 3,
        name: 'Cisne Negro',
        category: 'arneses',
        price: 190000,
        originalPrice: 290000,
        rating: 5,
        image: '/static/images/products/cine-negro.jpg',
        description: 'Diseño inspirado en la elegancia del cisne negro.',
        inStock: true,
        featured: true,
        onSale: true,
        variations: [
            {
                name: 'Cuero Vegano',
                priceAdjustment: 0,
                label: 'Vegan Sint',
                inStock: true
            },
            {
                name: 'Cuero Premium',
                priceAdjustment: 50000,
                label: 'Premium',
                inStock: true
            }
        ],
        reviews: [
            {
                name: 'Laura Pérez',
                rating: 5,
                date: '2025-01-20',
                comment: 'Me encanta el diseño! El cuero vegano es de excelente calidad y se siente muy bien. 100% recomendado.',
                verified: true
            },
            {
                name: 'Diego Torres',
                rating: 5,
                date: '2025-01-18',
                comment: 'Producto increíble. La atención al detalle es impresionante. Definitivamente volveré a comprar.',
                verified: true
            }
        ]
    },
    {
        id: 4,
        name: 'CROP TOP ARNÉS',
        category: 'arneses',
        price: 180000,
        originalPrice: null,
        rating: 4,
        image: '/static/images/products/crop-top-arnes.jpg',
        description: 'Crop top arnés versátil y cómodo para cualquier ocasión.',
        inStock: true,
        featured: false
    },
    {
        id: 5,
        name: 'DIANA DE GALES',
        category: 'arneses',
        price: 470000,
        originalPrice: 1100000,
        rating: 5,
        image: '/static/images/products/diana-de-gales.jpg',
        description: 'Pieza exclusiva de edición limitada con detalles premium.',
        inStock: true,
        featured: true,
        onSale: true
    },
    {
        id: 6,
        name: 'Alligator',
        category: 'jackets',
        price: 310000,
        originalPrice: 500000,
        rating: 5,
        image: '/static/images/products/alligator.jpg',
        description: 'Jacket con textura alligator de alta calidad.',
        inStock: true,
        featured: true,
        onSale: true,
        variations: [
            {
                name: 'Cuero Sintético',
                priceAdjustment: 0,
                label: 'Sintético',
                inStock: true
            },
            {
                name: 'Cuero Vegano',
                priceAdjustment: 30000,
                label: 'Vegan',
                inStock: true
            },
            {
                name: 'Cuero Genuino',
                priceAdjustment: 150000,
                label: 'Genuino',
                inStock: false
            }
        ]
    },
    {
        id: 7,
        name: 'Oveja Negra',
        category: 'jackets',
        price: 1100000,
        originalPrice: null,
        rating: 5,
        image: '/static/images/products/oveja-negra.jpg',
        description: 'Jacket premium con diseño único y acabados de lujo.',
        inStock: true,
        featured: true
    },
    {
        id: 8,
        name: 'INFINITY CHOKER',
        category: 'accesorios',
        price: 55000,
        originalPrice: 75000,
        rating: 4,
        image: '/static/images/products/infinity-choker.jpg',
        description: 'Choker con símbolo de infinito, disponible en diferentes acabados.',
        inStock: true,
        featured: false,
        onSale: true
    },
    {
        id: 9,
        name: 'Máscara Salvaje Premium',
        category: 'mascaras',
        price: 150000,
        originalPrice: null,
        rating: 5,
        image: '/static/images/products/mascara-premium.jpg',
        description: 'Máscara de cuero premium con diseño exclusivo.',
        inStock: true,
        featured: true
    },
    {
        id: 10,
        name: 'Arnés Cuerpo Completo Elite',
        category: 'arneses',
        price: 450000,
        originalPrice: null,
        rating: 5,
        image: '/static/images/products/arnes-completo.jpg',
        description: 'Arnés de cuerpo completo con herrajes dorados premium.',
        inStock: true,
        featured: true
    },
    {
        id: 11,
        name: 'Conjunto Lencería Dark',
        category: 'lenceria',
        price: 220000,
        originalPrice: 280000,
        rating: 4,
        image: '/static/images/products/lenceria-dark.jpg',
        description: 'Conjunto de lencería en encaje negro con detalles metálicos.',
        inStock: true,
        featured: false,
        onSale: true
    },
    {
        id: 12,
        name: 'Arnés Glúteos Premium',
        category: 'arneses',
        price: 195000,
        originalPrice: null,
        rating: 5,
        image: '/static/images/products/arnes-gluteos.jpg',
        description: 'Arnés para glúteos y piernas con diseño ajustable.',
        inStock: true,
        featured: false
    }
];

// Guardar productos en window para acceso global
window.products = products;

// === Estado Global ===
let cart = JSON.parse(localStorage.getItem('salvajeCart')) || [];
let currentFilter = 'all';
let currentSlide = 0;
let currentCurrency = 'COP';

// === Conversión de Moneda ===
const currencyRates = {
    COP: 1,
    USD: 0.00025,
    EUR: 0.00023
};

const currencySymbols = {
    COP: '$',
    USD: '$',
    EUR: '€'
};

function formatPrice(price, currency = currentCurrency) {
    const convertedPrice = price * currencyRates[currency];
    const symbol = currencySymbols[currency];
    
    if (currency === 'COP') {
        return `${symbol} ${convertedPrice.toLocaleString('es-CO')}`;
    } else {
        return `${symbol} ${convertedPrice.toFixed(2)}`;
    }
}

// === Inicialización ===
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Guardar productos iniciales en localStorage si no existen
    if (!localStorage.getItem('salvajeProducts')) {
        localStorage.setItem('salvajeProducts', JSON.stringify(products));
    } else {
        // Cargar productos desde localStorage
        products = JSON.parse(localStorage.getItem('salvajeProducts'));
        window.products = products;
    }
    
    renderProducts(products);
    updateCartUI();
    startHeroSlider();
    initCurrencySelector();
    initEventListeners(); // Esto llamará a navigateToCategory('home') si no hay hash
}

// === Event Listeners ===
function initEventListeners() {
    // Navigation Links - Enlaces del menú superior
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Si es un enlace con hash (categoría o sección)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const category = href.replace('#', '');
                navigateToCategory(category);
                
                // Actualizar nav links activos
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Dropdown category links
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const category = link.dataset.category;
            if (category) {
                e.preventDefault();
                navigateToCategory(category);
            }
        });
    });
    
    // Check URL hash on load
    if (window.location.hash) {
        const category = window.location.hash.replace('#', '');
        // Pequeño delay para asegurar que el DOM esté listo
        setTimeout(() => navigateToCategory(category), 100);
    }
    
    // Search
    const searchBtn = document.getElementById('searchBtn');
    const closeSearch = document.getElementById('closeSearch');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchOverlay && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            searchInput.focus();
        });
    }
    
    if (closeSearch && searchOverlay && searchInput) {
        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            handleSearch(e.target.value);
        });
    }
    
    // Cart
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    const clearCart = document.getElementById('clearCart');
    
    if (cartBtn && cartSidebar && overlay) {
        cartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            overlay.classList.add('active');
        });
    }
    
    if (closeCart && cartSidebar && overlay) {
        closeCart.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (cartSidebar) cartSidebar.classList.remove('active');
            if (searchOverlay) searchOverlay.classList.remove('active');
            overlay.classList.remove('active');
            const navLinks = document.getElementById('navLinks');
            const quickViewModal = document.getElementById('quickViewModal');
            if (navLinks) navLinks.classList.remove('active');
            if (quickViewModal) quickViewModal.classList.remove('active');
        });
    }
    
    if (clearCart) {
        clearCart.addEventListener('click', () => {
            if (confirm('¿Estás seguro de vaciar el carrito?')) {
                cart = [];
                saveCart();
                updateCartUI();
            }
        });
    }
    
    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksEl = document.getElementById('navLinks');
    
    if (mobileMenuBtn && navLinksEl) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksEl.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }
    
    // Filter Buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            filterProducts(currentFilter);
        });
    });
    
    // Category Cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            if (category) {
                navigateToCategory(category);
            }
        });
    });
    
    // Hero Indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const slideIndex = parseInt(indicator.dataset.slide);
            goToSlide(slideIndex);
        });
    });
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input[type="email"]').value;
            alert(`¡Gracias por suscribirte, ${email}! Pronto recibirás nuestras novedades.`);
            e.target.reset();
        });
    }
    
    // Modal Close
    const closeModal = document.getElementById('closeModal');
    const quickViewModal = document.getElementById('quickViewModal');
    if (closeModal && quickViewModal && overlay) {
        closeModal.addEventListener('click', () => {
            quickViewModal.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
}

// === Currency Selector ===
function initCurrencySelector() {
    const currencySelect = document.getElementById('currency');
    if (currencySelect) {
        currencySelect.addEventListener('change', (e) => {
            currentCurrency = e.target.value;
            renderProducts(getFilteredProducts());
            updateCartUI();
        });
    }
}

// === Hero Slider ===
function startHeroSlider() {
    setInterval(() => {
        currentSlide = (currentSlide + 1) % 3;
        goToSlide(currentSlide);
    }, 5000);
}

function goToSlide(index) {
    currentSlide = index;
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

// === Products Rendering ===
// Guardar función globalmente para que admin-panel.js pueda usarla
window.renderProducts = function(productsToRender = products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    if (productsToRender.length === 0) {
        // Mostrar mensaje cuando no hay productos
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <h3>No hay productos en esta categoría</h3>
                <p>Explora otras categorías o vuelve a todos los productos.</p>
                <button class="btn btn-primary" onclick="navigateToCategory('all')">
                    Ver Todos los Productos
                </button>
            </div>
        `;
        return;
    }
    
    productsToRender.forEach((product, index) => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
        
        // Agregar animación después de un pequeño delay
        setTimeout(() => {
            productCard.classList.add('animate-in');
        }, 10);
    });
};

function renderProducts(productsToRender = products) {
    window.renderProducts(productsToRender);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = product.category;
    card.dataset.productId = product.id;
    
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    
    // Variaciones HTML
    let variationsHTML = '';
    if (product.variations && product.variations.length > 0) {
        variationsHTML = `
            <div class="product-variations">
                <label class="variation-label">Tipo de Cuero:</label>
                <div class="variation-options">
                    ${product.variations.map((variation, index) => `
                        <button class="variation-btn ${index === 0 ? 'active' : ''} ${!variation.inStock ? 'out-of-stock' : ''}" 
                                data-variation="${variation.name}"
                                data-price-adjustment="${variation.priceAdjustment}"
                                ${!variation.inStock ? 'disabled' : ''}>
                            ${variation.label}
                            ${!variation.inStock ? '<span class="stock-label">Agotado</span>' : ''}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="product-image-fallback" style="display: none;">
                <i class="fas fa-image"></i>
            </div>
            ${product.onSale ? '<div class="product-badge sale">SALE</div>' : ''}
            ${product.featured && !product.onSale ? '<div class="product-badge">Destacado</div>' : ''}
            <div class="product-actions">
                <button class="action-btn quick-view-btn" data-id="${product.id}" data-tooltip="Vista Rápida" title="Ver detalles del producto">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn add-to-cart-quick" data-id="${product.id}" data-tooltip="Agregar al Carrito" title="Agregar al carrito">
                    <i class="fas fa-shopping-bag"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-category">${getCategoryName(product.category)}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                ${stars.split('').map(star => `<i class="fas fa-star${star === '☆' ? '-o' : ''}"></i>`).join('')}
            </div>
            ${variationsHTML}
            <div class="product-price">
                <span class="price-current" data-base-price="${product.price}">${formatPrice(product.price)}</span>
                ${product.originalPrice ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>` : ''}
            </div>
            <button class="add-to-cart-btn" data-id="${product.id}">
                Agregar al Carrito
            </button>
        </div>
    `;
    
    // Event listeners para variaciones
    if (product.variations && product.variations.length > 0) {
        const variationBtns = card.querySelectorAll('.variation-btn');
        const priceElement = card.querySelector('.price-current');
        const basePrice = product.price;
        
        variationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remover active de todos
                variationBtns.forEach(b => b.classList.remove('active'));
                // Agregar active al clickeado
                this.classList.add('active');
                
                // Actualizar precio
                const priceAdjustment = parseInt(this.dataset.priceAdjustment);
                const newPrice = basePrice + priceAdjustment;
                priceElement.textContent = formatPrice(newPrice);
            });
        });
    }
    
    // Event listeners
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    const quickAddBtn = card.querySelector('.add-to-cart-quick');
    const quickViewBtn = card.querySelector('.quick-view-btn');
    
    addToCartBtn.addEventListener('click', () => addToCart(product.id, card));
    quickAddBtn.addEventListener('click', () => addToCart(product.id, card));
    quickViewBtn.addEventListener('click', () => showQuickView(product.id));
    
    return card;
}

function getCategoryName(category) {
    const categoryNames = {
        'arneses': 'Arneses',
        'jackets': 'Jackets',
        'lenceria': 'Lencería',
        'mascaras': 'Máscaras',
        'accesorios': 'Accesorios'
    };
    return categoryNames[category] || category;
}

// === Navigation ===
window.navigateToCategory = function(category) {
    console.log('Navegando a:', category);
    
    // Cerrar menú móvil si está abierto
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('overlay');
    if (navLinks) navLinks.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    
    // Si es "home", scroll al inicio
    if (category === 'home' || category === '') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Actualizar hash sin recargar
        history.pushState(null, null, '#home');
        return;
    }
    
    // Si es una sección específica (nosotros, fotografia), hacer scroll a ella
    if (category === 'nosotros' || category === 'fotografia') {
        const section = document.getElementById(category);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState(null, null, '#' + category);
        }
        return;
    }
    
    // Si es una categoría de productos (arneses, jackets, lenceria, etc.)
    const validCategories = ['arneses', 'jackets', 'lenceria', 'mascaras', 'accesorios', 'sale', 'all'];
    
    if (validCategories.includes(category)) {
        // Scroll a la sección de productos
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        
        // Aplicar filtro de categoría
        currentFilter = category;
        filterProducts(category);
        
        // Actualizar botones de filtro
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === category);
        });
        
        // Actualizar título de sección
        updateSectionTitle(category);
        
        // Actualizar hash
        history.pushState(null, null, '#' + category);
    }
}

function updateSectionTitle(filter) {
    const sectionTitle = document.querySelector('.products .section-title');
    const currentCategory = document.getElementById('currentCategory');
    
    const titles = {
        'all': 'Productos Destacados',
        'arneses': 'Arneses',
        'jackets': 'Jackets',
        'lenceria': 'Lencería',
        'mascaras': 'Máscaras',
        'accesorios': 'Accesorios',
        'sale': 'Ofertas Especiales'
    };
    
    const filteredProducts = getFilteredProducts(filter);
    const productCount = filteredProducts.length;
    
    const titleText = titles[filter] || 'Productos';
    
    if (sectionTitle) {
        sectionTitle.textContent = `${titleText} (${productCount})`;
    }
    
    // Actualizar breadcrumb
    if (currentCategory) {
        currentCategory.textContent = titleText;
    }
}

// === Filtering ===
function filterProducts(filter) {
    const filteredProducts = getFilteredProducts(filter);
    renderProducts(filteredProducts);
    updateSectionTitle(filter);
}

function getFilteredProducts(filter = currentFilter) {
    if (filter === 'all') {
        return products;
    } else if (filter === 'sale') {
        return products.filter(p => p.onSale);
    } else {
        return products.filter(p => p.category === filter);
    }
}

// === Search ===
function handleSearch(query) {
    if (query.length < 2) {
        renderProducts(getFilteredProducts());
        return;
    }
    
    const searchResults = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    renderProducts(searchResults);
}

// === Quick View Modal ===
function showQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modalBody = document.getElementById('modalBody');
    const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
    
    // Generar HTML de reseñas
    let reviewsHTML = '';
    if (product.reviews && product.reviews.length > 0) {
        const averageRating = product.rating;
        const totalReviews = product.reviews.length;
        
        reviewsHTML = `
            <div class="product-reviews-section">
                <div class="reviews-header">
                    <h3>Reseñas de Clientes</h3>
                    <div class="reviews-summary">
                        <div class="rating-summary">
                            <div class="rating-number">${averageRating.toFixed(1)}</div>
                            <div class="rating-stars">
                                ${stars.split('').map(star => `<i class="fas fa-star${star === '☆' ? '-o' : ''}"></i>`).join('')}
                            </div>
                            <div class="rating-count">Basado en ${totalReviews} reseña${totalReviews !== 1 ? 's' : ''}</div>
                        </div>
                    </div>
                </div>
                <div class="reviews-list">
                    ${product.reviews.map(review => {
                        const reviewStars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                        const formattedDate = new Date(review.date).toLocaleDateString('es-ES', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        });
                        
                        return `
                            <div class="review-item">
                                <div class="review-header">
                                    <div class="review-author">
                                        <div class="author-avatar">
                                            <i class="fas fa-user"></i>
                                        </div>
                                        <div class="author-info">
                                            <div class="author-name">
                                                ${review.name}
                                                ${review.verified ? '<span class="verified-badge"><i class="fas fa-check-circle"></i> Compra verificada</span>' : ''}
                                            </div>
                                            <div class="review-date">${formattedDate}</div>
                                        </div>
                                    </div>
                                    <div class="review-rating">
                                        ${reviewStars.split('').map(star => `<i class="fas fa-star${star === '☆' ? '-o' : ''}"></i>`).join('')}
                                    </div>
                                </div>
                                <div class="review-comment">${review.comment}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    modalBody.innerHTML = `
        <div class="modal-product">
            <div class="modal-product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="product-image-fallback" style="display: none; width: 100%; height: 100%; align-items: center; justify-content: center;">
                    <i class="fas fa-image" style="font-size: 120px; color: var(--accent-color); opacity: 0.3;"></i>
                </div>
            </div>
            <div class="modal-product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h2>${product.name}</h2>
                <div class="product-rating">
                    ${stars.split('').map(star => `<i class="fas fa-star${star === '☆' ? '-o' : ''}"></i>`).join('')}
                    ${product.reviews ? `<span class="rating-text">(${product.reviews.length} reseña${product.reviews.length !== 1 ? 's' : ''})</span>` : ''}
                </div>
                <p class="modal-product-description">${product.description}</p>
                <div class="modal-product-price">
                    ${formatPrice(product.price)}
                    ${product.originalPrice ? `<span class="price-original" style="font-size: 20px; margin-left: 10px;">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <button class="btn btn-primary btn-block add-to-cart-modal" data-id="${product.id}">
                    <i class="fas fa-shopping-bag"></i> Agregar al Carrito
                </button>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-color);">
                    <p style="color: var(--text-secondary); font-size: 14px;">
                        <i class="fas fa-check-circle" style="color: var(--success-color);"></i> En stock
                    </p>
                    <p style="color: var(--text-secondary); font-size: 14px; margin-top: 10px;">
                        <i class="fas fa-truck"></i> Envío gratis en compras superiores a $200.000
                    </p>
                </div>
            </div>
        </div>
        ${reviewsHTML}
    `;
    
    const addToCartModalBtn = modalBody.querySelector('.add-to-cart-modal');
    addToCartModalBtn.addEventListener('click', () => {
        addToCart(product.id);
    });
    
    document.getElementById('quickViewModal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
}

// === Cart Functions ===
function addToCart(productId, cardElement = null) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Obtener variación seleccionada si existe
    let selectedVariation = null;
    let priceAdjustment = 0;
    
    if (cardElement && product.variations) {
        const activeVariationBtn = cardElement.querySelector('.variation-btn.active');
        if (activeVariationBtn) {
            selectedVariation = activeVariationBtn.dataset.variation;
            priceAdjustment = parseInt(activeVariationBtn.dataset.priceAdjustment) || 0;
        }
    }
    
    // Crear un ID único para el item considerando la variación
    const itemKey = selectedVariation ? `${productId}_${selectedVariation}` : productId;
    
    // Buscar si ya existe este producto con esta variación
    const existingItem = cart.find(item => {
        if (selectedVariation) {
            return item.id === productId && item.selectedVariation === selectedVariation;
        }
        return item.id === productId && !item.selectedVariation;
    });
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const finalPrice = product.price + priceAdjustment;
        cart.push({
            ...product,
            quantity: 1,
            selectedVariation: selectedVariation,
            priceAdjustment: priceAdjustment,
            finalPrice: finalPrice
        });
    }
    
    saveCart();
    updateCartUI();
    
    const variationText = selectedVariation ? ` (${selectedVariation})` : '';
    showNotification(`${product.name}${variationText} agregado al carrito`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function removeFromCartByIndex(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

function updateQuantityByIndex(index, change) {
    const item = cart[index];
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCartByIndex(index);
    } else {
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('salvajeCart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update cart count
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    const cartItems = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-bag"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map((item, index) => {
            const itemPrice = item.finalPrice || item.price;
            const variationBadge = item.selectedVariation ? 
                `<span class="cart-item-variation">${item.selectedVariation}</span>` : '';
            
            return `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none';">
                    </div>
                    <div class="cart-item-details">
                        <div class="cart-item-name">
                            ${item.name}
                            ${variationBadge}
                        </div>
                        <div class="cart-item-price">${formatPrice(itemPrice)}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease-qty" data-index="${index}">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn increase-qty" data-index="${index}">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <button class="remove-item" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');
        
        // Add event listeners to cart item buttons
        document.querySelectorAll('.decrease-qty').forEach(btn => {
            btn.addEventListener('click', () => updateQuantityByIndex(parseInt(btn.dataset.index), -1));
        });
        
        document.querySelectorAll('.increase-qty').forEach(btn => {
            btn.addEventListener('click', () => updateQuantityByIndex(parseInt(btn.dataset.index), 1));
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', () => removeFromCartByIndex(parseInt(btn.dataset.index)));
        });
    }
    
    // Update cart total
    const cartTotal = document.getElementById('cartTotal');
    const total = cart.reduce((sum, item) => {
        const itemPrice = item.finalPrice || item.price;
        return sum + (itemPrice * item.quantity);
    }, 0);
    cartTotal.textContent = formatPrice(total);
}

// === Notification ===
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--accent-color);
        color: var(--primary-color);
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 5000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// === Smooth Scroll for Navigation ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// === Scroll Animations ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements on load
setTimeout(() => {
    document.querySelectorAll('.product-card, .category-card, .feature-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}, 100);

// === Featured Products ===
function renderFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    
    // Seleccionar los primeros 6 productos como destacados
    // Puedes modificar esto para seleccionar productos específicos
    const featuredProducts = products.slice(0, 6);
    
    featuredGrid.innerHTML = '';
    
    featuredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(30px)';
        featuredGrid.appendChild(productCard);
        
        // Animación escalonada
        setTimeout(() => {
            productCard.classList.add('animate-in');
        }, index * 100);
    });
}

// Renderizar productos destacados al cargar
renderFeaturedProducts();

console.log('✨ SALVAJE Indumentary Marketplace cargado exitosamente');

