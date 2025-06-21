/**
 * A module for managing access and refresh tokens in the local storage.
 */
export const localStorageToken = (() => {
     /**
      * Retrieves the access token from the local storage.
      * @returns The access token.
      */
     const getAccessToken = () => {
          const tokenFromQueryParams = new URLSearchParams(
               window.location.search
          ).get('accessToken');
          if (tokenFromQueryParams) {
               return tokenFromQueryParams;
          }
          return localStorage.getItem('accessToken') || '';
     };

     /**
      * Retrieves the refresh token from the local storage.
      * @returns The refresh token.
      */
     const getRefreshToken = () => {
          return localStorage.getItem('refreshToken') || '';
     };



     /**
      * Sets the access token in the local storage.
      * @param accessToken - The access token to be set.
      */
     const setAccessToken = (accessToken: string) => {
          localStorage.setItem('accessToken', accessToken);
     };

     /**
      * Sets the refresh token in the local storage.
      * @param refreshToken - The refresh token to be set.
      */
     const setRefreshToken = (refreshToken: string) => {
          localStorage.setItem('refreshToken', refreshToken);
     };

     /**
      * Sets both the access token and refresh token in the local storage.
      * @param tokens - The access token and refresh token to be set.
      */
     const setToken = ({
          accessToken,
          refreshToken,
     }: {
          accessToken: string;
          refreshToken: string;
     }) => {
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
     };

     /**
      * Removes both the access token and refresh token from the local storage.
      */
     const removeToken = () => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
     };

     return {
          getAccessToken,
          getRefreshToken,
          setToken,
          setRefreshToken,
          setAccessToken,
          removeToken,
     };
})();

export const localStorageData = (() => {
     const getTheme = () => {
          return localStorage.getItem('theme');
     };

     const setTheme = (theme: string) => {
          localStorage.setItem('theme', theme);
     };

     return {
          getTheme,
          setTheme
     };
})();

/**
 * A utility function for managing the 'rememberMe' value in the local storage.
 */
export const rememberMe = (() => {
     const getRememberMe = () => {
          return localStorage.getItem('rememberMe') || '';
     };

     const setRememberMe = (rememberMe: string) => {
          localStorage.setItem('rememberMe', rememberMe);
     };
     const removeRememberMe = () => {
          localStorage.removeItem('rememberMe');
     };
     return {
          /**
           * Retrieves the 'rememberMe' value from the local storage.
           * @returns The 'rememberMe' value.
           */
          getRememberMe,
          /**
           * Sets the 'rememberMe' value in the local storage.
           * @param rememberMe - The 'rememberMe' value to be set.
           */
          setRememberMe,
          /**
           * Removes the 'rememberMe' value from the local storage.
           */
          removeRememberMe,
     };
})();

// Function to handle token refresh error
export function handleTokenError() {
     localStorageToken.removeToken();
     localStorage.clear();
}
