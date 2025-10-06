# Org Divisions Backend

API REST para gestionar divisiones y subdivisiones de una organización.  
Desarrollado en **NestJS + TypeORM + MySQL (Docker)**.

---

## 🚀 Requisitos

- Node.js v18+
- Docker + Docker Compose
- NPM v9+

---

## 🛠 Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd org-divisions-backend

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env
```

---

## ⚙️ Configuración

Crear un archivo `.env` con las siguientes variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=secret
DB_NAME=divisions_db
PORT=3000
CORS_ORIGIN=http://localhost:4200
```

---

## 🐳 Base de datos (MySQL con Docker)

```bash
docker compose up -d
```

Esto crea un contenedor MySQL en `localhost:3306`.

---

## 🗄 Migraciones

Genera y corre migraciones:

```bash
npm run migration:generate
npm run migration:run
```

---

## 🌱 Seed inicial

Carga divisiones de prueba:

```bash
npm run seed
```

---

## ▶️ Correr la aplicación

```bash
npm run start:dev
```

Por defecto corre en:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 📖 Swagger Docs

La documentación de la API está disponible en:  
👉 [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 🔑 Endpoints principales

- `POST /divisions` → Crear división/subdivisión  
- `GET /divisions` → Listar todas las divisiones  
- `GET /divisions/:id` → Obtener división por ID  
- `GET /divisions/:id/subdivisions` → Listar subdivisiones directas  
- `PATCH /divisions/:id` → Actualizar división  
- `DELETE /divisions/:id` → Eliminar división (si no tiene hijos)

---

## 📂 Estructura del proyecto

```
src/
 ├── divisions/
 │   ├── division.entity.ts
 │   ├── divisions.controller.ts
 │   ├── divisions.service.ts
 │   └── dto/
 ├── database/
 │   ├── datasource.ts
 │   └── migrations/
 └── main.ts
```

---

## 🚀 Deployment en Render

### Variables de entorno requeridas:

Configura estas variables en la interfaz de Render (no uses archivos .env en producción):

```env
NODE_ENV=production
PORT=3000
DB_HOST=your-database-host
DB_PORT=your-database-port
DB_USER=your-database-user
DB_PASS=your-database-password
DB_NAME=your-database-name
CORS_ORIGIN=https://org-divisions-frontend.vercel.app,http://localhost:4200
DB_SSL=false
```

> 💡 **Tip**: Consulta `.env.prod.example` para ver ejemplos de configuración

### Configuración en Render:

**Opción A (Automático con postbuild):**
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`

**Opción B (Manual):**
- **Build Command**: `npm install && npm run build:prod`
- **Start Command**: `npm run start:prod`

**Configuraciones adicionales:**
- **Environment**: Node
- **Region**: Cualquiera (recomendado: Oregon)
- **Auto-Deploy**: Activado (rama `main` o `dev`)

---