import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	typography: {
		allVariants: {
			color: '#FFFFFF',
		},
	},
	tableRow: {
		color: '#FFFFFF',
	},
	tableCell: {
		color: '#FFFFFF',
	},
	palette: {
		type: 'dark',
		primary: {
			main: '#13294B',
		},
		secondary: {
			main: '#f9045b',
		},
		accent: {
			main: '#f9045b',
		},
		icon: {
			primary: '#FFFFFF',
			light: '#FFFFFF',
			dark: '#000000',
		},
		text: {
			primary: '#FFFFFF',
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
		success: {
			main: '#50af53',
			contrastText: 'rgba(8,8,8,0.87)',
		},
		divider: '#000000',
	},
	components: {
		typography: {
			styleOverrides: {
				root: {
					color: '#FFFFFF',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				html: {
					backgroundColor: '#13294B',
				},
				body: {
					backgroundColor: '#13294B',
				},
			},
		},
	},
	overrides: {
		MuiTableCell: {
			root: {
				color: '#FFFFFF',
			},
		},
	},
});
