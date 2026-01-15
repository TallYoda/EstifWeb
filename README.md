# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # Mike Porrtfolio

    React + TypeScript + Vite portfolio for Mikiyas Sintayehu.

    Quick start
    -----------

    - Install: `npm install`
    - Dev: `npm run dev`
    - Build: `npm run build`

    Image handling (production / Vercel)
    -----------------------------------

    Vercel serves static files from `public/`. For reliability we serve all artwork images from `public/images/`.

    - Place images under `public/images/` and reference them with absolute paths, e.g. `"/images/parachutes.jpg"` in `src/data/artworks.json`.
    - Do NOT reference `src/assets/...` or use relative paths in JSON — use absolute `/images/<filename>`.

    Helper scripts
    --------------

    Two scripts are provided to help keep `public/images` and `src/data/artworks.json` in sync:

    - `scripts/sync-images.mjs` — copies images from `src/assets/img/portfolio` and `public/assets/img/portfolio` into `public/images`.
    - `scripts/normalize-artworks.mjs` — rewrites `src/data/artworks.json` to use `/images/<filename>` for each artwork

    Run manually:

    ```powershell
    npm run sync-images
    npm run normalize-artworks
    ```

    These scripts are also run automatically via the `prebuild` npm hook (so Vercel runs them before the build).

    Project notes
    -------------

    - `src/components/PortfolioGrid.tsx` reads `src/data/artworks.json` and expects `image` to be an absolute `/images/...` path.
    - `PortfolioCard` accepts an optional `imageSrc` prop (cards use `/images/*` URLs).
    - `Lightbox` accepts `imageSrc` so webp images display correctly.
    - `Lightbox.css` filename is capitalized and imported as `./Lightbox.css` to avoid case-sensitive deployment issues.
    - Contact form uses EmailJS — keep secret keys off the repo.

    Deployment (Vercel)
    -------------------

    Set the build command to `npm run build`. The `prebuild` hook will run first ( copies images and normalizes paths ).

    If you add images locally, run the two helper scripts, verify `public/images/` contains the files and `src/data/artworks.json` points at `/images/<filename>`, then commit.

    Commits & tasks
    ---------------

    - I added `scripts/sync-images.mjs` and `scripts/normalize-artworks.mjs` and updated `package.json` with `prebuild` and helper scripts.

    Want me to also add a small CI or validation script to fail build if `artworks.json` references images that don't exist under `public/images/`? Reply and I will add it.
