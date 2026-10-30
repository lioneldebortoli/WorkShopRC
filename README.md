
# ¿Por dónde empiezo a programar? · Workshop Rolling Code School

Landing page para vender las entradas del workshop **"¿Por dónde empiezo a programar?"** de Rolling Code School: una tarde con diez speakers para ordenar los primeros pasos en programación.

🔗 **Página online:** https://work-shop-rc.vercel.app
📁 **Repositorio:** https://github.com/lioneldebortoli/WorkShopRC

---

## 📅 El evento

- **Fecha:** jueves 19/11, de 18.00 a 21.40 hs
- **Lugar:** Rolling Code School, Gral. Paz 576, Entrepiso, San Miguel de Tucumán
- **Modalidades:** presencial (120 lugares) y virtual
- **Entradas:** Early Bird $25.000 (hasta el 31/10) · General $35.000 · Virtual $15.000

---

## 🧩 Secciones

| Sección | Descripción |
|---|---|
| **Navbar** | Menú fijo con link activo según la sección, botón de modo claro/oscuro y menú lateral en celular |
| **Hero** | Presentación del workshop, datos del evento y accesos a la compra |
| **Estadísticas** | Números clave con contador animado |
| **Speakers** | Los 10 speakers con su charla; se pueden marcar como favoritas; carrusel en celular |
| **Agenda** | Cronograma completo y pestaña "Mi agenda" con las charlas marcadas |
| **Preguntas a los speakers** | Formulario para dejar preguntas, votarlas y filtrarlas por speaker |
| **Sponsors** | Empresas que acompañan el evento, en tres niveles |
| **Testimonios** | Carrusel con opiniones de asistentes de ediciones anteriores |
| **Entradas** | Planes con cuenta regresiva del Early Bird y barra de cupos |
| **Compra Segura** | Checkout en 4 pasos: entradas, datos, pago y confirmación con entrada descargable |
| **Sumate como Sponsor** | Formulario para empresas que quieren auspiciar el evento |
| **Cómo llegar** | Dirección y mapa |
| **Footer** | Logo y redes sociales |
| **Chatbot** | Asistente flotante que responde preguntas frecuentes |
| **Página 404** | Se muestra al entrar a una ruta que no existe |

---

## ✨ Funcionalidades

### Compra de entradas
- **Varias entradas en una compra:** se pueden combinar Early Bird, General y Virtual, escribir la cantidad a mano y nunca superar el stock disponible.
- **Cupones de descuento:** por porcentaje o por monto fijo, para todas las entradas o solo para algunas, y con fecha de vencimiento.
- **Pago con validaciones:** formato automático de la tarjeta (`4509 1234 ...` y `MM/AA`), detección de Visa o Mastercard, verificación del número (algoritmo de Luhn) y aviso de tarjeta vencida.
- **Entrada con código QR:** al terminar, cada entrada tiene su código único y se puede descargar como imagen PNG.
- **De Entradas al checkout:** al elegir un plan, la página baja a Compra Segura con esa entrada seleccionada.

### Agenda personal
- **Favoritos:** se marcan charlas con la estrella desde Speakers o Agenda.
- **Mi agenda:** muestra solo las charlas marcadas, ordenadas por horario.

### Preguntas a los speakers
- Se dejan preguntas para la charla de cada speaker, con validación de los campos.
- Se pueden votar y ordenar por más votadas o más recientes.

### Chatbot
- Responde sobre fecha, precios, modalidad, speakers, horarios, ubicación, certificado y sponsors.
- Entiende la pregunta aunque tenga errores de tipeo y sugiere preguntas relacionadas.
- Puede llevar a una sección, marcar charlas como favoritas, cargar entradas en el checkout o mostrar la última compra.
- La conversación queda guardada al recargar la página.

### Modo claro / oscuro
- Botón sol/luna en la navbar (dentro del menú en celular).
- Arranca en oscuro y recuerda la elección en el navegador, sin parpadeo al cargar.
- La paleta clara está basada en la web de Rolling Code School.

