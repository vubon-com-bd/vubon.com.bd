// packages/backend-service/src/auth/module/domain/ports/index.ts

// ✅ Export email sender port
export type { IEmailSender, EmailOptions, EmailResult, EmailAttachment } from './email-sender.port';

// ✅ Export notification sender port
export type {
  INotificationSender,
  NotificationOptions,
  NotificationResult,
  NotificationChannel,
  NotificationPriority,
  SmsOptions,
  PushNotificationOptions,
} from './notification-sender.port';

// ✅ Export email validator port
export type { IEmailValidator, EmailValidationResult } from './email-validator.port';

// ✅ Export token generator port
export type {
  ITokenGenerator,
  TokenPayload,
  TokenType,
  TokenGenerationOptions,
  TokenVerificationResult,
  RefreshTokenRotationResult,
} from './token-generator.port';

// ✅ Export IP geolocation port
export type { IIPGeolocation, GeolocationData } from './ip-geolocation.port';

// ✅ Export OTP generator port
export type {
  IOtpGenerator,
  OtpType,
  OtpGenerationOptions,
  OtpVerificationResult,
} from './otp-generator.port';
