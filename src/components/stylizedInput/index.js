import React, { useState, useEffect } from 'react';
import { Box, Stack, Container } from '@mui/system';
import StylizedButton from '../stylizedButton';
import LoadingButton from '@mui/lab/LoadingButton';

import './styles.scss';

function StylizedInput(props) {
	const [input, setInput] = useState('');
	const [errorText, setErrorText] = useState(undefined);

	useEffect(() => {
		setInput(props.startValue);
	}, [props.startValue]);

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
					<input value={input} type="input" className="form__field" onChange={updateInput} placeholder={props.placeholderText} name="youtube-url" id='youtube-url' />
					<label htmlFor="youtube-url" className="form__label">{props.placeholderText}</label>
				</div>
				<div className='stylized-button'>
					<LoadingButton type="submit" className='button-59' loading={props.loading}>Calculate</LoadingButton>
				</div>
			</form>
			<label className='error-text' hidden={!errorText}>{errorText}</label>
		</div>
	);
  }
  
  export default StylizedInput;
  
           
		 
		 