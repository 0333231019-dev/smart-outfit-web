import { useState } from 'react'

function getProductSvg(name = '', category = '') {
  const text = `${name} ${category}`.toLowerCase()

  if (text.includes('camisa') || text.includes('camiseta')) {
    return (
      <svg viewBox="0 0 120 120" className="w-20 h-20 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M40 24 22 36l8 16 12-6v50h36V46l12 6 8-16-18-12c-4 8-16 8-20 0Z" className="fill-white" strokeLinejoin="round" />
      </svg>
    )
  }

  if (text.includes('sneaker') || text.includes('zapatilla')) {
    return (
      <svg viewBox="0 0 120 120" className="w-20 h-20 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M20 76h80v10a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V76Z" className="fill-white" />
        <path d="M22 76V56l18 4 16-16 14 14c12 4 28 8 30 18H22Z" className="fill-white" strokeLinejoin="round" />
        <line x1="48" y1="54" x2="54" y2="60" strokeLinecap="round" />
        <line x1="56" y1="48" x2="62" y2="54" strokeLinecap="round" />
      </svg>
    )
  }

  if (text.includes('blazer') || text.includes('saco')) {
    return (
      <svg viewBox="0 0 120 120" className="w-20 h-20 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M42 22 22 34l6 22 12-4v46h40V52l12 4 6-22-20-12-18 28-18-28Z" className="fill-white" strokeLinejoin="round" />
        <line x1="60" y1="50" x2="60" y2="98" />
        <circle cx="55" cy="66" r="2" fill="currentColor" />
        <circle cx="55" cy="78" r="2" fill="currentColor" />
      </svg>
    )
  }

  if (text.includes('pantalón') || text.includes('pantalon')) {
    return (
      <svg viewBox="0 0 120 120" className="w-20 h-20 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M38 22h44l6 76H68l-8-46-8 46H32l6-76Z" className="fill-white" strokeLinejoin="round" />
        <line x1="38" y1="32" x2="82" y2="32" />
      </svg>
    )
  }

  if (text.includes('reloj')) {
    return (
      <svg viewBox="0 0 120 120" className="w-20 h-20 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="46" y="14" width="28" height="22" rx="4" />
        <rect x="46" y="84" width="28" height="22" rx="4" />
        <circle cx="60" cy="60" r="26" className="fill-white" />
        <path d="M60 46v14l9 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  // Bolso por defecto
  return (
    <svg viewBox="0 0 120 120" className="w-20 h-20 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.2">
      <rect x="28" y="44" width="64" height="52" rx="10" className="fill-white" />
      <path d="M44 44V34a16 16 0 0 1 32 0v10" strokeLinecap="round" />
      <line x1="28" y1="62" x2="92" y2="62" />
    </svg>
  )
}

function ProductCard({ product, isViewed, onAddToViewed }) {
  const [imgError, setImgError] = useState(false)
  const rawImage = product.image || ''
  const hasValidUrl = rawImage.startsWith('http') && rawImage !== 'https://unsplash.com' && !imgError

  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        {hasValidUrl ? (
          <img
            className="product-card__image"
            src={rawImage}
            alt={product.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-stone-100 to-zinc-200/70">
            {getProductSvg(product.name, product.category)}
          </div>
        )}

        <span className="product-card__badge">{product.badge}</span>
        <button
          className={`product-card__save${isViewed ? ' is-viewed' : ''}`}
          type="button"
          aria-label={
            isViewed
              ? `${product.name} ya está en tus vistos`
              : `Añadir ${product.name} a vistos`
          }
          aria-pressed={isViewed}
          onClick={() => onAddToViewed(product)}
        >
          {isViewed ? '✓' : '+'}
        </button>
      </div>
      <div className="product-card__details">
        <div className="product-card__meta">
          <span>{product.category}</span>
          <span className="product-card__rating" aria-label={`${product.rating} de 5 estrellas`}>
            ★ <span>{product.rating}</span>
          </span>
        </div>
        <h3>{product.name}</h3>
        <div className="product-card__footer">
          <p className="product-card__price">
            S/ {product.price.toLocaleString('es-PE')}
          </p>
          <button
            className={`product-card__action${isViewed ? ' is-viewed' : ''}`}
            type="button"
            aria-pressed={isViewed}
            onClick={() => onAddToViewed(product)}
          >
            {isViewed ? 'En tus vistos ✓' : 'Añadir a vistos'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
