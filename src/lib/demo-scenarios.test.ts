import { describe, expect, it } from 'vitest';
import { demoScenarios } from './demo-scenarios';
describe('static demo scenarios',()=>{it('provides the three approved synthetic scenarios',()=>{expect(demoScenarios.map(s=>s.id)).toEqual(['payday','market','cluster']);});it('contains no negative financial fixture values',()=>{for(const s of demoScenarios){expect(s.liquidity.amountNaira).toBeGreaterThan(0);expect(s.liquidity.thresholdNaira).toBeGreaterThan(0);}});it('includes an explicit decision-support disclaimer',()=>{expect(demoScenarios.every(s=>s.disclaimer.length>10)).toBe(true);});});
