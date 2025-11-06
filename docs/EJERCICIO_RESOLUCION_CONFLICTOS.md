# 📚 Ejercicio: Resolución de Conflictos en Git

**Proyecto:** SALVAJE Indumentary E-commerce  
**Repositorio:** https://github.com/estmariaarrieta-gif/proyecto-atenea  
**Estudiante:** María Arrieta  
**Fecha:** 6 de noviembre de 2025

---

## 📋 Objetivo

Demostrar la capacidad de trabajar con ramas en Git, generar conflictos intencionales y resolverlos manualmente utilizando herramientas de edición de código.

---

## 🌿 PASO 1: Creación de Ramas Individuales

### 1.1 Estado inicial del repositorio

**Rama principal:** `main`  
**Commit inicial:** `59dacc6` - "first commit - SALVAJE Indumentary E-commerce completo"

```bash
$ git status
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

### 1.2 Creación de la primera rama

**Nombre descriptivo:** `feature/maria-productos`

```bash
$ git checkout -b feature/maria-productos
Switched to a new branch 'feature/maria-productos'
```

**Justificación del nombre:** La rama se enfoca en agregar documentación sobre el catálogo de productos del e-commerce.

### 1.3 Creación de la segunda rama

Primero regresamos a `main`:

```bash
$ git checkout main
Switched to branch 'main'
```

Luego creamos la segunda rama:

```bash
$ git checkout -b feature/maria-admin
Switched to a new branch 'feature/maria-admin'
```

**Justificación del nombre:** Esta rama se enfoca en documentar las funcionalidades del panel de administración.

---

## ✏️ PASO 2: Modificación Intencional para Generar Conflicto

### 2.1 Archivo seleccionado

**Archivo:** `README.md`  
**Sección específica:** Línea 177 (justo después de la sección "API Endpoints")

### 2.2 Cambios en la rama `feature/maria-productos`

```bash
$ git checkout feature/maria-productos
```

**Modificación realizada:** Agregué una nueva sección sobre el catálogo de productos:

```markdown
## 🛍️ Catálogo de Productos

### Categorías Disponibles
El sistema maneja 5 categorías principales de productos:
- **Arneses**: Diseños exclusivos en cuero premium
- **Jackets**: Chaquetas de cuero con estilo alternativo
- **Lencería**: Piezas únicas y atrevidas
- **Máscaras**: Accesorios premium para eventos
- **Accesorios**: Complementos ideales para cualquier outfit
```

### 2.3 Cambios en la rama `feature/maria-admin`

```bash
$ git checkout main
$ git checkout feature/maria-admin
```

**Modificación realizada:** Agregué una sección DIFERENTE en la MISMA ubicación sobre el panel de administración:

```markdown
## 👨‍💼 Panel de Administración

### Funcionalidades Principales
El panel de administración permite gestionar completamente el e-commerce:
- **CRUD de Productos**: Crear, leer, actualizar y eliminar productos
- **Gestión de Categorías**: Organizar productos por tipo
- **Control de Ofertas**: Activar/desactivar promociones
- **Gestión de Stock**: Marcar productos como disponibles o descartados
- **Visualización de Reservas**: Ver todas las sesiones fotográficas agendadas
```

**⚠️ CONFLICTO GARANTIZADO:** Ambas ramas modifican las MISMAS líneas del archivo README.md en la misma ubicación, lo que garantiza un conflicto al intentar fusionarlas.

---

## 💾 PASO 3: Commit y Push de Cambios

### 3.1 Commit en `feature/maria-productos`

```bash
$ git checkout feature/maria-productos
$ git add README.md
$ git commit -m "feat: agregar sección de catálogo de productos en README"
[feature/maria-productos 7072c86] feat: agregar sección de catálogo de productos en README
 1 file changed, 10 insertions(+)
