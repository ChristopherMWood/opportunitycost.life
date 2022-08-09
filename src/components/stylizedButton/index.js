import './styles.scss';

function StylizedButton(props) {
	return (
		<div className='stylized-button'>
			<button className='button-59' onClick={props.onClick}>{props.buttonText}</button>
		</div>
	);
  }
  
  export default StylizedButton;
