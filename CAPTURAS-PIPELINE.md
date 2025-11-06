# 📸 Guía para Capturas de Pantalla - Pipeline CI/CD

## 🎯 Objetivo

Documentar visualmente el pipeline CI/CD para demostrar que cumple con todos los requisitos.

---

## 📋 Capturas Requeridas

### 1️⃣ Archivo .yml de Configuración ✅

**Ubicación:** `.github/workflows/ci-cd.yml`

**Qué capturar:**
1. Ve a: https://github.com/estmariaarrieta-gif/proyecto-atenea
2. Navega a: `.github/workflows/ci-cd.yml`
3. Captura toda la pantalla mostrando:
   - ✅ Nombre del archivo visible en la ruta
   - ✅ Contenido del archivo YAML
   - ✅ Sección `on:` con triggers (push, pull_request)
   - ✅ Las 6 fases del pipeline (jobs)

**Elementos clave a mostrar:**
```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
```

**Nombre del archivo de captura:** `01-archivo-yml-configuracion.png`

---

### 2️⃣ Ejecución Activa del Pipeline ✅

**Ubicación:** https://github.com/estmariaarrieta-gif/proyecto-atenea/actions

**Qué capturar:**

#### Opción A: Pipeline en ejecución (si alcanzas)
1. Ve a la pestaña "Actions" inmediatamente después del push
2. Captura el pipeline mientras se está ejecutando
3. Debe mostrar:
   - ✅ Badge amarillo "In progress" ⚡
   - ✅ Fases ejecutándose en tiempo real
   - ✅ Barra de progreso

#### Opción B: Pipeline completado (más fácil)
1. Ve a la pestaña "Actions"
2. Click en la ejecución más reciente
3. Captura mostrando:
   - ✅ Título: "CI/CD Pipeline - SALVAJE Indumentary"
   - ✅ Evento: "push" al branch "main"
   - ✅ Timestamp del inicio
   - ✅ Las 6 fases visibles en el panel izquierdo

**Nombre del archivo:** `02-pipeline-ejecutandose.png`

---

### 3️⃣ Resultados y Logs de las Etapas ✅

**Para cada fase, captura los logs:**

#### 📦 Fase 1: Instalación de Dependencias

1. Click en "📦 Instalar Dependencias"
2. Expande los steps
3. Captura mostrando:
   ```
   ✅ Checkout del código
   ✅ Configurar Python 3.11
   ✅ Instalar dependencias
   Successfully installed Flask-3.0.0 gunicorn-21.2.0 pytest-7.4.3...
   ```

**Nombre:** `03a-logs-instalacion-dependencias.png`

---

#### 🧪 Fase 2: Pruebas Automatizadas

1. Click en "🧪 Ejecutar Pruebas"
2. Expande el step "Ejecutar tests con pytest"
3. Captura mostrando:
   ```
   ============================= test session starts ==============================
   collected 19 items
   
   tests/test_app.py::TestCatalogo::test_index_page PASSED        [ 5%]
   tests/test_app.py::TestCatalogo::test_index_has_products PASSED [ 10%]
   ...
   tests/test_config.py::test_template_folder_configured PASSED   [100%]
   
   ============================== 19 passed in 2.45s ==============================
   ```

**Nombre:** `03b-logs-pruebas-automatizadas.png`

---

#### 🔒 Fase 3: Análisis de Seguridad

1. Click en "🔒 Análisis de Seguridad"
2. Captura mostrando:
   ```
   ✅ Verificar vulnerabilidades con pip-audit
   No known vulnerabilities found
   ```

**Nombre:** `03c-logs-analisis-seguridad.png`

---

#### 🏗️ Fase 4: Build y Validación

1. Click en "🏗️ Build y Validación"
2. Captura mostrando:
   ```
   ✅ App creada exitosamente
   ✅ Estructura del proyecto verificada
   ```

**Nombre:** `03d-logs-build-validacion.png`

---

#### 🚀 Fase 5: Despliegue Automático

1. Click en "🚀 Despliegue a Producción"
2. Captura mostrando:
   ```
   ## 🚀 Despliegue Automático
   Branch: refs/heads/main
   ✅ Todas las pruebas pasaron correctamente
   ✅ Listo para despliegue
   ```

**Nombre:** `03e-logs-despliegue.png`

---

#### 📊 Fase 6: Reporte Final

1. Click en "📊 Reporte Final"
2. Captura mostrando:
   ```
   🎉 Pipeline CI/CD Completado
   ✅ Fases Ejecutadas
   📈 Métricas
   ```

**Nombre:** `03f-logs-reporte-final.png`

---

### 4️⃣ Confirmación Final del Pipeline Exitoso ✅

**Vista General del Pipeline Completo**

1. En la página del workflow run, captura:
   - ✅ Badge verde "Success" ✅
   - ✅ Todas las 6 fases con checkmarks verdes
   - ✅ Tiempo total de ejecución (ej: "3m 45s")
   - ✅ Commit que activó el pipeline
   - ✅ Autor del commit

**Vista del Commit con Pipeline Exitoso**

2. Ve a: https://github.com/estmariaarrieta-gif/proyecto-atenea/commits/main
3. Captura mostrando:
   - ✅ Checkmark verde ✅ al lado del commit
   - ✅ Mensaje del commit visible
   - ✅ "All checks have passed"

**Nombre de los archivos:**
- `04a-pipeline-exitoso-completo.png`
- `04b-commit-con-checkmark.png`

---

### 5️⃣ Summary del Pipeline ✅

