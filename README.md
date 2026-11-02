# Portafolio de Matías Villegas

Sitio estático para GitHub Pages, hecho con HTML, CSS y JavaScript. No requiere instalación ni proceso de build.

## Probar localmente

Abrí `index.html` en el navegador. Las demos están en `proyectos/` y también se pueden abrir directamente.

## Proyectos

- `proyectos/subredes/`: calculadora IPv4/CIDR.
- `proyectos/memotest/`: juego de memoria.
- `proyectos/reflejos/`: prueba de tiempo de reacción.

## Publicar en GitHub Pages

En la configuración del repositorio, habilitá Pages desde la rama `main` y la carpeta raíz (`/`). Los archivos de este repositorio se publicarán de forma pública.

## Seguridad y privacidad

Las demos funcionan en el navegador y no envían datos a un servidor. La página principal carga Bootstrap desde jsDelivr, por lo que el navegador se conecta a ese CDN para descargar sus estilos y componentes. El código publicado es visible para cualquiera: no agregues contraseñas, tokens, claves privadas, archivos `.env` ni datos personales que no quieras hacer públicos. Si incorporás servicios externos en el futuro, no pongas claves secretas en el JavaScript del navegador.

Antes de publicar, reemplazá el `#` de LinkedIn por el enlace a tu perfil o quitá ese enlace.