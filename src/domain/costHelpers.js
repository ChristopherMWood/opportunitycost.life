import { abbreviateNumber } from 'js-abbreviation-number';
import CostByTypeMap from './costTypes';

export const getOpportunityCostByType = (totalSeconds, opportunityCostType) => {
	let secondsOfType = CostByTypeMap[opportunityCostType];
	const calc = totalSeconds / secondsOfType;
	console.log(opportunityCostType);

	const roundedCostValue = Math.floor(calc);
	return abbreviateNumber(roundedCostValue);
};
