import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-usa-blue via-bg-dark to-mex-green border-b border-border-dim">
      {/* Background art */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Stars pattern USA */}
        <div className="absolute left-0 top-0 w-40 h-full opacity-5">
          {Array.from({ length: 20 }).map((_, i) => (
            <span
              key={i}
              className="absolute text-white text-xs"
              style={{
                left: `${(i % 4) * 25 + 5}%`,
                top: `${Math.floor(i / 4) * 22 + 5}%`,
              }}
            >
              ★
            </span>
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-dark/50 to-bg-dark/80" />

        {/* Country stripes — subtle */}
        <div className="absolute right-0 top-0 h-full w-2 bg-usa-red opacity-60" />
        <div className="absolute left-0 top-0 h-full w-2 bg-mex-green opacity-60" />
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4">
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="text-3xl sm:text-4xl drop-shadow-lg">⚽</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="font-display text-3xl sm:text-5xl text-white leading-none tracking-wide drop-shadow-md">
              BOLÃO COPA
              <span className="text-gold ml-2">2026</span>
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-body mt-0.5 tracking-widest uppercase">
              🇺🇸 Estados Unidos &nbsp;·&nbsp; 🇨🇦 Canadá &nbsp;·&nbsp; 🇲🇽 México
            </p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-2">
          <Link
            to="/"
            className="text-gray-300 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            Bolão
          </Link>
          <Link
            to="/admin"
            className="text-gray-400 hover:text-gold text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors flex items-center gap-1"
          >
            <span>⚙️</span>
            <span className="hidden sm:inline">Admin</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}

