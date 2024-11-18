# Chat Application

Una aplicación de chat en tiempo real construida con React y Material-UI que permite a los usuarios comunicarse de forma instantánea.

## Características

- Autenticación de usuarios
- Chat en tiempo real
- Búsqueda de conversaciones
- Interfaz oscura moderna
- Sistema de respuestas a mensajes
- Indicadores de estado de conexión
- Interfaz responsive

## Tecnologías Utilizadas

- React.js
- Material-UI
- WebSocket (@stomp/stompjs)
- React Router
- Axios
- Bootstrap
- Socket.io

## Requisitos Previos

- Node.js (versión 14 o superior)
- NPM (incluido con Node.js)

## Configuración del Proyecto

1. Clona el repositorio:
```git clone https://github.com/guerreroFacundo/ChatAppFrontend.git```

2. Navega al directorio del proyecto:
```cd chat-application```

3. Instala las dependencias:
```npm install```

4. Crea un archivo .env en la raíz del proyecto y configura las variables de entorno necesarias:
REACT_APP_API_URL=tu_url_api
REACT_APP_WS_URL=tu_url_websocket


5. Inicia la aplicación en modo desarrollo:
```npm start```

La aplicación estará disponible en http://localhost:3000

## Estructura del Proyecto
```
src/
├── components/ # Componentes React
├── context/ # Contextos de React
├── css/ # Estilos CSS
├── hooks/ # Hooks personalizados
├── services/ # Servicios de API y autenticación
└── utils/ # Utilidades y helpers
```

## Componentes Principales

- `ChatLayout`: Layout principal de la aplicación
- `ChatComponent`: Maneja la lógica del chat
- `MessageList`: Lista de mensajes
- `InputArea`: Área de entrada de mensajes
- `LoginComponent`: Manejo de autenticación

## Hooks Personalizados

- `useAuth`: Manejo de autenticación
- `useChat`: Lógica del chat y WebSocket

## Despliegue

Para construir la aplicación para producción:

```npm run build```

Los archivos de producción estarán en el directorio `build/`

## Pruebas

Para ejecutar las pruebas:

```npm test```

## Contribuir

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request


## Contacto

Link del Proyecto: [https://github.com/guerreroFacundo/ChatAppFrontend](https://github.com/guerreroFacundo/ChatAppFrontend)
