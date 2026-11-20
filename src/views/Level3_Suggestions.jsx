import { useState } from 'react';
import SuggestionCard from '../components/SuggestionCard';

const FALLBACK_BY_PROFILE = {
  Formal: [
    {
      id: 'f-1',
      name: 'Cinturón de Cuero Clásico',
      category: 'Accesorio',
      price: 85,
      description: 'Cuero genuino negro con hebilla metálica pulida.',
      image: 'https://unsplash.com',
    },
    {
      id: 'f-2',
      name: 'Corbata de Seda Slim',
      category: 'Accesorio',
      price: 60,
      description: 'Corte estilizado ideal para camisas de vestir y blazers.',
      image: 'https://unsplash.com',
    },
    {
      id: 'f-3',
      name: 'Reloj Minimalista',
      category: 'Relojería',
      price: 220,
      description: 'Esfera limpia con correa de cuero negro.',
      image: 'https://unsplash.com',
    },
  ],
  Oficina: [
    {
      id: 'o-1',
      name: 'Mochila Ejecutiva Porta Laptop',
      category: 'Bolso',
      price: 140,
      description: 'Compartimento acolchado para laptop de hasta 15.6".',
      image: 'https://unsplash.com',
    },
    {
      id: 'o-2',
      name: 'Reloj Cronógrafo Ejecutivo',
      category: 'Relojería',
      price: 240,
      description: 'Acero inoxidable resistente para uso diario.',
      image: 'https://unsplash.com',
    },
    {
      id: 'o-3',
      name: 'Lentes Filtro Luz Azul',
      category: 'Accesorio',
      price: 95,
      description: 'Protección visual frente a pantallas de oficina.',
      image: 'https://unsplash.com',
    },
  ],
  Streetwear: [
    {
      id: 's-1',
      name: 'Bolso Crossbody Urbano',
      category: 'Bolso',
      price: 75,
      description: 'Nylon impermeable con correa ajustable.',
      image: 'https://unsplash.com',
    },
    {
      id: 's-2',
      name: 'Gorra Estructurada Negra',
      category: 'Accesorio',
      price: 45,
      description: 'Algodón grueso con cierre metálico trasero.',
      image: 'https://unsplash.com',
    },
    {
      id: 's-3',
      name: 'Cadena de Acero Inoxidable',
      category: 'Joyería',
      price: 55,
      description: 'Eslabones plateados resistentes al agua.',
      image: 'https://unsplash.com',
    },
  ],
  Casual: [
    {
      id: 'c-1',
      name: 'Zapatillas Blancas Versátiles',
      category: 'Calzado',
      price: 185,
      description: 'Diseño minimalista que combina con cualquier look.',
      image: 'https://unsplash.com',
    },
    {
      id: 'c-2',
      name: 'Tote Bag de Lona',
      category: 'Bolso',
      price: 65,
      description: 'Amplia y ligera para tus salidas diarias.',
      image: 'https://unsplash.com',
    },
    {
      id: 'c-3',
      name: 'Lentes de Sol Clásicos',
      category: 'Accesorio',
      price: 89,
      description: 'Protección UV400 con marco ligero.',
      image: 'https://unsplash.com',
    },
  ],
};

const parsePrice = (val) => {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') return parseFloat(val.replace(/[^0-9.]/g, '')) || 0;
  return 0;
};

