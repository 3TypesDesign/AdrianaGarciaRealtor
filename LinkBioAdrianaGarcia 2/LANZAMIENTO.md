# Checklist de lanzamiento — Link Bio Adriana García

## Al publicar en el dominio final
1. Reemplazar `https://DOMINIO-FINAL.com` por el dominio real en:
   `index.html`, `en/index.html`, `sitemap.xml`, `robots.txt`.
2. En `index.html` y `en/index.html` cambiar
   `<meta name="robots" content="noindex, follow">` → `index, follow`.
   (En la vista previa de GitHub se deja `noindex` para no duplicar contenido.)
3. Dar de alta el dominio en Google Search Console y enviar `sitemap.xml`.
4. Probar el schema en https://search.google.com/test/rich-results

## Datos pendientes
- `assets/site.js` → CONFIG: email, licencia FL, redes.
- En el JSON-LD de las dos páginas: `telephone`, y agregar `email` y `sameAs` (URLs de redes).
- Código postal base (asumido 34638).
- Casa de la semana (`CONFIG.home` en `assets/site.js`): hoy muestra 9000 Sterling Ln, Port Richey (fuera del mercado, precio = Zestimate). Antes de lanzar, cambiar por una casa en venta (o un listing de Adriana): foto, link, precio, `priceNote` vacío si es precio de lista, y `courtesy` si es de otro broker. O `show: false` para ocultarla.
- `CONFIG.listingsUrl`: link del botón "Mira mis listings".

## Fuera de la página
- Google Business Profile como negocio de área de servicio, enlazado a esta página.
- Mismo nombre / teléfono / email en LPT, Zillow, Realtor.com, Instagram y Facebook.

## Al hacer cambios en CSS o JS
- Subir el número de versión en `styles.css?v=…` y `site.js?v=…` en `index.html` y `en/index.html` (hoy `v=20261114b`), para que los navegadores no usen la copia vieja.
