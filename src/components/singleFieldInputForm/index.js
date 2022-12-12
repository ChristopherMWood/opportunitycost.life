import { useState } from 'react';
import Stack from '@mui/system/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import './styles.scss';
import { Typography } from '@mui/material';

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
				<TextField
					className='stylized-input'
					value={props.value}
					onChange={e => props.onChange(e)}
					label={props.inputLabel}
					variant='standard'
					name='youtube-url'
					sx={{
						borderBottom: '1px solid purple',
						borderRadius: 1,
						borderWidth: '2px !important',
						borderImageSlice: '1 !important',
						borderImageSource:
							'linear-gradient(to left, #d53a9d, #743ad5) !important',
					}}
					InputProps={{ disableUnderline: true }}
					disabled={props.loading}
				/>
				<LoadingButton
					className='stylized-button button-59'
					type='submit'
					loading={props.loading}
				>
					{props.buttonText}
				</LoadingButton>
				<Typography sx={{ color: '#f14033' }}>{error}</Typography>
			</form>
		</Stack>
	);
}

export default SingleFieldInputForm;
