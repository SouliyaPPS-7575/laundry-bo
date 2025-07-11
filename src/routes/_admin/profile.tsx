import { UserOutlined } from '@ant-design/icons';
import { createFileRoute } from '@tanstack/react-router';
import { Avatar, Card, Descriptions, Space, Spin } from 'antd';
import { useUserProfile } from 'hooks/profile/useUserProfile';

export const Route = createFileRoute('/_admin/profile')({
  component: ProfileComponent,
});

function ProfileComponent() {
  const { userInfo, isLoading, isError } = useUserProfile();

  if (isLoading) {
    return (
      <Spin
        size='large'
        style={{ display: 'block', margin: 'auto', marginTop: '50px' }}
      />
    );
  }

  if (isError || !userInfo) {
    return <div>Error loading profile or profile not found.</div>;
  }

  return (
    <Card title='User Profile' style={{ margin: '20px' }}>
      <Space direction='vertical' size='middle' style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          {userInfo?.profile?.picture ? (
            <Avatar size={100} src={userInfo?.profile?.picture} />
          ) : (
            <Avatar size={100} icon={<UserOutlined />} />
          )}
          <h2>
            {userInfo?.profile?.nickname}
          </h2>
        </div>
        <Descriptions bordered column={1}>
          <Descriptions.Item label='Email'>
            {userInfo?.profile?.email}
          </Descriptions.Item>
          <Descriptions.Item label='Phone'>
            {userInfo?.profile?.phone_number}
          </Descriptions.Item>
          <Descriptions.Item label='Gender'>
            {userInfo?.profile?.gender || 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label='Status'>
            {userInfo?.profile?.phone_number_verified
              ? 'Verified'
              : 'Unverified'}
          </Descriptions.Item>
          <Descriptions.Item label='Last Updated'>
            {userInfo?.profile?.updated_at
              ? new Date(userInfo.profile.updated_at).toLocaleString()
              : 'N/A'}
          </Descriptions.Item>
        </Descriptions>
      </Space>
    </Card>
  );
}
