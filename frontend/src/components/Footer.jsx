export default function Footer() {
  return (
    <footer className="bg-[var(--color-brand-primary)] text-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-[var(--font-headings)] text-base font-semibold text-white">
            SABORES URBANOS
          </p>
          <p className="mt-1 text-sm text-white/65">
            Tecnología para una operación gastronómica más simple.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <a href="/" className="hover:text-white">Inicio</a>
          <a href="/mesas" className="hover:text-white">Mesas</a>
          <a href="/reservas" className="hover:text-white">Reservas</a>
          <a href="/menu" className="hover:text-white">Menú</a>
        </nav>
      </div>

      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/50">
        © 2026 Sabores Urbanos — Proyecto académico.
      </div>
    </footer>
  );
}
