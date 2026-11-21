import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'

const products = [
  {
    id: 'camisa-lino',
    name: 'Camisa de lino',
    category: 'Camisas',
    price: 899,
    rating: '4.9',
    badge: 'MÁS VENDIDO',
    image:
      'https://unsplash.com',
  },
  {
    id: 'sneakers-retro',
    name: 'Sneakers retro',
    category: 'Zapatillas',
    price: 1499,
    rating: '4.8',
    badge: 'NUEVO',
    image:
      'https://unsplash.com',
  },
  {
    id: 'blazer-estructurado',
    name: 'Blazer estructurado',
    category: 'Sacos',
    price: 2290,
    rating: '4.9',
    badge: 'SELECCIÓN',
    image:
      'https://unsplash.com',
  },
  {
    id: 'bolso-urbano',
    name: 'Bolso urbano',
    category: 'Accesorios',
    price: 1190,
    rating: '4.7',
    badge: 'ÚLTIMAS PIEZAS',
    image:
      'https://unsplash.com',
  },
  {
    id: 'pantalon-recto',
    name: 'Pantalón recto',
    category: 'Pantalones',
    price: 1090,
    rating: '4.8',
    badge: 'FAVORITO',
    image:
      'https://unsplash.com',
  },
  {
    id: 'reloj-minimal',
    name: 'Reloj minimal',
    category: 'Accesorios',
    price: 1790,
    rating: '4.9',
    badge: 'NUEVO',
    image:
      'https://unsplash.com',
  },
  {
    id: 'camiseta-esencial',
    name: 'Camiseta esencial',
    category: 'Camisas',
    price: 590,
    rating: '4.6',
    badge: 'ESENCIAL',
    image:
      'https://unsplash.com',
  },
  {
    id: 'sneakers-clean',
    name: 'Sneakers clean',
    category: 'Zapatillas',
    price: 1690,
    rating: '4.8',
    badge: 'NUEVO',
    image:
      'https://unsplash.com',
  },
]

const categories = ['Todo', 'Camisas', 'Zapatillas', 'Sacos', 'Pantalones', 'Accesorios']

function Level1_Catalog({ viewedProducts = [], onAddToViewed = () => {}, onNext = () => {} }) {
  const [activeCategory, setActiveCategory] = useState('Todo')
  const [search, setSearch] = useState('')
  const viewedIds = new Set(viewedProducts.map((product) => product.id))

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase('es')

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'Todo' || product.category === activeCategory
      const matchesSearch =
        normalizedSearch.length === 0 ||
        `${product.name} ${product.category}`.toLocaleLowerCase('es').includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search])

  return (
    <main className="storefront">
      <div className="announcement">
        <span>Envío gratis en compras mayores a S/ 1,999</span>
        <span className="announcement__separator">·</span>
        <span>Tu estilo, a tu manera</span>
      </div>

      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="Nómada, inicio">
          nómada<span>.</span>
        </a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a className="main-nav__link is-active" href="#catalogo">
            Descubrir
          </a>
          <a className="main-nav__link" href="#catalogo">
            Novedades
          </a>
          <a className="main-nav__link" href="#catalogo">
            Colecciones
          </a>
        </nav>
        <button
          type="button"
          onClick={onNext}
          className="viewed-link cursor-pointer"
          aria-label={`Analizar ${viewedProducts.length} artículos vistos`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M2.5 12s3.4-6.2 9.5-6.2 9.5 6.2 9.5 6.2-3.4 6.2-9.5 6.2S2.5 12 2.5 12Z" />
            <circle cx="12" cy="12" r="2.7" />
          </svg>
          <span>Vistos</span>
          <span className="viewed-link__count">{viewedProducts.length}</span>
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero__copy">
          <p className="eyebrow"><span /> VISTE A TU MANERA</p>
          <h1>Encuentra eso<br />que va contigo<span>.</span></h1>
          <p className="hero__description">
            Piezas que hablan de ti. Explora, guarda tus favoritas y deja que tu estilo tome forma.
          </p>
          <a className="hero__cta" href="#catalogo">
            Explorar colección <span aria-hidden="true">↘</span>
          </a>
          <div className="hero__note">
            <div className="hero__avatars" aria-hidden="true">
              <span>m</span><span>a</span><span>l</span>
            </div>
            <span>Estilo real, elegido por personas reales</span>
          </div>
        </div>
        <div className="hero__visual" role="img" aria-label="Selección de prendas en tonos neutros">
          <div className="hero__image" />
          <div className="hero__image-label">
            <span>01 — 08</span>
            <span>La selección de hoy</span>
          </div>
          <div className="hero__stamp" aria-hidden="true">
            <span>ESTILO</span>
            <span>PROPIO</span>
            <span>✳</span>
          </div>
        </div>
      </section>

      <section className="catalog" id="catalogo">
        <div className="catalog__heading">
          <div>
            <p className="eyebrow">HECHO PARA DESCUBRIR</p>
            <h2>Tu próxima favorita</h2>
          </div>
          <label className="search-box">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.3 4.3" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar prendas..."
              aria-label="Buscar prendas"
            />
            <span className="search-box__shortcut">⌘ K</span>
          </label>
        </div>

        <div className="catalog__controls">
          <div className="category-tabs" role="group" aria-label="Filtrar por categoría">
            {categories.map((category) => (
              <button
                className={`category-tab${activeCategory === category ? ' is-active' : ''}`}
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="catalog__count">
            <span>{filteredProducts.length.toString().padStart(2, '0')}</span> piezas
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isViewed={viewedIds.has(product.id)}
                onAddToViewed={onAddToViewed}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">⌕</span>
            <h3>No encontramos esa pieza</h3>
            <p>Prueba con otra búsqueda o explora todas las categorías.</p>
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setActiveCategory('Todo')
              }}
            >
              Ver todo el catálogo
            </button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-zinc-200 flex justify-end">
          <button
            type="button"
            onClick={onNext}
            className="px-6 py-3 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            Analizar mi perfil ({viewedProducts.length}) →
          </button>
        </div>
      </section>
    </main>
  )
}

export default Level1_Catalog
