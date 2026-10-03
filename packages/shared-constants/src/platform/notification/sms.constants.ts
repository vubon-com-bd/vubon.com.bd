export const SMS_PROVIDER = {
  TWILIO: 'twilio',
  VONAGE: 'vonage',
  AWS_SNS: 'aws_sns',
  MSG91: 'msg91',
  BULKSMS: 'bulksms',
  SSLWIRELESS: 'sslwireless',
  BANGLALINK: 'banglalink',
  ROBI: 'robi',
  GRAMEENPHONE: 'grameenphone',
  CUSTOM: 'custom',
} as const;

export const SMS_STATUS = {
  PENDING: 'pending',
  QUEUED: 'queued',
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  UNDELIVERED: 'undelivered',
  REJECTED: 'rejected',
} as const;

export const SMS_TYPE = {
  TRANSACTIONAL: 'transactional',
  PROMOTIONAL: 'promotional',
  OTP: 'otp',
  ALERT: 'alert',
  NOTIFICATION: 'notification',
} as const;

export const SMS = {
  MAX_LENGTH: 160,
  MAX_LENGTH_UNICODE: 70,
  MAX_MULTIPART: 5,
  MAX_PER_MINUTE: 60,
  MAX_PER_DAY: 5000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_SECONDS: 30,
  TRACK_DELIVERY: true,
  SUPPORT_UNICODE: true,
  SENDER_ID_MAX_LENGTH: 11,
} as const;

export type SmsProviderType = (typeof SMS_PROVIDER)[keyof typeof SMS_PROVIDER];
export type SmsStatusType = (typeof SMS_STATUS)[keyof typeof SMS_STATUS];
export type SmsTypeType = (typeof SMS_TYPE)[keyof typeof SMS_TYPE];
