"use client";

import { useState, type FormEvent } from "react";
import { CONTACT, FORM_ACCESS_KEY } from "./site-config";

type Status = "idle" | "sending" | "ok" | "error";

const FIELD =
  "w-full rounded-2xl border border-navy/25 bg-cream/70 px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink/40 focus:border-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-navy/30";

const LABEL =
  "block text-xs font-semibold uppercase tracking-[0.15em] text-navy";

const LABELS: Record<string, string> = {
  nume: "Nume",
  telefon: "Telefon",
  email: "Email",
  produs: "Box",
  cantitate: "Câte boxuri",
  data: "Data dorită",
  detalii: "Informații adiționale",
};

function summary(data: Record<string, string>) {
  const lines = ["Comandă fíori.", ""];
  for (const [key, value] of Object.entries(data)) {
    if (key === "botcheck" || !value) continue;
    lines.push(`${LABELS[key] ?? key}: ${value}`);
  }
  return lines.join("\n");
}

export default function OrderForm({
  products,
  flavours,
}: {
  products: string[];
  flavours: { group: string; items: string[] }[];
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    // getAll, ca să prindem și bifele multiple (aromele).
    for (const key of new Set(formData.keys())) {
      data[key] = formData
        .getAll(key)
        .filter((v): v is string => typeof v === "string")
        .join(", ");
    }

    // Capcană pentru roboți: oamenii nu completează câmpul ascuns.
    if (data.botcheck) return;

    const text = summary(data);

    // Fără cheie de formular, comanda pleacă pe WhatsApp, completată.
    if (!FORM_ACCESS_KEY) {
      const href = CONTACT.whatsapp
        ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
        : `mailto:${CONTACT.email}?subject=${encodeURIComponent(
            "Comandă fíori."
          )}&body=${encodeURIComponent(text)}`;
      window.open(href, "_blank", "noopener,noreferrer");
      setStatus("ok");
      form.reset();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: FORM_ACCESS_KEY,
          subject: `Comandă nouă de pe site — ${data.nume}`,
          from_name: "fíori. — formular de comandă",
          replyto: data.email || undefined,
          ...data,
        }),
      });
      const result = await response.json();
      if (!response.ok || result?.success === false) {
        throw new Error(result?.message ?? String(response.status));
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 rounded-3xl bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="nume">
            Numele tău *
          </label>
          <input
            id="nume"
            name="nume"
            required
            autoComplete="name"
            placeholder="Maria Popescu"
            className={`mt-2 ${FIELD}`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="telefon">
            Telefon *
          </label>
          <input
            id="telefon"
            name="telefon"
            required
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="07xx xxx xxx"
            className={`mt-2 ${FIELD}`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="adresa@exemplu.ro"
            className={`mt-2 ${FIELD}`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="data">
            Pentru ce dată?
          </label>
          <input
            id="data"
            name="data"
            type="date"
            className={`mt-2 ${FIELD}`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="produs">
            Ce box îți dorești? *
          </label>
          <select
            id="produs"
            name="produs"
            required
            defaultValue=""
            className={`mt-2 ${FIELD}`}
          >
            <option value="" disabled>
              Alege un box
            </option>
            {products.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
            <option value="Altceva / personalizat">
              Altceva — îți scriu mai jos
            </option>
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="cantitate">
            Câte boxuri îți dorești?
          </label>
          <input
            id="cantitate"
            name="cantitate"
            type="number"
            min="1"
            defaultValue="1"
            className={`mt-2 ${FIELD}`}
          />
        </div>

        <div className="sm:col-span-2">
          <p className={LABEL}>Ce arome vrei în box?</p>
          <p className="mt-1 text-xs font-light text-ink/70">
            Bifează ce îți place — brownies și marshmallows intră doar în boxul
            mixt. Câte bucăți din fiecare, ne scrii mai jos, la detalii.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {flavours.map((g) => (
              <fieldset
                key={g.group}
                className="rounded-2xl border border-navy/20 bg-cream/60 p-4"
              >
                <legend className="px-1 text-xs font-semibold uppercase tracking-[0.15em] text-navy">
                  {g.group}
                </legend>
                <div className="mt-2 space-y-2">
                  {g.items.map((item) => (
                    <label
                      key={item}
                      className="flex items-start gap-2 text-sm font-light leading-snug text-ink/80"
                    >
                      <input
                        type="checkbox"
                        name={`Arome ${g.group}`}
                        value={item}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#20344d]"
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="detalii">
            Informații adiționale
          </label>
          <textarea
            id="detalii"
            name="detalii"
            rows={4}
            placeholder="Câte bucăți din fiecare aromă, ce sărbătorești sau orice altceva ne ajută."
            className={`mt-2 ${FIELD}`}
          />
          <p className="mt-2 text-xs font-light leading-relaxed text-ink/70">
            Ai o alergie? Consultă lista de alergeni de mai jos și scrie-ne
            aici de ce să ținem cont.
          </p>
        </div>
      </div>

      {/* Câmp-capcană, ascuns pentru oameni, completat doar de roboți. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-navy px-8 py-4 text-base font-semibold text-blush transition-colors hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? "Se trimite…" : "Trimite comanda"}
        </button>
        <p className="text-xs font-light leading-relaxed text-ink/70">
          Îți răspundem în cel mult 24 de ore. Datele le folosim doar ca să
          îți pregătim comanda.
        </p>
      </div>

      <div aria-live="polite">
        {status === "ok" && (
          <p className="mt-6 rounded-2xl bg-navy/10 px-5 py-4 text-sm font-medium text-navy-deep">
            Am primit comanda ta — îți răspundem în cel mult 24 de ore.
            Mulțumim!
          </p>
        )}
        {status === "error" && (
          <p className="mt-6 rounded-2xl bg-gold/40 px-5 py-4 text-sm font-medium text-ink">
            Nu am reușit să trimitem comanda. Scrie-ne direct pe WhatsApp la{" "}
            {CONTACT.phone} sau la {CONTACT.email} și o preluăm imediat.
          </p>
        )}
      </div>
    </form>
  );
}
