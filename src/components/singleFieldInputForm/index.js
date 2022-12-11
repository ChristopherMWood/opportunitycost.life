import { useState } from 'react';
import Stack from '@mui/system/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import './styles.scss';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
	// TODO: Implement
});

const StyledButton = styled(LoadingButton)({
	// TODO: Implement
});

function SingleFieldInputForm(props) {
	const [error, setError] = useState(undefined);

	const onSubmit = event => {
		event.preventDefault();
		const errorText = props.onValidate(props.value);

		if (errorText) {
			setError(errorText);
		} else {
			setError(undefined);
			props.onSubmit(props.value, true);
		}
	};

	return (
		<Stack direction='row' justifyContent='center' className={props.className}>
			<form onSubmit={onSubmit}>
				<StyledTextField
					className='stylized-input'
					value={props.value}
					onChange={e => props.onChange(e)}
					label={props.inputLabel}
					variant='standard'
					name='youtube-url'
					error={error !== undefined}
					helperText={error}
					disabled={props.loading}
				/>
				<StyledButton
					className='stylized-button button-59'
					type='submit'
					loading={props.loading}
				>
					{props.buttonText}
				</StyledButton>
			</form>
		</Stack>
	);
}

export default SingleFieldInputForm;
