import { useState } from "react";

export const useLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return {
    collapsed,
    toggle
  };
};