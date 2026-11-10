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
    kinds: ["Cookies"],
  },
  {
    name: "Box 6 cookies",
    price: 6 * PRICE.cookie,
    detail: "6 cookies, la alegere dintre aromele de mai jos.",
    note: `${PRICE.cookie} lei bucata`,
    kinds: ["Cookies"],
  },
  {
    name: "Box 12 cookies",
    price: 12 * PRICE.cookie,
    detail: "12 cookies, la alegere dintre aromele de mai jos.",
    note: `${PRICE.cookie} lei bucata`,
    kinds: ["Cookies"],
  },
  {
    name: "Box 4 brownies",
    price: 4 * PRICE.brownie,
    detail: "4 brownies, la alegere dintre aromele de mai jos.",
    note: `${PRICE.brownie} lei bucata`,
    kinds: ["Brownies"],
  },
  {
    name: "Box 6 brownies",
    price: 6 * PRICE.brownie,
    detail: "6 brownies, la alegere dintre aromele de mai jos.",
    note: `${PRICE.brownie} lei bucata`,
    kinds: ["Brownies"],
  },
  {
    name: "Box mixt",
    price: 4 * PRICE.cookie + 4 * PRICE.brownie + 4 * PRICE.marshmallow,
    detail: "4 cookies, 4 brownies și 4 marshmallows, la alegere.",
    note: "cel mai bun mod de a le încerca pe toate",
    kinds: ["Cookies", "Brownies", "Marshmallows"],
  },
];

const ALLERGENS = [
  "Cereale cu gluten (grâu)",
  "Ouă",
  "Lapte și lactate",
  "Arahide",
  "Fructe cu coajă lemnoasă (nuci, alune, migdale, fistic)",
  "Soia",
  "Susan",
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

// Lista pentru câmpul „Ce box îți dorești?” din formularul de comandă.
const PRODUCT_OPTIONS = BOXES.map((b) => `${b.name} — ${b.price} lei`);

function flavourList(group: string) {
  return FLAVOURS.find((f) => f.group === group)?.items.join(" / ") ?? "";
}

// Mesajul care apare deja scris în WhatsApp, cu aromele de completat.
function boxMessage(box: (typeof BOXES)[number]) {
  const lines = [
    `Bună! Aș vrea să comand un ${box.name} (${box.price} lei).`,
    "",
    ...box.kinds.map((kind) => `${kind} (${flavourList(kind)}): `),
  ];
  return lines.join("\n");
}

const GALLERY = [
  {
    img: "/images/cookies-topping.jpg",
    caption: "Cookies cu creme și topping-uri",
  },
  {
    img: "/images/cookies-mocha-trei.webp",
    caption: "Cookies Mocha, gata de ambalat",
  },
  {
    img: "/images/marshmallows-brownies.jpg",
    caption: "Cookies Red Velvet, din atelier",
  },
];

const PRODUCTS = [
  {
    img: "/images/cookies-mocha.jpg",
    title: "Cookies",
    text: "Cookies mari, cu creme și topping-uri diferite — crocante la margine, moi la mijloc.",
  },
  {
    img: "/images/brownie-nuca.webp",
    title: "Brownies",
    text: "Brownies din ciocolată neagră, în două sortimente: cu miez de nucă sau cu zmeură.",
  },
  {
    img: "/images/marshmallows.jpg",
    title: "Marshmallows",
    text: "Marshmallows pufoase, făcute în casă, cu nucă de cocos sau cu vanilie.",
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
    text: "Alegem împreună aromele și numărul de boxuri, apoi confirmăm data.",
  },
  {
    nr: "03",
    title: "Te bucuri de ele",
    text: "Pregătim totul proaspăt, cu grijă la fiecare detaliu, gata pentru momentul tău dulce.",
  },
];

const ORDER_FIELDS = "\nNumăr de boxuri: \nData dorită: \nTelefon: ";

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
  `Box dorit (${BOXES.map((b) => `${b.name} ${b.price} lei`).join(
    " / "
  )}): \nNumăr de boxuri: \nArome (${flavourList(
    "Cookies"
  )}): \nData dorită: \nTelefon: `
);

