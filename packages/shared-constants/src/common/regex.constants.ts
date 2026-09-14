export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_BD: /^(\+880|880|0)1[3-9]\d{8}$/,
  PHONE_INTL: /^\+?[1-9]\d{6,14}$/,
  URL: /^https?:\/\/[^\s]+$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,
  PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,128}$/,
  OTP: /^\d{4,8}$/,
  HEX_COLOR: /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  POSTAL_BD: /^\d{4}$/,
  NID_BD: /^\d{10,17}$/,
  IPV4: /^(\d{1,3}\.){3}\d{1,3}$/,
  IPV6: /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/,
  MAC_ADDRESS: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
} as const;

export type RegexKeyType = keyof typeof REGEX;
