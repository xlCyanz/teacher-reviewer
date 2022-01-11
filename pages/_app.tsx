/* eslint-disable react/jsx-props-no-spreading */
import MainLayout from "@components/main-layout";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const Application = ({ Component, pageProps }: AppProps) => (
  <MainLayout>
    <Component {...pageProps} />
  </MainLayout>
);

export default Application;
