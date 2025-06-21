import { DefaultLayout } from '@/routes/__root';
import { LayoutNavbar } from '@/containers/layouts/layoutNavbar/LayoutNavbar';
import { LayoutSideBarIcon } from '@/containers/layouts/layoutSidebarIcon/LayoutSidebarIcon';
import { Button, Modal } from 'antd';
import { JSX, useState } from 'react';
import Hotkeys from 'react-hot-keys';
import { themes } from '@/styles/theme/themeConfig';
import { LayoutSideBarNoIcon } from './layoutSidebarNoIcon/LayoutSidebarNoIcon';

// Define available layout keys as a union type
export type LayoutKey =
  | 'LayoutNavbar'
  | 'LayoutSideBarIcon'
  | 'LayoutSideBarNoIcon';

export const SelectLayouts = () => {
  // Retrieve the layout from localStorage if available, else default to 'LayoutNavbar'
  const getInitialLayout = (): LayoutKey => {
    const savedLayout = localStorage.getItem('selectedLayout');
    if (
      savedLayout &&
      ['LayoutNavbar', 'LayoutSideBarIcon', 'LayoutSideBarNoIcon'].includes(
        savedLayout
      )
    ) {
      return savedLayout as LayoutKey;
    }
    return DefaultLayout; // Default layout
  };

  // State to manage the selected layout and modal status
  const [selectedLayout, setSelectedLayout] =
    useState<LayoutKey>(getInitialLayout); // Initialize with layout from localStorage
  const [isModalOpen, setModalOpen] = useState(false); // To control the modal

  // Map of available layouts
  const layouts: Record<LayoutKey, JSX.Element> = {
    LayoutNavbar: <LayoutNavbar />,
    LayoutSideBarIcon: <LayoutSideBarIcon />,
    LayoutSideBarNoIcon: <LayoutSideBarNoIcon />,
  };

  // Function to save the layout to localStorage
  const saveLayoutToLocalStorage = (layoutName: LayoutKey) => {
    localStorage.setItem('selectedLayout', layoutName);
  };

  // Function to change the layout and close the modal
  const handleChangeLayout = (layoutName: LayoutKey) => {
    setSelectedLayout(layoutName); // Change the selected layout
    saveLayoutToLocalStorage(layoutName); // Save the layout selection to localStorage
    setModalOpen(false); // Close the modal
  };

  // Function to handle modal opening and closing
  const handleOpenModal = () => setModalOpen(true);
  const handleCancel = () => setModalOpen(false);

  // Define styles for buttons with a simple conditional approach
  const getButtonStyle = (layoutName: LayoutKey) =>
    layoutName === selectedLayout
      ? {
          backgroundColor: themes.token?.colorPrimary,
          color: themes.token?.colorBgBase,
        } // Highlight if selected
      : {};

  return (
    // Hotkeys component from react-hotkeys - wraps the entire component to listen for key events
    <Hotkeys
      keyName='ctrl+shift+l, command+shift+l'
      // add function handleOpenModal
      onKeyDown={() => handleOpenModal()}
    >
      {/* Render the selected layout dynamically from state */}
      {layouts[selectedLayout]}

      {/* Modal to select the layout */}
      <Modal
        title='Select Layout'
        open={isModalOpen}
        onCancel={handleCancel} // Handle modal cancellation
        footer={null} // Remove OK/cancel buttons
      >
        <Button
          type='default'
          block
          onClick={() => handleChangeLayout('LayoutNavbar')} // Switch to LayoutNavbar
          style={{ marginBottom: '10px', ...getButtonStyle('LayoutNavbar') }} // Conditionally change background color
        >
          Layout Navbar
        </Button>

        <Button
          type='default'
          block
          onClick={() => handleChangeLayout('LayoutSideBarIcon')} // Switch to LayoutSideBarIcon
          style={{
            marginBottom: '10px',
            ...getButtonStyle('LayoutSideBarIcon'),
          }} // Conditionally change background color
        >
          Layout Sidebar with Icon
        </Button>

        <Button
          type='default'
          block
          onClick={() => handleChangeLayout('LayoutSideBarNoIcon')} // Switch to LayoutSideBarNoIcon
          style={getButtonStyle('LayoutSideBarNoIcon')} // Conditionally change background color
        >
          Layout Sidebar without Icon
        </Button>
      </Modal>
    </Hotkeys>
  );
};
