"use client";

import React from "react";
import Loader from "@/components/ui/loader";

interface RootLoaderShellProps {
  children: React.ReactNode;
  minimumVisibleMs?: number;
}

const RootLoaderShell: React.FC<RootLoaderShellProps> = ({
  children,
  minimumVisibleMs = 1800, // adjust duration here
}) => {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setHidden(true), minimumVisibleMs);
    return () => clearTimeout(timer);
  }, [minimumVisibleMs]);

    // Loader starts visible on first paint; hides after timeout
  return (
    <>
      {!hidden && <Loader hidden={hidden} />}
      {children}
    </>
  );
};

export default RootLoaderShell;