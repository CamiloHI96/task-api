# 🚀 Gestor de Tareas - task-api

Un gestor de tareas simple y funcional que permite crear, ver, actualizar y eliminar tareas con los siguientes campos:

- **Título**
- **Responsable**
- **Fecha**
- **Estado** (Pendiente / Completado / Cancelado)

Desarrollado con un frontend moderno en **React + Vite** y un backend robusto en **Laravel**, expuesto como **API RESTful**.

---

## Tecnologías utilizadas

- **Frontend**: React, Vite, Bootstrap 5  
- **Backend**: Laravel, API RESTful, MySQL  
- **Herramientas**: Git, Composer, npm / pnpm  

---

## Estructura del proyecto

task-api/  
├── back-end/ → Proyecto Laravel (API)  
├── front-end/ → Proyecto React + Vite  
└── basedatos.txt → Script SQL para crear la base de datos  

---

## Instalación local

### 1️⃣ Clonar el repositorio
git clone https://github.com/CamiloHI96/task-api  
cd task-api  

### 2️⃣ Configurar la base de datos
Antes de ejecutar el backend, **lee el archivo `basedatos.txt`** ubicado en la raíz del proyecto para crear la base de datos y la tabla necesaria en tu gestor MySQL.

---

## Ejecutar Proyecto
cd task-api

## Ejecutar Back-End
cd /back-end

# Instala dependencias de PHP  
composer install  

# Inicia el servidor de Laravel  
php artisan serve --host=0.0.0.0 --port=8000  
# Por defecto: http://127.0.0.1:8000  

## Ejecutar Front-End
cd /front-end

# Instala dependencias de Node.js  
npm install  

# Crea un archivo .env en la raíz de front-end con el siguiente contenido:  
# VITE_API_URL=http://192.168.1.1:8000   ← reemplaza con tu IP local  

# Inicia la aplicación  
npm run dev -- --host  
# Por defecto: http://localhost:5173  

# Puedes acceder desde otro dispositivo en la misma red:  
# http://192.168.1.1:5173  

---

## Acceso desde otro dispositivo (en la misma red local)

1. Asegúrate de que tu **PC y teléfono estén conectados al mismo Wi-Fi**.  
2. En la terminal de tu PC, ejecuta:
   ipconfig  
   Copia la dirección **IPv4** (por ejemplo: `192.168.1.1`).  
3. Usa esa IP en el archivo `.env` del frontend y para acceder desde tu celular:  
   http://192.168.1.1:5173  
4. Si no se conecta, desactiva temporalmente el **firewall de Windows** o permite el acceso a PHP y Node.js.  

---

## Resumen rápido

| Componente | Comando | Acceso local | Acceso en red |
|-------------|----------|---------------|----------------|
| **Backend (Laravel)** | php artisan serve --host=0.0.0.0 --port=8000 | http://127.0.0.1:8000 | http://192.168.1.1:8000 |
| **Frontend (Vite)** | npm run dev -- --host | http://localhost:5173 | http://192.168.1.1:5173 |

---

## Autor
**Camilo Hernández**  
Estudiante de Ingeniería de Software | Desarrollador Full Stack  
📧 [camilohi.1196@gmail.com]