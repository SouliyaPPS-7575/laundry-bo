import { menuItems } from "@/containers/layouts/admin/MenuItems";
import { useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const useNavbarMenu = () => {
  const { pathname } = useLocation();

  // State to control drawer visibility for mobile
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Set the maximum number of top-level menu items to show
  const MAX_VISIBLE_MENU_ITEMS = 8; // Modify this value to set the visible limit
  
  // Split visible menu items and remaining overflow items
  const visibleMenuItems = menuItems.slice(0, MAX_VISIBLE_MENU_ITEMS);
  const overflowMenuItems = menuItems.slice(MAX_VISIBLE_MENU_ITEMS);


  // Show drawer
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  // Close drawer
  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  // and close drawer when route change
  useEffect(() => {
    if (pathname) {
      closeDrawer();
    }
  }, [pathname]);


  return {
    // State Variables
    drawerVisible,
    showDrawer,
    closeDrawer,

    // Keep track of current route
    pathname,

    // State Functions
    visibleMenuItems,
    overflowMenuItems
  };
};
