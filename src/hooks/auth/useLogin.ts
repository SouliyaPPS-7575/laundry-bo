import { IAuth, LoginData } from "@/models/auth";
import { localStorageToken } from "@/services/cache";
import { loginCallApi } from "@/services/https/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import useNoti from "hooks/noti/useNoti";
import { useTranslation } from "react-i18next";

export const useLogin = () => {
     const { t } = useTranslation();
     const { addSuccessNoti } = useNoti();
     const navigate = useNavigate();

     // Mutation for Login
     const { mutate: actionLogin, status: statusLogin, isSuccess: isSuccessLogin } = useMutation<LoginData, Error, IAuth>({
          mutationFn: loginCallApi,
          onSuccess: async (token: LoginData) => {
               localStorageToken.setToken({
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
               });

               // Redirect upon successful login
               navigate({ to: "/" });

               // Trigger success notification
               addSuccessNoti(t("login_successfully"), t("welcome"));
          },
     });


     const handleLogin = (value: IAuth) => {
          actionLogin(value);
     };

     return {
          handleLogin,

          // Mutation status
          statusLogin,
          isSuccessLogin,
     };
};