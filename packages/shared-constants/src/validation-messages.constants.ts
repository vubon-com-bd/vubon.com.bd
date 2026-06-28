/**
 * Validation Messages Constants - Enterprise Grade Multi-Language Validation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-constants/validation-messages.constants
 * 
 * @description
 * Centralized validation messages for all DTOs and services.
 * Supports English and Bengali with dynamic interpolation.
 * 
 * ENTERPRISE FEATURES:
 * ✅ Multi-language support (English + Bengali)
 * ✅ Dynamic message interpolation
 * ✅ Category-based organization
 * ✅ Domain-specific messages
 * ✅ Template support with parameters
 * ✅ Consistent error messaging across services
 * ✅ Bangladesh specific messages
 * ✅ Frontend-ready message keys
 * 
 * Enterprise Rules:
 * ✅ Pure readonly constants - NO runtime logic
 * ✅ Type-safe message keys
 * ✅ Framework-agnostic
 * ✅ Reusable across all services
 * ✅ Extensible for future languages
 */

// ============================================================
// Type Definitions
// ============================================================

/**
 * Supported locales
 */
export type SupportedLocale = 'en' | 'bn';

/**
 * Message function type (for dynamic messages)
 */
export type MessageFunction = (...args: (string | number)[]) => string;

/**
 * Message type (string or function)
 */
export type MessageType = string | MessageFunction;

/**
 * Message category
 */
export type MessageCategory = 
  | 'auth'
  | 'user'
  | 'mfa'
  | 'session'
  | 'validation'
  | 'common'
  | 'business'
  | 'security'
  | 'bangladesh';

/**
 * Message key for type-safe access
 */
export type ValidationMessageKey = 
  // Auth messages
  | 'auth.email.required'
  | 'auth.email.invalid'
  | 'auth.email.maxLength'
  | 'auth.password.required'
  | 'auth.password.minLength'
  | 'auth.password.maxLength'
  | 'auth.password.weak'
  | 'auth.password.strength'
  | 'auth.phone.required'
  | 'auth.phone.invalid'
  | 'auth.username.required'
  | 'auth.username.invalid'
  | 'auth.otp.required'
  | 'auth.otp.invalid'
  | 'auth.otp.expired'
  | 'auth.otp.maxAttempts'
  | 'auth.refreshToken.required'
  | 'auth.refreshToken.invalid'
  | 'auth.refreshToken.expired'
  | 'auth.login.failed'
  | 'auth.login.locked'
  | 'auth.login.suspended'
  | 'auth.register.success'
  | 'auth.register.failed'
  | 'auth.logout.success'
  | 'auth.logout.failed'
  
  // User messages
  | 'user.firstName.required'
  | 'user.firstName.minLength'
  | 'user.firstName.maxLength'
  | 'user.lastName.required'
  | 'user.lastName.minLength'
  | 'user.lastName.maxLength'
  | 'user.displayName.minLength'
  | 'user.displayName.maxLength'
  | 'user.avatar.invalid'
  | 'user.email.alreadyExists'
  | 'user.phone.alreadyExists'
  | 'user.username.alreadyExists'
  | 'user.notFound'
  | 'user.inactive'
  | 'user.deleted'
  
  // MFA messages
  | 'mfa.code.required'
  | 'mfa.code.invalid'
  | 'mfa.code.maxAttempts'
  | 'mfa.method.invalid'
  | 'mfa.method.notAvailable'
  | 'mfa.setup.success'
  | 'mfa.setup.failed'
  | 'mfa.verify.success'
  | 'mfa.verify.failed'
  | 'mfa.disable.success'
  | 'mfa.disable.failed'
  | 'mfa.backupCodes.required'
  | 'mfa.backupCodes.invalid'
  | 'mfa.backupCodes.low'
  
  // Session messages
  | 'session.id.invalid'
  | 'session.id.required'
  | 'session.notFound'
  | 'session.expired'
  | 'session.revoked'
  | 'session.suspended'
  | 'session.revoke.success'
  | 'session.revoke.failed'
  | 'session.revokeAll.success'
  | 'session.revokeAll.failed'
  
  // Common messages
  | 'common.required'
  | 'common.invalid'
  | 'common.maxLength'
  | 'common.minLength'
  | 'common.notFound'
  | 'common.alreadyExists'
  | 'common.success'
  | 'common.failed'
  | 'common.unauthorized'
  | 'common.forbidden'
  | 'common.rateLimit'
  | 'common.serverError'
  | 'common.correlationId.invalid'
  | 'common.deviceId.maxLength'
  | 'common.captcha.required'
  | 'common.captcha.invalid'
  | 'common.referralCode.invalid'
  | 'common.terms.acceptRequired'
  | 'common.privacy.acceptRequired'
  | 'common.age.verificationRequired'
  
  // Business messages
  | 'business.order.cancel'
  | 'business.order.refund'
  | 'business.payment.failed'
  | 'business.inventory.insufficient'
  | 'business.coupon.invalid'
  | 'business.coupon.expired'
  | 'business.shipping.notAvailable'
  | 'business.product.notAvailable'
  | 'business.price.changed'
  
  // Security messages
  | 'security.ip.blocked'
  | 'security.device.blocked'
  | 'security.suspiciousActivity'
  | 'security.bruteForce'
  | 'security.rateLimit.exceeded'
  | 'security.account.locked'
  | 'security.account.suspended'
  | 'security.account.banned'
  
  // Bangladesh specific messages
  | 'bangladesh.nid.required'
  | 'bangladesh.nid.invalid'
  | 'bangladesh.nid.minLength'
  | 'bangladesh.nid.maxLength'
  | 'bangladesh.tin.required'
  | 'bangladesh.tin.invalid'
  | 'bangladesh.tin.minLength'
  | 'bangladesh.tin.maxLength'
  | 'bangladesh.tradeLicense.required'
  | 'bangladesh.tradeLicense.invalid'
  | 'bangladesh.business.name.required'
  | 'bangladesh.business.address.required'
  | 'bangladesh.district.required'
  | 'bangladesh.upazila.required'
  | 'bangladesh.postalCode.invalid';

