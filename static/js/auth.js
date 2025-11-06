// ========================================
// SISTEMA DE AUTENTICACIÓN - ADMINISTRADOR
// ========================================
(function() {
    const AUTH_KEY = 'salvajeAuthOK';
    const VALID_USER = 'admin'; // Cambia aquí el usuario del administrador
    const VALID_PASS = '1234';  // Cambia aquí la contraseña del administrador

    function showLogin() {
        const overlay = document.getElementById('loginOverlay');
        if (!overlay) return;
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        // Foco al input usuario
        setTimeout(() => {
            const userInput = document.getElementById('loginUser');
            if (userInput) userInput.focus();
        }, 50);
    }
    
    // Función para verificar si el usuario está autenticado
    window.isAdminAuthenticated = function() {
        return localStorage.getItem(AUTH_KEY) === 'true';
    };
    
    // Función para cerrar sesión
    window.logoutAdmin = function() {
        localStorage.removeItem(AUTH_KEY);
        location.reload();
    };

    function hideLogin() {
        const overlay = document.getElementById('loginOverlay');
        if (!overlay) return;
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function handleSubmit(e) {
        e.preventDefault();
        const user = document.getElementById('loginUser')?.value || '';
        const pass = document.getElementById('loginPass')?.value || '';
        const errorEl = document.getElementById('loginError');

        if (user === VALID_USER && pass === VALID_PASS) {
            localStorage.setItem(AUTH_KEY, 'true');
            if (errorEl) errorEl.style.display = 'none';
            hideLogin();
        } else {
            if (errorEl) errorEl.style.display = 'flex';
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        const isAuth = localStorage.getItem(AUTH_KEY) === 'true';
        const overlay = document.getElementById('loginOverlay');
        const form = document.getElementById('loginForm');

        if (form) form.addEventListener('submit', handleSubmit);

        if (!isAuth) {
            showLogin();
        } else if (overlay) {
            overlay.parentElement?.removeChild(overlay); // limpiar si ya está autenticado
        }
    });
})();


