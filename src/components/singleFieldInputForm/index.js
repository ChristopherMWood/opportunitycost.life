import { useState } from 'react';
import Stack from '@mui/system/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import './styles.scss';

function SingleFieldInputForm(props) {
	const [error, setError] = useState(undefined);

	const onSubmit = event => {
		event.preventDefault();
		const errorText = props.onValidate(props.value);

		if (errorText) {
			setError(errorText);
		} else {
			setError('');
			props.onSubmit(props.value, true);
		}
	};

	return (
		<Stack direction='row' justifyContent='center' className={props.className}>
			<form onSubmit={onSubmit}>
				<TextField
					className='stylized-input'
					value={props.value}
					onChange={e => props.onChange(e)}
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
