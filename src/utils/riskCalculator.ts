import riskWeights from "../config/riskWeights.json"

export const riskCalculator = (assets: any[]) => {

  if (!assets.length) return { score: 0, level: 'Low Risk'}

  let totalWeightRisk = 0
  let totalAmount = 0;
  for (const asset of assets) {
    const weight = riskWeights[asset.type as keyof typeof riskWeights] ?? riskWeights.other
    totalWeightRisk += asset.amount * weight
    totalAmount += asset.amount
  }

  const score = Math.round(totalWeightRisk / totalAmount)
  const level = score <= 30 ? 'Low Risk' : score <= 60 ? 'Medium Risk' : 'High Risk'
  
  return { score, level }
}