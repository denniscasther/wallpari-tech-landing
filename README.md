# wallpari•tech — Landing page

Sitio web de una sola página para **Wallpari.tech**. Diseño oscuro, cian `#00D4FF`,
tipografía Montserrat y el wordmark `wallpari•tech`, igual que la marca de Instagram.

## Estructura

```
wallpari-tech-landing/
├── index.html          Toda la página (secciones semánticas)
├── css/styles.css      Estilos + responsive (móvil, tablet, desktop)
├── js/main.js          Menú móvil, WhatsApp, formulario, animaciones
├── assets/img/         Logos (wallpari•tech y wallpari♥org)
└── README.md
```

### Secciones
Navbar · Hero · Tira de servicios · Servicios · Producto IA (4 agentes) · Proceso ·
Portafolio (mockups) · Nosotros (origen quechua) · Contacto (WhatsApp + formulario) · Footer · Botón flotante de WhatsApp.

## ⚠️ Pendiente

- **Portafolio** — las 4 tarjetas de `index.html` (sección `#portafolio`) son ejemplos ilustrativos. Reemplázalas por proyectos reales cuando los tengas.

El WhatsApp ya está configurado en `js/main.js` (`WA_NUMBER = "51923696270"`); ese número alimenta todos los botones de WhatsApp del sitio.

## Formulario de contacto (Formspree)

El formulario envía por **Formspree** (sin servidor propio) y **ya está activo**:
`FORMSPREE_ID = "mdaqpjql"` en `js/main.js` → <https://formspree.io/f/mdaqpjql>.

Para cambiar el correo que recibe los mensajes, hazlo desde el panel de Formspree — no hace falta
tocar el código. Si algún día cambias de formulario, reemplaza sólo el ID (lo que va después de `/f/`)
y haz `git push`; GitHub Pages se actualiza solo. El plan free admite 50 envíos al mes.

Detalles de la implementación:
- Envío por `fetch` sin recargar la página, con mensaje de éxito/error debajo del botón.
- **Respaldo automático:** si Formspree falla (o el ID no está configurado), se abre el correo del
  visitante hacia `contacto@wallpari.pe` con los datos ya escritos. El formulario nunca queda muerto.
- Anti-spam con campo señuelo `_gotcha` (invisible; si un bot lo rellena, Formspree descarta el envío).

## Cómo verlo

Doble clic en `index.html` (necesita internet la primera vez para cargar la fuente Montserrat).

## Cómo publicarlo (gratis)

Como es HTML estático, se sube tal cual a cualquiera de estos:

- **Netlify / Vercel:** arrastra la carpeta y listo (dominio gratis; luego conectas `wallpari.pe`).
- **GitHub Pages:** sube la carpeta a un repo y actívalo en Settings → Pages.
- **Hosting propio de wallpari.pe:** copia los archivos a la raíz (`public_html`).

## Marca (referencia)

- Colores: fondo `#0A1628` · cian `#00D4FF` · azul `#1E90FF` · magenta `#C83DE0` · morado `#7B32E0`
- Fuente: Montserrat · Instagram: @wallparitech · Email: contacto@wallpari.pe
