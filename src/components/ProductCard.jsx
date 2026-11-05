function ProductCard({ product, isViewed, onAddToViewed }) {
  return (
    <article className="product-card">
      <div className="product-card__image-wrap">
        <img
          className="product-card__image"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
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
            ${product.price.toLocaleString('es-MX')} <span>MXN</span>
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
