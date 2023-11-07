// Next JS Imports
import type { AppProps } from "next/app";
import Context from "../context/global";

// Styles Import
import "@/styles/globals.css";

// Component Import
import HigherOrderComponent from "@/HigherOrderComponent";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Context>
      <HigherOrderComponent>
        <Component {...pageProps} />
      </HigherOrderComponent>
    </Context>
  );
}
