import { TFunction } from "i18next";
import moment from 'moment';

// regex for pattern passwords
export const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{7,}$/;

// Password validation function with translation
export const validatePassword = (
     _: unknown,
     value: string,
     t: TFunction<"translate", undefined>
) => {
     if (!value) {
          return Promise.reject(t("please_input_password"));
     }
     if (value.length < 3) {
          return Promise.reject(t("password_must_more_than_3_character"));
     }

     // if (!passwordRegex.test(value)) {
     //      return Promise.reject(t("validate_password"));
     // }
     return Promise.resolve();
};

// regex for pattern email validation
export const patternEmailValidate =
     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const emailRules = (t: TFunction<"translate", undefined>) =>
     [
          {
               required: true,
               message: t("please_input_email"),
          },
          {
               pattern: patternEmailValidate,
               message: t("please_enter_valid_email"),
          },
     ];

// Formate DateTime
export const formatDatetime = (datetime: string) => {
     return moment(datetime).format('DD-MM-YYYY H:mm:ss');
};

// Formate Date
export const formatDate = (date: string | undefined) => {
     return moment(date).format('DD-MM-YYYY');
};
