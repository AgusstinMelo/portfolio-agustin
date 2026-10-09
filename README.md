# Portfolio de Agustín

Primera etapa del portfolio personal, construida con Vite, React y TypeScript.

## Desarrollo local

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm run preview
```

La salida de producción se genera en `dist/` y puede desplegarse directamente en Vercel.

## Contenido editable

Los proyectos, tecnologías, navegación y enlaces personales están centralizados en `src/data/content.ts`. Los enlaces sin datos reales permanecen vacíos y se muestran como pendientes en la interfaz.

## Formulario de contacto

Copiá `.env.example` como `.env.local` y completá `VITE_FORMSPREE_ENDPOINT` con el endpoint público de un formulario de Formspree. Sin esa variable, el formulario valida normalmente pero informa con honestidad que el envío todavía no está disponible.

## Idioma y tema

La interfaz admite español e inglés, y temas claro y oscuro. Las preferencias se guardan en `localStorage`; cuando todavía no existen, se utilizan el idioma del navegador y `prefers-color-scheme`. Las traducciones están centralizadas y tipadas en `src/i18n/translations.ts`.

La SPA actualiza dinámicamente `lang`, el título, la descripción y los metadatos Open Graph. Para SEO multidioma completo será recomendable incorporar en el futuro rutas localizadas como `/es/` y `/en/` con prerenderizado o renderizado adecuado; no se añadieron etiquetas `hreflang` a rutas inexistentes.
