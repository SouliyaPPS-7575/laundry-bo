import type { ThemeConfig } from 'antd';
import { theme } from 'antd'; // Import Ant Design's algorithms
import lightThemes from './lightTheme.json';
import darkThemes from './darkTheme.json';

const themeMode = 'light';

const fontFamily = 'Roboto, Noto Sans Lao, sans-serif';

const themes: ThemeConfig = {
     token: {
          colorPrimary: lightThemes.token.colorPrimary,
          colorBgLayout: lightThemes.token.colorBgLayout,
          colorLink: lightThemes.token.colorLink,
          colorSuccess: lightThemes.token.colorSuccess,
          colorWarning: lightThemes.token.colorWarning,
          colorError: lightThemes.token.colorError,
          colorText: lightThemes.token.colorText,
          colorBgContainer: lightThemes.token.colorBgContainer,
          boxShadow: lightThemes.token.boxShadow,
          colorBorderSecondary: lightThemes.token.colorBorderSecondary,
          borderRadius: lightThemes.token.borderRadius,
          colorIcon: lightThemes.token.colorIcon,
          colorBgBase: lightThemes.token.colorBgBase,
          colorBorder: lightThemes.token.colorBorder,
     },
     components: {
          Layout: {
               headerBg: lightThemes.components.Layout.headerBg,
          },
          Input: {
               // Input styles height
               controlHeight: 38,
          },
          Button: {
               colorPrimary: lightThemes.components.Button.colorPrimary,
               colorPrimaryActive: lightThemes.components.Button.colorPrimaryActive,
          },
     },
     algorithm: theme.defaultAlgorithm, // Light theme algorithm
};

const darkTheme: ThemeConfig = {
     token: {
          colorPrimary: darkThemes.token.colorPrimary,
          colorBgLayout: darkThemes.token.colorBgLayout,
          colorLink: darkThemes.token.colorLink,
          colorSuccess: darkThemes.token.colorSuccess,
          colorWarning: darkThemes.token.colorWarning,
          colorError: darkThemes.token.colorError,
          colorText: darkThemes.token.colorText,
          colorBgContainer: darkThemes.token.colorBgContainer,
          boxShadow: darkThemes.token.boxShadow,
          colorBorderSecondary: darkThemes.token.colorBorderSecondary,
          borderRadius: darkThemes.token.borderRadius,
          colorIcon: darkThemes.token.colorIcon,
          colorBgBase: darkThemes.token.colorBgBase,
     },
     components: {
          Layout: {
               headerBg: darkThemes.components.Layout.headerBg,
          },
          Input: {
               // Input styles height
               controlHeight: 38,
          },
          Button: {
               colorPrimary: darkThemes.components.Button.colorPrimary,
               colorPrimaryActive: darkThemes.components.Button.colorPrimaryActive,
          },
     },
     algorithm: theme.darkAlgorithm, // Dark theme algorithm
};

export { darkTheme, fontFamily, themeMode, themes };

