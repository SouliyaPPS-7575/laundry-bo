import { TFunction } from "i18next";
import { themes } from "./theme/themeConfig";

export const statusColor = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return themes.token?.colorSuccess;
    case 'INACTIVE':
      return themes.token?.colorError;
    default:
      return themes.token?.colorText;
  }
};


export const statusLabel = (status: string, t: TFunction<'translate', undefined>) => {
  switch (status) {
    case 'ACTIVE':
      return t('active');
    case 'INACTIVE':
      return t('inactive');
    default:
      return status;
  }
};