"use client";

import { useState, type FormEvent } from "react";
import { CONTACT, FORM_ACCESS_KEY } from "./site-config";

type Status = "idle" | "sending" | "ok" | "error";

const FIELD =
  "w-full rounded-2xl border border-fern/25 bg-cream/70 px-4 py-3 text-sm text-cocoa transition-colors placeholder:text-cocoa/40 focus:border-fern focus:bg-white focus:outline-none focus:ring-2 focus:ring-fern/30";

const LABEL =
  "block text-xs font-semibold uppercase tracking-[0.15em] text-fern";

function summary(data: Record<string, string>) {
  const lines = [
    `Comandă fíori.`,
    ``,
    `Nume: ${data.nume}`,
    `Telefon: ${data.telefon}`,
    data.email ? `Email: ${data.email}` : "",
    `Produs: ${data.produs}`,
    data.cantitate ? `Cantitate: ${data.cantitate}` : "",
    data.data ? `Data dorită: ${data.data}` : "",
    data.alergii ? `Alergii: ${data.alergii}` : "",
    data.detalii ? `Detalii: ${data.detalii}` : "",
  ];
  return lines.filter((l) => l !== "").join("\n");
}

export default function OrderForm({ products }: { products: string[] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const data: Record<string, string> = {};
    for (const [key, value] of Object.entries(raw)) {
      data[key] = typeof value === "string" ? value : "";
    }

    // Capcană pentru roboți: oamenii nu completează câmpul ascuns.
    if (data.website) return;

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
      if (!response.ok) throw new Error(String(response.status));
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
            Ce cantitate?
          </label>
          <input
            id="cantitate"
            name="cantitate"
            placeholder="ex. 12 bucăți"
            className={`mt-2 ${FIELD}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="alergii">
            Alergii sau ingrediente de evitat
          </label>
          <input
            id="alergii"
            name="alergii"
            placeholder="ex. fără alune"
            className={`mt-2 ${FIELD}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="detalii">
            Detalii despre comandă
          </label>
          <textarea
            id="detalii"
            name="detalii"
            rows={4}
            placeholder="Scrie-ne ce arome vrei în box, ce sărbătorești sau orice altceva ne ajută."
            className={`mt-2 ${FIELD}`}
          />
        </div>
      </div>

      {/* Câmp-capcană, ascuns pentru oameni, completat doar de roboți. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-fern px-8 py-4 text-base font-semibold text-blush transition-colors hover:bg-fern-deep disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending" ? "Se trimite…" : "Trimite comanda"}
        </button>
        <p className="text-xs font-light leading-relaxed text-cocoa/70">
          Îți răspundem în cel mult 24 de ore. Datele le folosim doar ca să
          îți pregătim comanda.
        </p>
      </div>

      <div aria-live="polite">
        {status === "ok" && (
          <p className="mt-6 rounded-2xl bg-fern/10 px-5 py-4 text-sm font-medium text-fern-deep">
            Am primit comanda ta — îți răspundem în cel mult 24 de ore.
            Mulțumim!
          </p>
        )}
        {status === "error" && (
          <p className="mt-6 rounded-2xl bg-peach/40 px-5 py-4 text-sm font-medium text-cocoa">
            Nu am reușit să trimitem comanda. Scrie-ne direct pe WhatsApp la{" "}
            {CONTACT.phone} sau la {CONTACT.email} și o preluăm imediat.
          </p>
        )}
      </div>
    </form>
  );
}
