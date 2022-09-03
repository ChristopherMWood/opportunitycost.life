import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SiteIcon from '../../images/site-icon.png';
import './styles.scss';

function GlobalHeader(props) {
	return (
		<header className="global-header">
			<div className="wrapper site-header__wrapper">
				<a href="/" className="brand"><img id='site-logo' src={SiteIcon} alt='site logo' /></a>
				<nav className="nav">
					<IconButton onClick={props.onMenuClick}>
						<MenuIcon size="large" sx={{ color: "icon.primary" }} />
					</IconButton>
				</nav>
			</div>
		</header>
	);
  }
  
  export default GlobalHeader;