export function calculateScalablePrice(baseCostPer100g: number, weightInGrams: number): number {
    const multiplier = weightInGrams <= 500 ? 1.50 : 1.25;
    const sellingPricePer100g = Math.ceil(baseCostPer100g * multiplier);
    const finalPrice = Math.ceil(sellingPricePer100g * (weightInGrams / 100));
    return finalPrice;
}
