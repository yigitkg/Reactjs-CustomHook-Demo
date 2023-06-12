import React, { createElement, useEffect, useState } from "react";

const useConnection = () => {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const events = ["online", "offline"];
    const eventHandle = () => setStatus(navigator.onLine);

    events.forEach((event) => window.addEventListener(event, eventHandle));

    return () =>
      events.forEach((event) => window.removeEventListener(event, eventHandle));
  }, []);

  const Online = ({ children, as = "div", ...props }) => {
    if (status) {
      return createElement(as, props, children);
    }
    return null;
  };

  const Offline = ({ children, as = "div", ...props }) => {
    if (!status) {
      return createElement(as, props, children);
    }
    return null;
  };

  return {
    status,
    Online,
    Offline,
  };
};

export default useConnection;
