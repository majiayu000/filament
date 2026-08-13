export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <p className="pointer-events-none absolute -bottom-8 left-0 select-none font-display text-[22vw] italic leading-none text-copper/[0.07]">
        Filament
      </p>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-4 px-5 py-14 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-catalog text-copper-bright">
            End of plate
          </p>
          <p className="mt-2 font-display text-3xl italic leading-none">Steal the surfaces.</p>
          <p className="mt-3 max-w-sm text-sm text-dust">
            Six instruments every agent product ends up reinventing. Copy them.
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-catalog text-dust">
          React · Tailwind · shadcn-shaped
        </p>
      </div>
    </footer>
  )
}
