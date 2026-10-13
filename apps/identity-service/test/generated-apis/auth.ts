import { TApiModule } from '../utility/type';
import { LoginHttpDTODtoPayload, RegisterHttpDTODtoPayload, RefreshTokenHttpDTODtoPayload, LogoutHttpDTODtoPayload, ForgotPasswordHttpDTODtoPayload, ResetPasswordHttpDTODtoPayload, VerifyEmailHttpDTODtoPayload, ResendVerificationHttpDTODtoPayload } from '../generated-payloads';

export const authApi: TApiModule = {
  "login": {
    endpoint: "login",
    method: "POST",
    path: "/auth/login",
    payload: () => LoginHttpDTODtoPayload,
  },

  "register": {
    endpoint: "register",
    method: "POST",
    path: "/auth/register",
    payload: () => RegisterHttpDTODtoPayload,
  },

  "refresh": {
    endpoint: "refresh",
    method: "POST",
    path: "/auth/refresh",
    payload: () => RefreshTokenHttpDTODtoPayload,
  },

  "logout": {
    endpoint: "logout",
    method: "POST",
    path: "/auth/logout",
    payload: () => LogoutHttpDTODtoPayload,
  },

  "forgotPassword": {
    endpoint: "forgotPassword",
    method: "POST",
    path: "/auth/forgot-password",
    payload: () => ForgotPasswordHttpDTODtoPayload,
  },

  "resetPassword": {
    endpoint: "resetPassword",
    method: "POST",
    path: "/auth/reset-password",
    payload: () => ResetPasswordHttpDTODtoPayload,
  },

  "verifyEmail": {
    endpoint: "verifyEmail",
    method: "POST",
    path: "/auth/verify-email",
    payload: () => VerifyEmailHttpDTODtoPayload,
  },

  "resendVerification": {
    endpoint: "resendVerification",
    method: "POST",
    path: "/auth/resend-verification",
    payload: () => ResendVerificationHttpDTODtoPayload,
  }
};
