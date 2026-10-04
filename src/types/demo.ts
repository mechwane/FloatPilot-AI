export type ScenarioType = 'cash' | 'efloat' | 'cluster';
export type RiskLevel = 'Elevated' | 'High' | 'Critical';
export interface DemoScenario { id: string; title: string; description: string; scenarioType: ScenarioType; agents: string[]; liquidity: { label: string; amountNaira: number; thresholdNaira: number }; riskLevel: RiskLevel; riskReason: string; activitySummary: string; suggestedAction: string; disclaimer: string; }
