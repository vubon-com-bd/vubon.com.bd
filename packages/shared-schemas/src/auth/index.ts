// shared-schemas/auth/index.ts
// Auth domain barrel export — FINAL

// Base schemas
export * from './auth.schema';
export * from './auth-status.schema';
export * from './auth-type.schema';
export * from './auth-provider.schema';
export * from './auth-method.schema';
export * from './auth-permission.schema';
export * from './auth-role.schema';
export * from './auth-session.schema';
export * from './auth-token.schema';
export * from './auth-verification.schema';
export * from './auth-password.schema';
export * from './auth-mfa.schema';
export * from './auth-login-attempt.schema';
export * from './auth-device.schema';
export * from './auth-social.schema';
export * from './auth-oauth.schema';
export * from './auth-sso.schema';

// Request schemas
export * from './login-request.schema';
export * from './register-request.schema';
export * from './refresh-request.schema';
export * from './logout-request.schema';
export * from './forgot-password.schema';
export * from './reset-password.schema';
export * from './verify-email.schema';
export * from './verify-mfa.schema';
export * from './enable-mfa.schema';
export * from './social-login.schema';

// Response schemas
export * from './login-response.schema';
export * from './register-response.schema';
export * from './refresh-response.schema';
export * from './mfa-response.schema';
export * from './session-response.schema';
export * from './logout-response.schema';
