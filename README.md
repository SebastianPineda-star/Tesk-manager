#  Task Manager App

Una aplicación moderna de gestión de tareas construida con React, TypeScript y Firebase. Permite a los usuarios crear, editar, eliminar y organizar sus tareas con un sistema de autenticación seguro y una interfaz de usuario oscura y profesional.

##  Características

### Autenticación
-  Registro de nuevos usuarios
-  Inicio de sesión con email y contraseña
-  Protección de rutas privadas
-  Gestión de sesiones con Firebase Auth

### Gestión de Tareas
-  **Crear tareas** con título, descripción, fecha de vencimiento y prioridad
-  **Editar tareas** existentes
-  **Eliminar tareas**
-  **Marcar tareas como completadas**
-  **Sistema de etiquetas** para organizar tareas
-  **Filtros avanzados**:
  - Por estado (Pendiente, En progreso, Completada)
  - Por prioridad (Alta, Media, Baja)
  - Por etiquetas
-  **Búsqueda** por título o descripción
-  **Barra de progreso** que muestra el porcentaje de tareas completadas

### Interfaz de Usuario
-  **Tema oscuro profesional** con diseño moderno
-  **Diseño responsive** para móviles y tablets
-  **Animaciones suaves** y transiciones
-  **Componentes reutilizables** y bien estructurados
-  **Feedback visual** en todas las interacciones

##  Tecnologías Utilizadas

### Frontend
- **React 19.2.0** - Biblioteca de UI
- **TypeScript 5.9.3** - Tipado estático
- **Vite 7.2.2** - Build tool y dev server
- **React Router DOM 7.9.6** - Enrutamiento

### Backend y Base de Datos
- **Firebase 12.5.0**
  - Firebase Authentication - Autenticación de usuarios
  - Cloud Firestore - Base de datos NoSQL

### Estilos
- **CSS Personalizado** - Sistema de diseño con variables CSS
- **Tailwind CSS 4.1.17** - Framework CSS utility-first (opcional)
- **PostCSS** - Procesamiento de CSS

### Herramientas de Desarrollo
- **ESLint** - Linter para código JavaScript/TypeScript
- **TypeScript ESLint** - Reglas específicas para TypeScript

## Estructura del Proyecto

```
nueva-app/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── LoginForm.tsx   # Formulario de inicio de sesión
│   │   ├── RegisterForm.tsx # Formulario de registro
│   │   ├── TaskForm.tsx    # Formulario de creación/edición de tareas
│   │   ├── TaskItem.tsx    # Componente individual de tarea
│   │   ├── TaskList.tsx    # Lista de tareas
│   │   └── PrivateRoute.tsx # Componente de protección de rutas
│   ├── context/            # Context API para estado global
│   │   ├── AuthContext.tsx # Contexto de autenticación
│   │   └── TaskContext.tsx # Contexto de tareas
│   ├── pages/              # Páginas de la aplicación
│   │   ├── LoginPage.tsx   # Página de inicio de sesión
│   │   ├── RegisterPage.tsx # Página de registro
│   │   └── DashboardPage.tsx # Página principal del dashboard
│   ├── services/           # Servicios y lógica de negocio
│   │   ├── firebase.ts     # Configuración de Firebase
│   │   └── taskService.ts  # Servicios CRUD de tareas
│   ├── App.tsx             # Componente raíz con rutas
│   ├── main.tsx            # Punto de entrada de la aplicación
│   └── index.css           # Estilos globales y tema
├── .gitignore              # Archivos ignorados por Git
├── eslint.config.js        # Configuración de ESLint
├── package.json            # Dependencias y scripts
├── postcss.config.js       # Configuración de PostCSS
├── tailwind.config.ts      # Configuración de Tailwind CSS
├── tsconfig.json           # Configuración de TypeScript
└── vite.config.ts          # Configuración de Vite
```

## Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn
- Cuenta de Firebase

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd nueva-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Firebase**
   
   Crea un proyecto en [Firebase Console](https://console.firebase.google.com/) y obtén tu configuración:
   
   - Ve a Configuración del proyecto > Configuración general
   - En "Tus aplicaciones", selecciona la opción web
   - Copia las credenciales de configuración
   
   Actualiza el archivo `src/services/firebase.ts` con tus credenciales:
   ```typescript
   const firebaseConfig = {
     apiKey: "TU_API_KEY",
     authDomain: "TU_AUTH_DOMAIN",
     projectId: "TU_PROJECT_ID",
     storageBucket: "TU_STORAGE_BUCKET",
     messagingSenderId: "TU_MESSAGING_SENDER_ID",
     appId: "TU_APP_ID"
   };
   ```

4. **Configurar Firestore**
   
   En Firebase Console:
   - Ve a Firestore Database
   - Crea una base de datos en modo de prueba
   - Crea una colección llamada `tasks`

5. **Configurar Reglas de Seguridad de Firestore**
   
   En Firebase Console > Firestore Database > Reglas:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /tasks/{taskId} {
         allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
         allow create: if request.auth != null && request.auth.uid == request.resource.data.uid;
       }
     }
   }
   ```

6. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta ESLint para verificar el código

## Sistema de Diseño

### Variables CSS
El proyecto utiliza un sistema de variables CSS para mantener la consistencia:

- **Colores principales**: Fondos oscuros (`--color-bg-primary`, `--color-bg-secondary`, etc.)
- **Colores de texto**: Texto claro con diferentes niveles de opacidad
- **Colores de acento**: Azul profesional para elementos interactivos
- **Colores de estado**: Verde (éxito), Naranja (advertencia), Rojo (error)
- **Espaciado**: Sistema de espaciado consistente (`--spacing-xs` a `--spacing-2xl`)
- **Transiciones**: Animaciones suaves y consistentes

### Componentes CSS Personalizados

#### Botones
- `.btn` - Estilo base de botón
- `.btn-primary` - Botón principal con gradiente
- `.btn-secondary` - Botón secundario
- `.btn-outline` - Botón con borde
- `.btn-danger` - Botón de acción destructiva
- `.btn-sm`, `.btn-lg` - Tamaños de botón

#### Formularios
- `.form-group` - Contenedor de campo de formulario
- `.form-label` - Etiqueta de formulario
- `.form-input` - Campo de entrada de texto
- `.form-textarea` - Área de texto
- `.form-select` - Selector personalizado
- `.form-error` - Mensaje de error
- `.form-help` - Texto de ayuda

#### Tarjetas
- `.card` - Contenedor de tarjeta
- `.card-header` - Encabezado de tarjeta
- `.card-title` - Título de tarjeta
- `.card-body` - Cuerpo de tarjeta

## Autenticación

La aplicación utiliza Firebase Authentication para gestionar usuarios:

- **Registro**: Los usuarios pueden crear una cuenta con email y contraseña
- **Inicio de sesión**: Autenticación con credenciales
- **Protección de rutas**: El componente `PrivateRoute` protege rutas que requieren autenticación
- **Gestión de sesión**: El estado de autenticación se gestiona globalmente con Context API

## Gestión de Tareas

### Modelo de Datos
```typescript
interface Task {
  title: string;                    // Título de la tarea
  description: string;              // Descripción detallada
  dueDate: string;                   // Fecha de vencimiento (formato ISO)
  priority: "Alta" | "Media" | "Baja"; // Nivel de prioridad
  status: "Pendiente" | "En progreso" | "Completada"; // Estado
  tags?: string[];                   // Etiquetas opcionales
  id?: string;                       // ID único de Firestore
  uid: string;                       // ID del usuario propietario
}
```

### Operaciones CRUD
- **Create**: Crear nuevas tareas con todos los campos requeridos
- **Read**: Leer tareas del usuario autenticado
- **Update**: Actualizar tareas existentes (edición completa o cambio de estado)
- **Delete**: Eliminar tareas permanentemente

### Filtros y Búsqueda
- Filtro por estado (Pendiente, En progreso, Completada)
- Filtro por prioridad (Alta, Media, Baja)
- Filtro por etiquetas
- Búsqueda de texto en título y descripción

## Context API

La aplicación utiliza React Context API para gestión de estado global:

### AuthContext
- Proporciona el estado del usuario autenticado
- Se actualiza automáticamente cuando cambia el estado de autenticación
- Hook: `useAuth()`

### TaskContext
- Gestiona todas las operaciones relacionadas con tareas
- Sincroniza con Firestore
- Proporciona funciones para CRUD de tareas
- Hook: `useTasks()`

## Rutas de la Aplicación

- `/` - Redirige a `/login`
- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/dashboard` - Dashboard principal (requiere autenticación)

## Características Futuras

- [ ] Recuperación de contraseña
- [ ] Perfil de usuario
- [ ] Notificaciones de tareas próximas a vencer
- [ ] Vista de calendario
- [ ] Exportar tareas a PDF
- [ ] Compartir tareas con otros usuarios
- [ ] Modo claro/oscuro toggle
- [ ] Drag and drop para reordenar tareas
- [ ] Subtareas y proyectos

## Solución de Problemas

### Error: "Firebase: Error (auth/network-request-failed)"
- Verifica tu conexión a internet
- Revisa que las credenciales de Firebase sean correctas

### Error: "Permission denied" en Firestore
- Verifica las reglas de seguridad de Firestore
- Asegúrate de que el usuario esté autenticado

### Los estilos no se aplican
- Verifica que `index.css` esté importado en `main.tsx`
- Asegúrate de que las clases CSS personalizadas estén correctamente escritas

## Licencia

Este proyecto es privado y de uso personal.

## Autor

Desarrollado como proyecto de gestión de tareas personal.

---

**Nota**: Recuerda configurar correctamente Firebase antes de usar la aplicación en producción. Las credenciales en el código son de ejemplo y deben ser reemplazadas con tus propias credenciales de Firebase.

