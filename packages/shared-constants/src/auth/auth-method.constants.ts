/**
 * Auth Method Constants
 * প্রমাণীকরণ পদ্ধতি সম্পর্কিত কনস্ট্যান্টস
 */

import { AUTH } from './auth.constants';

export const AUTH_METHOD = {
  ...AUTH.METHODS,

  // Additional auth methods
  WHATSAPP_OTP: 'whatsapp_otp',
  VIBER_OTP: 'viber_otp',
  IMO_OTP: 'imo_otp',
  TELEGRAM_OTP: 'telegram_otp',
  BIO_WEBAUTHN: 'bio_webauthn',
  BIO_FINGERPRINT: 'bio_fingerprint',
  BIO_FACEID: 'bio_faceid',
  BIO_PATTERN: 'bio_pattern',
  HARDWARE_TOKEN: 'hardware_token',
  SMART_CARD: 'smart_card',
} as const;

export type AuthMethodType = (typeof AUTH_METHOD)[keyof typeof AUTH_METHOD];

// Method metadata
export const AUTH_METHOD_METADATA: Record<
  AuthMethodType,
  {
    name: string;
    nameBangla: string;
    category: 'password' | 'otp' | 'magic_link' | 'social' | 'sso' | 'mfa' | 'biometric';
    securityLevel: 'low' | 'medium' | 'high' | 'very_high';
    requiresDevice: boolean;
    requiresUserAction: boolean;
  }
> = {
  password: {
    name: 'Password',
    nameBangla: 'পাসওয়ার্ড',
    category: 'password',
    securityLevel: 'medium',
    requiresDevice: false,
    requiresUserAction: true,
  },
  otp: {
    name: 'OTP',
    nameBangla: 'ওটিপি',
    category: 'otp',
    securityLevel: 'high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  magic_link: {
    name: 'Magic Link',
    nameBangla: 'ম্যাজিক লিংক',
    category: 'magic_link',
    securityLevel: 'high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  social: {
    name: 'Social Login',
    nameBangla: 'সোশ্যাল লগইন',
    category: 'social',
    securityLevel: 'medium',
    requiresDevice: false,
    requiresUserAction: true,
  },
  sso: {
    name: 'SSO',
    nameBangla: 'এসএসও',
    category: 'sso',
    securityLevel: 'high',
    requiresDevice: false,
    requiresUserAction: true,
  },
  oauth: {
    name: 'OAuth',
    nameBangla: 'ওঅথ',
    category: 'sso',
    securityLevel: 'high',
    requiresDevice: false,
    requiresUserAction: true,
  },
  mfa_totp: {
    name: 'TOTP',
    nameBangla: 'টিওটিপি',
    category: 'mfa',
    securityLevel: 'very_high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  mfa_sms: {
    name: 'SMS MFA',
    nameBangla: 'এসএমএস এমএফএ',
    category: 'mfa',
    securityLevel: 'high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  mfa_email: {
    name: 'Email MFA',
    nameBangla: 'ইমেইল এমএফএ',
    category: 'mfa',
    securityLevel: 'high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  mfa_backup_code: {
    name: 'Backup Code',
    nameBangla: 'ব্যাকআপ কোড',
    category: 'mfa',
    securityLevel: 'very_high',
    requiresDevice: false,
    requiresUserAction: true,
  },
  biometric_fingerprint: {
    name: 'Fingerprint',
    nameBangla: 'আঙুলের ছাপ',
    category: 'biometric',
    securityLevel: 'very_high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  biometric_face: {
    name: 'Face ID',
    nameBangla: 'ফেস আইডি',
    category: 'biometric',
    securityLevel: 'very_high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  biometric_iris: {
    name: 'Iris Scan',
    nameBangla: 'আইরিস স্ক্যান',
    category: 'biometric',
    securityLevel: 'very_high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  whatsapp_otp: {
    name: 'WhatsApp OTP',
    nameBangla: 'হোয়াটসঅ্যাপ ওটিপি',
    category: 'otp',
    securityLevel: 'high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  viber_otp: {
    name: 'Viber OTP',
    nameBangla: 'ভাইবার ওটিপি',
    category: 'otp',
    securityLevel: 'high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  imo_otp: {
    name: 'Imo OTP',
    nameBangla: 'আইমো ওটিপি',
    category: 'otp',
    securityLevel: 'high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  telegram_otp: {
    name: 'Telegram OTP',
    nameBangla: 'টেলিগ্রাম ওটিপি',
    category: 'otp',
    securityLevel: 'high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  bio_webauthn: {
    name: 'WebAuthn',
    nameBangla: 'ওয়েবঅথএন',
    category: 'biometric',
    securityLevel: 'very_high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  bio_fingerprint: {
    name: 'Bio Fingerprint',
    nameBangla: 'বায়ো ফিঙ্গারপ্রিন্ট',
    category: 'biometric',
    securityLevel: 'very_high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  bio_faceid: {
    name: 'Bio FaceID',
    nameBangla: 'বায়ো ফেসআইডি',
    category: 'biometric',
    securityLevel: 'very_high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  bio_pattern: {
    name: 'Pattern Lock',
    nameBangla: 'প্যাটার্ন লক',
    category: 'biometric',
    securityLevel: 'high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  hardware_token: {
    name: 'Hardware Token',
    nameBangla: 'হার্ডওয়্যার টোকেন',
    category: 'mfa',
    securityLevel: 'very_high',
    requiresDevice: true,
    requiresUserAction: true,
  },
  smart_card: {
    name: 'Smart Card',
    nameBangla: 'স্মার্ট কার্ড',
    category: 'mfa',
    securityLevel: 'very_high',
    requiresDevice: true,
    requiresUserAction: true,
  },
};