const ORDER_TEXT = [
  "Bună! Aș vrea să comand de la fíori.",
  "",
  `Box dorit (${BOXES.map((b) => `${b.name} ${b.price} lei`).join(" / ")}): `,
  `Arome cookies (${flavourList("Cookies")}): `,
].join("\n");

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
  dotClassName = "text-gold",
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
    <div className="overflow-hidden bg-navy-deep py-4" aria-hidden="true">
      <div className="marquee-track flex w-max gap-8">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center gap-8">
            {row.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center gap-8 text-sm font-medium uppercase tracking-[0.3em] text-blush/80"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
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
      <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur">
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
                className="uppercase tracking-[0.12em] transition-colors hover:text-gold"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#comanda"
            className="rounded-full bg-gold px-5 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-blush"
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
              className="shrink-0 rounded-full border border-blush/40 px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-blush/90"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-navy">
          <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-10 text-center sm:pb-16 sm:pt-14">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold/90 sm:text-sm">
              cofetărie artizanală
            </p>
            <h1 className="mt-3 text-6xl text-blush sm:text-7xl">
              <Wordmark />
              <span className="sr-only">
                {` (fiori) — cofetărie artizanală${IN_CITY}: cookies, brownies și marshmallows`}
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base font-light leading-relaxed text-blush/90">
              Cookies, brownies și marshmallows făcute cu drag{IN_CITY}, în
              serii mici — în boxuri gata de dăruit sau numai pentru pofta ta.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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
                className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-navy-deep transition-colors hover:bg-blush"
              >
                Completează formularul
              </a>
              <a
                href="#produse"
                className="rounded-full border border-blush/60 px-7 py-3 text-sm font-semibold text-blush transition-colors hover:border-gold hover:text-gold"
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
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-navy">
              ce pregătim
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-navy-deep sm:text-4xl">
              Cookies, brownies, marshmallows
            </h2>
            <p className="mt-4 max-w-2xl font-light leading-relaxed text-ink/80">
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
                    <h3 className="text-lg font-semibold text-navy-deep">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-ink/75">
                      {p.text}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Galerie */}
        <section id="galerie" className="bg-navy py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold">
              din atelier
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-blush sm:text-4xl">
              Galerie
            </h2>
            <p className="mt-4 max-w-2xl font-light leading-relaxed text-blush/85">
              Cookies-urile noastre, exact așa cum ies din atelier — cu creme,
              fructe și topping-uri lucrate manual.
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
        <section id="despre" className="bg-nude py-20">
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
              <p className="text-xs font-medium uppercase tracking-[0.4em] text-navy">
                despre noi
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-navy-deep sm:text-4xl">
                Un atelier mic, cu suflet mare
              </h2>
              <p className="mt-6 font-light leading-relaxed text-ink/80">
                <Wordmark className="text-navy-deep" dotClassName="text-navy" />{" "}
                a pornit din bucătăria de acasă, din pasiunea unui tânăr cofetar
                pentru lucrurile făcute bine: aluaturi frământate cu răbdare,
                ciocolată adevărată și rețete testate până ies perfect.
              </p>
              <p className="mt-4 font-light leading-relaxed text-ink/80">
                Lucrăm în serii mici, la comandă, ca dulciurile să plece din
                atelier proaspete și exact așa cum au fost gândite.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {STEPS.map((s) => (
                  <div key={s.nr} className="rounded-2xl bg-cream/80 p-5">
                    <span className="text-sm font-semibold text-navy">
                      {s.nr}
                    </span>
                    <h3 className="mt-2 text-sm font-semibold text-navy-deep">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-xs font-light leading-relaxed text-ink/70">
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Meniu */}
        <section id="meniu" className="bg-nude py-20">
          <div className="mx-auto w-full max-w-5xl px-6">
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-navy">
              meniu
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-navy-deep sm:text-4xl">
              Boxuri și prețuri
            </h2>
            <p className="mt-4 max-w-2xl font-light leading-relaxed text-ink/80">
              Alegi boxul, apoi ne spui ce arome vrei în el — le găsești pe
              toate mai jos.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {BOXES.map((box) => (
                <div
                  key={box.name}
                  className="flex flex-col rounded-3xl bg-cream/80 p-6"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-semibold text-navy-deep">
                      {box.name}
                    </h3>
                    <p className="shrink-0 text-2xl font-semibold text-navy">
                      {box.price} lei
                    </p>
                  </div>
                  <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-ink/75">
                    {box.detail}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-xs font-light uppercase tracking-wide text-ink/60">
                      {box.note}
                    </span>
                    <a
                      href={orderHref(boxMessage(box))}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Comandă ${box.name}`}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-navy px-4 py-2.5 text-xs font-semibold text-blush transition-colors hover:bg-navy-deep"
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

            <h3 className="mt-14 text-xl font-semibold text-navy-deep">
              Arome, la alegere
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {FLAVOURS.map((g) => (
                <div key={g.group} className="rounded-3xl bg-cream/80 p-6">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-navy">
                    {g.group}
                  </h4>
                  <ul className="mt-4 space-y-2">
                    {g.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm font-light leading-relaxed text-ink/80"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 font-light leading-relaxed text-ink/80">
              Pentru produse personalizate,{" "}
              {WHATSAPP_HREF && (
                <>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-navy underline underline-offset-4 transition-colors hover:text-navy-deep"
                  >
                    scrie-ne pe WhatsApp
                  </a>{" "}
                  sau{" "}
                </>
              )}
              <a
                href={MAIL_HREF}
                className="font-medium text-navy underline underline-offset-4 transition-colors hover:text-navy-deep"
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
            <p className="text-xs font-medium uppercase tracking-[0.4em] text-navy">
              comandă
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-navy-deep sm:text-4xl">
              Completează și trimite comanda
            </h2>
            <p className="mt-4 font-light leading-relaxed text-ink/80">
              Alege boxul și spune-ne ce arome vrei în el și pentru când —
              primim comanda pe loc și revenim cu confirmarea. Dacă preferi să
              vorbim direct, butonul verde de WhatsApp e mereu la îndemână.
            </p>
            <OrderForm products={PRODUCT_OPTIONS} flavours={FLAVOURS} />

            <div
              id="alergeni"
              className="mt-8 rounded-3xl border border-navy/20 bg-nude/70 p-6 sm:p-8"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-navy">
                Alergeni
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-ink/80">
                Produsele noastre conțin sau pot conține:
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {ALLERGENS.map((a) => (
                  <li
                    key={a}
                    className="rounded-full bg-cream px-4 py-2 text-xs font-medium text-navy-deep"
                  >
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-light leading-relaxed text-ink/80">
                Toate sunt preparate în același atelier, deci pot apărea urme
                și în produsele care nu conțin acești alergeni ca ingredient.
                Dacă ai o alergie, scrie-ne în câmpul de detalii al
                formularului — îți confirmăm în scris ce conține comanda ta
                înainte de a o pregăti.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="pattern-dashes bg-navy">
          <div className="bg-navy/90 py-20">
            <div className="mx-auto w-full max-w-3xl px-6 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.4em] text-gold">
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
                      ? "rounded-full border border-blush/60 px-8 py-4 text-base font-semibold text-blush transition-colors hover:border-gold hover:text-gold"
                      : "rounded-full bg-gold px-8 py-4 text-base font-semibold text-navy-deep transition-colors hover:bg-blush"
                  }
                >
                  Trimite-ne un email
                </a>
                {TEL_HREF && (
                  <a
                    href={TEL_HREF}
                    className="rounded-full border border-blush/60 px-8 py-4 text-base font-semibold text-blush transition-colors hover:border-gold hover:text-gold"
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
      <footer className="bg-navy-deep pb-24 pt-8 sm:pb-8">
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
                  className="font-medium text-blush transition-colors hover:text-gold"
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
