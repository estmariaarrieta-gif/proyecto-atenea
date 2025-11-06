from app import create_app

app = create_app()

if __name__ == '__main__':
    print("=" * 50)
    print("SALVAJE INDUMENTARY - Flask Application")
    print("=" * 50)
    print("Servidor iniciado en: http://localhost:5000")
    print("Panel de Admin: http://localhost:5000/admin/login")
    print("Credenciales: admin / 1234")
    print("=" * 50)
    app.run(debug=True, host='0.0.0.0', port=5000)

