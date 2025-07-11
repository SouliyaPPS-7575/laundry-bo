import { RiderMap } from '@/containers/Dashboard/rider-map';
import { SplitterControls } from '@/containers/Dashboard/splitter-controls';
import { useSplitterSize } from '@/hooks/use-splitter-size';
import {
  AimOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  BellOutlined,
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
  PhoneOutlined,
  PlusOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router';
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Layout,
  List,
  Row,
  Select,
  Space,
  Splitter,
  Statistic,
  Tag,
  theme,
  Tooltip,
  Typography,
} from 'antd';
import type React from 'react';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { useToken } = theme;
const { Option } = Select;

export const Route = createFileRoute('/_admin/dashboard')({
  component: LaundryDashboard,
});

interface StatCardProps {
  title: string;
  value: string | number;
  prefix?: React.ReactNode;
  suffix?: string;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: string;
}

interface RiderActivity {
  id: string;
  riderId: string;
  riderName: string;
  action: string;
  orderId: string;
  location: string;
  time: string;
  status: 'pickup' | 'delivery' | 'completed' | 'issue';
}

interface Rider {
  id: string;
  name: string;
  phone: string;
  status: 'active' | 'inactive' | 'busy';
  currentOrders: number;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  rating: number;
  completedToday: number;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  trend,
  trendValue,
  color,
}) => {
  const { token } = useToken();

  return (
    <Card
      hoverable
      style={{
        height: '100%',
        borderRadius: token.borderRadiusLG,
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        borderTop: color ? `4px solid ${color}` : undefined,
      }}
    >
      <Statistic
        title={
          <Text style={{ fontSize: 14, color: token.colorTextSecondary }}>
            {title}
          </Text>
        }
        value={value}
        prefix={prefix}
        suffix={suffix}
        valueStyle={{
          fontSize: 24,
          fontWeight: 600,
          color: token.colorText,
        }}
      />
      {trend && trendValue && (
        <div style={{ marginTop: 8 }}>
          <Text
            style={{
              color: trend === 'up' ? token.colorSuccess : token.colorError,
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            {trendValue} from yesterday
          </Text>
        </div>
      )}
    </Card>
  );
};

function LaundryDashboard() {
  const { token } = useToken();
  const { splitterSize, setSplitterSize, setPreset } = useSplitterSize(
    ['65%', '35%'],
    'laundry-dashboard-splitter-size'
  );

  const [selectedRider, setSelectedRider] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            setPreset('balanced');
            break;
          case '2':
            e.preventDefault();
            setPreset('left-focus');
            break;
          case '3':
            e.preventDefault();
            setPreset('right-focus');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [setPreset]);

  const laundryStats = [
    {
      title: "Today's Revenue",
      value: 2847,
      prefix: '$',
      trend: 'up' as const,
      trendValue: '+18.2%',
      color: '#52c41a',
    },
    {
      title: 'Active Riders',
      value: 12,
      prefix: <CarOutlined />,
      trend: 'up' as const,
      trendValue: '+2',
      color: '#1890ff',
    },
    {
      title: 'Pending Orders',
      value: 34,
      prefix: <ShoppingCartOutlined />,
      trend: 'down' as const,
      trendValue: '-5',
      color: '#faad14',
    },
    {
      title: 'Avg Delivery Time',
      value: 28,
      suffix: 'min',
      prefix: <ClockCircleOutlined />,
      trend: 'down' as const,
      trendValue: '-3min',
      color: '#722ed1',
    },
  ];

  const riderActivities: RiderActivity[] = [
    {
      id: '1',
      riderId: 'R001',
      riderName: 'Mike Johnson',
      action: 'Picked up order',
      orderId: '#L2024001',
      location: 'Downtown Mall',
      time: '2 minutes ago',
      status: 'pickup',
    },
    {
      id: '2',
      riderId: 'R003',
      riderName: 'Sarah Chen',
      action: 'Delivered order',
      orderId: '#L2024002',
      location: 'Sunset Boulevard',
      time: '5 minutes ago',
      status: 'completed',
    },
    {
      id: '3',
      riderId: 'R007',
      riderName: 'David Wilson',
      action: 'Issue reported',
      orderId: '#L2024003',
      location: 'Oak Street',
      time: '8 minutes ago',
      status: 'issue',
    },
    {
      id: '4',
      riderId: 'R002',
      riderName: 'Lisa Rodriguez',
      action: 'En route to delivery',
      orderId: '#L2024004',
      location: 'Pine Avenue',
      time: '12 minutes ago',
      status: 'delivery',
    },
  ];

  const riders: Rider[] = [
    {
      id: 'R001',
      name: 'Mike Johnson',
      phone: '+1 (555) 123-4567',
      status: 'active',
      currentOrders: 3,
      location: {
        lat: 40.72,
        lng: -74.0,
        address: 'Downtown Mall, NYC',
      },
      rating: 4.8,
      completedToday: 12,
    },
    {
      id: 'R002',
      name: 'Lisa Rodriguez',
      phone: '+1 (555) 234-5678',
      status: 'busy',
      currentOrders: 2,
      location: {
        lat: 40.71,
        lng: -73.99,
        address: 'Pine Avenue, NYC',
      },
      rating: 4.9,
      completedToday: 15,
    },
    {
      id: 'R003',
      name: 'Sarah Chen',
      phone: '+1 (555) 345-6789',
      status: 'active',
      currentOrders: 1,
      location: {
        lat: 40.705,
        lng: -74.01,
        address: 'Sunset Boulevard, NYC',
      },
      rating: 4.7,
      completedToday: 8,
    },
    {
      id: 'R007',
      name: 'David Wilson',
      phone: '+1 (555) 456-7890',
      status: 'inactive',
      currentOrders: 0,
      location: {
        lat: 40.73,
        lng: -73.985,
        address: 'Oak Street, NYC',
      },
      rating: 4.6,
      completedToday: 5,
    },
  ];

  const getActivityIcon = (status: RiderActivity['status']) => {
    const icons = {
      pickup: <ShoppingCartOutlined style={{ color: '#1890ff' }} />,
      delivery: <CarOutlined style={{ color: '#faad14' }} />,
      completed: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      issue: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
    };
    return icons[status];
  };

  const getStatusColor = (status: Rider['status']) => {
    const colors = {
      active: 'green',
      busy: 'orange',
      inactive: 'red',
    };
    return colors[status];
  };

  const handleCenterOnRider = (riderId: string) => {
    const rider = riders.find((r) => r.id === riderId);
    if (rider) {
      setMapCenter({ lat: rider.location.lat, lng: rider.location.lng });
      setSelectedRider(riderId);
    }
  };

  const MainContent = () => (
    <div
      style={{
        padding: 16,
        height: '100%',
        overflow: 'auto',
        marginTop: '-20px',
      }}
    >
      <div style={{ marginBottom: 24 }}>
        <Space
          align='center'
          style={{ width: '100%', justifyContent: 'space-between' }}
        >
          <div>
            <Title level={2} style={{ margin: 0, color: token.colorText }}>
              LaundryGo Dashboard
            </Title>
            <Text style={{ color: token.colorTextSecondary }}>
              Real-time rider tracking and order management
            </Text>
          </div>
          <Space>
            <SplitterControls
              splitterSize={splitterSize}
              setSplitterSize={setSplitterSize}
            />
            <Button icon={<SearchOutlined />} />
            <Button icon={<BellOutlined />} />
            <Button type='primary' icon={<PlusOutlined />}>
              Add Rider
            </Button>
          </Space>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {laundryStats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <StatCard {...stat} />
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={24}>
          <Card
            title={
              <Space>
                <EnvironmentOutlined />
                <span>Rider Locations</span>
                <Badge
                  count={riders.filter((r) => r.status === 'active').length}
                />
              </Space>
            }
            extra={
              <Space>
                <Select
                  defaultValue='all'
                  style={{ width: 120 }}
                  onChange={setFilterStatus}
                >
                  <Option value='all'>All Riders</Option>
                  <Option value='active'>Active</Option>
                  <Option value='busy'>Busy</Option>
                  <Option value='inactive'>Inactive</Option>
                </Select>
                <Button type='link'>Refresh</Button>
              </Space>
            }
            style={{
              borderRadius: token.borderRadiusLG,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <RiderMap
              riders={riders.filter(
                (rider) =>
                  filterStatus === 'all' || rider.status === filterStatus
              )}
              selectedRider={selectedRider}
              onRiderSelect={setSelectedRider}
              initialCenter={mapCenter}
              onCenterChange={setMapCenter}
              height={400}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

  const SidePanel = () => (
    <div
      style={{
        padding: 20,
        height: '100%',
        backgroundColor: token.colorBgContainer,
        borderLeft: `1px solid ${token.colorBorder}`,
        overflow: 'auto',
      }}
    >
      <Title level={4} style={{ marginBottom: 16 }}>
        <Space>
          <CarOutlined />
          Live Activity
        </Space>
      </Title>

      <List
        dataSource={riderActivities}
        renderItem={(activity) => (
          <List.Item
            style={{
              padding: '12px 0',
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
            }}
          >
            <List.Item.Meta
              avatar={getActivityIcon(activity.status)}
              title={
                <Space direction='vertical' size={2}>
                  <Text strong style={{ fontSize: 13 }}>
                    {activity.riderName}
                  </Text>
                  <Text
                    style={{ fontSize: 12, color: token.colorTextSecondary }}
                  >
                    {activity.action}
                  </Text>
                </Space>
              }
              description={
                <div>
                  <Space direction='vertical' size={2}>
                    <Text style={{ fontSize: 11, color: token.colorPrimary }}>
                      {activity.orderId}
                    </Text>
                    <Text
                      style={{ fontSize: 11, color: token.colorTextSecondary }}
                    >
                      <EnvironmentOutlined style={{ marginRight: 4 }} />
                      {activity.location}
                    </Text>
                    <Text
                      style={{ fontSize: 10, color: token.colorTextTertiary }}
                    >
                      {activity.time}
                    </Text>
                  </Space>
                </div>
              }
            />
          </List.Item>
        )}
      />

      <Divider />

      <Title level={5} style={{ marginBottom: 16 }}>
        <Space>
          <CarOutlined />
          Active Riders ({riders.filter((r) => r.status !== 'inactive').length})
        </Space>
      </Title>

      <List
        dataSource={riders.filter((rider) => rider.status !== 'inactive')}
        renderItem={(rider) => (
          <List.Item
            style={{
              padding: '12px 0',
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
              cursor: 'pointer',
              backgroundColor:
                selectedRider === rider.id
                  ? token.colorBgTextHover
                  : 'transparent',
            }}
            onClick={() => setSelectedRider(rider.id)}
          >
            <List.Item.Meta
              avatar={
                <Badge
                  status={rider.status === 'active' ? 'success' : 'processing'}
                  dot
                >
                  <Avatar
                    size='small'
                    style={{ backgroundColor: token.colorPrimary }}
                  >
                    {rider.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </Avatar>
                </Badge>
              }
              title={
                <Space direction='vertical' size={2}>
                  <Space>
                    <Text strong style={{ fontSize: 13 }}>
                      {rider.name}
                    </Text>
                    <Tooltip title='Center on map'>
                      <Button
                        size='small'
                        type='text'
                        icon={<AimOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCenterOnRider(rider.id);
                        }}
                      />
                    </Tooltip>
                  </Space>
                  <Space size={8}>
                    <Tag
                      color={getStatusColor(rider.status)}
                      key={rider.id}
                      style={{ fontSize: 10 }}
                    >
                      {rider.status}
                    </Tag>
                    <Text style={{ fontSize: 10 }}>⭐ {rider.rating}</Text>
                  </Space>
                </Space>
              }
              description={
                <div>
                  <Space direction='vertical' size={2}>
                    <Text
                      style={{ fontSize: 11, color: token.colorTextSecondary }}
                    >
                      <ShoppingCartOutlined style={{ marginRight: 4 }} />
                      {rider.currentOrders} active orders
                    </Text>
                    <Text
                      style={{ fontSize: 11, color: token.colorTextSecondary }}
                    >
                      <CheckCircleOutlined style={{ marginRight: 4 }} />
                      {rider.completedToday} completed today
                    </Text>
                    <Tooltip title={rider.phone}>
                      <Text
                        style={{ fontSize: 10, color: token.colorTextTertiary }}
                      >
                        <PhoneOutlined style={{ marginRight: 4 }} />
                        {rider.phone.slice(-4)}
                      </Text>
                    </Tooltip>
                  </Space>
                </div>
              }
            />
          </List.Item>
        )}
      />

      <Divider />

      <Title level={5} style={{ marginBottom: 16 }}>
        Quick Stats
      </Title>

      <Space direction='vertical' style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>Orders in Queue</Text>
          <Tag color='orange'>23</Tag>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>Avg Response Time</Text>
          <Tag color='green'>4.2 min</Tag>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>Customer Satisfaction</Text>
          <Tag color='blue'>96%</Tag>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text>Peak Hours</Text>
          <Tag color='purple'>2-6 PM</Tag>
        </div>
      </Space>
    </div>
  );

  return (
    <Layout style={{ height: '100vh', backgroundColor: token.colorBgLayout }}>
      <Splitter style={{ height: '100%' }} onResize={setSplitterSize}>
        <Splitter.Panel defaultSize='65%' min='50%' max='80%'>
          <MainContent />
        </Splitter.Panel>
        <Splitter.Panel defaultSize='35%' min='20%' max='50%'>
          <SidePanel />
        </Splitter.Panel>
      </Splitter>
    </Layout>
  );
}

export default LaundryDashboard;
