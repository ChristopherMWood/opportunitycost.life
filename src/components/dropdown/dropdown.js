import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './styles.scss';

function Dropdown(props) {
	return (
		<FormControl className="dropdown-container" fullWidth>
			<InputLabel id="demo-simple-select-label">Cost Type</InputLabel>
			<Select
				labelId="demo-simple-select-label"
				id="demo-simple-select"
				value={props.startValue}
				label="Cost Type"
				onChange={props.onChange}
			>
				{
					props.selectValues.map((selectValue) => {
						return <MenuItem value={selectValue}>{selectValue}</MenuItem>
					})
				}
			</Select>
		</FormControl>
	)
}

export default Dropdown;