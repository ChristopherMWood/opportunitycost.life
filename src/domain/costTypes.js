export const CostTypes = {
	HumanLives: 'Human Lives',
	BachelorDegrees: 'Bachelor Degrees',
	Pregnancies: 'Pregnancies',
	Weekends: 'Weekends',
	NightsOfSleep: 'Full Nights of Sleep',
	FootballGames: 'Football Games'
}

export const CostInSeconds = {
	AverageHumanLife: 2310016320,
	BachelorDegree: 126230400,
	Pregnancy: 23668200,
	Weekend: 172800,
	NightOfSleep: 28800,
	FootballGame: 10800
}

const CostByTypeMap = {}
CostByTypeMap[CostTypes.HumanLives] = CostInSeconds.AverageHumanLife;
CostByTypeMap[CostTypes.BachelorDegrees] = CostInSeconds.BachelorDegree;
CostByTypeMap[CostTypes.Pregnancies] = CostInSeconds.Pregnancy;
CostByTypeMap[CostTypes.Weekends] = CostInSeconds.Weekend;
CostByTypeMap[CostTypes.NightsOfSleep] = CostInSeconds.NightOfSleep;
CostByTypeMap[CostTypes.FootballGames] = CostInSeconds.FootballGame;
export default CostByTypeMap;