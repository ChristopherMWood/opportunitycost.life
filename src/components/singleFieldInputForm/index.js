import { useState, useEffect } from 'react';
import Stack from '@mui/system/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import './styles.scss';

function SingleFieldInputForm(props) {
	const [inputValue, setInputValue] = useState('');
	const [error, setError] = useState(undefined);

	useEffect(() => {
		setInputValue(props.startValue);
	}, [props.startValue]);

	const updateInput = e => {
		setInputValue(e.target.value);
	};

	const onSubmit = event => {
		event.preventDefault();
		const errorText = props.onValidate(inputValue);

		if (errorText) {
			setError(errorText);
		} else {
			props.onSubmit(inputValue, true);
		}
	};

	return (
		<Stack direction='row' justifyContent='center' className={props.className}>
			<form onSubmit={onSubmit}>
				<TextField
					className='stylized-input'
					value={inputValue}
					onChange={updateInput}
					label={props.inputLabel}
					variant='standard'
					name='youtube-url'
					error={error}
					helperText={error}
					disabled={props.loading}
				/>
				<LoadingButton
					className='stylized-button button-59'
					type='submit'
					loading={props.loading}
				>
					{props.buttonText}
				</LoadingButton>
			</form>
		</Stack>
	);
}

export default SingleFieldInputForm;
