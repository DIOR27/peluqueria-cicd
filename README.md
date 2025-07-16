# 💇 Proyecto D'Pelos Peluquería

**Grupo 6 – MÁSTER UNIVERSITARIO EN DESARROLLO WEB Y APLICACIONES**

Proyecto D'Pelos es una solución integral para la gestión de reservas en una peluquería, desarrollada como parte del máster en desarrollo web. Combina un backend robusto en Django con un frontend moderno en React y TailwindCSS para ofrecer una experiencia fluida y profesional tanto para usuarios como para administradores del negocio.

---

## 🧠 Tecnologías utilizadas

### 🔧 Backend – Django
- Django 5.1
- Django REST Framework
- Autenticación con JWT
- Envío de correos
- Base de datos: MySQL
- Estructura modular por apps

### 🎨 Frontend – React + TailwindCSS
- Vite como bundler
- TailwindCSS para estilos responsive
- React Router DOM para navegación
- Consumo de API REST con `fetch` y `axios`

---

## 🚀 Funcionalidades principales

### Usuarios
- Registro de clientes y administradores
- Gestión de roles mediante `Groups`
- Edición de perfil

### Especialistas
- Registro de especialistas
- Asociación dinámica de servicios ofrecidos
- Activación/desactivación de disponibilidad

### Servicios
- Gestión de catálogo con precio, duración e imagen
- Filtrado por disponibilidad

### Reservas
- Reservas con validación de horario y solapamientos
- Códigos únicos de reserva
- Confirmación automática por correo electrónico
- Consulta de reserva por código

### Panel de administrador
- Gestión CRUD de usuarios, servicios, especialistas y reservas
- Activación/inactivación de elementos del sistema

---

## 📁 Estructura del proyecto

```
dpelos/             # Backend Django
├── dpelos/         # Configuración Django (settings, urls)
├── peluqueria/     # App principal con modelos, vistas, serializers

dpelos-client/      # Frontend React
├── src/
│   ├── pages/      # Páginas principales
│   ├── components/ # Componentes reutilizables
│   └── stores/     # Gestión de estado
```

---

## 👨‍💻 Autores

- **Daniel Borja**
- **Diego Orellana**
- **Juan Escaffi**
- **Mauricio Morocho**

---

## 📦 Instalación y uso

### 🔹 Backend

```bash
cd dpelos
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 🔹 Frontend

```bash
cd dpelos-client
npm install
npm run dev
```