```

**Push al repositorio remoto:**

```bash
$ git push -u origin feature/maria-productos
remote: Create a pull request for 'feature/maria-productos' on GitHub by visiting:
remote:      https://github.com/estmariaarrieta-gif/proyecto-atenea/pull/new/feature/maria-productos
branch 'feature/maria-productos' set up to track 'origin/feature/maria-productos'.
To https://github.com/estmariaarrieta-gif/proyecto-atenea.git
 * [new branch]      feature/maria-productos -> feature/maria-productos
```

### 3.2 Commit en `feature/maria-admin`

```bash
$ git checkout feature/maria-admin
$ git add README.md
$ git commit -m "feat: agregar sección de panel de administración en README"
[feature/maria-admin e3b0a82] feat: agregar sección de panel de administración en README
 1 file changed, 10 insertions(+)
```

**Push al repositorio remoto:**

```bash
$ git push -u origin feature/maria-admin
remote: Create a pull request for 'feature/maria-admin' on GitHub by visiting:
remote:      https://github.com/estmariaarrieta-gif/proyecto-atenea/pull/new/feature/maria-admin
branch 'feature/maria-admin' set up to track 'origin/feature/maria-admin'.
To https://github.com/estmariaarrieta-gif/proyecto-atenea.git
 * [new branch]      feature/maria-admin -> feature/maria-admin
```

**✅ Resultado:** Ambas ramas están ahora en GitHub con sus respectivos commits.

---

## ⚔️ PASO 4: Intento de Merge y Detección del Conflicto

### 4.1 Volver a la rama principal

```bash
$ git checkout main
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
```

### 4.2 Primer merge (exitoso)

Fusionamos la primera rama sin problemas:

```bash
$ git merge feature/maria-productos
Updating 59dacc6..7072c86
Fast-forward
 README.md | 10 ++++++++++
 1 file changed, 10 insertions(+)
```

**✅ Merge exitoso:** La primera rama se fusionó sin conflictos mediante "fast-forward".

### 4.3 Segundo merge (CONFLICTO)

Ahora intentamos fusionar la segunda rama:

```bash
$ git merge feature/maria-admin
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

**🔴 CONFLICTO DETECTADO:**
- **Archivo afectado:** README.md
- **Tipo de conflicto:** Contenido (content)
- **Causa:** Modificaciones en las mismas líneas desde diferentes ramas

### 4.4 Verificación del estado del repositorio

```bash
$ git status
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)

You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
	both modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```

**Estado:** El repositorio está en estado de merge pendiente con conflictos sin resolver.

---

## 🔍 PASO 5: Abrir el Archivo en Conflicto

### 5.1 Herramienta utilizada

**Editor:** Visual Studio Code  
**Características:**
- Integración nativa con Git
- Resaltado visual de conflictos
- Botones interactivos para resolver conflictos
- Vista de diferencias (diff) integrada

### 5.2 Vista del archivo con conflicto

Al abrir `README.md` en VS Code, se ve lo siguiente:

```
Línea 175: - `GET /admin/api/reservas` - Reservas registradas (JSON)
Línea 176: 
Línea 177: <<<<<<< HEAD
Línea 178: ## 🛍️ Catálogo de Productos
Línea 179: 
Línea 180: ### Categorías Disponibles
Línea 181: El sistema maneja 5 categorías principales de productos:
Línea 182: - **Arneses**: Diseños exclusivos en cuero premium
Línea 183: - **Jackets**: Chaquetas de cuero con estilo alternativo
Línea 184: - **Lencería**: Piezas únicas y atrevidas
Línea 185: - **Máscaras**: Accesorios premium para eventos
Línea 186: - **Accesorios**: Complementos ideales para cualquier outfit
Línea 187: =======
Línea 188: ## 👨‍💼 Panel de Administración
Línea 189: 
Línea 190: ### Funcionalidades Principales
Línea 191: El panel de administración permite gestionar completamente el e-commerce:
Línea 192: - **CRUD de Productos**: Crear, leer, actualizar y eliminar productos
Línea 193: - **Gestión de Categorías**: Organizar productos por tipo
Línea 194: - **Control de Ofertas**: Activar/desactivar promociones
Línea 195: - **Gestión de Stock**: Marcar productos como disponibles o descartados
Línea 196: - **Visualización de Reservas**: Ver todas las sesiones fotográficas agendadas
Línea 197: >>>>>>> feature/maria-admin
Línea 198: 
Línea 199: ## 📝 Estructura de Datos
```

