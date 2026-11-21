import { useState } from 'react';
import Level1_Catalog from './views/Level1_Catalog.jsx';
import Level2Profile from './views/Level2_Profile';
import Level3Suggestions from './views/Level3_Suggestions';
import './App.css';

function App() {
  const [viewedProducts, setViewedProducts] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [detectedProfile, setDetectedProfile] = useState(null);

function addToViewed(product) {
  setViewedProducts((currentProducts) =>
    currentProducts.some((item) => item.id === product.id)
      ? currentProducts.filter((item) => item.id !== product.id)
      : [...currentProducts, product]
  );
}

const handleCompleteLevel1 = () => {
    setCurrentStep(2);
  };

  const handleCompleteLevel2 = (profileResult) => {
    if (profileResult) {
      setDetectedProfile(profileResult);
    }
    setCurrentStep(3);
  };

  const handleReset = () => {
    setViewedProducts([]);
    setDetectedProfile(null);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <header className="w-full max-w-4xl mb-6 text-center">
        <h1 className="text-xl font-bold text-gray-800">Smart Outfit E-commerce</h1>
        <div className="flex justify-around mt-3 text-sm font-semibold">
          <span className={currentStep === 1 ? 'text-blue-600 underline' : 'text-gray-400'}>
            1. Artículos Vistos
          </span>
          <span className={currentStep === 2 ? 'text-blue-600 underline' : 'text-gray-400'}>
            2. Perfil
          </span>
          <span className={currentStep === 3 ? 'text-blue-600 underline' : 'text-gray-400'}>
            3. Sugerencias
          </span>
        </div>
      </header>

      <main className="w-full max-w-4xl bg-white shadow-md rounded-2xl p-6">
        {currentStep === 1 && (
          <Level1_Catalog
            onNext={handleCompleteLevel1}
            viewedProducts={viewedProducts}
            onAddToViewed={addToViewed}
          />
        )}

        {currentStep === 2 && (
          <Level2Profile
            viewedProducts={viewedProducts}
            onNext={handleCompleteLevel2}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <Level3Suggestions
            profile={detectedProfile}
            viewedProducts={viewedProducts}
            onBack={() => setCurrentStep(2)}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default App;
