import { Card, Layout, Typography } from 'antd'; // Antd Layout and Typography components
import Container from 'containers/layouts/pageLayout/Container'; // Custom Container Wrapper
import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import 'styles/css/Layout.css';

const { Content } = Layout;
const { Title } = Typography;

interface Props {
  breadcrumb?: ReactNode;
  title?: string;
  children: ReactNode;
  minFullScreen?: boolean;
  paperContent?: boolean;
  filterButton?: ReactNode;
}

const PageLayout: FC<Props> = ({
  children,
  title,
  breadcrumb,
  minFullScreen = true,
  paperContent = true, // Render children in Card (instead of Paper) based on prop
  filterButton,
}) => {
  const { t } = useTranslation();

  const layoutStyle: React.CSSProperties = {
    minHeight: minFullScreen ? 'calc(100vh - 64px)' : '100%',
    padding: '0.5rem',
    flexDirection: 'column',
    display: 'flex',
    width: '100%',
  };

  const contentStyle: React.CSSProperties = {
    flex: minFullScreen ? '1 1 auto' : 'none',
    overflow: 'auto',
  };

  return (
    <Layout style={layoutStyle}>
      {/* Content */}
      <Content style={contentStyle}>
        <Container>
          {/* Breadcrumb */}
          {breadcrumb && (
            <div
              style={{
                position: 'absolute',
              }}
            >
              {breadcrumb}
            </div>
          )}

          {/* Content Body */}
          <div style={{ marginTop: '1.8rem' }}>
            {paperContent ? (
              // Card acts as an equivalent for Paper in Ant Design
              <Card>
                <div className="card-header">
                  {/* Title */}
                  <Title level={5}>{t(title || '')}</Title>

                  {/* Filter Button */}
                  {filterButton && <div>{filterButton}</div>}
                </div>

                {children}
              </Card>
            ) : (
              children
            )}
          </div>
        </Container>
      </Content>
    </Layout>
  );
};

export default PageLayout;
