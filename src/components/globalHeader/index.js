import MenuIcon from '@mui/icons-material/Menu';
import SiteIcon from '../../images/site-icon.png';
import Button from '@mui/material/Button';
import './styles.scss';

function GlobalHeader(props) {
	return (
		<header className='global-header'>
			<div className='wrapper site-header__wrapper'>
				<a href='/' className='brand'>
					<img id='site-logo' src={SiteIcon} alt='site logo' />
				</a>
				<nav className='nav'>
					<Button
						onClick={props.onMenuClick}
						endIcon={<MenuIcon size='large' sx={{ color: 'icon.primary' }} />}
						sx={{ color: 'white', fontWeight: 'bold' }}
					>
						More
					</Button>
				</nav>
			</div>
		</header>
	);
}

export default GlobalHeader;
