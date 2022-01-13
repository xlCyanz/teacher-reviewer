/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from "next/app";

import "../styles/globals.css";

const Application = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default Application;
