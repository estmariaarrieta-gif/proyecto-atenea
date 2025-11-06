import os
from flask import Flask


def create_app(config: dict | None = None) -> Flask:
    """
    Factory de aplicación Flask con arquitectura modular
    """
    app = Flask(__name__, static_folder='../static', template_folder='../templates')

    # Configuración por defecto
    app.config.update(
        SECRET_KEY=os.environ.get('SECRET_KEY', 'salvaje-secret-key-2025'),
        JSON_AS_ASCII=False,
        SESSION_COOKIE_SECURE=False,  # True en producción con HTTPS
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE='Lax'
    )

    # Config externa opcional
    if config:
        app.config.update(config)

    # Asegurar carpeta de datos
    data_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    os.makedirs(data_dir, exist_ok=True)

    # Inicializar productos por defecto si no existen
    from .utils import load_products, save_products, PRODUCTS_FILE
    if not os.path.exists(PRODUCTS_FILE):
        save_products(load_products())

    # Registrar blueprints modulares
    from .blueprints.catalogo import bp as catalogo_bp
    from .blueprints.carrito import bp as carrito_bp
    from .blueprints.admin import bp as admin_bp
    from .blueprints.api import bp as api_bp

    app.register_blueprint(catalogo_bp)
    app.register_blueprint(carrito_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(api_bp)

    return app


