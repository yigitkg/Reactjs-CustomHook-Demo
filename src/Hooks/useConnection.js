import React, { useEffect, useState } from "react";

const useConnection = () => {
  const [status, setStatus] = useState(true);

  useEffect(() => {
    const events = ["online", "offline"];
    const eventHandle = () => setStatus(navigator.onLine);

    events.forEach((event) => window.addEventListener(event, eventHandle));

    return () =>
      events.forEach((event) => window.removeEventListener(event, eventHandle));
  }, []);

  return {
    status,
  };
};

export default useConnection;
