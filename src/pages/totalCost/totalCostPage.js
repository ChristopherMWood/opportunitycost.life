import * as React from 'react';
import { useState } from 'react';
import { OpportunityCostApiProxy } from '../../domain/opportunityCostApiProxy';
import CostBlocks from '../../components/costBlocks/costBlocks';
import { Typography } from '@mui/material';
import Stack from '@mui/system/Stack';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import './styles.scss';
import ProgressBarWithLabel from '../../components/progressBarWithLabel/progressBarWithLabel';
import { CostGoals } from '../../domain/costGoals';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

function calculateGoalsState(goals, totalOpportunityCost) {
	let currentGoal;
	let acheivedGoals = [];

	for (let i = 0; i < goals.length; i++) {
		const loopGoal = goals[i];

		if (loopGoal.cost > totalOpportunityCost) {
			currentGoal = loopGoal;
		} else {
			acheivedGoals.push(loopGoal);
		}
	}

	return {
		currentGoal: currentGoal,
		acheivedGoals: acheivedGoals,
	};
}

const TotalCostPage = () => {
	const [totalSeconds, setTotalSeconds] = useState(0);
	const [goalState, setGoalState] = useState();

	React.useEffect(() => {
		OpportunityCostApiProxy.getOverview(
			data => {
				const allCost = data?.allChannelsOpportunityCost || undefined;

				if (allCost) {
					setTotalSeconds(allCost);
					const newGoalState = calculateGoalsState(CostGoals, allCost);
					setGoalState(newGoalState);
				}
			},
			error => {
				console.error(error);
			}
		);
	}, []);

	return (
		<div className='site-page-container total-cost-page'>
			{totalSeconds > 0 && (
				<Stack spacing={3}>
					<Typography variant='h4' align='center'>
						Opportunity Cost Of Everything So Far
					</Typography>
					<CostBlocks totalSeconds={totalSeconds} />
					{/* <EventCostBlocks totalSeconds={totalSeconds} /> */}
					<Typography variant='h5' align='center'>
						Next Goal: {goalState.currentGoal.title}
					</Typography>
					<Typography variant='h5' align='center'>
						({goalState.currentGoal.timeString})
					</Typography>
					<ProgressBarWithLabel
						value={(totalSeconds / goalState.currentGoal.cost) * 100}
					/>
					<Timeline position='alternate'>
						{goalState.acheivedGoals?.map((goal, index) => {
							let achieved = false;

							if (totalSeconds > goal.cost) {
								achieved = true;
							}
							return (
								<TimelineItem key={index}>
									<TimelineOppositeContent color='text.primary'>
										{goal.timeString}
									</TimelineOppositeContent>
									<TimelineSeparator>
										{index === 0 && <TimelineConnector />}
										{achieved ? (
											<TimelineDot color='success' />
										) : (
											<TimelineDot />
										)}
										{index !== goalState.acheivedGoals?.length - 1 && (
											<TimelineConnector />
										)}
									</TimelineSeparator>
									<TimelineContent>{goal.title}</TimelineContent>
								</TimelineItem>
							);
						})}
					</Timeline>
				</Stack>
			)}
		</div>
	);
};

export default TotalCostPage;