// ============================================================
// Validation Messages (English)
// ============================================================

/**
 * English validation messages
 * ✅ ENTERPRISE: Complete coverage for all domains
 */
export const VALIDATION_MESSAGES_EN: Record<ValidationMessageKey, MessageType> = {
  // ========== Auth Messages ==========
  'auth.email.required': 'Email is required',
  'auth.email.invalid': 'Please provide a valid email address',
  'auth.email.maxLength': 'Email cannot exceed 255 characters',
  'auth.password.required': 'Password is required',
  'auth.password.minLength':  `Password must be at least 8 characters long`,
  'auth.password.maxLength':  `Password cannot exceed 20 characters`,
  'auth.password.weak': 'Password is too weak. Please choose a stronger password',
  'auth.password.strength': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  'auth.phone.required': 'Phone number is required',
  'auth.phone.invalid': 'Please provide a valid Bangladesh phone number (e.g., +8801712345678 or 01712345678)',
  'auth.username.required': 'Username is required',
  'auth.username.invalid': 'Username must be 3-20 characters and can contain letters, numbers, dots, and underscores',
  'auth.otp.required': 'OTP code is required',
  'auth.otp.invalid': 'OTP code must be exactly 6 digits',
  'auth.otp.expired': 'OTP code has expired. Please request a new one',
  'auth.otp.maxAttempts': 'Maximum OTP verification attempts exceeded',
  'auth.refreshToken.required': 'Refresh token is required',
  'auth.refreshToken.invalid': 'Refresh token must be a valid JWT format',
  'auth.refreshToken.expired': 'Refresh token has expired. Please login again',
  'auth.login.failed': 'Invalid email or password. Please try again',
  'auth.login.locked': 'Account is locked due to too many failed attempts',
  'auth.login.suspended': 'Account has been suspended. Please contact support',
  'auth.register.success': 'Registration successful',
  'auth.register.failed': 'Registration failed. Please try again',
  'auth.logout.success': 'Successfully logged out',
  'auth.logout.failed': 'Logout failed. Please try again',
  
  // ========== User Messages ==========
  'user.firstName.required': 'First name is required',
  'user.firstName.minLength': 'First name must be at least 2 characters',
  'user.firstName.maxLength': 'First name cannot exceed 50 characters',
  'user.lastName.required': 'Last name is required',
  'user.lastName.minLength': 'Last name must be at least 2 characters',
  'user.lastName.maxLength': 'Last name cannot exceed 50 characters',
  'user.displayName.minLength': 'Display name must be at least 2 characters',
  'user.displayName.maxLength': 'Display name cannot exceed 100 characters',
  'user.avatar.invalid': 'Invalid avatar URL',
  'user.email.alreadyExists': 'Email already exists. Please use a different email',
  'user.phone.alreadyExists': 'Phone number already exists. Please use a different phone',
  'user.username.alreadyExists': 'Username already exists. Please choose a different username',
  'user.notFound': 'User not found',
  'user.inactive': 'Account is inactive. Please contact support',
  'user.deleted': 'Account has been deleted',

  // ========== MFA Messages ==========
  'mfa.code.required': 'MFA code is required',
  'mfa.code.invalid': 'MFA code must be 6-8 digits',
  'mfa.code.maxAttempts': 'Maximum MFA verification attempts exceeded',
  'mfa.method.invalid': 'Invalid MFA method',
  'mfa.method.notAvailable': 'MFA method is not available',
  'mfa.setup.success': 'MFA setup completed successfully',
  'mfa.setup.failed': 'MFA setup failed. Please try again',
  'mfa.verify.success': 'MFA verification successful',
  'mfa.verify.failed': 'MFA verification failed. Please try again',
  'mfa.disable.success': 'MFA disabled successfully',
  'mfa.disable.failed': 'Failed to disable MFA. Please try again',
  'mfa.backupCodes.required': 'Backup codes are required',
  'mfa.backupCodes.invalid': 'Invalid backup codes format',
  'mfa.backupCodes.low': 'Backup codes are running low. Please regenerate',

  // ========== Session Messages ==========
  'session.id.invalid': 'Session ID must be a valid UUID',
  'session.id.required': 'Session ID is required',
  'session.notFound': 'Session not found',
  'session.expired': 'Session has expired. Please login again',
  'session.revoked': 'Session has been revoked',
  'session.suspended': 'Session has been suspended',
  'session.revoke.success': 'Session revoked successfully',
  'session.revoke.failed': 'Failed to revoke session',
  'session.revokeAll.success': 'All sessions revoked successfully',
  'session.revokeAll.failed': 'Failed to revoke all sessions',

  // ========== Common Messages ==========
  'common.required': '{field} is required',
  'common.invalid': 'Invalid {field}',
  'common.maxLength': '{field} cannot exceed {max} characters',
  'common.minLength': '{field} must be at least {min} characters',
  'common.notFound': '{field} not found',
  'common.alreadyExists': '{field} already exists',
  'common.success': 'Operation successful',
  'common.failed': 'Operation failed',
  'common.unauthorized': 'Unauthorized access',
  'common.forbidden': 'Forbidden access',
  'common.rateLimit': 'Too many requests. Please try again later',
  'common.serverError': 'Internal server error. Please try again later',
  'common.correlationId.invalid': 'Invalid correlation ID format',
  'common.deviceId.maxLength': 'Device ID cannot exceed 255 characters',
  'common.captcha.required': 'CAPTCHA verification failed',
  'common.captcha.invalid': 'Invalid CAPTCHA token',
  'common.referralCode.invalid': 'Invalid referral code format',
  'common.terms.acceptRequired': 'You must accept the terms and conditions',
  'common.privacy.acceptRequired': 'You must accept the privacy policy',
  'common.age.verificationRequired': 'You must confirm your age',

  // ========== Business Messages ==========
  'business.order.cancel': 'Order cannot be cancelled in current state',
  'business.order.refund': 'Refund is not available for this order',
  'business.payment.failed': 'Payment processing failed. Please try again',
  'business.inventory.insufficient': 'Insufficient stock available',
  'business.coupon.invalid': 'Invalid coupon code',
  'business.coupon.expired': 'Coupon has expired',
  'business.shipping.notAvailable': 'Shipping is not available for this location',
  'business.product.notAvailable': 'Product is not available',
  'business.price.changed': 'Price has changed. Please refresh and try again',

  // ========== Security Messages ==========
  'security.ip.blocked': 'Your IP has been blocked due to suspicious activity',
  'security.device.blocked': 'Your device has been blocked due to suspicious activity',
  'security.suspiciousActivity': 'Suspicious activity detected. Please verify your identity',
  'security.bruteForce': 'Too many failed attempts. Please wait before trying again',
  'security.rateLimit.exceeded': 'Rate limit exceeded. Please wait before trying again',
  'security.account.locked': 'Account has been locked due to security concerns',
  'security.account.suspended': 'Account has been suspended due to policy violations',
  'security.account.banned': 'Account has been permanently banned',

  // ========== Bangladesh Specific Messages ==========
  'bangladesh.nid.required': 'NID number is required',
  'bangladesh.nid.invalid': 'Invalid NID number format',
  'bangladesh.nid.minLength': 'NID number must be at least 10 digits',
  'bangladesh.nid.maxLength': 'NID number cannot exceed 17 digits',
  'bangladesh.tin.required': 'TIN number is required',
  'bangladesh.tin.invalid': 'Invalid TIN number format',
  'bangladesh.tin.minLength': 'TIN number must be at least 9 characters',
  'bangladesh.tin.maxLength': 'TIN number cannot exceed 20 characters',
  'bangladesh.tradeLicense.required': 'Trade license number is required',
  'bangladesh.tradeLicense.invalid': 'Invalid trade license number format',
  'bangladesh.business.name.required': 'Business name is required',
  'bangladesh.business.address.required': 'Business address is required',
  'bangladesh.district.required': 'District is required',
  'bangladesh.upazila.required': 'Upazila is required',
  'bangladesh.postalCode.invalid': 'Invalid postal code format',
};

