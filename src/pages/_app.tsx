// Next JS Imports
import type { AppProps } from "next/app";

// Global Context Import
import Context from "../context/global";

// Font Imports
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

// Styles Import
import "@/styles/globals.css";

// Component Import
import HigherOrderComponent from "@/HigherOrderComponent";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Context>
      <HigherOrderComponent>
        <main className={montserrat.variable}>
          <Component {...pageProps} />
        </main>
      </HigherOrderComponent>
    </Context>
  );
}
