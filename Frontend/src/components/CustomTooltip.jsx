import React from "react";
import { useTooltip} from './TooltipContext.jsx';
import "./CustomTooltip.css";

const CustomTooltip = () => {
  const { tooltip } = useTooltip();

  if (!tooltip.visible) return null;

  return (
    <div
      className="tooltip"
      style={{ left: tooltip.x + 10, top: tooltip.y + 10 }}
    >
      {tooltip.text}
    </div>
  );
};

export default CustomTooltip;
