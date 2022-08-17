import './styles.scss';
import LoadingButton from '@mui/lab/LoadingButton';

function StylizedButton(props) {
	return (
		<div className='stylized-button'>
			{/* <button className='button-59' onClick={props.onClick}>{props.buttonText}</button> */}
			<LoadingButton className='button-59' loading={props.loading} onClick={props.onClick}>{props.buttonText}</LoadingButton>
		</div>
	);
  }
  
  export default StylizedButton;
