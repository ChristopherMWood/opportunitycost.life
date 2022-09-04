import React, { useState } from 'react';
import { OpportunityCostApiProxy } from '../../domain/opportunityCostApiProxy';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import GitHubIcon from '@mui/icons-material/GitHub';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import EventCostBlock from '../../components/eventCostBlock/eventCostBlock';

const birthdate = new Date('5/01/1992');
const now = new Date();
const diffTime = Math.abs(now - birthdate);
const diffSeconds = Math.ceil(diffTime / 1000);

const devItem = {
	name: 'Christophers',
	icon: <EmojiPeopleIcon sx={{ fontSize: 60, color: 'icon.primary' }} />,
	costPer: diffSeconds,
	description: `This is the total number of Christophers (me) that could have lived given all of the calculated YouTube videos so far. Given that I'm only ${diffSeconds} seconds old, that's a lot. Just imagine how many other dumb things could have been built... what a loss.`,
};

function AboutPage() {
	const [totalSeconds, setTotalSeconds] = useState(0);

	React.useEffect(() => {
		OpportunityCostApiProxy.getOverview(
			data => {
				const allCost = data?.allChannelsOpportunityCost || undefined;

				if (allCost) {
					setTotalSeconds(allCost);
				}
			},
			error => {
				console.error(error);
			}
		);
	}, []);

	const openLink = url => {
		window.open(url, '_blank');
	};

	return (
		<div className='site-page-container'>
			<Stack spacing={3}>
				<Typography variant='h4' align='center'>
					About the Site
				</Typography>
				<Typography variant='body1'>
					This all started when I was listening to the{' '}
					<a
						href='https://www.youtube.com/channel/UCNSeDrWRGxx5p2l3tj7RWQw'
						target='_blank'
						rel='noreferrer'
					>
						Corridor Digital Podcast
					</a>{' '}
					episode number I can&apos;t remember anymore. The podcast is about a
					fantastic YouTube channel and on it they wondered how many human lives
					worth of time their entire channel consumed in view time. I realized
					this is the exact type of problem computers should be and could be
					solving. And thus, this site was born. It started out small, and like
					most projects ballooned into the frontend, API and chrome plugin it is
					today. All of the code is open source and linked below. If you want to
					learn more about me (Christopher) feel free to check out my personal
					site.
				</Typography>
				<EventCostBlock
					index={0}
					item={devItem}
					totalOpportunityCost={totalSeconds}
				/>
				<Stack direction='row' justifyContent='center' spacing={2}>
					<Button
						variant='outlined'
						startIcon={<GitHubIcon />}
						onClick={() => {
							openLink(
								'https://github.com/ChristopherMWood/opportunitycost.life'
							);
						}}
					>
						Front-end
					</Button>
					<Button
						variant='outlined'
						startIcon={<GitHubIcon />}
						onClick={() => {
							openLink(
								'https://github.com/ChristopherMWood/api.christopherwood.dev'
							);
						}}
					>
						API
					</Button>
					<Button
						variant='outlined'
						startIcon={<GitHubIcon />}
						onClick={() => {
							openLink(
								'https://github.com/ChristopherMWood/youtube-opportunity-cost-chrome-extension'
							);
						}}
					>
						Chrome Plugin
					</Button>
				</Stack>
				<Button
					variant='outlined'
					startIcon={<CoPresentIcon />}
					onClick={() => {
						openLink('https://www.christopherwood.dev');
					}}
				>
					My Personal Site
				</Button>
			</Stack>
		</div>
	);
}

export default AboutPage;
