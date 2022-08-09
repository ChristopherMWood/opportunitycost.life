import React, { useState } from 'react';
import StylizedButton from '../stylizedButton';
import './styles.scss';

function StylizedInput(props) {
	const [input, setInput] = useState('');
	const [errorText, setErrorText] = useState(undefined);

	const updateInput = (event) => {
		setInput(event.target.value);
	}

	const onSubmit = (event) => {
		event.preventDefault();
		setErrorText(null);

		if (props.inputValidator(input)) {
			props.onSuccess(input);
		} else {
			setErrorText('Must enter a valid YouTube video URL');
		}
	}

	return (
		<div className='stylized-input'>
			<form onSubmit={onSubmit}>
				<div className="form__group field">
					<input type="input" className="form__field" onChange={updateInput} placeholder={props.placeholderText} name="youtube-url" id='youtube-url' />
					<label htmlFor="youtube-url" className="form__label">{props.placeholderText}</label>
				</div>
				<StylizedButton buttonText="Calculate" />
			</form>
			<label className='error-text' hidden={!errorText}>{errorText}</label>
		</div>
	);
  }
  
  export default StylizedInput;
  
           
		 
		 