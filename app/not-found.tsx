import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-fern px-6 text-center">
      <span className="text-6xl font-semibold lowercase tracking-tight text-blush">
        fíori<span className="text-peach">.</span>
      </span>
      <h1 className="mt-8 text-2xl font-semibold text-blush">
        Pagina asta nu există
      </h1>
      <p className="mt-3 max-w-md font-light leading-relaxed text-blush/85">
        Poate linkul e vechi sau are o greșeală de tastare. Hai înapoi la
        dulciuri.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-peach px-7 py-3 text-sm font-semibold text-fern-deep transition-colors hover:bg-blush"
      >
        Înapoi la pagina principală
      </Link>
    </div>
  );
}