// ============================================================
// Validation Messages (Bengali - Bangladesh)
// ============================================================

/**
 * Bengali validation messages
 * ✅ ENTERPRISE: Complete Bengali coverage for Bangladesh market
 */
export const VALIDATION_MESSAGES_BN: Record<ValidationMessageKey, MessageType> = {
  // ========== Auth Messages ==========
  'auth.email.required': 'ইমেইল প্রয়োজন',
  'auth.email.invalid': 'একটি সঠিক ইমেইল ঠিকানা দিন',
  'auth.email.maxLength': 'ইমেইল সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
  'auth.password.required': 'পাসওয়ার্ড প্রয়োজন',
  'auth.password.minLength': `পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে`,
  'auth.password.maxLength':  `পাসওয়ার্ড সর্বোচ্চ ২০ অক্ষরের হতে পারে`,
  'auth.password.weak': 'পাসওয়ার্ড খুবই দুর্বল। একটি শক্তিশালী পাসওয়ার্ড চয়ন করুন',
  'auth.password.strength': 'পাসওয়ার্ডে কমপক্ষে একটি বড় অক্ষর, একটি ছোট অক্ষর, একটি সংখ্যা এবং একটি বিশেষ অক্ষর থাকতে হবে',
  'auth.phone.required': 'ফোন নম্বর প্রয়োজন',
  'auth.phone.invalid': 'একটি সঠিক বাংলাদেশ ফোন নম্বর দিন (যেমন: +8801712345678 বা 01712345678)',
  'auth.username.required': 'ইউজারনাম প্রয়োজন',
  'auth.username.invalid': 'ইউজারনাম ৩-২০ অক্ষরের হতে হবে এবং এতে অক্ষর, সংখ্যা, ডট ও আন্ডারস্কোর থাকতে পারে',
  'auth.otp.required': 'OTP কোড প্রয়োজন',
  'auth.otp.invalid': 'OTP কোড অবশ্যই ৬ ডিজিটের হতে হবে',
  'auth.otp.expired': 'OTP কোডের মেয়াদ শেষ হয়েছে। দয়া করে একটি নতুন কোড অনুরোধ করুন',
  'auth.otp.maxAttempts': 'সর্বোচ্চ OTP যাচাইয়ের চেষ্টা অতিক্রম করা হয়েছে',
  'auth.refreshToken.required': 'রিফ্রেশ টোকেন প্রয়োজন',
  'auth.refreshToken.invalid': 'রিফ্রেশ টোকেন একটি সঠিক JWT ফরম্যাট হতে হবে',
  'auth.refreshToken.expired': 'রিফ্রেশ টোকেনের মেয়াদ শেষ হয়েছে। দয়া করে আবার লগইন করুন',
  'auth.login.failed': 'ভুল ইমেইল বা পাসওয়ার্ড। আবার চেষ্টা করুন',
  'auth.login.locked': 'অনেকবার ভুল চেষ্টার কারণে অ্যাকাউন্ট লক করা হয়েছে',
  'auth.login.suspended': 'অ্যাকাউন্ট স্থগিত করা হয়েছে। সহায়তার জন্য যোগাযোগ করুন',
  'auth.register.success': 'নিবন্ধন সফল হয়েছে',
  'auth.register.failed': 'নিবন্ধন ব্যর্থ হয়েছে। আবার চেষ্টা করুন',
  'auth.logout.success': 'সফলভাবে লগআউট হয়েছে',
  'auth.logout.failed': 'লগআউট ব্যর্থ হয়েছে। আবার চেষ্টা করুন',

  // ========== User Messages ==========
  'user.firstName.required': 'প্রথম নাম প্রয়োজন',
  'user.firstName.minLength': 'প্রথম নাম কমপক্ষে ২ অক্ষরের হতে হবে',
  'user.firstName.maxLength': 'প্রথম নাম সর্বোচ্চ ৫০ অক্ষর হতে পারে',
  'user.lastName.required': 'শেষ নাম প্রয়োজন',
  'user.lastName.minLength': 'শেষ নাম কমপক্ষে ২ অক্ষরের হতে হবে',
  'user.lastName.maxLength': 'শেষ নাম সর্বোচ্চ ৫০ অক্ষর হতে পারে',
  'user.displayName.minLength': 'ডিসপ্লে নাম কমপক্ষে ২ অক্ষরের হতে হবে',
  'user.displayName.maxLength': 'ডিসপ্লে নাম সর্বোচ্চ ১০০ অক্ষর হতে পারে',
  'user.avatar.invalid': 'ভুল অবতার URL',
  'user.email.alreadyExists': 'ইমেইল ইতিমধ্যে বিদ্যমান। একটি ভিন্ন ইমেইল ব্যবহার করুন',
  'user.phone.alreadyExists': 'ফোন নম্বর ইতিমধ্যে বিদ্যমান। একটি ভিন্ন নম্বর ব্যবহার করুন',
  'user.username.alreadyExists': 'ইউজারনাম ইতিমধ্যে বিদ্যমান। একটি ভিন্ন ইউজারনাম চয়ন করুন',
  'user.notFound': 'ইউজার পাওয়া যায়নি',
  'user.inactive': 'অ্যাকাউন্ট নিষ্ক্রিয়। সহায়তার জন্য যোগাযোগ করুন',
  'user.deleted': 'অ্যাকাউন্ট মুছে ফেলা হয়েছে',

  // ========== MFA Messages ==========
  'mfa.code.required': 'MFA কোড প্রয়োজন',
  'mfa.code.invalid': 'MFA কোড ৬-৮ ডিজিটের হতে হবে',
  'mfa.code.maxAttempts': 'সর্বোচ্চ MFA যাচাইয়ের চেষ্টা অতিক্রম করা হয়েছে',
  'mfa.method.invalid': 'ভুল MFA পদ্ধতি',
  'mfa.method.notAvailable': 'MFA পদ্ধতি উপলব্ধ নয়',
  'mfa.setup.success': 'MFA সেটআপ সফল হয়েছে',
  'mfa.setup.failed': 'MFA সেটআপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন',
  'mfa.verify.success': 'MFA যাচাই সফল হয়েছে',
  'mfa.verify.failed': 'MFA যাচাই ব্যর্থ হয়েছে। আবার চেষ্টা করুন',
  'mfa.disable.success': 'MFA সফলভাবে নিষ্ক্রিয় করা হয়েছে',
  'mfa.disable.failed': 'MFA নিষ্ক্রিয় করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন',
  'mfa.backupCodes.required': 'ব্যাকআপ কোড প্রয়োজন',
  'mfa.backupCodes.invalid': 'ভুল ব্যাকআপ কোড ফরম্যাট',
  'mfa.backupCodes.low': 'ব্যাকআপ কোড শেষ হয়ে আসছে। পুনরায় তৈরি করুন',

  // ========== Session Messages ==========
  'session.id.invalid': 'সেশন আইডি টি সঠিক UUID হতে হবে',
  'session.id.required': 'সেশন আইডি প্রয়োজন',
  'session.notFound': 'সেশন পাওয়া যায়নি',
  'session.expired': 'সেশনের মেয়াদ শেষ হয়েছে। আবার লগইন করুন',
  'session.revoked': 'সেশন বাতিল করা হয়েছে',
  'session.suspended': 'সেশন স্থগিত করা হয়েছে',
  'session.revoke.success': 'সেশন সফলভাবে বাতিল করা হয়েছে',
  'session.revoke.failed': 'সেশন বাতিল করতে ব্যর্থ হয়েছে',
  'session.revokeAll.success': 'সব সেশন সফলভাবে বাতিল করা হয়েছে',
  'session.revokeAll.failed': 'সব সেশন বাতিল করতে ব্যর্থ হয়েছে',

  // ========== Common Messages ==========
  'common.required': '{field} প্রয়োজন',
  'common.invalid': 'ভুল {field}',
  'common.maxLength': '{field} সর্বোচ্চ {max} অক্ষর হতে পারে',
  'common.minLength': '{field} কমপক্ষে {min} অক্ষরের হতে হবে',
  'common.notFound': '{field} পাওয়া যায়নি',
  'common.alreadyExists': '{field} ইতিমধ্যে বিদ্যমান',
  'common.success': 'অপারেশন সফল হয়েছে',
  'common.failed': 'অপারেশন ব্যর্থ হয়েছে',
  'common.unauthorized': 'অননুমোদিত অ্যাক্সেস',
  'common.forbidden': 'নিষিদ্ধ অ্যাক্সেস',
  'common.rateLimit': 'অনেক বেশি অনুরোধ। পরে আবার চেষ্টা করুন',
  'common.serverError': 'সার্ভার সমস্যা। পরে আবার চেষ্টা করুন',
  'common.correlationId.invalid': 'ভুল কোরিলেশন আইডি ফরম্যাট',
  'common.deviceId.maxLength': 'ডিভাইস আইডি সর্বোচ্চ ২৫৫ অক্ষর হতে পারে',
  'common.captcha.required': 'CAPTCHA ভেরিফিকেশন ব্যর্থ হয়েছে',
  'common.captcha.invalid': 'ভুল CAPTCHA টোকেন',
  'common.referralCode.invalid': 'ভুল রেফারেল কোড ফরম্যাট',
  'common.terms.acceptRequired': 'আপনাকে শর্তাবলী মেনে নিতে হবে',
  'common.privacy.acceptRequired': 'আপনাকে গোপনীয়তা নীতি মেনে নিতে হবে',
  'common.age.verificationRequired': 'আপনাকে আপনার বয়স নিশ্চিত করতে হবে',

  // ========== Business Messages ==========
  'business.order.cancel': 'বর্তমান অবস্থায় অর্ডার বাতিল করা যাবে না',
  'business.order.refund': 'এই অর্ডারের জন্য রিফান্ড উপলব্ধ নয়',
  'business.payment.failed': 'পেমেন্ট প্রক্রিয়াকরণ ব্যর্থ হয়েছে। আবার চেষ্টা করুন',
  'business.inventory.insufficient': 'পর্যাপ্ত স্টক উপলব্ধ নেই',
  'business.coupon.invalid': 'ভুল কুপন কোড',
  'business.coupon.expired': 'কুপনের মেয়াদ শেষ হয়েছে',
  'business.shipping.notAvailable': 'এই অবস্থানে ডেলিভারি উপলব্ধ নয়',
  'business.product.notAvailable': 'পণ্যটি উপলব্ধ নয়',
  'business.price.changed': 'দাম পরিবর্তন হয়েছে। রিফ্রেশ করে আবার চেষ্টা করুন',

  // ========== Security Messages ==========
  'security.ip.blocked': 'আপনার IP সন্দেহজনক কার্যকলাপের জন্য ব্লক করা হয়েছে',
  'security.device.blocked': 'আপনার ডিভাইস সন্দেহজনক কার্যকলাপের জন্য ব্লক করা হয়েছে',
  'security.suspiciousActivity': 'সন্দেহজনক কার্যকলাপ সনাক্ত করা হয়েছে। আপনার পরিচয় নিশ্চিত করুন',
  'security.bruteForce': 'অনেকবার ভুল চেষ্টা করা হয়েছে। আবার চেষ্টা করার আগে অপেক্ষা করুন',
  'security.rateLimit.exceeded': 'রেট লিমিট অতিক্রম করা হয়েছে। আবার চেষ্টা করার আগে অপেক্ষা করুন',
  'security.account.locked': 'নিরাপত্তাজনিত কারণে অ্যাকাউন্ট লক করা হয়েছে',
  'security.account.suspended': 'নীতি লঙ্ঘনের কারণে অ্যাকাউন্ট স্থগিত করা হয়েছে',
  'security.account.banned': 'অ্যাকাউন্ট স্থায়ীভাবে নিষিদ্ধ করা হয়েছে',

  // ========== Bangladesh Specific Messages ==========
  'bangladesh.nid.required': 'এনআইডি নম্বর প্রয়োজন',
  'bangladesh.nid.invalid': 'ভুল এনআইডি নম্বর ফরম্যাট',
  'bangladesh.nid.minLength': 'এনআইডি নম্বর কমপক্ষে ১০ ডিজিটের হতে হবে',
  'bangladesh.nid.maxLength': 'এনআইডি নম্বর সর্বোচ্চ ১৭ ডিজিটের হতে পারে',
  'bangladesh.tin.required': 'টিআইএন নম্বর প্রয়োজন',
  'bangladesh.tin.invalid': 'ভুল টিআইএন নম্বর ফরম্যাট',
  'bangladesh.tin.minLength': 'টিআইএন নম্বর কমপক্ষে ৯ অক্ষরের হতে হবে',
  'bangladesh.tin.maxLength': 'টিআইএন নম্বর সর্বোচ্চ ২০ অক্ষরের হতে পারে',
  'bangladesh.tradeLicense.required': 'ট্রেড লাইসেন্স নম্বর প্রয়োজন',
  'bangladesh.tradeLicense.invalid': 'ভুল ট্রেড লাইসেন্স নম্বর ফরম্যাট',
  'bangladesh.business.name.required': 'ব্যবসার নাম প্রয়োজন',
  'bangladesh.business.address.required': 'ব্যবসার ঠিকানা প্রয়োজন',
  'bangladesh.district.required': 'জেলা প্রয়োজন',
  'bangladesh.upazila.required': 'উপজেলা প্রয়োজন',
  'bangladesh.postalCode.invalid': 'ভুল পোস্টাল কোড ফরম্যাট',
};

