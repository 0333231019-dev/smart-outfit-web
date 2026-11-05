import { useState } from 'react'
import Level1_Catalog from './views/Level1_Catalog.jsx'
import './App.css'

function App() {
  const [viewedProducts, setViewedProducts] = useState([])

  function addToViewed(product) {
    setViewedProducts((currentProducts) =>
      currentProducts.some((item) => item.id === product.id)
        ? currentProducts
        : [...currentProducts, product],
    )
  }

  return (
    <Level1_Catalog
      viewedProducts={viewedProducts}
      onAddToViewed={addToViewed}
    />
  )
}

export default App
