import { createZitadelAuth, ZitadelConfig } from '@/config/zitadel';

const zitadelConfig: ZitadelConfig = {
  authority: 'https://laundry-qndm24.us1.zitadel.cloud',
  client_id: '326632016554619101',
  project_resource_id: '326632016554619101',
  redirect_uri: `${window.location.origin}/callback`,
  post_logout_redirect_uri: `${window.location.origin}/`,
};

export const zitadelAuthInstance = createZitadelAuth(zitadelConfig);

// Export the hook for use in components
export const useZitadelAuth = () => {
  return createZitadelAuth(zitadelConfig);
};
