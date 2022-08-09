import { Link } from "react-router-dom";
import SiteIcon from '../../images/site-icon.png';
import './styles.scss';

function GlobalHeader(props) {
	return (
		<header className="global-header">
			<div className="wrapper site-header__wrapper">
				<a href="/" className="brand"><img id='site-logo' src={SiteIcon} alt='site logo' /></a>
				<nav className="nav">
					<Link className="btn btn-2" to="/top-videos">Top Videos</Link>
					<Link className="btn btn-2" to="/top-channels">Top Channels</Link>
					<Link className="btn btn-2" to="/about">About</Link>
				</nav>
			</div>
		</header>
	);
  }
  
  export default GlobalHeader;