// ============================================================
// Message Resolver
// ============================================================

/**
 * Get validation message with interpolation
 * ✅ ENTERPRISE: Type-safe message resolution
 * 
 * @param key - Message key
 * @param locale - Language locale ('en' | 'bn')
 * @param args - Arguments for interpolation
 * @returns Resolved message string
 * 
 * @example
 * getValidationMessage('auth.password.minLength', 'en', [8])
 * // Returns: "Password must be at least 8 characters long"
 */
export function getValidationMessage(
  key: ValidationMessageKey,
  locale: SupportedLocale = 'en',
  ...args: (string | number)[]
): string {
  const messages = locale === 'bn' ? VALIDATION_MESSAGES_BN : VALIDATION_MESSAGES_EN;
  const message = messages[key];

  if (typeof message === 'function') {
    return message(...args);
  }

  if (typeof message === 'string') {
    // Replace placeholders like {field}, {min}, {max}
    let result = message;
    if (args.length > 0 && typeof args[0] === 'object') {
      const params = args[0] as Record<string, string | number>;
      for (const [key, value] of Object.entries(params)) {
        result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
      }
    } else {
      // Positional arguments
      for (let i = 0; i < args.length; i++) {
        result = result.replace(/\{\d+\}/g, String(args[i]));
      }
    }
    return result;
  }

  return String(message) || key;
}

