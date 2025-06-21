import { Menu } from 'antd';
import moment from 'moment';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/config/i18n';

const languageOptions = [
  { key: 'en_lang', lang: 'en', label: 'English', flag: '🇬🇧' },
  { key: 'la_lang', lang: 'la', label: 'ລາວ', flag: '🇱🇦' },
];

export default function ChangeLanguage() {
  const { t } = useTranslation();

  const onChangeLanguage = useCallback(async (lang: string) => {
    localStorage.setItem('lang', lang);
    const momentLocale = lang === 'la' ? 'lo' : 'en-gb';
    await i18n.changeLanguage(lang);
    moment.locale(momentLocale);
  }, []);

  const menuItems = languageOptions.map((option) => ({
    key: option.key,
    label: (
      <>
        <span
          role='img'
          aria-label={option.label}
          style={{ marginRight: '7px' }}
        >
          {option.flag}
        </span>
        {t(option.label)}
      </>
    ),
    onClick: () => onChangeLanguage(option.lang),
  }));

  return (
    <Menu mode='vertical' items={menuItems} defaultSelectedKeys={['en_lang']} />
  );
}
