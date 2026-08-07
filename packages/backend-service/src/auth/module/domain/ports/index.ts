/**
 * Ports Exports
 * Central export point for all ports in the auth domain
 */

// Export password hasher port
export { type IPasswordHasher } from './password-hasher.port';

// Export email validator port
export { type IEmailValidator } from './email-validator.port';

// Export phone validator port
export { type IPhoneValidator } from './phone-validator.port';

// Export token generator port
export { type ITokenGenerator, type TokenPayload } from './token-generator.port';

// Export OTP generator port
export { type IOtpGenerator } from './otp-generator.port';

// Export notification sender port
export {
  type INotificationSender,
  type EmailOptions,
  type EmailAttachment,
} from './notification-sender.port';

// Export IP geolocation port
export { type IIpGeolocation, type LocationInfo } from './ip-geolocation.port';

// Export cache port
export { type ICache } from './cache.port';

// Note: Import and export other ports as they are created
// export { type IIdGenerator } from './id-generator.port';