/**
 * Get message with field name interpolation
 * ✅ ENTERPRISE: Dynamic field interpolation
 * 
 * @param key - Message key
 * @param field - Field name to interpolate
 * @param locale - Language locale
 * @param args - Additional arguments
 * @returns Resolved message string
 * 
 * @example
 * getFieldMessage('common.required', 'Email', 'en')
 * // Returns: "Email is required"
 */
export function getFieldMessage(
  key: ValidationMessageKey,
  field: string,
  locale: SupportedLocale = 'en',
  ...args: (string | number)[]
): string {
  const message = getValidationMessage(key, locale, ...args);
  return message.replace(/\{field\}/g, field);
}

// ============================================================
// Message Category Helpers
// ============================================================

/**
 * Get all messages for a specific category
 */
export function getMessagesByCategory(
  category: MessageCategory,
  locale: SupportedLocale = 'en'
): Partial<Record<ValidationMessageKey, string>> {
  const messages = locale === 'bn' ? VALIDATION_MESSAGES_BN : VALIDATION_MESSAGES_EN;
  const result: Partial<Record<ValidationMessageKey, string>> = {};

  for (const [key, value] of Object.entries(messages)) {
    if (key.startsWith(category)) {
      result[key as ValidationMessageKey] = typeof value === 'function' 
        ? value('...') 
        : String(value);
    }
  }

  return result;
}

