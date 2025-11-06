"""
Blueprint para el carrito de compras
"""
from flask import Blueprint, render_template, request, redirect, url_for, flash
from app.utils import load_products, get_cart, save_cart

bp = Blueprint('carrito', __name__, url_prefix='/carrito')


@bp.route('/')
def ver_carrito():
    """Ver carrito de compras"""
    cart = get_cart()
    products = load_products()
    cart_items = []
    total = 0
    total_items = 0

    for item in cart:
        product = next((p for p in products if p['id'] == item['id']), None)
        if product:
            quantity = item.get('quantity', 1)
            item_total = product['price'] * quantity
            total += item_total
            total_items += quantity
            cart_items.append({
                **item,
                'description': product.get('description', ''),
                'category': product.get('category', ''),
                'item_total': item_total
            })

    return render_template('carrito.html', cart_items=cart_items, total=total, total_items=total_items)


@bp.route('/agregar/<int:product_id>')
def agregar(product_id):
    """Agregar producto al carrito"""
    products = load_products()
    product = next((p for p in products if p['id'] == product_id), None)

    if not product:
        flash('Producto no encontrado', 'error')
        return redirect(request.referrer or url_for('catalogo.index'))

    if not product.get('inStock', True):
        flash('Producto no disponible', 'error')
        return redirect(request.referrer or url_for('catalogo.index'))

    cart = get_cart()
    for item in cart:
        if item['id'] == product_id:
            item['quantity'] = item.get('quantity', 1) + 1
            flash(f'Cantidad de {product["name"]} aumentada a {item["quantity"]} en el carrito', 'success')
            save_cart(cart)
            ref = request.referrer or ''
            return redirect(url_for('carrito.ver_carrito') if 'carrito' in ref else url_for('catalogo.index'))

    cart.append({
        'id': product['id'],
        'name': product['name'],
        'price': product['price'],
        'image': product['image'],
        'quantity': 1
    })
    save_cart(cart)
    flash(f'{product["name"]} agregado al carrito', 'success')
    ref = request.referrer or ''
    return redirect(url_for('carrito.ver_carrito') if 'carrito' in ref else url_for('catalogo.index'))


@bp.route('/actualizar/<int:product_id>', methods=['POST'])
def actualizar_cantidad(product_id):
    """Actualizar cantidad de un producto en el carrito"""
    cart = get_cart()
    action = request.form.get('action')
    products = load_products()
    product = next((p for p in products if p['id'] == product_id), None)

    for item in cart:
        if item['id'] == product_id:
            if action == 'increase':
                item['quantity'] = item.get('quantity', 1) + 1
                if product:
                    flash(f'Cantidad de {product["name"]} aumentada a {item["quantity"]}', 'success')
            elif action == 'decrease':
                old_quantity = item.get('quantity', 1)
                item['quantity'] = max(1, old_quantity - 1)
                if product and old_quantity > item['quantity']:
                    flash(f'Cantidad de {product["name"]} disminuida a {item["quantity"]}', 'info')
            elif action == 'remove':
                name = product['name'] if product else 'Producto'
                cart.remove(item)
                flash(f'{name} eliminado del carrito', 'info')
            break

    save_cart(cart)
    return redirect(url_for('carrito.ver_carrito'))


@bp.route('/vaciar', methods=['POST'])
def vaciar():
    """Vaciar el carrito completamente"""
    from flask import session
    session['cart'] = []
    flash('Carrito vaciado', 'info')
    return redirect(url_for('carrito.ver_carrito'))

