export type {
  VerificationChannel,
  VerificationRequest,
  VerificationRecord,
  VerificationServiceContract,
} from './verification.service.interface';
export { createOtp, verifyOtp } from './otp';
export { createEmailVerification, InMemoryEmailVerificationStore } from './email-verification';
export type { EmailVerificationRecord, EmailVerificationSender } from './email-verification';
export { createPhoneVerification, InMemoryPhoneVerificationStore } from './phone-verification';
export type { PhoneVerificationRecord, PhoneVerificationSender } from './phone-verification';
export type { OtpSender, OtpRecord, OtpStore } from './otp.interface';
export {
  burnPasswordTiming,
  constantLoginResponse,
  constantForgotPasswordResponse,
} from './enumeration-guard';
export type { ConstantAuthResponse } from './enumeration-guard';
export { VerificationService, verificationService } from './verification.service';
