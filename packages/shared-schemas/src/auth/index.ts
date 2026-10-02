// shared-schemas/auth/index.ts
// Auth domain barrel export — FINAL

// Base schemas
export * from './auth.schema.js';
export * from './auth-status.schema.js';
export * from './auth-type.schema.js';
export * from './auth-provider.schema.js';
export * from './auth-method.schema.js';
export * from './auth-permission.schema.js';
export * from './auth-role.schema.js';
export * from './auth-session.schema.js';
export * from './auth-token.schema.js';
export * from './auth-verification.schema.js';
export * from './auth-password.schema.js';
export * from './auth-mfa.schema.js';
export * from './auth-login-attempt.schema.js';
export * from './auth-device.schema.js';
export * from './auth-social.schema.js';
export * from './auth-oauth.schema.js';
export * from './auth-sso.schema.js';

// Request schemas
export * from './login-request.schema.js';
export * from './register-request.schema.js';
export * from './refresh-request.schema.js';
export * from './logout-request.schema.js';
export * from './forgot-password.schema.js';
export * from './reset-password.schema.js';
export * from './verify-email.schema.js';
export * from './verify-mfa.schema.js';
export * from './enable-mfa.schema.js';
export * from './social-login.schema.js';

// Response schemas
export * from './login-response.schema.js';
export * from './register-response.schema.js';
export * from './refresh-response.schema.js';
export * from './mfa-response.schema.js';
export * from './session-response.schema.js';
export * from './logout-response.schema.js';
