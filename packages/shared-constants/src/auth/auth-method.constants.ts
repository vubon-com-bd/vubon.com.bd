export const AUTH_METHOD = {
  EMAIL_PASSWORD: 'email_password',
  PHONE_PASSWORD: 'phone_password',
  USERNAME_PASSWORD: 'username_password',
  EMAIL_OTP: 'email_otp',
  PHONE_OTP: 'phone_otp',
  MAGIC_LINK: 'magic_link',
  SOCIAL_LOGIN: 'social_login',
  OAUTH2: 'oauth2',
  SAML: 'saml',
  BIOMETRIC: 'biometric',
} as const;

export type AuthMethodType = (typeof AUTH_METHOD)[keyof typeof AUTH_METHOD];
