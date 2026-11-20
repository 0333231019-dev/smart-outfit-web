const SuggestionCard = ({ item, isSelected, onToggle }) => {
  const numericPrice =
    typeof item.price === 'string'
      ? parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
      : Number(item.price ?? item.precio ?? 0);

  const title = item.name || item.nombre || 'Complemento';
  const category = item.category || item.categoria || 'Accesorio';
  const description =
    item.description || item.descripcion || 'Complemento recomendado para potenciar tu outfit.';
  const image =
    item.image ||
    item.imagen ||
    'https://unsplash.com';

  return (
    <div
      className={`rounded-2xl border p-4 transition-all duration-200 flex flex-col justify-between bg-white ${
        isSelected
          ? 'border-zinc-900 ring-1 ring-zinc-900 shadow-sm'
          : 'border-zinc-200 hover:border-zinc-400'
      }`}
    >
      <div>
        <div className="relative h-36 w-full mb-3 overflow-hidden rounded-xl bg-zinc-100">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
          <span className="absolute top-2 left-2 bg-white/90 text-zinc-800 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-zinc-200">
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
