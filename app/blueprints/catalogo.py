"""
Blueprint para el catálogo de productos (vista pública)
"""
from flask import Blueprint, render_template, request, redirect, url_for, flash
from app.utils import load_products, get_cart, save_cart

bp = Blueprint('catalogo', __name__)


@bp.route('/')
def index():
    """Página principal con catálogo de productos"""
    products = load_products()
    cart = get_cart()
    cart_count = sum(item.get('quantity', 1) for item in cart)
    return render_template('index.html', products=products, cart_count=cart_count)


@bp.route('/test')
def test():
    """Página de prueba para verificar archivos estáticos"""
    return render_template('test.html')


@bp.route('/producto/<int:product_id>')
def detalle_producto(product_id):
    """Detalle de un producto específico (opcional para futuro)"""
    products = load_products()
    product = next((p for p in products if p['id'] == product_id), None)
    
    if not product:
        flash('Producto no encontrado', 'error')
        return redirect(url_for('catalogo.index'))
    
    cart = get_cart()
    cart_count = sum(item.get('quantity', 1) for item in cart)
    return render_template('producto_detalle.html', product=product, cart_count=cart_count)

