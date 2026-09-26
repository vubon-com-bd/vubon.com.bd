export type {
  MfaMethod,
  MfaSetupResult,
  MfaVerifyResult,
  MfaServiceContract,
} from './service.interface';
export { generateTotpSecret, computeTotp, verifyTotp, buildTotpUri } from './totp';
export { createSmsOtp, InMemorySmsMfaStore } from './sms-mfa';
export type { SmsOtpRecord, SmsMfaStore } from './sms-mfa';
export { createEmailOtp, InMemoryEmailMfaStore } from './email-mfa';
export type { EmailOtpRecord, EmailMfaStore } from './email-mfa';
export { generateRecoveryCodes, findRecoveryCodeIndex } from './recovery-code';
export { createWebAuthnChallenge, isChallengeExpired, verifyWebAuthnAssertion } from './webauthn';
export type { WebAuthnChallenge, WebAuthnVerifyInput } from './webauthn';
export { MfaService, mfaService } from './mfa.service';
