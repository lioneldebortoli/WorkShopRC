# ¿Por dónde empiezo a programar? · Workshop Rolling Code School

Landing page para vender las entradas del workshop **"¿Por dónde empiezo a programar?"** de Rolling Code School: una tarde con diez speakers para ordenar los primeros pasos en programación.

🔗 **Página online:** https://work-shop-rc.vercel.app
📁 **Repositorio:** https://github.com/lioneldebortoli/WorkShopRC

---

## 📅 El evento

- **Fecha:** jueves 19/11, de 18.00 a 21.40 hs
- **Lugar:** Rolling Code School, Gral. Paz 576, Entrepiso, San Miguel de Tucumán
- **Modalidades:** presencial (120 lugares) y virtual
- **Entradas:** Early Bird $25.000 · General $35.000 · Virtual $15.000

---

## 🧩 Secciones

| Sección | Descripción |
|---|---|
| **Navbar** | Menú fijo con link activo según la sección y menú lateral en celular |
| **Hero** | Presentación del workshop, datos del evento y accesos a la compra |
| **Estadísticas** | Números clave con contador animado |
| **Speakers** | Los 10 speakers con su charla; carrusel en celular |
| **Agenda** | Cronograma completo de las charlas |
| **Sponsors** | Empresas que acompañan el evento, en tres niveles |
| **Entradas** | Planes con cuenta regresiva del Early Bird y barra de cupos |
| **Compra Segura** | Checkout en 4 pasos: entrada, datos, pago y confirmación |
| **Sumate como Sponsor** | Formulario para empresas que quieren auspiciar el evento |
| **Cómo llegar** | Dirección y mapa |
| **Footer** | Logo y redes sociales |
| **Página 404** | Se muestra al entrar a una ruta que no existe |

---

## ✨ Funcionalidades

- **Checkout con validaciones:** formato automático de la tarjeta (`4509 1234 ...` y `MM/AA`), detección de Visa o Mastercard, verificación del número (algoritmo de Luhn) y aviso de tarjeta vencida.
- **De Entradas al checkout:** al elegir un plan, la página baja a Compra Segura con esa entrada seleccionada.
- **Formulario de sponsors:** validación de campos, email corporativo, carga del logo (clic o arrastrar; PNG, SVG, JPG o WEBP de hasta 5 MB) y contador de caracteres.
- **Chatbot de preguntas frecuentes:** responde sobre fecha, precios, modalidad, speakers, ubicación, certificado y sponsors, con accesos directos a cada sección.
- **Botón "Volver arriba"** con scroll suave.
- **Animaciones al hacer scroll** en todas las secciones.
- **Diseño responsive:** probado en celular (375 px), tablet (768 px) y computadora (1440 px).
- **Accesibilidad:** textos alternativos en las imágenes, navegación con teclado y respeto por la opción "reducir movimiento" del sistema.

> La pasarela de pago y el formulario de sponsors son de demostración: no procesan pagos ni guardan datos.

---

## 🛠️ Tecnologías

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- JavaScript
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
│   ├── checkout/    # Pasos y campos del checkout
│   └── Reveal.jsx   # Animación de entrada reutilizable
├── hooks/
│   └── useEnPantalla.js   # Detecta cuándo un elemento entra en pantalla
├── pages/
│   └── Error404.jsx
├── App.jsx          # Rutas y orden de las secciones
├── index.css        # Variables de color y estilos globales
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