export const CostTypes = {
	HumanLives: 'Human Lives (72.3 Years)',
	BachelorDegrees: 'Bachelor Degrees (4 Years)',
	Pregnancies: 'Pregnancies (9 Months)',
	Weekends: 'Weekends (60 Hours)',
	NightsOfSleep: 'Full Nights of Sleep (8 Hours)',
	FootballGames: 'Football Games (3 Hours)',
};

export const CostInSeconds = {
	AverageHumanLife: 2310016320,
	BachelorDegree: 126230400,
	Pregnancy: 23668200,
	Weekend: 216000,
	NightOfSleep: 28800,
	FootballGame: 10800,
	Day: 86400,
};

const CostByTypeMap = {};
CostByTypeMap[CostTypes.HumanLives] = CostInSeconds.AverageHumanLife;
CostByTypeMap[CostTypes.BachelorDegrees] = CostInSeconds.BachelorDegree;
CostByTypeMap[CostTypes.Pregnancies] = CostInSeconds.Pregnancy;
CostByTypeMap[CostTypes.Weekends] = CostInSeconds.Weekend;
CostByTypeMap[CostTypes.NightsOfSleep] = CostInSeconds.NightOfSleep;
CostByTypeMap[CostTypes.FootballGames] = CostInSeconds.FootballGame;
export default CostByTypeMap;
