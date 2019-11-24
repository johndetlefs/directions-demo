import React, { useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import withReduxStore from "../src/with-redux-store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import Page from "../components/page";

function MyApp({ Component, reduxStore, pageProps }) {
  const persistor = persistStore(reduxStore);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  });

  return (
    <Provider store={reduxStore}>
      <PersistGate loading={<Component {...pageProps} />} persistor={persistor}>
        <Head>
          <title>My page</title>
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Page>
            <Component {...pageProps} />
          </Page>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default withReduxStore(MyApp);
