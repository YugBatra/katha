export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-katha-bg">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(196, 80, 42, 0.13) 0%, rgba(196, 80, 42, 0.04) 35%, transparent 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="font-heading text-2xl tracking-wide text-katha-gold">
          कथा
        </span>
        <h1 className="font-heading mt-4 text-8xl font-light tracking-tight text-katha-cream">
          Katha
        </h1>
        <p className="font-body mt-6 text-xl italic text-katha-muted">
          Stories from the Indian tradition
        </p>
        <div className="my-8 w-16 border-t border-katha-gold" />
        <p className="font-body text-sm uppercase tracking-[0.3em] text-katha-muted">
          Coming soon
        </p>
      </div>
    </main>
  );
}
