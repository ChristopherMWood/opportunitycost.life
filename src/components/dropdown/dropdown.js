import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import './styles.scss';

const StyledDropdown = styled(Select)({
	// TODO: Implement
});


function Dropdown(props) {
	return (
		<div className='dropdown-container'>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Cost Type</InputLabel>
				<StyledDropdown
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={props.startValue}
					label='Cost Type'
					onChange={props.onChange}
				>
					{props.selectValues.map((selectValue, index) => {
						return (
							<MenuItem key={index} value={selectValue}>
								{selectValue}
							</MenuItem>
						);
					})}
				</StyledDropdown>
			</FormControl>
		</div>
	);
}

export default Dropdown;
