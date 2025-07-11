import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  FormInstance,
  Image,
  Input,
  Row,
} from 'antd';

import { emailRules, validatePassword } from '@/utils/Utils';
import Logo from 'assets/LogoDark.png';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { rememberMe } from 'services/cache';
import 'styles/css/Login.css';

import { useLogin } from '@/hooks/auth/useLogin';

export const LoginForm = () => {
  const { handleLogin } = useLogin();
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const formRef = React.createRef<FormInstance>();

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
          <Form
            form={form}
            ref={formRef}
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={() => handleLogin()}
          >
            <Form.Item name='email' rules={emailRules(t)}>
              <Input
                prefix={<UserOutlined />}
                autoComplete='email'
                size='large'
                placeholder={t('email')}
                allowClear
              />
            </Form.Item>
            <Form.Item
              name='password'
              rules={[
                {
                  validator: (_, value) => validatePassword(_, value, t),
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                size='large'
                type='password'
                autoComplete='current-password'
                placeholder={t('password')}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                allowClear
              />
            </Form.Item>

            <Form.Item>
              <Flex justify='space-between' align='center'>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const email = form.getFieldValue('email');
                      if (isChecked && email) {
                        rememberMe.setRememberMe(email);
                      } else {
                        rememberMe.removeRememberMe();
                      }
                    }}
                  >
                    {t('remember_me')}
                  </Checkbox>
                </Form.Item>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='login-form-button'
                size='large'
              >
                {t('login')}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
