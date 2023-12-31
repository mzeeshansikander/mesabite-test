// React Imports
import { FC, Fragment, useEffect, useState } from "react";

// Component Import
import Toast from "./components/Toast";

// Next Js Import
import { useRouter } from "next/router";

// Context Import
import GlobalStore from "@/context/global";

// Loading Overlay Import
import LoadingOverlay from "react-loading-overlay-ts";

interface IHigherOrderComponentProps {
  children: React.ReactElement<any, any>;
}

const HigherOrderComponent: FC<IHigherOrderComponentProps> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  /**
   * @description Handle Route Change and set loading state.
   * @returns void
   */
  const handleRouteChange = (): (() => void) => {
    const handleStart = () => {
      setLoading(true);
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  };

  useEffect(() => {
    handleRouteChange();
  }, []);

  return (
    <Fragment>
      <GlobalStore>
        <LoadingOverlay active={loading} spinner>
          {children}
        </LoadingOverlay>
      </GlobalStore>
      <Toast />
    </Fragment>
  );
};

export default HigherOrderComponent;
