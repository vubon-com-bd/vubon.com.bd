/**
 * Services Index - Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/index
 * 
 * @description
 * Central export point for all service interfaces and implementations.
 * NO business logic, NO initialization, ONLY re-exports.
 * 
 * Enterprise Rules:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO functions, NO side effects
 * ✅ Framework-free exports
 */

// ============================================================
// Service Interfaces
// ============================================================

// Auth Service
export * from './interfaces/auth.service.interface';

// User Service
export * from './interfaces/user.service.interface';

// Session Service
export * from './interfaces/session.service.interface';

// MFA Service
export * from './interfaces/mfa.service.interface';

// Utility Services
export * from './interfaces/audit.service.interface';
export * from './interfaces/cache.service.interface';
export * from './interfaces/event-bus.interface';
export * from './interfaces/token-generator.interface';
export * from './interfaces/password-hasher.interface';
export * from './interfaces/mfa-generator.interface';
export * from './interfaces/notification.service.interface';

// ============================================================
// Service Implementations
// ============================================================

export * from './impl/auth.service.impl';
export * from './impl/user.service.impl';
export * from './impl/session.service.impl';
export * from './impl/mfa.service.impl';

// ============================================================
// Infrastructure Abstractions (used by services)
// ============================================================

export type {
  PasswordHasher,
  TokenGenerator,
  EventBus,
  TransactionManager,
  CacheService,
  IdGenerator,
  DeviceInfo,
  MfaGenerator,
  SessionService as SessionServiceInterface,
  NotificationService
} from './impl/infrastructure.interface';

// ============================================================
// Re-export common types
// ============================================================

export type { 
  DeviceInfo as DeviceInfoType,
  SessionStatistics as SessionStatisticsType,
  GlobalSessionStatistics as GlobalSessionStatisticsType,
  MFALockStatus as MFALockStatusType,
  MFARecoveryOptions as MFARecoveryOptionsType,
  MFAStatistics as MFAStatisticsType,
  TokenPairResponse as TokenPairResponseType,
  TokenVerificationResult as TokenVerificationResultType,
  PasswordStrengthResult as PasswordStrengthResultType,
  BreachCheckResult as BreachCheckResultType,
  NotificationResult as NotificationResultType,
  AuditStatistics as AuditStatisticsType,
  AuditLogEntry as AuditLogEntryType
} from './interfaces';

// ============================================================
// Utility Types for Service Configuration
// ============================================================

export interface ServiceConfig {
  /** Enable/disable service features */
  enabled: boolean;
  
  /** Service timeout in milliseconds */
  timeoutMs?: number;
  
  /** Retry configuration */
  retry?: {
    maxAttempts: number;
    delayMs: number;
    backoffMultiplier?: number;
  };
  
  /** Circuit breaker configuration */
  circuitBreaker?: {
    enabled: boolean;
    failureThreshold: number;
    timeoutMs: number;
    resetTimeoutMs: number;
  };
}

export interface AuthServiceConfig extends ServiceConfig {
  /** JWT configuration */
  jwt: {
    accessTokenExpiry: string;
    refreshTokenExpiry: string;
    issuer: string;
    audience: string;
  };
  
  /** Rate limiting */
  rateLimit: {
    login: { maxAttempts: number; windowMs: number };
    register: { maxAttempts: number; windowMs: number };
    passwordReset: { maxAttempts: number; windowMs: number };
  };
  
  /** Password policy */
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
}

export interface MFAServiceConfig extends ServiceConfig {
  /** TOTP settings */
  totp: {
    issuer: string;
    algorithm: string;
    digits: number;
    period: number;
    window: number;
  };
  
  /** Backup codes */
  backupCodes: {
    count: number;
    length: number;
  };
  
  /** Lockout settings */
  lockout: {
    maxAttempts: number;
    durationMinutes: number;
  };
}

// ============================================================
// Service Factory Interface
// ============================================================

export interface ServiceFactory {
  /** Create auth service instance */
  createAuthService(config: AuthServiceConfig): AuthService;
  
  /** Create user service instance */
  createUserService(config: ServiceConfig): UserService;
  
  /** Create session service instance */
  createSessionService(config: ServiceConfig): SessionService;
  
  /** Create MFA service instance */
  createMfaService(config: MFAServiceConfig): MfaService;
  
  /** Create audit service instance */
  createAuditService(config: ServiceConfig): AuditService;
  
  /** Create cache service instance */
  createCacheService(config: ServiceConfig): CacheService;
  
  /** Create notification service instance */
  createNotificationService(config: ServiceConfig): NotificationService;
}

// ============================================================
// Service Provider Tokens (for DI containers)
// ============================================================

export const AUTH_SERVICE = 'AUTH_SERVICE';
export const USER_SERVICE = 'USER_SERVICE';
export const SESSION_SERVICE = 'SESSION_SERVICE';
export const MFA_SERVICE = 'MFA_SERVICE';
export const AUDIT_SERVICE = 'AUDIT_SERVICE';
export const CACHE_SERVICE = 'CACHE_SERVICE';
export const NOTIFICATION_SERVICE = 'NOTIFICATION_SERVICE';
export const EVENT_BUS = 'EVENT_BUS';
export const TOKEN_GENERATOR = 'TOKEN_GENERATOR';
export const PASSWORD_HASHER = 'PASSWORD_HASHER';
export const MFA_GENERATOR = 'MFA_GENERATOR';
export const ID_GENERATOR = 'ID_GENERATOR';

// ============================================================
// Type Exports
// ============================================================

export type { 
  AuthServiceConfig as AuthServiceConfigType,
  MFAServiceConfig as MFAServiceConfigType,
  ServiceConfig as ServiceConfigType,
  ServiceFactory as ServiceFactoryType
};