---

## 📊 PASO 6: Análisis de los Bloques en Conflicto

### 6.1 Identificación de marcas de conflicto

| Marca | Significado | Contenido |
|-------|-------------|-----------|
| `<<<<<<< HEAD` | **Inicio del conflicto** - Versión actual en la rama `main` | Sección de Catálogo de Productos |
| `=======` | **Separador** - Divide las dos versiones en conflicto | N/A |
| `>>>>>>> feature/maria-admin` | **Fin del conflicto** - Versión de la rama que se intenta integrar | Sección de Panel de Administración |

### 6.2 Análisis de cada bloque

**Bloque 1 (HEAD - Versión actual):**
```markdown
## 🛍️ Catálogo de Productos

### Categorías Disponibles
El sistema maneja 5 categorías principales de productos:
- **Arneses**: Diseños exclusivos en cuero premium
- **Jackets**: Chaquetas de cuero con estilo alternativo
- **Lencería**: Piezas únicas y atrevidas
- **Máscaras**: Accesorios premium para eventos
- **Accesorios**: Complementos ideales para cualquier outfit
```

**Contenido:** Documentación sobre las categorías de productos del e-commerce.  
**Origen:** Rama `feature/maria-productos` (ya fusionada en `main`)

**Bloque 2 (feature/maria-admin - Versión entrante):**
```markdown
## 👨‍💼 Panel de Administración

### Funcionalidades Principales
El panel de administración permite gestionar completamente el e-commerce:
- **CRUD de Productos**: Crear, leer, actualizar y eliminar productos
- **Gestión de Categorías**: Organizar productos por tipo
- **Control de Ofertas**: Activar/desactivar promociones
- **Gestión de Stock**: Marcar productos como disponibles o descartados
- **Visualización de Reservas**: Ver todas las sesiones fotográficas agendadas
```

**Contenido:** Documentación sobre las funcionalidades del panel de administración.  
**Origen:** Rama `feature/maria-admin` (intentando fusionar)

### 6.3 Comprensión del conflicto

**Problema:** Ambas ramas agregaron contenido diferente en la misma ubicación del archivo.

**Contexto:** Ambas secciones son valiosas y complementarias para la documentación del proyecto.

**Decisión de resolución:** Mantener AMBAS secciones para tener documentación completa del sistema.

---

## 🔧 PASO 7: Resolución Manual del Conflicto

### 7.1 Estrategia de resolución

**Opción elegida:** **Combinar ambas versiones**

**Justificación:**
- Ambas secciones son importantes para la documentación
- No hay contradicciones lógicas entre ellas
- Complementan la información del proyecto
- Mejoran la calidad del README

### 7.2 Proceso de resolución en VS Code

**Paso 1:** Eliminar las marcas de conflicto (`<<<<<<<`, `=======`, `>>>>>>>`)

**Paso 2:** Organizar el contenido de forma coherente:
- Primero la sección de Catálogo de Productos
- Luego la sección de Panel de Administración
- Mantener el formato Markdown consistente

**Paso 3:** Versión final después de la resolución:

```markdown
## 🛍️ Catálogo de Productos

### Categorías Disponibles
El sistema maneja 5 categorías principales de productos:
- **Arneses**: Diseños exclusivos en cuero premium
- **Jackets**: Chaquetas de cuero con estilo alternativo
- **Lencería**: Piezas únicas y atrevidas
- **Máscaras**: Accesorios premium para eventos
- **Accesorios**: Complementos ideales para cualquier outfit

## 👨‍💼 Panel de Administración

### Funcionalidades Principales
El panel de administración permite gestionar completamente el e-commerce:
- **CRUD de Productos**: Crear, leer, actualizar y eliminar productos
- **Gestión de Categorías**: Organizar productos por tipo
- **Control de Ofertas**: Activar/desactivar promociones
- **Gestión de Stock**: Marcar productos como disponibles o descartados
- **Visualización de Reservas**: Ver todas las sesiones fotográficas agendadas

## 📝 Estructura de Datos
```

