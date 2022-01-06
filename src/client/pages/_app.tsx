import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppThemeProvider from '../components/themeProvider';
import OfflineSupport from '../components/OfflineSupport';
//import "../scss/index.scss"

export default function MyApp(props: { Component: any; pageProps: any }) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <AppThemeProvider>
        <CssBaseline />
        <OfflineSupport />
        <Component {...pageProps} />
      </AppThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
