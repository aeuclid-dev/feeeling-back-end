import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { grey } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: red.A400,
    },
    background: {
      paper: '#FFFFFF',
      default: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 4,
  },
  overrides: {
    MuiDivider: {
      root: {
        color: `rgba(255, 255, 255, 0.5);`,
        backgroundColor: `rgba(255, 255, 255, 0.5);`,
        borderColor: `rgba(255, 255, 255, 0.5);`,
      },
    },
  },
  props: {},
});

export default theme;
