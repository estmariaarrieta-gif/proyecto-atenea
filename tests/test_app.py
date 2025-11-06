"""
Tests para la aplicación Flask SALVAJE Indumentary
"""
import pytest
import json
from app import create_app


@pytest.fixture
def app():
    """Crear instancia de la aplicación para tests"""
    app = create_app()
    app.config['TESTING'] = True
    app.config['SECRET_KEY'] = 'test-secret-key'
    return app


@pytest.fixture
def client(app):
    """Cliente de prueba para hacer requests"""
    return app.test_client()


class TestCatalogo:
    """Tests para el catálogo de productos"""
    
    def test_index_page(self, client):
        """Test: La página principal carga correctamente"""
        response = client.get('/')
        assert response.status_code == 200
        assert b'SALVAJE' in response.data
        
    def test_index_has_products(self, client):
        """Test: La página principal muestra productos"""
        response = client.get('/')
        assert b'Productos Destacados' in response.data or b'product' in response.data
        

class TestCarrito:
    """Tests para el carrito de compras"""
    
    def test_carrito_page(self, client):
        """Test: La página del carrito carga correctamente"""
        response = client.get('/carrito')
        assert response.status_code == 200
        
    def test_agregar_producto_inexistente(self, client):
        """Test: No se puede agregar un producto que no existe"""
        response = client.get('/carrito/agregar/99999')
        assert response.status_code == 302  # Redirect
        

class TestAdmin:
    """Tests para el panel de administración"""
    
    def test_admin_login_page(self, client):
        """Test: La página de login admin carga correctamente"""
        response = client.get('/admin/login')
        assert response.status_code == 200
        assert b'Administrador' in response.data
        
    def test_admin_requires_login(self, client):
        """Test: El panel admin requiere autenticación"""
        response = client.get('/admin')
        assert response.status_code == 302  # Redirect al login
        
    def test_admin_login_success(self, client):
        """Test: Login exitoso con credenciales correctas"""
        response = client.post('/admin/login', data={
            'username': 'admin',
            'password': '1234'
        }, follow_redirects=True)
        assert response.status_code == 200
        
    def test_admin_login_fail(self, client):
        """Test: Login falla con credenciales incorrectas"""
        response = client.post('/admin/login', data={
            'username': 'wrong',
            'password': 'wrong'
        })
        assert response.status_code == 200
        assert b'incorrectos' in response.data or b'error' in response.data.lower()


class TestAPI:
    """Tests para los endpoints de la API"""
    
    def test_api_productos(self, client):
        """Test: El endpoint de API productos devuelve JSON"""
        response = client.get('/api/productos')
        assert response.status_code == 200
        assert response.content_type == 'application/json'
        
    def test_api_categorias(self, client):
        """Test: El endpoint de API categorías devuelve JSON"""
        response = client.get('/api/categorias')
        assert response.status_code == 200
        assert response.content_type == 'application/json'


class TestUtils:
    """Tests para utilidades"""
    
    def test_load_products(self):
        """Test: Se pueden cargar productos"""
        from app.utils import load_products
        products = load_products()
        assert isinstance(products, list)
        
    def test_products_have_required_fields(self):
        """Test: Los productos tienen los campos requeridos"""
        from app.utils import load_products
        products = load_products()
        if len(products) > 0:
            product = products[0]
            assert 'id' in product
            assert 'name' in product
            assert 'price' in product
            assert 'category' in product

