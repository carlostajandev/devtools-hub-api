# 🚀 DevToolsHub API

API modular construida con **NestJS** bajo principios de **Arquitectura Hexagonal (Clean Architecture)**.  
El sistema permite gestionar usuarios, autenticación, planes, suscripciones, pagos y notificaciones con envío real de correos vía **Gmail (Nodemailer)**.

---

## 📚 Índice

- [Requisitos](#-requisitos)
- [Instalación y ejecución local](#-instalación-y-ejecución-local)
- [Ejecución con Docker](#-ejecución-con-docker)
- [Variables de entorno (.env)](#-variables-de-entorno-env)
- [Documentación Swagger](#-documentación-swagger)
- [Colección Postman](#-colección-postman)
- [Funcionalidades implementadas](#-funcionalidades-implementadas)
- [Decisiones técnicas](#-decisiones-técnicas)
- [Módulo de notificaciones (envío real de emails)](#-módulo-de-notificaciones-envío-real-de-emails)
- [Librerías principales](#-librerías-principales)
- [Pruebas y validaciones](#-pruebas-y-validaciones)
- [Limitaciones y mejoras futuras](#-limitaciones-y-mejoras-futuras)
- [Tiempo invertido](#-tiempo-invertido)
- [Estructura del proyecto](#-estructura-del-proyecto)

---

## 📦 Requisitos

- Node.js ≥ **v18**
- npm o pnpm
- Docker y Docker Compose (opcional, para entorno completo)
- Cuenta Gmail con **App Password** (para enviar correos)

---

## ⚙️ Instalación y ejecución local

```bash
# 1️⃣ Clonar el repositorio
git clone -b develop https://github.com/carlostajandev/devtools-hub-api.git
cd devtools-hub-api

# 2️⃣ Instalar dependencias
npm install
# o
pnpm install

# 3️⃣ Configurar las variables de entorno
cp .env.example .env
# Edita el archivo .env con tus credenciales locales

# 4️⃣ Ejecutar en modo desarrollo
npm run start:dev
```

✅ Servidor corriendo en:  
[http://localhost:3000/api](http://localhost:3000/api)

---

## 🐳 Ejecución con Docker

Incluye configuración lista para levantar la base de datos y la API.

```bash
docker-compose up -d
```

Servicios disponibles:
- API → `http://localhost:3000`
- Postgres → `localhost:5432`

Para ver logs:
```bash
docker-compose logs -f api
```

---

## 🔧 Variables de entorno (.env)

Ejemplo de configuración:

```bash
# General
NODE_ENV=development
PORT=3000

# Database
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=devtools_hub

# JWT
JWT_SECRET=super_secret_key
JWT_EXPIRES_IN=3600s

# Mail (Gmail con App Password)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USER=tu_correo@gmail.com
MAIL_PASS=tu_app_password
MAIL_FROM="DevToolsHub <tu_correo@gmail.com>"
```

> ⚠️ **Importante:** No subas el archivo `.env` al repositorio.

---

## 📘 Documentación Swagger

Una vez levantado el proyecto:

📍 **Swagger UI:**  
[http://localhost:3000/api/docs](http://localhost:3000/api/docs)

Swagger incluye todos los módulos:
- Auth  
- Users  
- Plans  
- Subscriptions  
- Payments  
- Notifications  

Puedes probar los endpoints directamente desde la interfaz web.

---

## 📬 Colección Postman

Puedes importar la colección completa desde este enlace:

👉 [**DevToolsHub API – Postman Collection**](https://.postman.co/workspace/My-Workspace~8c4dcd28-bbe9-47a6-8c71-41bdf5b10733/collection/16301651-d9172550-b4a9-477b-ba32-7d311adf397b?action=share&creator=16301651)

Flujo sugerido para probar:
1. `POST /api/auth/register` → Crear usuario  
2. `POST /api/auth/login` → Obtener token  
3. `POST /api/plans` → Crear plan  
4. `POST /api/subscriptions` → Asociar usuario a plan  
5. `POST /api/payments` → Crear pago  
6. `PATCH /api/payments/:id/confirm` → Confirmar pago → ✉️ Envía correo real  

---

## 🧩 Funcionalidades implementadas

✅ **Módulo Auth**
- Registro y login con JWT
- Hash seguro con bcrypt

✅ **Módulo Users**
- Actualización de datos
- Manejo seguro del password (no se expone en responses)

✅ **Módulo Plans**
- CRUD de planes de suscripción

✅ **Módulo Subscriptions**
- Asociación entre usuario y plan
- Control de estado de suscripción

✅ **Módulo Payments**
- Creación y confirmación de pagos
- Dispara notificación por correo al confirmarse

✅ **Módulo Notifications**
- Envío de correos reales vía Gmail (Nodemailer)
- Mensajes personalizados con HTML y datos dinámicos

---

## 🧠 Decisiones técnicas

- **Arquitectura hexagonal (puertos y adaptadores)**  
  Cada módulo (auth, users, payments...) tiene capas:
  - `domain`: entidades y contratos (repositorios abstractos)
  - `application`: casos de uso
  - `infrastructure`: persistencia, controladores, adaptadores
  - `presentation`: DTOs (validación y transporte)

- **Desacoplamiento total de dependencias:**  
  Los casos de uso nunca dependen de TypeORM o Nodemailer directamente.

- **DTOs y mappers:**  
  Controlan entrada/salida, garantizan que la API no filtre datos sensibles (ej: password).

- **Validaciones globales:**  
  `ValidationPipe` y `class-validator` aseguran integridad de los datos.

- **Seguridad:**  
  - `helmet` para cabeceras HTTP seguras.  
  - `bcrypt` para hashing.  
  - CORS libre durante desarrollo.

- **Documentación automática con Swagger.**

---

## ✉️ Módulo de notificaciones (envío real de emails)

Los correos se envían mediante **Nodemailer**, configurado como adaptador independiente.

### 📌 Eventos de envío de correo:
- **Al registrarse un usuario:** se envía mensaje de bienvenida.  
- **Al confirmar un pago:** se envía correo de confirmación con detalle del plan y usuario.

### 📤 Ejemplo de correo:
- Asunto: `"Tu pago ha sido confirmado ✅"`
- Cuerpo:  
  ```
  Hola Carlos A. Tajan,
  tu pago del plan Premium ha sido procesado correctamente.
  Gracias por confiar en DevToolsHub.
  ```

### 🧰 Configuración Gmail
1. Activar autenticación en dos pasos.  
2. Crear App Password en [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)  
3. Usar ese password en `MAIL_PASS` del `.env`.

---

## 🧰 Librerías principales

| Categoría | Librería |
|------------|-----------|
| Framework | `@nestjs/core`, `@nestjs/common`, `@nestjs/typeorm` |
| ORM | `typeorm`, `pg` |
| Seguridad | `helmet`, `bcrypt` |
| Validación | `class-validator`, `class-transformer` |
| Documentación | `@nestjs/swagger`, `swagger-ui-express` |
| Correo | `nodemailer` |
| Testing | `jest`, `@nestjs/testing` |

---

## 🧾 Pruebas y validaciones

- **Manual:** Swagger o colección Postman.  
- **Unitarias:**  
  - `RegisterUseCase`
  - `ConfirmPaymentUseCase`
  - `SendPaymentConfirmationUseCase`
- **Integración:**  
  Flujo completo de registro → plan → suscripción → pago → confirmación → correo.

---

## ⚠️ Limitaciones y mejoras futuras

- Integrar pasarela de pagos real (Stripe, PayPal).  
- Implementar roles y permisos (admin vs user).  
- Crear migraciones con TypeORM.  
- Añadir rate limiting y cache (Redis).  
- Desplegar CI/CD en GitHub Actions.  

---

## ⏱ Tiempo invertido

| Tarea | Tiempo estimado |
|-------|------------------|
| Diseño de arquitectura y setup | 6 h |
| Implementación Auth, Users | 6 h |
| Plans, Subscriptions, Payments | 8 h |
| Notifications (Nodemailer) | 3 h |
| Documentación (Swagger, README) | 2 h |
| **Total** | **~25 h** |

---

## 📁 Estructura del proyecto

```
src/
├── config/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── plans/
│   ├── subscriptions/
│   ├── payments/
│   └── notifications/
└── shared/
    ├── filters/
    ├── interceptors/
    └── utils/
```

Cada módulo incluye:
- **domain** → entidades y repositorios abstractos  
- **application** → casos de uso  
- **infrastructure** → controladores, persistencia, adaptadores  
- **presentation** → DTOs y mapeos  

---

📘 **Autor:** Carlos A. Tajan  
📅 **Versión:** 1.0.0  
📧 **Contacto:** carlostajandev@gmail.com  
