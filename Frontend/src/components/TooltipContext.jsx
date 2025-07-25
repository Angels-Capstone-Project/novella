import React, { createContext, useState, useContext } from "react";

const TooltipContext = createContext();

export const TooltipProvider = ({ children }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  const showTooltip = (text, e) => {
    const { clientX, clientY } = e;
    setTooltip({ visible: true, text, x: clientX, y: clientY });
  };

  const updatePosition = (e) => {
    const { clientX, clientY } = e;
    setTooltip((prev) => ({ ...prev, x: clientX, y: clientY }));
  };

  const hideTooltip = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <TooltipContext.Provider value={{ tooltip, showTooltip, updatePosition, hideTooltip }}>
      {children}
    </TooltipContext.Provider>
  );
};

export const useTooltip = () => useContext(TooltipContext);
