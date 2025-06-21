import { LayoutKey, SelectLayouts } from 'containers/layouts/SelectLayouts';
import { createRootRoute } from '@tanstack/react-router';

export const DefaultLayout: LayoutKey = 'LayoutSideBarIcon'; // Default layout

export const Route = createRootRoute({
  component: () => <SelectLayouts />,
});
