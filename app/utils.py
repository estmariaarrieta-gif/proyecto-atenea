"""
Utilidades compartidas para la aplicación
"""
import os
import json

# Paths de datos
PROJECT_ROOT = os.path.dirname(os.path.dirname(__file__))
DATA_DIR = os.path.join(PROJECT_ROOT, 'data')
PRODUCTS_FILE = os.path.join(DATA_DIR, 'products.json')
BOOKINGS_FILE = os.path.join(DATA_DIR, 'bookings.json')


def load_products():
    """Cargar productos desde JSON"""
    if os.path.exists(PRODUCTS_FILE):
        with open(PRODUCTS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return get_default_products()


def save_products(products):
    """Guardar productos en JSON"""
    with open(PRODUCTS_FILE, 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)


def load_bookings():
    """Cargar reservas desde JSON"""
    if os.path.exists(BOOKINGS_FILE):
        with open(BOOKINGS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []


def save_bookings(bookings):
    """Guardar reservas en JSON"""
    with open(BOOKINGS_FILE, 'w', encoding='utf-8') as f:
        json.dump(bookings, f, ensure_ascii=False, indent=2)


def get_default_products():
    """Productos por defecto si no existe el archivo"""
    return [
        {
            "id": 1,
            "name": "MEDIAS MALLA",
            "category": "lenceria",
            "price": 60000,
            "originalPrice": None,
            "rating": 5,
            "image": "images/products/medias-malla.jpg",
            "description": "Medias de malla de alta calidad, perfectas para complementar cualquier outfit.",
            "inStock": True,
            "featured": True
        },
        {
            "id": 2,
            "name": "BONNIE",
            "category": "arneses",
            "price": 120000,
            "originalPrice": 200000,
            "rating": 5,
            "image": "images/products/bonnie.jpg",
            "description": "Línea Elite - Arnés Bonnie con diseño exclusivo en cuero premium.",
            "inStock": True,
            "featured": True,
            "onSale": True
        },
        {
            "id": 3,
            "name": "Cisne Negro",
            "category": "arneses",
            "price": 190000,
            "originalPrice": 290000,
            "rating": 5,
            "image": "images/products/cine-negro.jpg",
            "description": "Diseño inspirado en la elegancia del cisne negro.",
            "inStock": True,
            "featured": True,
            "onSale": True
        },
        {
            "id": 4,
            "name": "CROP TOP ARNÉS",
            "category": "arneses",
            "price": 180000,
            "originalPrice": None,
            "rating": 4,
            "image": "images/products/crop-top-arnes.jpg",
            "description": "Crop top arnés versátil y cómodo para cualquier ocasión.",
            "inStock": True,
            "featured": False
        },
        {
            "id": 5,
            "name": "DIANA DE GALES",
            "category": "arneses",
            "price": 470000,
            "originalPrice": 1100000,
            "rating": 5,
            "image": "images/products/diana-de-gales.jpg",
            "description": "Pieza exclusiva de edición limitada con detalles premium.",
            "inStock": True,
            "featured": True,
            "onSale": True
        },
        {
            "id": 6,
            "name": "Alligator",
            "category": "jackets",
            "price": 310000,
            "originalPrice": 500000,
            "rating": 5,
            "image": "images/products/alligator.jpg",
            "description": "Jacket con textura alligator de alta calidad.",
            "inStock": True,
            "featured": True,
            "onSale": True
        },
        {
            "id": 7,
            "name": "Oveja Negra",
            "category": "jackets",
            "price": 1100000,
            "originalPrice": None,
            "rating": 5,
            "image": "images/products/oveja-negra.jpg",
            "description": "Jacket premium con diseño único y acabados de lujo.",
            "inStock": True,
            "featured": True
        },
        {
            "id": 8,
            "name": "INFINITY CHOKER",
            "category": "accesorios",
            "price": 55000,
            "originalPrice": 75000,
            "rating": 4,
            "image": "images/products/infinity-choker.jpg",
            "description": "Choker con símbolo de infinito, disponible en diferentes acabados.",
            "inStock": True,
            "featured": False,
            "onSale": True
        }
    ]


def get_cart():
    """Obtener carrito de la sesión"""
    from flask import session
    if 'cart' not in session:
        session['cart'] = []
    return session['cart']


def save_cart(cart):
    """Guardar carrito en la sesión"""
    from flask import session
    session['cart'] = cart

