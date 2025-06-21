import { Button, Result } from 'antd';
import React, { JSX } from 'react';
import { useTranslation } from 'react-i18next';

export const PageNotFound: React.FC = (): JSX.Element => {
  const { t } = useTranslation();

  const handleGoBack = () => {
    history.back();
  };

  return (
    <Result
      status='404'
      subTitle={<span style={{ fontSize: '22px' }}>{t('page_not_found')}</span>}
      extra={
        <Button type='primary' onClick={handleGoBack}>
          {t('go_home')}
        </Button>
      }
    />
  );
};
