import './styles.scss';

function CollapsibleView(props) {
	return (
		<div
			className={
				props.isVisible ? 'collapsible-view' : 'collapsible-view collapsed'
			}
		>
			{props.children}
		</div>
	);
}

export default CollapsibleView;