**✅ Resultado:** Archivo sin marcas de conflicto, con contenido coherente y funcional.

---

## ✅ PASO 8: Finalización del Proceso

### 8.1 Guardar los cambios

Archivo guardado en VS Code (`Ctrl + S`)

### 8.2 Marcar el conflicto como resuelto

```bash
$ git add README.md
```

Este comando indica a Git que el conflicto en `README.md` ha sido resuelto manualmente.

### 8.3 Commit de resolución

```bash
$ git commit -m "Resuelto conflicto en README.md - combinadas secciones de catálogo y admin"
[main ee59276] Resuelto conflicto en README.md - combinadas secciones de catálogo y admin
```

**Mensaje descriptivo:** El commit explica claramente:
- Qué se resolvió (conflicto en README.md)
- Cómo se resolvió (combinando ambas secciones)

### 8.4 Sincronización con repositorio remoto

```bash
$ git push origin main
To https://github.com/estmariaarrieta-gif/proyecto-atenea.git
   59dacc6..ee59276  main -> main
```

**✅ Merge completado exitosamente** y sincronizado con GitHub.

---

## 📊 PASO 9: Visualización del Historial

### 9.1 Historial de commits con gráfico

```bash
$ git log --oneline --graph --all -10
*   ee59276 Resuelto conflicto en README.md - combinadas secciones de catálogo y admin
|\  
| * e3b0a82 feat: agregar sección de panel de administración en README
* | 7072c86 feat: agregar sección de catálogo de productos en README
|/  
* 59dacc6 first commit - SALVAJE Indumentary E-commerce completo
```

**Interpretación del gráfico:**
- `*` = Commits
- `|` = Líneas de rama
- `/` y `\` = Divergencia y convergencia de ramas
- El commit `ee59276` es el merge que resuelve el conflicto

### 9.2 Verificación de ramas

```bash
$ git branch -a
* main
  feature/maria-admin
  feature/maria-productos
  remotes/origin/feature/maria-admin
  remotes/origin/feature/maria-productos
  remotes/origin/main
```

**Estado final:**
- 3 ramas locales
- 3 ramas remotas en GitHub
- Todas sincronizadas correctamente

---

## 📝 Evidencias del Ejercicio

### Evidencia 1: Creación de ramas

**Comando:**
```bash
$ git branch -a
  feature/maria-admin
  feature/maria-productos
* main
  remotes/origin/feature/maria-admin
  remotes/origin/feature/maria-productos
  remotes/origin/main
```

**Comprobación:** Existen 2 ramas con nombres descriptivos diferentes a `main`.

### Evidencia 2: Commits en cada rama

**Rama feature/maria-productos:**
```bash
$ git log feature/maria-productos --oneline
7072c86 feat: agregar sección de catálogo de productos en README
59dacc6 first commit - SALVAJE Indumentary E-commerce completo
```

**Rama feature/maria-admin:**
```bash
$ git log feature/maria-admin --oneline
e3b0a82 feat: agregar sección de panel de administración en README
59dacc6 first commit - SALVAJE Indumentary E-commerce completo
```

**Comprobación:** Cada rama tiene al menos 1 commit con mensaje descriptivo.

### Evidencia 3: Conflicto generado

**Mensaje de Git:**
```
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

**Comprobación:** Git detectó y reportó el conflicto en README.md.

### Evidencia 4: Archivo con marcas de conflicto

**Contenido antes de resolver:**
```
<<<<<<< HEAD
## 🛍️ Catálogo de Productos
[contenido...]
=======
## 👨‍💼 Panel de Administración
[contenido...]
>>>>>>> feature/maria-admin
```

