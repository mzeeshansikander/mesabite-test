// Next JS Imports
import type { AppProps } from "next/app";

// Styles Import
import "@/styles/globals.css";

// Component Import
import HigherOrderComponent from "@/HigherOrderComponent";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HigherOrderComponent>
      <Component {...pageProps} />
    </HigherOrderComponent>
  );
}
