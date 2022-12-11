import { abbreviateNumber } from 'js-abbreviation-number';
import CostByTypeMap from './costTypes';

export const unitSymbols = ['', 'K', 'M', 'B', 'T', 'P', 'E'];

export const getOpportunityCostByType = (totalSeconds, opportunityCostType) => {
	let secondsOfType = CostByTypeMap[opportunityCostType];
	const calc = totalSeconds / secondsOfType;
	opportunityCostType;

	const roundedCostValue = Math.floor(calc);
	return abbreviateNumber(roundedCostValue, 1,  { symbols: unitSymbols});
};
