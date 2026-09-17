import Image from "next/image";
import { CONTACT, SITE_URL } from "./site-config";

const NAV = [
  { href: "#produse", label: "Produse" },
  { href: "#galerie", label: "Galerie" },
  { href: "#despre", label: "Despre" },
  { href: "#contact", label: "Contact" },
];

const GALLERY = [
  {
    img: "/images/mar-verde.jpg",
    caption: "„Mărul verde” — mousse cu inimă de mere",
  },
  {
    img: "/images/lava-cake.jpg",
    caption: "Lava cake cu ciocolată",
  },
];

const VIDEOS = [
  {
    src: "/videos/mar-verde.mp4",
    poster: "/images/mar-verde.jpg",
    caption: "„Mărul verde”, pe dinăuntru",
  },
  {
    src: "/videos/lava-cake.mp4",
    poster: "/images/lava-cake.jpg",
    caption: "Lava cake, abia scos din formă",
  },
  {
    src: "/videos/felie-zmeura.mp4",
    poster: "/images/felie-zmeura.jpg",
    caption: "Felie cu ciocolată și zmeură",
  },
];

const PRODUCTS = [
  {
    img: "/images/pastry.jpg",
    title: "Prăjituri & pastry",
    text: "Eclere, choux-uri, tarte și prăjituri de casă, lucrate în serii mici, cu unt adevărat și multă răbdare.",
  },
  {
    img: "/images/cookies.jpg",
    title: "Cookies",
    text: "Cookies cu bucăți generoase de ciocolată — crocanți la margine, moi la mijloc.",
  },
  {
    img: "/images/marshmallow.jpg",
    title: "Marshmallows & sweets",
    text: "Marshmallows caramelizate, bezele pufoase și alte dulciuri mărunte, pentru orice poftă.",
  },
];

const MARQUEE_ITEMS = [
  "cookies",
  "eclere",
  "marshmallows",
  "pastry",
  "bezele",
  "prăjituri",
];

const STEPS = [
  {
    nr: "01",
    title: "Alegi ce-ți dorești",
    text: "Prăjituri, cookies sau marshmallows — ne spui ocazia și ce îți place.",
  },
  {
    nr: "02",
    title: "Stabilim detaliile",
    text: "Alegem împreună aromele și cantitatea, apoi confirmăm data.",
  },
  {
    nr: "03",
    title: "Te bucuri de ele",
    text: "Pregătim totul proaspăt, cu grijă la fiecare detaliu, gata pentru momentul tău dulce.",
  },
];

const MAIL_HREF = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
  "Comandă fíori."
)}&body=${encodeURIComponent(
  "Ocazia: \nData: \nCe mi-aș dori: \nCantitatea: \nAlergii: \nTelefon: "
)}`;

const WHATSAPP_HREF = CONTACT.whatsapp
  ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
      "Bună! Aș vrea să comand de la fíori."
    )}`
  : "";

const TEL_HREF = CONTACT.phone
  ? `tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`
  : "";

const SOCIAL = [
  { href: CONTACT.instagram, label: "Instagram" },
  { href: CONTACT.facebook, label: "Facebook" },
].filter((s) => s.href);

const IN_CITY = CONTACT.city ? ` în ${CONTACT.city}` : "";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "fíori.",
  alternateName: ["fiori", "fiori sweets"],
  description:
    "Cofetărie artizanală: prăjituri, eclere, cookies și marshmallows, făcute în serii mici.",
  url: SITE_URL,
  image: `${SITE_URL}/images/og.jpg`,
  email: CONTACT.email,
  ...(CONTACT.phone ? { telephone: CONTACT.phone } : {}),
  ...(CONTACT.city
    ? {
        areaServed: CONTACT.city,
        address: {
          "@type": "PostalAddress",
          addressLocality: CONTACT.city,
          addressCountry: "RO",
        },
      }
    : {}),
  ...(SOCIAL.length ? { sameAs: SOCIAL.map((s) => s.href) } : {}),
};

function Wordmark({
  className = "",
  dotClassName = "text-peach",
}: {
  className?: string;
  dotClassName?: string;
}) {
  return (
    <span className={`font-semibold lowercase tracking-tight ${className}`}>
      fíori<span className={dotClassName}>.</span>
    </span>
  );
}

