import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
	  type: 'light',
	  primary: {
		main: '#3c4db3',
		light: '#6472c5',
		dark: '#26306d',
		contrastText: '#fffefe',
	  },
	  icon: {
		primary: "black"
	  },
	  secondary: {
		main: '#f9045b',
		light: '#f13275',
		dark: '#af0541',
		contrastText: '#fbfbfb',
	  },
	  text: {
		primary: 'rgba(14,14,14,0.87)',
		secondary: 'rgba(8,8,8,0.54)',
		disabled: 'rgba(8,8,8,0.38)',
		hint: 'rgba(14,14,14,0.38)',
	  },
	  background: {
		default: '#f7f3f3',
		paper: '#ffffff',
	  },
	  error: {
		main: '#f14033',
		light: '#ef685e',
		dark: '#aa2e25',
		contrastText: '#eceaea',
	  },
	  warning: {
		main: '#f79403',
		light: '#f3a431',
		dark: '#ad6907',
		contrastText: 'rgba(8,8,8,0.87)',
	  },
	  info: {
		main: '#1f90ea',
		light: '#49a4ec',
		dark: '#1768a8',
		contrastText: '#fbfafa',
	  },
	  success: {
		main: '#50af53',
		light: '#71bf73',
		dark: '#337935',
		contrastText: 'rgba(8,8,8,0.87)',
	  },
	  divider: 'rgba(10,10,10,0.12)',
	},
	components: {
		MuiCssBaseline: {
		  styleOverrides: {
			html: {
			  backgroundColor: "black"
			},
			body: {
			  color: "black",
			  backgroundColor: "white"
			}
		  }
		}
	  }
  });