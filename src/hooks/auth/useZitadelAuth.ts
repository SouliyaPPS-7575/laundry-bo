import { createZitadelAuth } from '@/config/zitadel';
import { ZitadelConfig } from '@/config/zitadel';

const zitadelConfig: ZitadelConfig = {
  authority: 'https://laundry-qndm24.us1.zitadel.cloud',
  client_id: '252103174640533505@laundry_dev',
  project_resource_id: '326632016554619101',
  redirect_uri: 'http://localhost:3000/callback',
  post_logout_redirect_uri: 'http://localhost:3000/login',
};

export const useZitadelAuth = () => {
  return createZitadelAuth(zitadelConfig);
};
