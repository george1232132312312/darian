# fíori. — fiorisweets.ro

Site de prezentare pentru **fíori.**, cofetărie artizanală (prăjituri, cookies, marshmallows).

Datele de contact (email, telefon, WhatsApp, Instagram, oraș) se modifică într-un singur loc: `app/site-config.ts`.

- **Stack:** Next.js (App Router) + Tailwind CSS v4, deploy pe Vercel
- **Brand:** bleumarin `#20344d` + roz pudră `#e8c5c3` / accent crem-auriu `#ecd4a8`, font Poppins, wordmark lowercase `fíori.`
- **Imagini:** generate cu Higgsfield (Nano Banana Pro), stil Fívori — originalele PNG sunt în `_raw/` (negit-uit)

## Rulare locală

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run deploy   # vercel build --prod + vercel deploy --prebuilt --prod
```