### Otros
- **Formulario de sponsors:** validación de campos, email corporativo, carga del logo (clic o arrastrar; PNG, SVG, JPG o WEBP de hasta 5 MB) y contador de caracteres.
- **Botón "Volver arriba"** con scroll suave. Los botones flotantes suben al llegar al footer para no taparlo.
- **Animaciones al hacer scroll** en todas las secciones.
- **Diseño responsive:** probado desde celulares de 320 px hasta pantallas de 1920 px.
- **Accesibilidad:** textos alternativos en las imágenes, navegación con teclado y respeto por la opción "reducir movimiento" del sistema.

> La pasarela de pago y los formularios son de demostración: no procesan pagos ni envían datos. Los favoritos, las preguntas, la conversación del chatbot y el tema elegido se guardan solo en el navegador (`localStorage`).

---

## 🛠️ Tecnologías

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- JavaScript
- [qrcode.react](https://github.com/zpao/qrcode.react) (código QR de las entradas)
- [html-to-image](https://github.com/bubkoo/html-to-image) (descarga de la entrada como imagen)
- [Vitest](https://vitest.dev/) (tests)
- [Simple Icons](https://simpleicons.org/) (logos de sponsors)
- [OpenStreetMap](https://www.openstreetmap.org/) (mapa)
- Deploy en [Vercel](https://vercel.com/)

> El uso de React y Tailwind en lugar de Bootstrap fue aprobado por el Product Owner.

---

## 📂 Estructura

```
src/
├── assets/          # Logos, íconos, fotos de speakers e imágenes
├── components/      # Una sección por componente
│   ├── checkout/    # Pasos, campos, resumen y entrada con QR del checkout
│   └── Reveal.jsx   # Animación de entrada reutilizable
├── data/            # Contenido: charlas, entradas, cupones, testimonios y respuestas del chatbot
├── hooks/           # Lógica reutilizable: tema, favoritos, localStorage, animaciones
├── pages/
│   └── Error404.jsx
├── utils/           # Funciones puras: tarjeta, cupones, validaciones, formato, chatbot (con tests)
├── App.jsx          # Rutas y orden de las secciones
├── index.css        # Colores de los modos claro y oscuro, y estilos globales
└── main.jsx
```

---

## 🚀 Cómo correrlo

Requisitos: [Node.js](https://nodejs.org/) y [pnpm](https://pnpm.io/).

```bash
# 1. Clonar el repositorio
git clone https://github.com/lioneldebortoli/WorkShopRC.git
cd WorkShopRC

# 2. Instalar dependencias
pnpm install

# 3. Levantar el servidor de desarrollo
pnpm dev
```

Se abre en http://localhost:5173.

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Genera la versión para producción |
| `pnpm preview` | Muestra la versión de producción en local |
| `pnpm lint` | Revisa el código con ESLint |
| `pnpm test` | Corre los tests con Vitest |

### Cupones para probar

| Código | Descuento |
|---|---|
| `ROLLING10` | 10% en todas las entradas |
| `ESTUDIANTE` | 20% en todas las entradas (hasta el 18/11) |
| `TUCUMAN` | $3.000 en Early Bird y General |
| `VIRTUAL50` | 50% en la entrada Virtual |

---

## 👥 Equipo · Grupo 4

| Integrante | Rol |
|---|---|
| Paulina Sleiman | Scrum Master |
| Abraham Aguilar | Desarrollador |
| Lionel Debortoli | Desarrollador |
| Guadalupe Andriani | Desarrolladora |
| Lautaro López | Desarrollador |

---

## 📋 Metodología

El proyecto se trabajó con **Scrum** en un sprint:

- **Tablero:** Trello (Sprint Backlog › In progress › Code Review › Testing › Done)
- **Historias de usuario:** una por sección (HU-001 a HU-014)
- **Ramas:** una por historia (`feature/hu-XXX/...`), unidas a `dev` mediante pull requests
- **Reuniones:** Sprint Planning, Dailies, Sprint Review y Retrospectiva

---

Proyecto realizado para el **Scrum Professional Bootcamp** de [Rolling Code School](https://rollingcodeschool.com/).
