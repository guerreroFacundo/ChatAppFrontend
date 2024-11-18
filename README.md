# Chat Application

Una aplicación de chat en tiempo real construida con React y Material-UI que permite a los usuarios comunicarse de forma instantánea.

## Características

- Autenticación de usuarios segura
- Chat en tiempo real con WebSocket
- Sistema de mensajería instantánea
- Interfaz oscura moderna y personalizable
- Sistema de respuestas a mensajes con threading
- Indicadores de estado de conexión en tiempo real
- Diseño totalmente responsive
- Búsqueda avanzada de conversaciones
- Notificaciones en tiempo real
- Emojis y reacciones a mensajes

## Tecnologías Utilizadas

- React 18
- Material-UI v5
- WebSocket (@stomp/stompjs)
- React Router v6
- Axios
- Context API
- Custom Hooks
- Jest para testing

## Requisitos Previos

- Node.js (versión 16 o superior)
- NPM (versión 8 o superior)
- Conexión a Internet

## Configuración del Proyecto

1. Clona el repositorio:
```bash
git clone https://github.com/guerreroFacundo/ChatAppFrontend.git
```

2. Navega al directorio del proyecto:
```bash
cd chat-application
```

3. Instala las dependencias:
```bash
npm install
```

4. Configura las variables de entorno:
Crea un archivo `.env` en la raíz del proyecto con:
```
REACT_APP_API_URL=tu_url_api
REACT_APP_WS_URL=tu_url_websocket
```

5. Inicia la aplicación:
```bash
npm start
```

La aplicación estará disponible en http://localhost:3000

## Estructura del Proyecto
```
src/
├── components/     # Componentes React reutilizables
│   ├── routing/   # Componentes de enrutamiento
├── context/       # Contextos de React (Auth, Theme, etc.)
├── css/           # Estilos modulares
├── hooks/         # Hooks personalizados
├── services/      # Servicios de API y autenticación
└── utils/         # Utilidades y helpers
```

## Componentes Principales

- `ChatLayout`: Estructura principal de la aplicación
- `ChatComponent`: Gestión de la lógica del chat
- `MessageList`: Visualización de mensajes
- `InputArea`: Entrada de mensajes con funciones avanzadas
- `LoginComponent`: Sistema de autenticación
- `ReplyBox`: Sistema de respuestas
- `MessageBubble`: Visualización de mensajes individuales

## Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm test`: Ejecuta las pruebas
- `npm run build`: Construye la app para producción
- `npm run eject`: Expone la configuración de webpack

## Testing

El proyecto incluye:
- Tests unitarios con Jest
- Tests de integración
- Tests de componentes con React Testing Library

Para ejecutar las pruebas:
```bash
npm test
```

## Despliegue

1. Construye la aplicación:
```bash
npm run build
```

2. Los archivos de producción estarán en `build/`

## Contribuir

1. Fork del proyecto
2. Crea tu rama de feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit de cambios (`git commit -m 'Añade nueva característica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Crea un Pull Request

## Guía de Estilo

- Utiliza ESLint y Prettier para el formato del código
- Sigue las convenciones de nombres de React
- Documenta los componentes principales
- Escribe tests para nuevas características

## Soporte

Para reportar bugs o solicitar nuevas características, por favor:
1. Revisa los issues existentes
2. Crea un nuevo issue con detalles específicos
3. Incluye pasos para reproducir el problema



## Contacto

Link del Proyecto: [https://github.com/guerreroFacundo/ChatAppFrontend](https://github.com/guerreroFacundo/ChatAppFrontend)
