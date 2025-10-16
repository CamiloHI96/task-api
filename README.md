# task-api

# Gestor de Tareas

Un gestor de tareas simple y funcional que permite crear, ver, actualizar y eliminar tareas con los siguientes campos:

- **Título**
- **Responsable**
- **Fecha límite**
- **Estado** (Pendiente / Completado / Cancelado)

Desarrollado con un frontend moderno en **React + Vite** y un backend robusto en **Laravel** expuesto como API RESTful.

---

## Tecnologías utilizadas

- **Frontend**:  
  - React  
  - Vite  
  - Bootstrap 5  

- **Backend**:  
  - Laravel
  - API RESTful  
  - MySQL / SQLite (configurable)  

- **Herramientas**:  
  - Git  
  - Composer  
  - npm / pnpm

---

## Estructura del proyecto

## Instalación local

### 1. Clona el repositorio

git clone https://github.com/CamiloHI96/task-api  
cd task-api

## Ejecutar Back-End
cd back-end

# Instala dependencias de PHP
composer install

# Inicia el servidor de Laravel
php artisan serve
# Por defecto: http://127.0.0.1:8000

## Ejecutar Front-End
cd ../front-end

# Instala dependencias de Node.js
npm install

# Configura la URL de la API
# VITE_API_URL=http://127.0.0.1:8000/api

# Inicia la aplicación
npm run dev
# Por defecto: http://localhost:5173