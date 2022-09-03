import * as React from 'react';
import { useState } from 'react';
import { OpportunityCostApiProxy } from '../../domain/opportunityCostApiProxy';
import CostBlocks from '../../components/costBlocks/costBlocks'
import { Typography } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
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
      {totalSeconds > 0 &&
        <>

          <Typography variant='h4' align='center'>Opportunity Cost Of Everything So Far</Typography>
          <CostBlocks totalSeconds={totalSeconds} />
          {/* <EventCostBlocks totalSeconds={totalSeconds} /> */}
          <Timeline position="alternate">
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Eat</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Code</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Sleep</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color="success" />
              </TimelineSeparator>
              <TimelineContent>Birth of the US</TimelineContent>
            </TimelineItem>
          </Timeline>
        </>
      }
    </div>
  );
}

export default TotalCostPage;
