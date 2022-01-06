import React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { SnackbarProvider } from 'notistack';
import theme from '../theme';

class AppThemeProvider extends React.Component<any, any> {
  isMobile = false;

  componentDidMount(): void {
    this.isMobile = window && window.innerWidth <= 860;
  }

  render():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | string
    | number
    | {}
    | React.ReactNodeArray
    | React.ReactPortal
    | boolean
    | null
    | undefined {
    return (
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: this.isMobile ? 'bottom' : 'top',
            horizontal: 'center',
          }}
          dense={false}
          hideIconVariant
          preventDuplicate
        >
          {this.props.children}
        </SnackbarProvider>
      </ThemeProvider>
    );
  }
}

export default AppThemeProvider;
