/**
 * AUTH SERVICE — API DOCUMENTATION
 * @module auth-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  🌐 REST API — Base URL
 * ══════════════════════════════════════════════════════════════════
 *
 *  Development:  http://localhost:3001/api/v1
 *  Production:   https://auth.vubon.com.bd/api/v1
 *  Swagger:      /api/docs
 *
 *  Auth: Bearer JWT in Authorization header
 *  Content-Type: application/json
 */

export const API_BASE = {
  dev: 'http://localhost:3001/api/v1',
  prod: 'https://auth.vubon.com.bd/api/v1',
  swagger: '/api/docs',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  LOCKED: 423,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔐 AUTH ENDPOINTS (Core)
 * ══════════════════════════════════════════════════════════════════
 *
 *  POST /auth/login               — Login with email/phone + password
 *  POST /auth/register            — Register new user
 *  POST /auth/refresh             — Refresh access token
 *  POST /auth/logout              — Logout (revoke session)
 *  POST /auth/forgot-password     — Request password reset
 *  POST /auth/reset-password      — Reset with token
 *  POST /auth/verify-email        — Verify email with code
 *  POST /auth/resend-verification — Resend verification code
 */

export const AUTH_ENDPOINTS = {
  login: {
    method: 'POST',
    path: '/auth/login',
    body: { identifier: 'string', password: 'string', rememberMe: 'boolean?', deviceId: 'string?' },
    returns: 'LoginResponseDTO',
    errors: [401, 423, 429],
  },
  register: {
    method: 'POST',
    path: '/auth/register',
    body: {
      email: 'string',
      password: 'string',
      confirmPassword: 'string',
      firstName: 'string?',
      lastName: 'string?',
      acceptTerms: 'boolean',
    },
    returns: 'RegisterResponseDTO',
    errors: [400, 409],
  },
  refresh: {
    method: 'POST',
    path: '/auth/refresh',
    body: { refreshToken: 'string', deviceId: 'string?' },
    returns: 'AuthTokenResponseDTO',
    errors: [401],
  },
  logout: {
    method: 'POST',
    path: '/auth/logout',
    auth: true,
    body: { sessionId: 'string?' },
    returns: 'void',
    errors: [401],
  },
  forgotPassword: {
    method: 'POST',
    path: '/auth/forgot-password',
    body: { identifier: 'string' },
    returns: 'void',
    errors: [400],
  },
  resetPassword: {
    method: 'POST',
    path: '/auth/reset-password',
    body: { token: 'string', newPassword: 'string', confirmPassword: 'string' },
    returns: 'void',
    errors: [400, 401],
  },
  verifyEmail: {
    method: 'POST',
    path: '/auth/verify-email',
    body: { email: 'string', code: 'string' },
    returns: 'void',
    errors: [400, 401],
  },
  resendVerification: {
    method: 'POST',
    path: '/auth/resend-verification',
    body: { identifier: 'string', channel: 'email|phone?' },
    returns: 'void',
    errors: [400],
  },
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔒 MFA + RECOVERY + LOCK ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  POST   /auth/mfa/enable            — Begin MFA enrollment
 *  DELETE /auth/mfa/disable           — Disable MFA
 *  POST   /auth/mfa/verify            — Verify MFA code
 *  GET    /auth/mfa/status            — Get MFA status
 *
 *  POST   /auth/recovery-codes/generate — Generate recovery codes
 *  POST   /auth/recovery-codes/recover  — Recover account
 *  GET    /auth/recovery-codes          — List recovery codes
 *
 *  POST   /auth/account-lock/lock       — Lock account (admin)
 *  POST   /auth/account-lock/unlock     — Unlock account
 *  GET    /auth/account-lock/me         — Get lock status
 *
 *  GET    /auth/login-attempts          — List login attempts
 *  GET    /auth/sessions/me             — List my sessions
 *  GET    /auth/sessions/:id            — Get session
 *  DELETE /auth/sessions/:id            — Revoke session
 *  GET    /auth/tokens                  — List active tokens
 *  GET    /auth/devices                 — List devices
 *  GET    /auth/devices/:id             — Get device
 */

export const MFA_ENDPOINTS = {
  enableMfa: { method: 'POST', path: '/auth/mfa/enable', auth: true },
  disableMfa: { method: 'DELETE', path: '/auth/mfa/disable', auth: true },
  verifyMfa: { method: 'POST', path: '/auth/mfa/verify', auth: true },
  mfaStatus: { method: 'GET', path: '/auth/mfa/status', auth: true },
} as const;

export const RECOVERY_ENDPOINTS = {
  generateCodes: { method: 'POST', path: '/auth/recovery-codes/generate', auth: true },
  recover: { method: 'POST', path: '/auth/recovery-codes/recover' },
  listCodes: { method: 'GET', path: '/auth/recovery-codes', auth: true },
} as const;

export const LOCK_ENDPOINTS = {
  lock: { method: 'POST', path: '/auth/account-lock/lock', auth: true },
  unlock: { method: 'POST', path: '/auth/account-lock/unlock', auth: true },
  myStatus: { method: 'GET', path: '/auth/account-lock/me', auth: true },
} as const;

export const SESSION_ENDPOINTS = {
  listMine: { method: 'GET', path: '/auth/sessions/me', auth: true },
  get: { method: 'GET', path: '/auth/sessions/:id', auth: true },
  revoke: { method: 'DELETE', path: '/auth/sessions/:id', auth: true },
} as const;

export const DEVICE_ENDPOINTS = {
  list: { method: 'GET', path: '/auth/devices', auth: true },
  get: { method: 'GET', path: '/auth/devices/:id', auth: true },
} as const;

export const LOGIN_ATTEMPT_ENDPOINTS = {
  list: { method: 'GET', path: '/auth/login-attempts', auth: true },
  listTokens: { method: 'GET', path: '/auth/tokens', auth: true },
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  🌍 SOCIAL / OAUTH / SSO ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  POST   /auth/social/login      — Initiate social login
 *  POST   /auth/social/callback   — Handle social callback
 *  POST   /auth/social/link       — Link social account
 *  DELETE /auth/social/unlink     — Unlink social account
 *
 *  GET    /auth/oauth/authorize   — OAuth authorize redirect
 *  POST   /auth/oauth/callback    — OAuth callback
 *
 *  POST   /auth/sso/login         — SSO login initiate
 *  POST   /auth/sso/callback      — SSO callback
 *
 *  POST   /auth/2fa/enable        — Enable 2FA
 *  DELETE /auth/2fa/disable       — Disable 2FA
 *  GET    /auth/2fa/status        — Get 2FA status
 *
 *  POST   /auth/biometric/enable  — Enroll biometric
 *  DELETE /auth/biometric/disable — Remove biometric
 *  POST   /auth/biometric/verify  — Verify biometric
 *
 *  GET    /auth/permissions       — List permissions
 *  GET    /auth/roles             — List roles
 *  GET    /auth/settings          — Get auth settings
 *  PUT    /auth/settings          — Update auth settings
 *  GET    /auth/preferences       — Get preferences
 *  PUT    /auth/preferences       — Update preferences
 */

export const SOCIAL_ENDPOINTS = {
  login: { method: 'POST', path: '/auth/social/login' },
  callback: { method: 'POST', path: '/auth/social/callback' },
  link: { method: 'POST', path: '/auth/social/link', auth: true },
  unlink: { method: 'DELETE', path: '/auth/social/unlink', auth: true },
} as const;

export const OAUTH_ENDPOINTS = {
  authorize: { method: 'GET', path: '/auth/oauth/authorize' },
  callback: { method: 'POST', path: '/auth/oauth/callback' },
} as const;

export const SSO_ENDPOINTS = {
  login: { method: 'POST', path: '/auth/sso/login' },
  callback: { method: 'POST', path: '/auth/sso/callback' },
} as const;

export const TWO_FA_ENDPOINTS = {
  enable: { method: 'POST', path: '/auth/2fa/enable', auth: true },
  disable: { method: 'DELETE', path: '/auth/2fa/disable', auth: true },
  status: { method: 'GET', path: '/auth/2fa/status', auth: true },
} as const;

export const BIOMETRIC_ENDPOINTS = {
  enable: { method: 'POST', path: '/auth/biometric/enable', auth: true },
  disable: { method: 'DELETE', path: '/auth/biometric/disable', auth: true },
  verify: { method: 'POST', path: '/auth/biometric/verify' },
} as const;

export const PERMISSION_ENDPOINTS = {
  permissions: { method: 'GET', path: '/auth/permissions', auth: true },
  roles: { method: 'GET', path: '/auth/roles', auth: true },
} as const;

export const SETTINGS_ENDPOINTS = {
  getSettings: { method: 'GET', path: '/auth/settings', auth: true },
  updateSettings: { method: 'PUT', path: '/auth/settings', auth: true },
  getPreferences: { method: 'GET', path: '/auth/preferences', auth: true },
  updatePreferences: { method: 'PUT', path: '/auth/preferences', auth: true },
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  👤 USER ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  POST   /users                  — Create user (admin)
 *  GET    /users                  — List users (admin)
 *  GET    /users/:id              — Get user
 *  PUT    /users/:id              — Update user
 *  DELETE /users/:id              — Delete user (soft)
 *
 *  GET    /users/profile          — Get own profile
 *  PUT    /users/profile          — Update profile
 *
 *  GET    /users/settings         — Get settings
 *  PUT    /users/settings         — Update settings
 *
 *  GET    /users/preferences      — Get preferences
 *  PUT    /users/preferences      — Update preferences
 *
 *  GET    /users/addresses        — List addresses
 *  POST   /users/addresses        — Add address
 *  GET    /users/addresses/:id    — Get address
 *  PUT    /users/addresses/:id    — Update address
 *  DELETE /users/addresses/:id    — Delete address
 *
 *  GET    /users/contacts         — List contacts
 *  POST   /users/contacts         — Add contact
 *  GET    /users/contacts/:id     — Get contact
 *  PUT    /users/contacts         — Update contact
 *  DELETE /users/contacts/:id     — Delete contact
 *
 *  GET    /users/verification/:type/status — Get verification status
 *  GET    /users/kyc/me           — Get own KYC status
 *  POST   /users/kyc/submit       — Submit KYC
 *  POST   /users/kyc/verify       — Approve KYC
 *  POST   /users/kyc/reject       — Reject KYC
 *
 *  GET    /users/activity         — List activities
 *  GET    /users/permissions/:userId — List user permissions
 *  GET    /users/roles/:userId    — List user roles
 */

export const USER_ENDPOINTS = {
  create: { method: 'POST', path: '/users', auth: true },
  list: { method: 'GET', path: '/users', auth: true },
  get: { method: 'GET', path: '/users/:id', auth: true },
  update: { method: 'PUT', path: '/users/:id', auth: true },
  remove: { method: 'DELETE', path: '/users/:id', auth: true },
} as const;

export const PROFILE_ENDPOINTS = {
  get: { method: 'GET', path: '/users/profile', auth: true },
  update: { method: 'PUT', path: '/users/profile', auth: true },
} as const;

export const USER_SETTINGS_ENDPOINTS = {
  get: { method: 'GET', path: '/users/settings', auth: true },
  update: { method: 'PUT', path: '/users/settings', auth: true },
  getPreferences: { method: 'GET', path: '/users/preferences', auth: true },
  updatePreferences: { method: 'PUT', path: '/users/preferences', auth: true },
} as const;

export const ADDRESS_ENDPOINTS = {
  list: { method: 'GET', path: '/users/addresses', auth: true },
  add: { method: 'POST', path: '/users/addresses', auth: true },
  get: { method: 'GET', path: '/users/addresses/:id', auth: true },
  update: { method: 'PUT', path: '/users/addresses/:id', auth: true },
  remove: { method: 'DELETE', path: '/users/addresses/:id', auth: true },
} as const;

export const CONTACT_ENDPOINTS = {
  list: { method: 'GET', path: '/users/contacts', auth: true },
  add: { method: 'POST', path: '/users/contacts', auth: true },
  get: { method: 'GET', path: '/users/contacts/:id', auth: true },
  update: { method: 'PUT', path: '/users/contacts', auth: true },
  remove: { method: 'DELETE', path: '/users/contacts/:id', auth: true },
} as const;

export const KYC_ENDPOINTS = {
  myStatus: { method: 'GET', path: '/users/kyc/me', auth: true },
  submit: { method: 'POST', path: '/users/kyc/submit', auth: true },
  verify: { method: 'POST', path: '/users/kyc/verify', auth: true },
  reject: { method: 'POST', path: '/users/kyc/reject', auth: true },
} as const;

export const USER_EXTRA_ENDPOINTS = {
  verificationStatus: { method: 'GET', path: '/users/verification/:type/status', auth: true },
  activity: { method: 'GET', path: '/users/activity', auth: true },
  permissions: { method: 'GET', path: '/users/permissions/:userId', auth: true },
  roles: { method: 'GET', path: '/users/roles/:userId', auth: true },
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  📝 REQUEST/RESPONSE EXAMPLES
 * ══════════════════════════════════════════════════════════════════
 *
 *  Example: Login
 *  ─────────────────────────────────────────────────────────────
 *  POST /api/v1/auth/login
 *  Content-Type: application/json
 *
 *  {
 *    "identifier": "john@example.com",
 *    "password": "Test1234!",
 *    "rememberMe": true
 *  }
 *
 *  Response 200:
 *  {
 *    "success": true,
 *    "user": {
 *      "id": "uuid-1",
 *      "email": "john@example.com",
 *      "name": "John Doe",
 *      "status": "active",
 *      "type": "customer",
 *      "roles": ["customer"],
 *      "emailVerified": true,
 *      "phoneVerified": false,
 *      "mfaEnabled": false,
 *      "createdAt": "2024-01-01T00:00:00.000Z",
 *      "updatedAt": "2024-01-01T00:00:00.000Z"
 *    },
 *    "session": {
 *      "sessionId": "uuid-sess",
 *      "userId": "uuid-1",
 *      "ipAddress": "192.168.1.1",
 *      "userAgent": "Mozilla/5.0",
 *      "createdAt": "2024-01-01T00:00:00.000Z",
 *      "expiresAt": "2024-01-01T01:00:00.000Z",
 *      "isActive": true
 *    },
 *    "accessToken": "eyJhbGciOi...",
 *    "refreshToken": "eyJhbGciOi...",
 *    "tokenType": "Bearer",
 *    "expiresAt": 1735689600000
 *  }
 *
 *  Example: Error Response
 *  ─────────────────────────────────────────────────────────────
 *  Response 401:
 *  {
 *    "statusCode": 401,
 *    "message": "Invalid email or password",
 *    "error": "Unauthorized"
 *  }
 */

export const API_EXAMPLES = {
  loginRequest: {
    identifier: 'john@example.com',
    password: 'Test1234!',
    rememberMe: true,
  },
  loginResponse: {
    success: true,
    user: { id: 'uuid-1', email: 'john@example.com', name: 'John Doe' },
    session: { sessionId: 'uuid-sess', isActive: true },
    accessToken: 'eyJhbGciOi...',
    refreshToken: 'eyJhbGciOi...',
    tokenType: 'Bearer',
    expiresAt: 1735689600000,
  },
  errorResponse: {
    statusCode: 401,
    message: 'Invalid email or password',
    error: 'Unauthorized',
  },
} as const;

/**
 * ══════════════════════════════════════════════════════════════════
 *  📊 ENDPOINT COUNT SUMMARY
 * ══════════════════════════════════════════════════════════════════
 *
 *  Auth Core:        8 endpoints
 *  MFA:              4 endpoints
 *  Recovery:         3 endpoints
 *  Account Lock:     3 endpoints
 *  Sessions:         3 endpoints
 *  Devices:          2 endpoints
 *  Login Attempts:   2 endpoints
 *  Social:           4 endpoints
 *  OAuth:            2 endpoints
 *  SSO:              2 endpoints
 *  2FA:              3 endpoints
 *  Biometric:        3 endpoints
 *  Permissions/Roles: 2 endpoints
 *  Settings:         4 endpoints
 *  Users:            5 endpoints
 *  Profile:          2 endpoints
 *  User Settings:    4 endpoints
 *  Addresses:        5 endpoints
 *  Contacts:         5 endpoints
 *  KYC:              4 endpoints
 *  User Extra:       4 endpoints
 *  ─────────────────────────────────────
 *  TOTAL:            ~70 endpoints
 */

export const ENDPOINT_COUNT = {
  total: 70,
  byCategory: {
    auth: 8,
    mfa: 4,
    recovery: 3,
    accountLock: 3,
    sessions: 3,
    devices: 2,
    loginAttempts: 2,
    social: 4,
    oauth: 2,
    sso: 2,
    twoFa: 3,
    biometric: 3,
    permissionsRoles: 2,
    settings: 4,
    users: 5,
    profile: 2,
    userSettings: 4,
    addresses: 5,
    contacts: 5,
    kyc: 4,
    userExtra: 4,
  },
} as const;

export const ALL_ENDPOINTS = {
  auth: AUTH_ENDPOINTS,
  mfa: MFA_ENDPOINTS,
  recovery: RECOVERY_ENDPOINTS,
  lock: LOCK_ENDPOINTS,
  session: SESSION_ENDPOINTS,
  device: DEVICE_ENDPOINTS,
  loginAttempt: LOGIN_ATTEMPT_ENDPOINTS,
  social: SOCIAL_ENDPOINTS,
  oauth: OAUTH_ENDPOINTS,
  sso: SSO_ENDPOINTS,
  twoFa: TWO_FA_ENDPOINTS,
  biometric: BIOMETRIC_ENDPOINTS,
  permission: PERMISSION_ENDPOINTS,
  settings: SETTINGS_ENDPOINTS,
  user: USER_ENDPOINTS,
  profile: PROFILE_ENDPOINTS,
  userSettings: USER_SETTINGS_ENDPOINTS,
  address: ADDRESS_ENDPOINTS,
  contact: CONTACT_ENDPOINTS,
  kyc: KYC_ENDPOINTS,
  userExtra: USER_EXTRA_ENDPOINTS,
} as const;
