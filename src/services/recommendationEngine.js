import rulesData from '../data/rules.json';

const STYLES = ['Formal', 'Oficina', 'Streetwear', 'Casual'];

/**
 * Calcula el Perfil de Preferencia dominante a partir de los productos vistos en el Nivel 1.
 * @param {Array} viewedItems - Lista de productos seleccionados en Level1_Catalog.
 * @returns {Object} Objeto completo con perfil dominante, porcentajes y sugerencias para Nivel 3.
 */
export function calculatePreferenceProfile(viewedItems = []) {
    if (!Array.isArray(viewedItems) || viewedItems.length === 0) {
        const defaultProfile = rulesData.profiles.Casual;
        return {
            hasData: false,
            dominantStyle: 'Casual',
            profileTitle: defaultProfile.title,
            confidence: 0,
            breakdown: STYLES.map((style) => ({ style, score: 0, percentage: 0 })),
            description: 'Aún no has marcado prendas como vistas en el catálogo. Mostrando perfil base.',
            suggestedItems: defaultProfile.suggestions,
            analyzedItems: []
        };
    }

    const scores = { Formal: 0, Oficina: 0, Streetwear: 0, Casual: 0 };
    let totalWeight = 0;

    const analyzedItems = viewedItems.map((item) => {
        // 1. Buscar regla exacta por ID del Nivel 1
        const byId = rulesData.productProfiles[item.id];
        // 2. Respaldo por categoría si se añaden productos nuevos
        const byCategory = rulesData.categoryFallback[item.category];

        const matchedRule = byId || byCategory || { style: item.style || 'Casual', weight: 1 };

        if (scores[matchedRule.style] !== undefined) {
            scores[matchedRule.style] += matchedRule.weight;
            totalWeight += matchedRule.weight;
        }

        return {
            ...item,
            detectedStyle: matchedRule.style,
            weight: matchedRule.weight
        };
    });

    // Calcular porcentajes exactos asegurando que sumen 100%
    let accumulatedPercentage = 0;
    const breakdown = STYLES.map((style) => {
        const score = scores[style];
        const percentage = totalWeight > 0 ? Math.round((score / totalWeight) * 100) : 0;
        accumulatedPercentage += percentage;
        return { style, score, percentage };
    }).sort((a, b) => b.percentage - a.percentage);

    // Ajuste de diferencia de redondeo (+/- 1%) en el segundo elemento con puntaje > 0
    if (totalWeight > 0 && accumulatedPercentage !== 100) {
        const diff = 100 - accumulatedPercentage;
        const targetIndex = breakdown.length > 1 && breakdown[1].score > 0 ? 1 : 0;
        breakdown[targetIndex].percentage += diff;
    }
    const dominant = breakdown[0];
    const profileInfo = rulesData.profiles[dominant.style] || rulesData.profiles.Casual;

    return {
        hasData: true,
        dominantStyle: dominant.style,
        profileTitle: profileInfo.title,
        confidence: dominant.percentage,
        breakdown,
        description: profileInfo.description,
        suggestedItems: profileInfo.suggestions,
        analyzedItems
    };
}