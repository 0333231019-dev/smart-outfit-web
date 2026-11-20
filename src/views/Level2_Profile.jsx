import { useMemo } from 'react'
import { calculatePreferenceProfile } from '../services/recommendationEngine'
import './Level2_Profile.css'

function Level2_Profile({
    viewedProducts,
    seenItems,
    onNext,
    onProceedToLevel3,
    onBack,
    onBackToLevel1,
}) {
    // Soporta cualquiera de las dos props que el Integrante 4 deje en App.jsx
    const itemsToAnalyze = viewedProducts || seenItems || []

    const profileResult = useMemo(() => {
        return calculatePreferenceProfile(itemsToAnalyze)
    }, [itemsToAnalyze])

    const {
        hasData,
        dominantStyle,
        profileTitle,
        confidence,
        breakdown,
        description,
        analyzedItems,
    } = profileResult

    const handleGoBack = () => {
        if (onBack) onBack()
        else if (onBackToLevel1) onBackToLevel1()
    }

    const handleContinue = () => {
        if (onNext) onNext(profileResult)
        else if (onProceedToLevel3) onProceedToLevel3(profileResult)
    }

    return (
        <section className="level2-container" aria-label="Perfil de preferencia">
            <div className="level2-header">
                <div>
                    <span className="level2-eyebrow">Nivel 2 · Motor de Preferencias</span>
                    <h2 className="level2-title">Tu perfil de estilo</h2>
                </div>
                <div className="level2-counter">
                    <span>Prendas vistas</span>
                    <strong>{analyzedItems.length}</strong>
                </div>
            </div>

            {!hasData && (
                <div className="level2-alert">
                    No marcaste prendas como vistas en el Nivel 1. Se muestra un perfil predeterminado; vuelve al catálogo para personalizarlo.
                </div>
            )}

            <div className="level2-hero-card">
                <div>
                    <p className="level2-hero-label">Perfil dominante detectado</p>
                    <h3 className="level2-hero-style">{profileTitle}</h3>
                    <p className="level2-hero-desc">{description}</p>
                </div>
                <div className="level2-confidence-box">
                    <span className="level2-confidence-value">{confidence}%</span>
                    <span className="level2-confidence-label">Afinidad</span>
                </div>
            </div>

            <h4 className="level2-section-title">Desglose por categoría de estilo</h4>
            <div className="level2-bars">
                {breakdown.map((item) => {
                    const isDominant = hasData && item.style === dominantStyle
                    return (
                        <div key={item.style}>
                            <div className={`level2-bar-header${isDominant ? ' is-dominant' : ''}`}>
                                <span>
                                    {item.style} {isDominant ? '★' : ''}
                                </span>
                                <span>{item.percentage}%</span>
                            </div>
                            <div className="level2-bar-track">
                                <div
                                    className={`level2-bar-fill${isDominant ? ' is-dominant' : ''}`}
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>

            {analyzedItems.length > 0 && (
                <>
                    <h4 className="level2-section-title">Prendas analizadas en tu historial</h4>
                    <div className="level2-chips">
                        {analyzedItems.map((item) => (
                            <span key={item.id} className="level2-chip">
                                {item.name} · <strong>{item.detectedStyle}</strong>
                            </span>
                        ))}
                    </div>
                </>
            )}

            <div className="level2-actions">
                <button type="button" className="level2-btn-secondary" onClick={handleGoBack}>
                    ← Volver al catálogo
                </button>
                <button type="button" className="level2-btn-primary" onClick={handleContinue}>
                    Ver sugerencias de outfit →
                </button>
            </div>
        </section>
    )
}

export default Level2_Profile