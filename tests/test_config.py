"""
Tests para configuración de la aplicación
"""
import pytest
from app import create_app
from app.config import DevelopmentConfig, ProductionConfig


def test_app_creation():
    """Test: La aplicación se puede crear correctamente"""
    app = create_app()
    assert app is not None
    assert app.name == 'app'


def test_development_config():
    """Test: La configuración de desarrollo está correcta"""
    config = DevelopmentConfig()
    assert config.DEBUG == True
    assert config.SESSION_COOKIE_SECURE == False


def test_production_config():
    """Test: La configuración de producción está correcta"""
    config = ProductionConfig()
    assert config.DEBUG == False
    assert config.SESSION_COOKIE_SECURE == True


def test_app_has_secret_key():
    """Test: La aplicación tiene SECRET_KEY configurada"""
    app = create_app()
    assert app.config['SECRET_KEY'] is not None
    assert len(app.config['SECRET_KEY']) > 0


def test_static_folder_configured():
    """Test: La carpeta static está configurada"""
    app = create_app()
    assert app.static_folder is not None
    

def test_template_folder_configured():
    """Test: La carpeta templates está configurada"""
    app = create_app()
    assert app.template_folder is not None

