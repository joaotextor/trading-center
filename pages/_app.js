import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ToastyProvider } from '../src/contexts/Toasty'
import { SessionProvider } from "next-auth/react"
import theme from '../src/theme'

export default function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <React.Fragment>
      <Head>
        <title>Trading Center</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <ToastyProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </ToastyProvider>
        </ThemeProvider>
      </SessionProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};