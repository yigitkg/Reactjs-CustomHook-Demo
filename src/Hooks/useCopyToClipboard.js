import React, { useState } from "react";

/**
 * Copies given text to clipboard
 * @param {string} text - Text to be copied
 * @param {function} setIsCopied - Function to set state indicating whether text was copied or not
 * @param {function} setError - Function to set error state if copying fails
 * @param {number} timeout - Time in milliseconds to show copied state before resetting it
 */
const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 220);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    isCopied,
    error,
    copyToClipboard,
  };
};

export default useCopyToClipboard;
