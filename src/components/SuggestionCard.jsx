const getFallbackGraphic = (title = '', category = '') => {
  const text = `${title} ${category}`.toLowerCase();

  if (text.includes('reloj')) {
    return (
      <svg viewBox="0 0 120 120" className="w-16 h-16 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="46" y="14" width="28" height="22" rx="4" />
        <rect x="46" y="84" width="28" height="22" rx="4" />
        <circle cx="60" cy="60" r="26" className="fill-white" />
        <path d="M60 46v14l9 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (text.includes('cinturón') || text.includes('cinturon')) {
    return (
      <svg viewBox="0 0 120 120" className="w-16 h-16 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="14" y="48" width="92" height="24" rx="6" className="fill-white" />
        <rect x="46" y="42" width="28" height="36" rx="5" className="fill-zinc-100" />
        <line x1="60" y1="60" x2="72" y2="60" strokeLinecap="round" />
        <circle cx="30" cy="60" r="2" fill="currentColor" />
        <circle cx="90" cy="60" r="2" fill="currentColor" />
      </svg>
    );
  }

  if (text.includes('corbata')) {
    return (
      <svg viewBox="0 0 120 120" className="w-16 h-16 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polygon points="50,20 70,20 66,34 54,34" className="fill-white" strokeLinejoin="round" />
        <polygon points="54,34 66,34 72,84 60,100 48,84" className="fill-white" strokeLinejoin="round" />
      </svg>
    );
  }

  if (text.includes('zapatilla')) {
    return (
      <svg viewBox="0 0 120 120" className="w-16 h-16 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M20 76h80v10a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V76Z" className="fill-white" />
        <path d="M22 76V56l18 4 16-16 14 14c12 4 28 8 30 18H22Z" className="fill-white" strokeLinejoin="round" />
        <line x1="48" y1="54" x2="54" y2="60" strokeLinecap="round" />
        <line x1="56" y1="48" x2="62" y2="54" strokeLinecap="round" />
      </svg>
    );
  }

  if (text.includes('gorra')) {
    return (
      <svg viewBox="0 0 120 120" className="w-16 h-16 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M26 68a34 34 0 0 1 68 0H26Z" className="fill-white" />
        <path d="M74 68h32c0 8-10 12-26 12H58" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="60" cy="32" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (text.includes('lente')) {
    return (
      <svg viewBox="0 0 120 120" className="w-16 h-16 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="18" y="48" width="34" height="24" rx="8" className="fill-white" />
        <rect x="68" y="48" width="34" height="24" rx="8" className="fill-white" />
        <path d="M52 56c4-3 12-3 16 0" strokeLinecap="round" />
      </svg>
    );
  }

  if (text.includes('cadena')) {
    return (
      <svg viewBox="0 0 120 120" className="w-16 h-16 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M32 26c0 34 12 62 28 62s28-28 28-62" strokeLinecap="round" />
        <circle cx="60" cy="88" r="7" className="fill-white" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" className="w-16 h-16 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="28" y="44" width="64" height="52" rx="10" className="fill-white" />
      <path d="M44 44V34a16 16 0 0 1 32 0v10" strokeLinecap="round" />
      <line x1="28" y1="62" x2="92" y2="62" />
    </svg>
  );
};

const SuggestionCard = ({ item, isSelected, onToggle }) => {
  const numericPrice =
    typeof item.price === 'string'
      ? parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
      : Number(item.price ?? item.precio ?? 0);

  const title = item.name || item.nombre || 'Complemento';
  const category = item.category || item.categoria || 'Accesorio';
  const description =
    item.description || item.descripcion || 'Complemento recomendado para potenciar tu outfit.';

  return (
    <div
      className={`rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between bg-white ${
        isSelected
          ? 'border-zinc-900 ring-1 ring-zinc-900 shadow-sm'
          : 'border-zinc-200 hover:border-zinc-400'
      }`}
    >
      <div>
        <div className="relative h-36 w-full mb-3 overflow-hidden rounded-xl bg-gradient-to-br from-stone-100 to-zinc-200/70 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            {getFallbackGraphic(title, category)}
          </div>

          <span className="absolute top-2 left-2 bg-white/95 text-zinc-800 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-zinc-200 shadow-2xs">
            {category}
          </span>
        </div>

        <h4 className="font-semibold text-zinc-900 text-sm leading-snug">
          {title}
        </h4>
        <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
        <span className="font-bold text-zinc-900 text-sm">
          S/ {numericPrice.toFixed(2)}
        </span>

        <button
          type="button"
          onClick={() => onToggle({ ...item, numericPrice })}
          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            isSelected
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-zinc-900 text-white hover:bg-zinc-700'
          }`}
        >
          {isSelected ? '✓ Añadido' : '+ Añadir'}
        </button>
      </div>
    </div>
  );
};

export default SuggestionCard;
