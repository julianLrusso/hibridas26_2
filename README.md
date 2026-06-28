# GameVault - Catálogo de Videojuegos

Aplicación fullStack para gestión de un catálogo de videojuegos con autenticación de usuarios, roles (USER/ADMIN/SUPERADMIN), y operaciones CRUD sobre videojuegos, categorías y plataformas.

## Tecnologías

- **Backend:** Node.js + Express 5 + MongoDB (driver nativo)
- **Frontend:** React 19 + Vite 8 + React Router 7 + Bootstrap 5
- **Autenticación:** JWT + bcryptjs
- **Validación:** Yup (backend) + react-hook-form (frontend)
- **Tiempo real:** Socket.IO

## Requisitos previos

- Node.js 18+
- MongoDB (local o Atlas)

## Configuración

### 1. Clonar el repositorio e instalar dependencias

```bash
cd back
pnpm install

cd ../front
pnpm install
```

### 2. Variables de entorno

Editar `back/.env`:

```env
SECRET_PASSWORD = tu_secreto_jwt
MONGO_URI = mongodb+srv://usuario:contraseña@cluster.mongodb.net/
```

Si usás MongoDB local:
```env
MONGO_URI = mongodb://localhost:27017
```

### 3. Poblar la base de datos (opcional)

```bash
cd back
pnpm run seed
```

Esto crea la base `dwn4av` con datos de prueba:

- 3 videojuegos, 5 categorías, 4 plataformas
- 3 usuarios con distintos roles

## Ejecución

### Backend (puerto 2026)

```bash
cd back
pnpm run dev
```

Documentación Swagger disponible en `http://localhost:2026/api-docs`

### Frontend (puerto 5173)

```bash
cd front
pnpm run dev
```

Abrir `http://localhost:5173`

## Usuarios de prueba

| Email | Contraseña | Rol |
|---|---|---|
| bart@simpson.com | asdASD123@ | SUPERADMIN |
| admin@test.com | Admin123@ | ADMIN |
| user@test.com | User123@ | USER |