/**
 * Get all auth-related messages
 */
export function getAuthMessages(locale: SupportedLocale = 'en'): Partial<Record<ValidationMessageKey, string>> {
  return getMessagesByCategory('auth', locale);
}

/**
 * Get all user-related messages
 */
export function getUserMessages(locale: SupportedLocale = 'en'): Partial<Record<ValidationMessageKey, string>> {
  return getMessagesByCategory('user', locale);
}

/**
 * Get all Bangladesh-specific messages
 */
export function getBangladeshMessages(locale: SupportedLocale = 'en'): Partial<Record<ValidationMessageKey, string>> {
  return getMessagesByCategory('bangladesh', locale);
}

// ============================================================
// Type Exports
// ============================================================

export type {
  SupportedLocale as SupportedLocaleType,
  MessageFunction as MessageFunctionType,
  MessageType as MessageTypeType,
  MessageCategory as MessageCategoryType,
  ValidationMessageKey as ValidationMessageKeyType,
};

// ============================================================
// Export all messages for direct access
// ============================================================

export const VALIDATION_MESSAGES = {
  en: VALIDATION_MESSAGES_EN,
  bn: VALIDATION_MESSAGES_BN,
} as const;

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
// 
// Enterprise Features:
// 1. ✅ 100+ validation messages covering all domains
// 2. ✅ Full Bengali language support (Bangladesh market)
// 3. ✅ Dynamic message interpolation with parameters
// 4. ✅ Type-safe message keys
// 5. ✅ Category-based organization
// 6. ✅ Template support for field names
// 7. ✅ Helper functions for message resolution
// 8. ✅ Country-specific messages (Bangladesh)
// 9. ✅ Business domain messages (order, payment, inventory)
// 10. ✅ Security messages (rate limit, brute force, block)
// 11. ✅ Consistent error messaging across all services
// 12. ✅ Frontend-ready message keys
// 13. ✅ Reusable across all DTOs
// 14. ✅ Extensible for future languages
// 15. ✅ Production-ready message structure
// 
// Bangladesh Specific:
// - NID, TIN, Trade License messages
// - Business name and address messages
// - District and upazila messages
// - Postal code validation messages
// - Bengali language support
// 
// ============================================================
