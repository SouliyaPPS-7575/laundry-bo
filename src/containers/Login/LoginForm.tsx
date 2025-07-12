import { Button, Card, Col, Form, Image, Row } from 'antd';

import Logo from 'assets/LogoDark.png';
import { useEffect } from 'react';
import { rememberMe } from 'services/cache';
import 'styles/css/Login.css';

import { useLogin } from '@/hooks/auth/useLogin';

export const LoginForm = () => {
  const { handleLogin } = useLogin();
  // const { t } = useTranslation();
  const [form] = Form.useForm();
  // const formRef = React.createRef<FormInstance>();

  useEffect(() => {
    const rememberedEmail = rememberMe.getRememberMe();
    if (rememberedEmail) {
      form.setFieldsValue({ email: rememberedEmail });
    }
  }, [form]);

  return (
    <Row justify='space-around' align='middle' style={{ height: '100%' }}>
      <Col>
        <Card className='card'>
          <div className='avatar'>
            <Image width={250} preview={false} src={Logo} />
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}
          >
            <Button onClick={handleLogin}>Login with Zitadel</Button>
          </div>
        </Card>
      </Col>
    </Row>
  );
};
