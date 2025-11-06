"""
Blueprint para el panel de administración
"""
import os
from functools import wraps
from flask import Blueprint, render_template, request, redirect, url_for, session, flash, jsonify
from app.utils import load_products, save_products, load_bookings, save_bookings

bp = Blueprint('admin', __name__, url_prefix='/admin')

# Credenciales
ADMIN_USER = os.environ.get('ADMIN_USER', 'admin')
ADMIN_PASS = os.environ.get('ADMIN_PASS', '1234')


def admin_required(f):
    """Decorador para requerir autenticación de administrador"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('admin_logged_in'):
            flash('Debes iniciar sesión como administrador', 'error')
            return redirect(url_for('admin.login'))
        return f(*args, **kwargs)
    return decorated_function


@bp.route('/login', methods=['GET', 'POST'])
def login():
    """Login de administrador"""
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == ADMIN_USER and password == ADMIN_PASS:
            session['admin_logged_in'] = True
            flash('Sesión iniciada correctamente', 'success')
            return redirect(url_for('admin.panel'))
        flash('Usuario o contraseña incorrectos', 'error')
    return render_template('admin_login.html')


@bp.route('/logout')
def logout():
    """Cerrar sesión de administrador"""
    session.pop('admin_logged_in', None)
    flash('Sesión cerrada', 'info')
    return redirect(url_for('catalogo.index'))


@bp.route('/')
@admin_required
def panel():
    """Panel principal de administración"""
    products = load_products()
    bookings = load_bookings()
    return render_template('admin.html', products=products, bookings=bookings)


@bp.route('/productos/agregar', methods=['GET', 'POST'])
@admin_required
def agregar_producto():
    """Agregar nuevo producto"""
    if request.method == 'POST':
        products = load_products()
        name = (request.form.get('name') or '').strip()
        category = (request.form.get('category') or '').strip()
        image = (request.form.get('image') or '').strip()
        description = (request.form.get('description') or '').strip()

        errors = []
        if not name:
            errors.append('El nombre es obligatorio')
        try:
            price = int(request.form.get('price', '0'))
            if price <= 0:
                errors.append('El precio debe ser mayor que 0')
        except ValueError:
            errors.append('El precio no es válido')

        original_price_value = request.form.get('originalPrice')
        try:
            original_price = int(original_price_value) if original_price_value else None
            if original_price is not None and original_price < 0:
                errors.append('El precio original no puede ser negativo')
        except ValueError:
            errors.append('El precio original no es válido')

        if not category:
            errors.append('La categoría es obligatoria')
        if not image:
            errors.append('La URL de la imagen es obligatoria')
        if not description:
            errors.append('La descripción es obligatoria')

        if errors:
            for e in errors:
                flash(e, 'error')
            form_product = {
                'name': name,
                'category': category,
                'price': request.form.get('price', ''),
                'originalPrice': original_price_value or '',
                'image': image,
                'description': description,
                'rating': int(request.form.get('rating', 5) or 5),
                'featured': request.form.get('featured') == 'on',
                'onSale': request.form.get('onSale') == 'on',
                'inStock': request.form.get('inStock') == 'on'
            }
            return render_template('admin_producto_form.html', product=form_product)

        new_id = max([p['id'] for p in products], default=0) + 1
        new_product = {
            'id': new_id,
            'name': name,
            'category': category or 'accesorios',
            'price': price,
            'originalPrice': original_price,
            'image': image,
            'description': description,
            'rating': int(request.form.get('rating', 5) or 5),
            'featured': request.form.get('featured') == 'on',
            'onSale': request.form.get('onSale') == 'on',
            'inStock': request.form.get('inStock') == 'on'
        }
        products.append(new_product)
        save_products(products)
        flash('Producto agregado exitosamente', 'success')
        return redirect(url_for('admin.panel'))

    return render_template('admin_producto_form.html', product=None)


@bp.route('/productos/editar/<int:product_id>', methods=['GET', 'POST'])
@admin_required
def editar_producto(product_id):
    """Editar producto existente"""
    products = load_products()
    product = next((p for p in products if p['id'] == product_id), None)
    if not product:
        flash('Producto no encontrado', 'error')
        return redirect(url_for('admin.panel'))

    if request.method == 'POST':
        name = (request.form.get('name') or '').strip()
        category = (request.form.get('category') or '').strip()
        image = (request.form.get('image') or '').strip()
        description = (request.form.get('description') or '').strip()

        errors = []
        if not name:
            errors.append('El nombre es obligatorio')
        try:
            price = int(request.form.get('price', '0'))
            if price <= 0:
                errors.append('El precio debe ser mayor que 0')
        except ValueError:
            errors.append('El precio no es válido')

        original_price_value = request.form.get('originalPrice')
        try:
            original_price = int(original_price_value) if original_price_value else None
            if original_price is not None and original_price < 0:
                errors.append('El precio original no puede ser negativo')
        except ValueError:
            errors.append('El precio original no es válido')

        if not category:
            errors.append('La categoría es obligatoria')
        if not image:
            errors.append('La URL de la imagen es obligatoria')
        if not description:
            errors.append('La descripción es obligatoria')

        if errors:
            for e in errors:
                flash(e, 'error')
            form_product = dict(product)
            form_product.update({
                'name': name,
                'category': category,
                'price': request.form.get('price', ''),
                'originalPrice': original_price_value or '',
                'image': image,
                'description': description,
                'rating': int(request.form.get('rating', 5) or 5),
                'featured': request.form.get('featured') == 'on',
                'onSale': request.form.get('onSale') == 'on',
                'inStock': request.form.get('inStock') == 'on'
            })
            return render_template('admin_producto_form.html', product=form_product)

        product['name'] = name
        product['category'] = category or 'accesorios'
        product['price'] = price
        product['originalPrice'] = original_price
        product['image'] = image
        product['description'] = description
        product['rating'] = int(request.form.get('rating', 5) or 5)
        product['featured'] = request.form.get('featured') == 'on'
        product['onSale'] = request.form.get('onSale') == 'on'
        product['inStock'] = request.form.get('inStock') == 'on'
        save_products(products)
        flash('Producto actualizado exitosamente', 'success')
        return redirect(url_for('admin.panel'))

    return render_template('admin_producto_form.html', product=product)


@bp.route('/productos/eliminar/<int:product_id>', methods=['POST'])
@admin_required
def eliminar_producto(product_id):
    """Eliminar producto"""
    products = load_products()
    products = [p for p in products if p['id'] != product_id]
    save_products(products)
    flash('Producto eliminado exitosamente', 'success')
    return redirect(url_for('admin.panel'))


@bp.route('/api/productos')
@admin_required
def api_productos():
    """API para obtener productos en JSON"""
    return jsonify(load_products())


@bp.route('/api/reservas')
@admin_required
def api_reservas():
    """API para obtener reservas en JSON"""
    return jsonify(load_bookings())

