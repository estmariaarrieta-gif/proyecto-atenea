"""
Configuraciones para diferentes entornos
"""
import os


class Config:
    """Configuración base"""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'salvaje-secret-key-2025')
    JSON_AS_ASCII = False
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'


class DevelopmentConfig(Config):
    """Configuración para desarrollo"""
    DEBUG = True
    SESSION_COOKIE_SECURE = False


class ProductionConfig(Config):
    """Configuración para producción"""
    DEBUG = False
    SESSION_COOKIE_SECURE = True
    SECRET_KEY = os.environ.get('SECRET_KEY')  # Obligatorio en prod
    
    @property
    def SECRET_KEY(self):
        secret = os.environ.get('SECRET_KEY')
        if not secret:
            raise ValueError('SECRET_KEY debe estar configurada en producción')
        return secret


class TestingConfig(Config):
    """Configuración para tests"""
    TESTING = True
    SESSION_COOKIE_SECURE = False


config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}

