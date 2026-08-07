/**
 * Domain Exports
 * Central export point for all domain entities and value objects
 */

// Export entities
export { BaseEntity } from './entities/base.entity';
export { User } from './entities/user.entity';
export type { UpdateProfileData, UserPreferences } from './entities/user.entity';

// Export value objects
export { BaseValueObject } from './value-objects/base.vo';
export { Email } from './value-objects/email.vo';
export { Password } from './value-objects/password.vo';
export { Phone } from './value-objects/phone.vo';
export { OtpCode } from './value-objects/otp-code.vo';
export { DeviceId } from './value-objects/device-id.vo';
export { IpAddress } from './value-objects/ip-address.vo';
export { UserAgent } from './value-objects/user-agent.vo';
export { Token } from './value-objects/token.vo';
export { UserId } from './value-objects/user-id.vo';