const Level3_Suggestions = ({
  profile = 'Formal / Ejecutivo',
  suggestions = [],
  viewedProducts = [],
  onReset,
  onBack,
}) => {
  const [selectedOutfitItems, setSelectedOutfitItems] = useState([]);
  const [statusMessage, setStatusMessage] = useState(null);

  const matchedKey =
    Object.keys(FALLBACK_BY_PROFILE).find((key) =>
      String(profile || '')
        .toLowerCase()
        .includes(key.toLowerCase())
    ) || 'Formal';

  const itemsToDisplay =
    Array.isArray(suggestions) && suggestions.length > 0
      ? suggestions
      : FALLBACK_BY_PROFILE[matchedKey];

  const handleToggleItem = (item) => {
    setStatusMessage(null);
    setSelectedOutfitItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      return exists ? prev.filter((i) => i.id !== item.id) : [...prev, item];
    });
  };

  const baseTotal = viewedProducts.reduce(
    (sum, prod) => sum + parsePrice(prod.price ?? prod.precio),
    0
  );
  const suggestionsTotal = selectedOutfitItems.reduce(
    (sum, item) => sum + parsePrice(item.price ?? item.precio),
    0
  );
  const grandTotal = baseTotal + suggestionsTotal;

  const hasItems = viewedProducts.length > 0 || selectedOutfitItems.length > 0;

  return (
    <div className="w-full text-left text-zinc-900">
      <div className="mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
          NIVEL 3 · CROSS-SELLING INTELIGENTE
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mt-1">
          Sugerencias de compra
        </h2>
      </div>

      <div className="bg-zinc-900 text-white rounded-2xl p-5 mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            PERFIL DETECTADO EN NIVEL 2
          </p>
          <h3 className="text-lg font-bold mt-0.5">
            {profile || 'Estilo Personalizado'}
          </h3>
          <p className="text-xs text-zinc-300 mt-1">
            Añade complementos para completar tu combinación ideal.
          </p>
        </div>
        <span className="bg-zinc-800 border border-zinc-700 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-xl shrink-0">
          Match ✓
        </span>
      </div>

      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-3">
          COMPLEMENTOS RECOMENDADOS ({itemsToDisplay.length})
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {itemsToDisplay.map((item) => (
            <SuggestionCard
              key={item.id}
              item={item}
              isSelected={selectedOutfitItems.some((s) => s.id === item.id)}
              onToggle={handleToggleItem}
            />
          ))}
        </div>
      </div>

      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 mb-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
          <h3 className="text-base font-bold text-zinc-900">
            Arma tu Outfit Completo
          </h3>
          <span className="text-xs font-medium bg-zinc-200 text-zinc-800 px-2.5 py-0.5 rounded-full">
            {viewedProducts.length + selectedOutfitItems.length} artículos
          </span>
        </div>

        {viewedProducts.length > 0 && (
          <div className="mt-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Prendas seleccionadas (Nivel 1)
            </p>
            <ul className="space-y-1.5">
              {viewedProducts.map((prod, idx) => (
                <li
                  key={prod.id || idx}
                  className="flex justify-between text-xs text-zinc-700"
                >
                  <span className="truncate pr-2">{prod.name || prod.nombre}</span>
                  <span className="font-medium shrink-0">
                    S/ {parsePrice(prod.price ?? prod.precio).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
            Complementos añadidos ({selectedOutfitItems.length})
          </p>
          {selectedOutfitItems.length === 0 ? (
            <p className="text-xs text-zinc-500 italic">
              Selecciona al menos un accesorio arriba para armar tu outfit.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {selectedOutfitItems.map((acc) => (
                <li
                  key={acc.id}
                  className="flex justify-between items-center text-xs bg-white px-3 py-1.5 rounded-lg border border-zinc-200"
                >
                  <span className="font-medium text-zinc-800 truncate pr-2">
                    + {acc.name || acc.nombre}
                  </span>
                  <span className="font-semibold text-zinc-900 shrink-0">
                    S/ {parsePrice(acc.price ?? acc.precio).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-200 flex items-baseline justify-between">
          <span className="text-sm font-semibold text-zinc-700">
            Precio Total Estimado:
          </span>
          <span className="text-xl font-bold text-zinc-900">
            S/ {grandTotal.toFixed(2)}
          </span>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={() => setStatusMessage('purchased')}
            disabled={!hasItems}
            className="flex-1 py-2.5 px-4 rounded-full bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 disabled:bg-zinc-300 transition-colors cursor-pointer"
          >
            Simular Compra del Outfit →
          </button>

          <button
            type="button"
            onClick={() => setStatusMessage('saved')}
            disabled={!hasItems}
            className="py-2.5 px-4 rounded-full bg-white border border-zinc-300 text-zinc-700 text-xs font-semibold hover:bg-zinc-100 disabled:opacity-50 transition-colors cursor-pointer"
          >
            Guardar Outfit
