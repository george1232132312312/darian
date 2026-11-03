import Image from "next/image";
import OrderForm from "./order-form";
import { CONTACT, SITE_URL } from "./site-config";

const NAV = [
  { href: "#produse", label: "Produse" },
  { href: "#galerie", label: "Galerie" },
  { href: "#despre", label: "Despre" },
  { href: "#meniu", label: "Meniu" },
  { href: "#comanda", label: "Comandă" },
  { href: "#contact", label: "Contact" },
];

// Prețuri de bucată, din care se calculează boxurile.
const PRICE = { cookie: 22, brownie: 25, marshmallow: 18 };

const BOXES = [
  {
    name: "Box 4 cookies",
    price: 4 * PRICE.cookie,
    detail: "4 cookies, la alegere dintre aromele de mai jos.",
    note: `${PRICE.cookie} lei bucata`,
  },
  {
    name: "Box 6 cookies",
    price: 6 * PRICE.cookie,
    detail: "6 cookies, la alegere dintre aromele de mai jos.",
    note: `${PRICE.cookie} lei bucata`,
  },
  {
    name: "Box 12 cookies",
    price: 12 * PRICE.cookie,
    detail: "12 cookies, la alegere dintre aromele de mai jos.",
    note: `${PRICE.cookie} lei bucata`,
  },
  {
    name: "Box mixt",
    price: 2 * PRICE.cookie + 2 * PRICE.brownie + 2 * PRICE.marshmallow,
    detail: "2 cookies, 2 brownies și 2 marshmallows, la alegere.",
    note: "cel mai bun mod de a le încerca pe toate",
  },
];

const FLAVOURS = [
  {
    group: "Cookies",
    items: [
      "Red Velvet",
      "Lămâie cu mac",
      "Alune de pădure și cafea",
      "Ciocolată",
    ],
  },
  {
    group: "Brownies",
    items: ["Ciocolată neagră și miez de nucă", "Ciocolată neagră și zmeură"],
  },
  {
    group: "Marshmallows",
    items: ["Nucă de cocos", "Vanilie"],
  },
];

// Lista pentru câmpul „Ce îți dorești?” din formularul de comandă.
const PRODUCT_OPTIONS = BOXES.map((b) => `${b.name} — ${b.price} lei`);

const GALLERY = [
  {
    img: "/images/cookies-bezea.jpg",
    caption: "Cookies cu bezea și cremă de citrice",
  },
  {
    img: "/images/cookies-creme.jpg",
    caption: "Cookies cu creme, fructe și caramel",
  },
  {
    img: "/images/cookies-tava.jpg",
    caption: "Rânduri de cookies, gata de livrat",
  },
];

const PRODUCTS = [
  {
    img: "/images/cookies-topping.jpg",
    title: "Cookies",
    text: "Cookies mari, cu creme și topping-uri diferite — crocante la margine, moi la mijloc.",
  },
  {
    img: "/images/marshmallows-brownies.jpg",
    title: "Brownies & marshmallows",
    text: "Brownies cu ciocolată neagră, nucă sau zmeură, și marshmallows cu cocos ori vanilie.",
  },
];

const MARQUEE_ITEMS = ["cookies", "brownies", "marshmallows", "boxuri"];

