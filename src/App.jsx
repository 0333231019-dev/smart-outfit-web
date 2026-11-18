import { useState } from 'react'
import Level1_Catalog from './views/Level1_Catalog.jsx'

import Level2Profile from './views/Level2_Profile';
import Level3Suggestions from './views/Level3_Suggestions';

import './App.css'



function App() {
  const [viewedProducts, setViewedProducts] = useState([])

  const [currentStep, setCurrentStep] = useState(1); // Controla en qué nivel está (1, 2 o 3)

  const [selectedItems, setSelectedItems] = useState([]); // Lo que viene del Nivel 1
  const [userProfile, setUserProfile] = useState(null);       // Lo que procesa el Nivel 2
  const [suggestions, setSuggestions] = useState([]);         // Lo que muestra el Nivel 3 

  function addToViewed(product) {
    setViewedProducts((currentProducts) =>
      currentProducts.some((item) => item.id === product.id)
        ? currentProducts
        : [...currentProducts, product],
    )
  }



  // Función que se ejecuta cuando el usuario selecciona artículos en el Nivel 1 y pasa al Nivel 2
  const handleCompleteLevel1 = (itemsSelected) => {
    setSeenItems(itemsSelected);
    
    // Aquí puedes invocar la lógica del Nivel 2 (o función de motor de reglas)
    const profileCalculated = evaluateProfile(itemsSelected);
    setDetectedProfile(profileCalculated);

    // Avanza automáticamente al Nivel 2
    setCurrentStep(2);
  };

  // Función para pasar del Nivel 2 al Nivel 3 (Sugerencias de compra)
  const handleCompleteLevel2 = () => {
    // Genera las sugerencias basadas en el perfil detectado
    const generatedSuggestions = fetchSuggestions(detectedProfile);
    setSuggestions(generatedSuggestions);

    // Avanza al Nivel 3
    setCurrentStep(3);
  };

  // Función para reiniciar todo el flujo
  const handleReset = () => {
    setSeenItems([]);
    setDetectedProfile(null);
    setSuggestions([]);
    setCurrentStep(1);
  };

  const evaluateProfile = (items) => {
    // Lógica temporal para simular el Nivel 2 del diagrama
    if (items.some(item => item.category === 'formal')) return 'Setup Oficina / Estilo Formal';
    if (items.some(item => item.category === 'sport')) return 'Setup Urbano / Sport';
    return 'Estilo Casual Versátil';
  };

  const fetchSuggestions = (profile) => {
    // Lógica temporal para simular el Nivel 3 (Cross-selling)
    return [
      { id: 1, name: 'Cinturón de Cuero', price: '$25' },
      { id: 2, name: 'Reloj Minimalista', price: '$80' },
      { id: 3, name: 'Mochila Exec', price: '$45' }
    ];
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      {/* Barra de Progreso Superior (Indicador de los 3 Niveles) */}
      <header className="w-full max-w-md mb-6 text-center">
        <h1 className="text-xl font-bold text-gray-800">Smart Outfit E-commerce</h1>
        <div className="flex justify-around mt-3 text-sm font-semibold">
          <span className={currentStep === 1 ? 'text-blue-600 underline' : 'text-gray-400'}>1. Artículos Vistos</span>
          <span className={currentStep === 2 ? 'text-blue-600 underline' : 'text-gray-400'}>2. Perfil</span>
          <span className={currentStep === 3 ? 'text-blue-600 underline' : 'text-gray-400'}>3. Sugerencias</span>
        </div>
      </header>

      {/* Contenedor Dinámico de las Vistas */}
      <main className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {currentStep === 1 && (
          <Level1Catalog 
            //onNext={handleCompleteLevel1} 
    
            viewedProducts={viewedProducts}
            onAddToViewed={addToViewed}

          />
        )}
        

        {currentStep === 2 && (
          <Level2Profile 
            seenItems={seenItems}
            profile={detectedProfile}
            onNext={handleCompleteLevel2}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <Level3Suggestions 
            profile={detectedProfile}
            suggestions={suggestions}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default App
