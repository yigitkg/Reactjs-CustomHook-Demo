import React, { createElement, useEffect, useState } from "react";

/**
 * useConnection hook to monitor online/offline status
 * @returns {{
 *  status: boolean,
 *  Online: React.ComponentType<{ children: React.ReactNode, as?: string, [x: string]: any }>,
 *  Offline: React.ComponentType<{ children: React.ReactNode, as?: string, [x: string]: any }>,
 *  StatusIndicator: React.ComponentType<{ children: React.ReactNode, as?: string, [x: string]: any }>
 * }}
 */
const useConnection = () => {
  const [status, setStatus] = useState(true);

  // Add event listeners for online/offline status
  useEffect(() => {
    const events = ["online", "offline"];
    const eventHandle = () => setStatus(navigator.onLine);

    events.forEach((event) => window.addEventListener(event, eventHandle));

    // Clean up event listeners
    return () =>
      events.forEach((event) => window.removeEventListener(event, eventHandle));
  }, []);

  /**
   * Renders a component only when the status is truthy.
   * @param {Object} props - The component props.
   * @param {boolean} props.status - The status to determine if the component should render.
   * @param {string} [props.as="div"] - The HTML tag to render the component as.
   * @param {ReactNode} props.children - The child elements to render inside the component.
   * @returns {ReactNode} - The rendered component if the status is truthy, otherwise null.
   */
  const Online = ({ children, as = "div", ...props }) => {
    if (status) {
      return createElement(
        as,
        {
          ...props,
          className:
            "fixed top-0 left-0 w-full bg-gray-400 text-white p-4 text-sm text-center",
        },
        children
      );
    }
    return null;
  };
  const Offline = ({ children, as = "div", ...props }) => {
    // Only render the component if the status is truthy.
    if (!status) {
      return createElement(
        as,
        {
          ...props,
          className:
            "fixed top-0 left-0 w-full bg-gray-400 text-white p-4 text-sm text-center",
        },
        children
      );
    }
    // Otherwise, return null.
    return null;
  };

  /**
   * Creates a status indicator component with the specified properties.
   * @param {Object} props - Component properties.
   * @param {string|React.ComponentType} [props.as="div"] - HTML tag or React component to be used as the root element.
   * @param {ReactNode} props.children - Child elements.
   * @returns {React.ReactElement} The status indicator component.
   */
  const StatusIndicator = ({ children, as = "div", ...props }) => {
    // Create the root element with the specified properties and children.
    return createElement(
      as,
      {
        ...props,
        className:
          "fixed top-0 left-0 w-full bg-gray-400 text-white p-4 text-sm text-center",
      },
      children
    );
  };

  return {
    status,
    Online,
    Offline,
    StatusIndicator,
  };
};

export default useConnection;