**Comprobación:** El archivo mostraba las 3 marcas de conflicto requeridas.

### Evidencia 5: Resolución manual

**Contenido después de resolver:**
```markdown
## 🛍️ Catálogo de Productos
[contenido completo de la primera rama]

## 👨‍💼 Panel de Administración
[contenido completo de la segunda rama]

## 📝 Estructura de Datos
```

**Comprobación:** 
- ✅ Sin marcas de conflicto
- ✅ Contenido coherente y funcional
- ✅ Ambas secciones preservadas

### Evidencia 6: Commit de resolución

```bash
$ git log --oneline -1
ee59276 Resuelto conflicto en README.md - combinadas secciones de catálogo y admin
```

**Comprobación:** Commit con mensaje claro sobre la resolución del conflicto.

### Evidencia 7: Merge exitoso en main

```bash
$ git log --oneline --graph --all -5
*   ee59276 (HEAD -> main, origin/main) Resuelto conflicto en README.md - combinadas secciones de catálogo y admin
|\  
| * e3b0a82 (origin/feature/maria-admin, feature/maria-admin) feat: agregar sección de panel de administración en README
* | 7072c86 (origin/feature/maria-productos, feature/maria-productos) feat: agregar sección de catálogo de productos en README
|/  
* 59dacc6 first commit - SALVAJE Indumentary E-commerce completo
```

**Comprobación:** 
- ✅ El gráfico muestra la divergencia y convergencia de ramas
- ✅ El commit de merge está en la rama `main`
- ✅ Todas las ramas están sincronizadas con `origin`

---

## 🎯 Conclusiones

### Aprendizajes clave

1. **Trabajo con ramas:** Aprendí a crear ramas descriptivas para diferentes funcionalidades
2. **Generación de conflictos:** Comprendí cómo y por qué se generan conflictos en Git
3. **Identificación de conflictos:** Sé reconocer las marcas `<<<<<<<`, `=======`, `>>>>>>>` 
4. **Resolución manual:** Desarrollé habilidades para resolver conflictos de forma coherente
5. **Herramientas visuales:** Utilicé VS Code para facilitar la resolución de conflictos
6. **Commits descriptivos:** Practiqué escribir mensajes claros y significativos
7. **Sincronización:** Aprendí a mantener ramas locales y remotas sincronizadas

### Beneficios del ejercicio

- **Práctica real:** Trabajé con un proyecto real (e-commerce)
- **Contexto significativo:** Los cambios tenían propósito y valor
- **Resolución no trivial:** Combiné contenido de ambas ramas de forma inteligente
- **Documentación:** Todo el proceso está documentado y reproducible

### Habilidades demostradas

✅ Creación y gestión de ramas Git  
✅ Commits con mensajes descriptivos  
✅ Push de ramas al repositorio remoto  
✅ Identificación de conflictos  
✅ Análisis de bloques en conflicto  
✅ Resolución manual usando editor de código  
✅ Finalización correcta del proceso de merge  
✅ Sincronización con repositorio remoto  

---

## 🔗 Enlaces del Proyecto

- **Repositorio:** https://github.com/estmariaarrieta-gif/proyecto-atenea
- **Rama principal:** https://github.com/estmariaarrieta-gif/proyecto-atenea/tree/main
- **Rama productos:** https://github.com/estmariaarrieta-gif/proyecto-atenea/tree/feature/maria-productos
- **Rama admin:** https://github.com/estmariaarrieta-gif/proyecto-atenea/tree/feature/maria-admin
- **Historial de commits:** https://github.com/estmariaarrieta-gif/proyecto-atenea/commits/main
- **Gráfico de red:** https://github.com/estmariaarrieta-gif/proyecto-atenea/network
- **Commit de resolución:** https://github.com/estmariaarrieta-gif/proyecto-atenea/commit/ee59276

---

**Ejercicio completado exitosamente** ✅  
**Fecha de finalización:** 6 de noviembre de 2025  
**Estudiante:** María Arrieta