const STEPS = [
  {
    nr: "01",
    title: "Alegi ce-ți dorești",
    text: "Alegi boxul — de 4, 6, 12 cookies sau cel mixt — și aromele din el.",
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

const ORDER_FIELDS = "\n\nOcazia: \nData: \nCantitatea: \nAlergii: \nTelefon: ";

function mailHref(body: string) {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(
    "Comandă fíori."
  )}&body=${encodeURIComponent(body)}`;
}

function waHref(text: string) {
  return CONTACT.whatsapp
    ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
    : "";
}

// Deschide WhatsApp-ul cu mesajul deja scris; dacă nu e setat niciun număr
// în site-config.ts, aceleași butoane deschid emailul.
function orderHref(text: string) {
  return waHref(text) || mailHref(text + ORDER_FIELDS);
}

const MAIL_HREF = mailHref(
  "Ocazia: \nData: \nCe mi-aș dori: \nCantitatea: \nAlergii: \nTelefon: "
);

const ORDER_TEXT = "Bună! Aș vrea să comand de la fíori.";

const WHATSAPP_HREF = waHref(ORDER_TEXT);

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
    "Cofetărie artizanală: cookies, brownies și marshmallows, în boxuri, făcute în serii mici.",
  url: SITE_URL,
  image: `${SITE_URL}/images/og.jpg`,
  email: CONTACT.email,
  ...(CONTACT.whatsapp
    ? { telephone: `+${CONTACT.whatsapp}` }
    : CONTACT.phone
      ? { telephone: CONTACT.phone }
      : {}),
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

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

function FloatingOrderButton() {
  if (!WHATSAPP_HREF) return null;
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25d366] px-5 py-4 text-sm font-semibold text-[#06281a] shadow-xl transition-transform hover:scale-105"
    >
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden sm:inline">Comandă pe WhatsApp</span>
      <span className="sr-only sm:hidden">Comandă pe WhatsApp</span>
    </a>
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
            href="#comanda"
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
                {` (fiori) — cofetărie artizanală${IN_CITY}: cookies, brownies și marshmallows`}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base font-light leading-relaxed text-blush/90 sm:text-lg">
              Cookies, brownies și marshmallows făcute cu drag{IN_CITY}, în
              serii mici — în boxuri gata de dăruit sau numai pentru pofta ta.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {WHATSAPP_HREF && (
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-7 py-3 text-sm font-semibold text-[#06281a] transition-colors hover:bg-[#1ebe5a]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  Comandă pe WhatsApp
                </a>
              )}
              <a
                href="#comanda"
                className="rounded-full bg-peach px-7 py-3 text-sm font-semibold text-fern-deep transition-colors hover:bg-blush"
              >
                Completează formularul
              </a>
              <a
                href="#produse"
                className="rounded-full border border-blush/60 px-7 py-3 text-sm font-semibold text-blush transition-colors hover:border-peach hover:text-peach"
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
              Cookies, brownies, marshmallows
            </h2>
            <p className="mt-4 max-w-2xl font-light leading-relaxed text-cocoa/80">
              Fiecare produs iese din atelier proaspăt, din ingrediente atent
              alese. Fără scurtături, fără compromisuri — doar dulciuri cum se
              fac în familie.
            </p>
            <div className="mt-12 grid max-w-4xl gap-8 sm:grid-cols-2">
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
                      sizes="(min-width: 896px) 436px, (min-width: 640px) 50vw, 100vw"
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
              Cookies-urile noastre, exact așa cum ies din atelier — cu creme,
              fructe proaspete și topping-uri lucrate manual.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY.map((g) => (
                <figure key={g.img} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-3xl shadow-lg">
                    <Image
                      src={g.img}
                      alt={g.caption}
                      fill
                      sizes="(min-width: 1152px) 352px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-sm font-light text-blush/85">
                    {g.caption}
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

        {/* Meniu */}
        <section id="meniu" className="bg-blush py-20">
          <div className="mx-auto w-full max-w-5xl px-6">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-fern">
              meniu
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-fern-deep sm:text-4xl">
              Boxuri și prețuri
            </h2>
            <p className="mt-4 max-w-2xl font-light leading-relaxed text-cocoa/80">
              Alegi boxul, apoi ne spui ce arome vrei în el — le găsești pe
              toate mai jos.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {BOXES.map((box) => (
                <div
                  key={box.name}
                  className="flex flex-col rounded-3xl bg-cream/80 p-6"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-semibold text-fern-deep">
                      {box.name}
                    </h3>
                    <p className="shrink-0 text-2xl font-semibold text-fern">
                      {box.price} lei
                    </p>
                  </div>
                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-cocoa/75">
                    {box.detail}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-xs font-light uppercase tracking-wide text-cocoa/60">
                      {box.note}
                    </span>
                    <a
                      href={orderHref(
                        `Bună! Aș vrea să comand un ${box.name} (${box.price} lei).`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Comandă ${box.name}`}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-fern px-4 py-2.5 text-xs font-semibold text-blush transition-colors hover:bg-fern-deep"
                    >
                      {WHATSAPP_HREF && (
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                      )}
                      Comandă
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-14 text-xl font-semibold text-fern-deep">
              Arome, la alegere
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {FLAVOURS.map((g) => (
                <div key={g.group} className="rounded-3xl bg-cream/80 p-6">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-fern">
                    {g.group}
                  </h4>
                  <ul className="mt-4 space-y-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm font-light leading-relaxed text-cocoa/80"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 font-light leading-relaxed text-cocoa/80">
              Pentru produse personalizate,{" "}
              {WHATSAPP_HREF && (
                <>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-fern underline underline-offset-4 transition-colors hover:text-fern-deep"
                  >
                    scrie-ne pe WhatsApp
                  </a>{" "}
                  sau{" "}
                </>
              )}
              <a
                href={MAIL_HREF}
                className="font-medium text-fern underline underline-offset-4 transition-colors hover:text-fern-deep"
              >
                pe email
              </a>
              .
            </p>
          </div>
        </section>

        {/* Formular de comandă */}
        <section id="comanda" className="bg-cream py-20">
          <div className="mx-auto w-full max-w-3xl px-6">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-fern">
              comandă
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-fern-deep sm:text-4xl">
              Completează și trimite comanda
            </h2>
            <p className="mt-4 font-light leading-relaxed text-cocoa/80">
              Alege boxul și spune-ne ce arome vrei în el și pentru când —
              primim comanda pe loc și revenim cu confirmarea. Dacă preferi să
              vorbim direct, butonul verde de WhatsApp e mereu la îndemână.
            </p>
            <OrderForm products={PRODUCT_OPTIONS} />
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
                Cel mai simplu e pe WhatsApp: ne scrii ce îți dorești și când,
                iar noi revenim cu propuneri și toate detaliile. Comenzile se
                preiau în limita locurilor disponibile.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                {WHATSAPP_HREF && (
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-8 py-4 text-base font-semibold text-[#06281a] transition-colors hover:bg-[#1ebe5a]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Comandă pe WhatsApp
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
                {CONTACT.phone && (
                  <>
                    {" · "}
                    <span className="select-all font-medium text-blush">
                      {CONTACT.phone}
                    </span>
                  </>
                )}
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

      <FloatingOrderButton />

      {/* Footer */}
      <footer className="bg-fern-deep pb-24 pt-8 sm:pb-8">
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
