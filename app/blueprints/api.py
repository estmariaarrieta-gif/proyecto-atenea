"""
Blueprint para API pública (endpoints JSON)
"""
from flask import Blueprint, jsonify
from app.utils import load_products

bp = Blueprint('api', __name__, url_prefix='/api')


@bp.route('/productos')
def productos():
    """API pública de productos"""
    products = load_products()
    # Filtrar solo productos disponibles
    available = [p for p in products if p.get('inStock', True)]
    return jsonify(available)


@bp.route('/categorias')
def categorias():
    """API de categorías disponibles"""
    products = load_products()
    categories = set(p['category'] for p in products if p.get('inStock', True))
    return jsonify(sorted(categories))