1. En la página del workflow run, scroll hasta "Summary"
2. Captura mostrando:
   ```
   🎉 Pipeline CI/CD Completado
   
   ✅ Fases Ejecutadas
   - ✅ Instalación de dependencias
   - ✅ Ejecución de pruebas automatizadas
   - ✅ Análisis de seguridad
   - ✅ Build y validación
   - ✅ Despliegue automático
   
   📈 Métricas
   - Commit: d8a6e9b...
   - Autor: @tu-usuario
   - Rama: refs/heads/main
   ```

**Nombre:** `05-summary-completo.png`

---

### 6️⃣ Artifacts y Reportes ✅

**Reporte de Cobertura**

1. En el workflow run, scroll hasta "Artifacts"
2. Captura mostrando:
   - ✅ "coverage-report" disponible para descarga
   - ✅ Tamaño del archivo
   - ✅ Retention: 30 days

**Nombre:** `06-artifacts-coverage.png`

---

## 📁 Estructura de Carpeta para Capturas

Crea una carpeta llamada `evidencias-pipeline/` y guarda todas las capturas:

```
evidencias-pipeline/
├── 01-archivo-yml-configuracion.png
├── 02-pipeline-ejecutandose.png
├── 03a-logs-instalacion-dependencias.png
├── 03b-logs-pruebas-automatizadas.png
├── 03c-logs-analisis-seguridad.png
├── 03d-logs-build-validacion.png
├── 03e-logs-despliegue.png
├── 03f-logs-reporte-final.png
├── 04a-pipeline-exitoso-completo.png
├── 04b-commit-con-checkmark.png
├── 05-summary-completo.png
└── 06-artifacts-coverage.png
```

---

## ✅ Checklist de Verificación

Antes de entregar, verifica que las capturas muestren:

### Requisito 1: Archivo .yml
- [ ] Ruta del archivo visible: `.github/workflows/ci-cd.yml`
- [ ] Configuración de triggers visible
- [ ] Las 6 fases (jobs) visibles

### Requisito 2: Activación Automática
- [ ] Pipeline se ejecutó automáticamente tras push
- [ ] Timestamp visible
- [ ] Evento "push to main" visible

### Requisito 3: Fases Completas
- [ ] ✅ Instalación de dependencias - Logs visibles
- [ ] 🧪 Pruebas automatizadas - 19 tests pasados
- [ ] 🔒 Análisis de seguridad - Sin vulnerabilidades
- [ ] 🏗️ Build y validación - App creada exitosamente
- [ ] 🚀 Despliegue - Notificación de deploy
- [ ] 📊 Reporte final - Métricas visibles

### Requisito 4: Logs Disponibles
- [ ] Logs accesibles para cada fase
- [ ] Output detallado visible
- [ ] Timestamps en cada step

### Requisito 5: Confirmación Exitosa
- [ ] Badge verde "Success" ✅
- [ ] Todas las fases con checkmarks verdes
- [ ] Commit con checkmark verde en la lista
- [ ] Summary completo generado

---

## 🎨 Tips para Capturas de Calidad

1. **Usa resolución completa** - No captures en ventana pequeña
2. **Muestra contexto** - Incluye barras de navegación para ubicación
3. **Evita información personal** - Si tienes email/nombre privado, pixelea
4. **Usa nombres descriptivos** - Sigue la nomenclatura sugerida
5. **Verifica que sea legible** - El texto debe poder leerse claramente

---

## 🚀 Enlaces Rápidos

- **GitHub Actions:** https://github.com/estmariaarrieta-gif/proyecto-atenea/actions
- **Archivo YAML:** https://github.com/estmariaarrieta-gif/proyecto-atenea/blob/main/.github/workflows/ci-cd.yml
- **Commits:** https://github.com/estmariaarrieta-gif/proyecto-atenea/commits/main
- **Documentación Completa:** [CI-CD-PIPELINE.md](docs/CI-CD-PIPELINE.md)

---

## 📝 Documento Final de Entrega

Después de tomar todas las capturas, crea un documento (PDF o Word) que incluya:

### Portada
- Título: "Pipeline CI/CD - SALVAJE Indumentary"
- Nombre del estudiante
- Fecha
- Link al repositorio

### Sección 1: Configuración
- Captura `01-archivo-yml-configuracion.png`
- Descripción: "Archivo de configuración del pipeline con 6 fases"
- Status: ✅ CUMPLIDO

### Sección 2: Ejecución
- Captura `02-pipeline-ejecutandose.png`
- Descripción: "Pipeline activado automáticamente tras push"
- Status: ✅ CUMPLIDO

### Sección 3: Logs de Fases
- Todas las capturas `03a` a `03f`
- Descripción de cada fase
- Status de cada una: ✅ CUMPLIDO

### Sección 4: Confirmación
- Capturas `04a` y `04b`
- Descripción: "Pipeline completado exitosamente"
- Status: ✅ CUMPLIDO

### Sección 5: Reportes
- Capturas `05` y `06`
- Descripción: "Summary y artifacts generados"
- Status: ✅ CUMPLIDO

### Conclusión
**Todos los requisitos cumplidos:**
- ✅ Archivo .yml creado y configurado
- ✅ Instalación de dependencias automatizada
- ✅ Pruebas automatizadas (19 tests)
- ✅ Despliegue automático configurado
- ✅ Pipeline se activa automáticamente
- ✅ Logs disponibles y accesibles
- ✅ Confirmación de éxito visible

---

**🎉 ¡Todo listo para entregar la documentación completa del pipeline CI/CD!**

