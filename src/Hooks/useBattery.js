import React, { createElement, useEffect, useState } from "react";

/**
 * useBattery custom hook to get battery level and charging status of device
 * @returns an object containing level, charging, and CriticalBattery component
 */
const useBattery = () => {
  // initialize state variables for level and charging
  const [level, setLevel] = useState(0);
  const [charging, setCharging] = useState(false);

  // useEffect hook to handle changes in battery level and charging status
  /**
   * Handles the battery status change event
   * @async
   * @function batteryHandle
   * @returns {Promise<void>} - A Promise that resolves when the battery status changes
   */
  useEffect(() => {
    // Get the battery status
    async function batteryHandle() {
      const battery = await navigator.getBattery();
      // Set the battery level
      setLevel(battery.level * 100);
      // Set the battery charging status
      setCharging(battery.charging);

      // Listen for charging status change and update the charging status
      battery.addEventListener("chargingchange", () =>
        setCharging(battery.charging)
      );
      // Listen for battery level change and update the battery level
      battery.addEventListener("chargingchange", () =>
        setLevel(battery.level * 100)
      );
    }
    batteryHandle();
  }, []);

  /**
   * Display a warning message if the battery level is critical.
   *
   * @param {Object} props - The component props.
   * @param {number} props.level - The current battery level.
   * @param {boolean} props.charging - Whether the device is charging.
   * @param {string} [props.message="Battery low!"] - The message to display.
   * @param {ReactNode} [props.children] - The children to render instead of the message.
   * @returns {ReactNode} - The warning message or children if provided.
   */
  const CriticalBattery = ({ children, ...props }) => {
    // Check if the battery level is critical
    if (level > 20 && charging) {
      return createElement(
        "div",
        {
          ...props,
          className: "bg-red-600 text-white p-4 rounded",
        },
        children || "Batery low!"
      );
    }
    // Return null if the battery level is not critical
    return null;
  };

  return {
    level,
    charging,
    CriticalBattery,
  };
};

export default useBattery;
