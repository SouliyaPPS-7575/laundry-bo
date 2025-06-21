import React, { ReactNode } from 'react';
import { Layout } from 'antd'; // Ant Design Layout component for structure
import { useLayout } from 'hooks/layouts/useLayout';

/**
 * Props for the ContainerCustom component.
 */
interface Props {
  children?: ReactNode;
}

/**
 * ContainerCustom component using Ant Design's Layout to replicate Material-UI's Container.
 */
const Container: React.FC<Props> = ({ children, ...rest }) => {
  const { collapsed } = useLayout();
  return (
    <Layout.Content
      style={{
        maxWidth: collapsed ? '1180px' : '1280px', // Equivalent to Material-UI's 'maxWidth="xl"'
        paddingBottom: '5rem', // Padding at the bottom of the content
        overflowX: 'auto', // Horizontal scroll in case content overflows
        overflowY: 'auto', // Vertical scroll in case content overflows
        margin: 'auto', // Center the content horizontally
        height: '100%',
        minHeight: '50vh', // Ensure it fills at least 50% of the viewport height
        width: '100%', // Ensure content spans full available width
        display: 'flex',
        flexDirection: 'column',
      }}
      {...rest}
    >
      {/* Responsive styles using media queries */}
      <style>
        {`
          @media (min-width: 1920px) {
            .custom-container {
              min-height: 580px;
            }
          }
          @media (max-width: 1920px) {
            .custom-container {
              min-height: 50vh;
            }
          }
          @media (max-width: 1024px) {
            .custom-container {
              min-height: 50vh;
            }
          }
          @media (max-width: 768px) {
            .custom-container {
              min-height: 50vh;
            }
          }
        `}
      </style>

      {/* Render children inside the styled container */}
      {children}
    </Layout.Content>
  );
};

export default Container;
