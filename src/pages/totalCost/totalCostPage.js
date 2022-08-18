import * as React from 'react';
import { useState } from 'react';
import { OpportunityCostApiProxy } from '../../domain/opportunityCostApiProxy';
import CostBlocks from '../../components/costBlocks/costBlocks'
import EventCostBlocks from '../../components/eventCostBlocks/eventCostBlocks'
import './styles.scss';

const TotalCostPage = () => {
	const [totalSeconds, setTotalSeconds] = useState(0)

	React.useEffect(() => {
		OpportunityCostApiProxy.getOverview((data) => {
			const allCost = data?.allChannelsOpportunityCost || undefined

			if (allCost) {
				setTotalSeconds(allCost);
			}
		}, (error) => {
			console.error(error);
		});
	}, [])

	return (
		<div className='site-page-container total-cost-page'>
			{ totalSeconds > 0 &&
				<>
					<CostBlocks totalSeconds={totalSeconds} title="Opportunity Cost Of Everything So Far" />
					<EventCostBlocks totalSeconds={totalSeconds} />
				</>
			}
		</div>
	);
  }
  
  export default TotalCostPage;