function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden bg-fern-deep py-4" aria-hidden="true">
      <div className="marquee-track flex w-max gap-8">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center gap-8">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center gap-8 text-sm font-medium uppercase tracking-[0.3em] text-blush/80"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-peach/70" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c"),
        }}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-fern/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a
            href="#"
            className="inline-flex min-h-11 items-center text-2xl text-blush"
          >
            <Wordmark />
          </a>
          <nav
            aria-label="Meniu"
            className="hidden items-center gap-8 text-sm font-medium text-blush/90 md:flex"
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-peach"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="rounded-full bg-peach px-5 py-3 text-sm font-semibold text-fern-deep transition-colors hover:bg-blush"
          >
            Comandă
          </a>
        </div>
        <nav
          aria-label="Meniu mobil"
          className="flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:hidden"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full border border-blush/40 px-4 py-2.5 text-sm text-blush/90"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-fern">
          <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-16 text-center sm:pb-28 sm:pt-24">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-peach/90 sm:text-sm">
              cofetărie artizanală
            </p>
            <h1 className="mt-4 text-7xl text-blush sm:text-8xl md:text-9xl">
              <Wordmark />
              <span className="sr-only">
                {` (fiori) — cofetărie artizanală${IN_CITY}: prăjituri, cookies și dulciuri`}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-blush/90 sm:text-lg">
              Prăjituri, cookies și dulciuri făcute cu drag{IN_CITY}, în serii
              mici — pentru ocazii speciale sau pur și simplu pentru poftă.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#produse"
                className="rounded-full bg-peach px-7 py-3 text-sm font-semibold text-fern-deep transition-colors hover:bg-blush"
              >
                Vezi produsele
              </a>
            </div>
          </div>
        </section>

        <Marquee />

        {/* Produse */}
        <section id="produse" className="bg-cream py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-fern">
              ce pregătim
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-fern-deep sm:text-4xl">
              Dulciuri făcute ca acasă
            </h2>
            <p className="mt-4 max-w-2xl font-light leading-relaxed text-cocoa/80">
              Fiecare produs iese din atelier proaspăt, din ingrediente atent
              alese. Fără scurtături, fără compromisuri — doar dulciuri cum se
              fac în familie.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.map((p) => (
                <article
                  key={p.title}
                  className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1152px) 347px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-fern-deep">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-cocoa/75">
                      {p.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-8 text-xs font-light text-cocoa/70">
              Fotografiile produselor au rol de prezentare — fiecare comandă se
              pregătește proaspăt, special pentru tine.
            </p>
          </div>
        </section>

        {/* Galerie */}
        <section id="galerie" className="bg-fern py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-peach">
              din atelier
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-blush sm:text-4xl">
              Galerie
            </h2>
            <p className="mt-4 max-w-2xl font-light leading-relaxed text-blush/85">
              Câteva dintre dulciurile noastre — de la „mărul verde” cu inimă
              de mere până la lava cake-ul cu ciocolată.
            </p>
            <div className="mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
              {GALLERY.map((g) => (
                <figure key={g.img} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-3xl shadow-lg">
                    <Image
                      src={g.img}
                      alt={g.caption}
                      fill
                      sizes="(min-width: 896px) 436px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-sm font-light text-blush/85">
                    {g.caption}
                  </figcaption>
                </figure>
              ))}
            </div>

            <h3 className="mt-16 text-xl font-semibold text-blush">
              Din atelier, pe viu
            </h3>
            <p className="mt-2 max-w-2xl text-sm font-light leading-relaxed text-blush/85">
              Filmări scurte cu dulciurile noastre, exact așa cum ies din
              atelier — apasă play.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {VIDEOS.map((v) => (
                <figure key={v.src}>
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={v.poster}
                    className="aspect-[9/16] w-full rounded-3xl bg-fern-deep object-cover shadow-lg"
                  >
                    <source src={v.src} type="video/mp4" />
                  </video>
                  <figcaption className="mt-3 text-center text-sm font-light text-blush/85">
                    {v.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Despre */}
        <section id="despre" className="bg-blush py-20">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-lg">
              <Image
                src="/images/atelier-darian.jpg"
                alt="Cofetarul decorând un tort cu cremă verde mentă, în atelier"
                fill
                sizes="(min-width: 1152px) 528px, (min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.4em] text-fern">
                despre noi
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-fern-deep sm:text-4xl">
                Un atelier mic, cu suflet mare
              </h2>
              <p className="mt-6 font-light leading-relaxed text-cocoa/80">
                <Wordmark className="text-fern-deep" dotClassName="text-fern" />{" "}
                a pornit din bucătăria de acasă, din pasiunea unui tânăr cofetar
                pentru lucrurile făcute bine: aluaturi frământate cu răbdare,
                ciocolată adevărată și rețete testate până ies perfect.
              </p>
              <p className="mt-4 font-light leading-relaxed text-cocoa/80">
                Lucrăm în serii mici, la comandă, ca dulciurile să plece din
                atelier proaspete și exact așa cum au fost gândite.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {STEPS.map((s) => (
                  <div key={s.nr} className="rounded-2xl bg-cream/80 p-5">
                    <span className="text-sm font-semibold text-fern">
                      {s.nr}
                    </span>
                    <h3 className="mt-2 text-sm font-semibold text-fern-deep">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-xs font-light leading-relaxed text-cocoa/70">
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Alergeni */}
        <section id="alergeni" className="bg-cream py-12">
          <div className="mx-auto w-full max-w-3xl px-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-fern">
              Alergeni
            </h2>
            <p className="mt-3 text-sm font-light leading-relaxed text-cocoa/80">
              Produsele noastre conțin sau pot conține:{" "}
              <strong className="font-semibold">cereale cu gluten</strong>,{" "}
              <strong className="font-semibold">ouă</strong>,{" "}
              <strong className="font-semibold">lapte</strong>,{" "}
              <strong className="font-semibold">fructe cu coajă lemnoasă</strong>{" "}
              și <strong className="font-semibold">soia</strong>. Sunt
              preparate într-un atelier în care se lucrează cu acești alergeni,
              deci pot apărea urme și în produsele care nu îi conțin ca
              ingredient. Spune-ne la comandă dacă ai o alergie — îți confirmăm
              în scris ce conține produsul tău.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="pattern-dashes bg-fern">
          <div className="bg-fern/90 py-20">
            <div className="mx-auto w-full max-w-3xl px-6 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.4em] text-peach">
                contact
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-blush sm:text-4xl">
                Hai să vorbim despre ceva dulce
              </h2>
              <p className="mx-auto mt-4 max-w-xl font-light leading-relaxed text-blush/90">
                Scrie-ne ce sărbătorești și când — revenim cu propuneri și
                toate detaliile. Comenzile se preiau în limita locurilor
                disponibile.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {WHATSAPP_HREF && (
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-peach px-8 py-4 text-base font-semibold text-fern-deep transition-colors hover:bg-blush"
                  >
                    Scrie-ne pe WhatsApp
                  </a>
                )}
                <a
                  href={MAIL_HREF}
                  className={
                    WHATSAPP_HREF
                      ? "rounded-full border border-blush/60 px-8 py-4 text-base font-semibold text-blush transition-colors hover:border-peach hover:text-peach"
                      : "rounded-full bg-peach px-8 py-4 text-base font-semibold text-fern-deep transition-colors hover:bg-blush"
                  }
                >
                  Trimite-ne un email
                </a>
                {TEL_HREF && (
                  <a
                    href={TEL_HREF}
                    className="rounded-full border border-blush/60 px-8 py-4 text-base font-semibold text-blush transition-colors hover:border-peach hover:text-peach"
                  >
                    Sună: {CONTACT.phone}
                  </a>
                )}
              </div>
              <p className="mt-6 text-sm font-light text-blush/90">
                sau scrie-ne direct la{" "}
                <span className="select-all font-medium text-blush">
                  {CONTACT.email}
                </span>
              </p>
              {CONTACT.city && (
                <p className="mt-2 text-sm font-light text-blush/90">
                  Atelier în {CONTACT.city}
                </p>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-fern-deep py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-blush/70 sm:flex-row">
          <span className="text-xl text-blush">
            <Wordmark />
          </span>
          {SOCIAL.length > 0 && (
            <span className="flex gap-6">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="me noopener noreferrer"
                  className="font-medium text-blush transition-colors hover:text-peach"
                >
                  {s.label}
                </a>
              ))}
            </span>
          )}
          <span className="font-light">
            © fíori. — fiorisweets.ro · făcut cu drag
          </span>
        </div>
      </footer>
    </div>
  );
}
