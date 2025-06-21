// Type API
export interface LoginData {
     accessToken: string;
     refreshToken: string;
}

export interface IAuth {
     email: string;
     password: string;
}

// Type UI
export type AuthForm = {
     email: string;
     password: string;
};