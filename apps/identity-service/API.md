# API Reference — Identity Service

Complete REST API documentation. All endpoints use JSON.

**Base URL:** `http://localhost:3001`
**Swagger UI:** `http://localhost:3001/api/docs`
**OpenAPI JSON:** `http://localhost:3001/api/docs-json`

---

## 🔐 Authentication

Most endpoints require a JWT Bearer token:

\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

Public endpoints (no auth):
- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /public/profile/:username`

---

## 📊 Endpoints Summary

| Group | Count | Base Path |
|-------|-------|-----------|
| Health | 1 | `/health` |
| Auth (core) | ~10 | `/auth` |
| Auth Session | ~5 | `/auth/sessions` |
| Auth Token | ~4 | `/auth/tokens` |
| Auth MFA | ~6 | `/auth/mfa` |
| Auth Social | ~6 | `/auth/social` |
| Auth SSO | ~4 | `/auth/sso` |
| Auth Biometric | ~4 | `/auth/biometric` |
| Auth Device | ~4 | `/auth/devices` |
| Auth Login Attempt | ~3 | `/auth/login-attempts` |
| Auth Account Lock | ~3 | `/auth/account-locks` |
| Auth Recovery Code | ~3 | `/auth/recovery-codes` |
| Auth Role | ~5 | `/auth/roles` |
| Auth Permission | ~4 | `/auth/permissions` |
| Auth Settings | ~3 | `/auth/settings` |
| User Profile | ~5 | `/users/profile` |
| User Settings | ~3 | `/users/settings` |
| User Preferences | ~3 | `/users/preferences` |
| User Address | ~5 | `/users/addresses` |
| User Contact | ~5 | `/users/contacts` |
| User KYC | ~4 | `/users/kyc` |
| User Activity | ~3 | `/users/activity` |
| Public Profile | ~3 | `/public/profile` |

---

## 🏥 Health

### `GET /health`

Service health check. Public endpoint.

**Response 200:**
\`\`\`json
{
  "service": "identity-service",
  "status": "ok",
  "timestamp": "2026-10-14T01:00:00.000Z"
}
\`\`\`

---

## 🔑 Auth (Core)

### `POST /auth/register`

Create a new user account.

**Request:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "SecureP@ss123",
  "confirmPassword": "SecureP@ss123",
  "firstName": "John",
  "lastName": "Doe",
  "acceptTerms": true
}
\`\`\`

**Response 201:**
\`\`\`json
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "status": "active"
  },
  "tokens": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
\`\`\`

### `POST /auth/login`

Login with email + password.

**Request:**
\`\`\`json
{
  "identifier": "user@example.com",
  "password": "SecureP@ss123"
}
\`\`\`

**Response 200:**
\`\`\`json
{
  "success": true,
  "user": { "id": "uuid", "email": "user@example.com" },
  "tokens": { "accessToken": "...", "refreshToken": "..." },
  "session": { "id": "uuid", "expiry": "..." }
}
\`\`\`

**Response 401:**
\`\`\`json
{
  "statusCode": 401,
  "code": "AUTH-001",
  "message": "Invalid credentials"
}
\`\`\`

### `POST /auth/logout`

Logout current session.

**Response 200:**
\`\`\`json
{ "success": true, "message": "Logged out" }
\`\`\`

### `POST /auth/refresh`

Refresh access token.

**Request:**
\`\`\`json
{ "refreshToken": "eyJ..." }
\`\`\`

**Response 200:**
\`\`\`json
{ "accessToken": "...", "refreshToken": "..." }
\`\`\`

### `POST /auth/forgot-password`

Request password reset.

**Request:**
\`\`\`json
{ "email": "user@example.com" }
\`\`\`

### `POST /auth/reset-password`

Reset password with token.

**Request:**
\`\`\`json
{
  "token": "reset-token",
  "password": "NewSecureP@ss123",
  "confirmPassword": "NewSecureP@ss123"
}
\`\`\`

### `POST /auth/verify-email`

Verify email with token.

### `POST /auth/resend-verification`

Resend verification email.

### `GET /auth/me`

Get current user profile.

**Response 200:**
\`\`\`json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "status": "active",
  "roles": ["user"],
  "emailVerified": true
}
\`\`\`

---

## 🔒 Auth — Sessions

### `GET /auth/sessions`

List active sessions.

### `GET /auth/sessions/:id`

Get session details.

### `DELETE /auth/sessions/:id`

Revoke session.

### `DELETE /auth/sessions`

Revoke all sessions.

---

## 🎫 Auth — Tokens

### `GET /auth/tokens`

List active tokens.

### `POST /auth/tokens/revoke`

Revoke a specific token.

### `POST /auth/tokens/revoke-all`

Revoke all tokens.

---

## 🔐 Auth — MFA (Multi-Factor Authentication)

### `POST /auth/mfa/enable`

Enable MFA (returns QR code + secret).

**Response 200:**
\`\`\`json
{
  "secret": "BASE32SECRET",
  "qrCode": "data:image/png;base64,...",
  "recoveryCodes": ["code1", "code2", ...]
}
\`\`\`

### `POST /auth/mfa/verify`

Verify TOTP code.

**Request:**
\`\`\`json
{ "code": "123456" }
\`\`\`

### `POST /auth/mfa/disable`

Disable MFA.

### `GET /auth/mfa/status`

Check MFA status.

---

## 👥 Auth — Roles & Permissions

### `GET /auth/roles`

List roles.

### `POST /auth/roles/assign`

Assign role to user.

**Request:**
\`\`\`json
{ "userId": "uuid", "roleName": "admin" }
\`\`\`

### `GET /auth/permissions`

List permissions.

### `POST /auth/permissions/grant`

Grant permission to role.

---

## 🌐 Auth — Social Login

### `GET /auth/social/google`

Initiate Google OAuth.

### `GET /auth/social/google/callback`

Google OAuth callback.

### `GET /auth/social/facebook`

### `GET /auth/social/github`

### `POST /auth/social/link`

Link social account.

### `POST /auth/social/unlink`

Unlink social account.

---

## 🔗 Auth — SSO

### `GET /auth/sso/oidc`

Initiate OIDC flow.

### `GET /auth/sso/saml`

Initiate SAML flow.

### `POST /auth/sso/callback`

SSO callback handler.

---

## 🖐️ Auth — Biometric

### `POST /auth/biometric/register`

Register biometric credential.

### `POST /auth/biometric/verify`

Verify biometric.

### `DELETE /auth/biometric/:id`

Remove biometric.

---

## 📱 Auth — Devices

### `GET /auth/devices`

List registered devices.

### `POST /auth/devices/register`

Register a new device.

### `DELETE /auth/devices/:id`

Remove device.

---

## 📊 Auth — Login Attempts

### `GET /auth/login-attempts`

List login attempts (audit).

### `GET /auth/login-attempts/suspicious`

List suspicious attempts.

---

## 🔒 Auth — Account Lock

### `GET /auth/account-locks`

List locked accounts.

### `POST /auth/account-locks/:userId/unlock`

Unlock account.

---

## 🎟️ Auth — Recovery Codes

### `GET /auth/recovery-codes`

List recovery codes (masked).

### `POST /auth/recovery-codes/regenerate`

Regenerate recovery codes.

### `POST /auth/recovery-codes/use`

Use a recovery code (MFA backup).

---

## 👤 User — Profile

### `GET /users/profile`

Get own profile.

### `PUT /users/profile`

Update profile.

**Request:**
\`\`\`json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Software developer",
  "avatarUrl": "https://..."
}
\`\`\`

### `DELETE /users/profile`

Delete own account (GDPR).

---

## ⚙️ User — Settings

### `GET /users/settings`

Get settings.

### `PUT /users/settings`

Update settings.

**Request:**
\`\`\`json
{
  "theme": "dark",
  "language": "en",
  "timezone": "Asia/Dhaka",
  "notifications": {
    "email": true,
    "sms": false,
    "push": true
  }
}
\`\`\`

---

## 🎨 User — Preferences

### `GET /users/preferences`

### `PUT /users/preferences`

---

## 📍 User — Addresses

### `GET /users/addresses`

List addresses.

### `POST /users/addresses`

Add address.

**Request:**
\`\`\`json
{
  "type": "home",
  "fullName": "John Doe",
  "phone": "+8801712345678",
  "addressLine1": "House 12, Road 5, Dhanmondi",
  "city": "Dhaka",
  "state": "Dhaka",
  "division": "dhaka",
  "district": "dhaka",
  "postalCode": "1205",
  "country": "BD"
}
\`\`\`

### `PUT /users/addresses/:id`

### `DELETE /users/addresses/:id`

### `POST /users/addresses/:id/set-default`

---

## 📞 User — Contacts

### `GET /users/contacts`

### `POST /users/contacts`

Add email/phone contact.

### `PUT /users/contacts/:id`

### `DELETE /users/contacts/:id`

### `POST /users/contacts/:id/verify`

Verify contact (send OTP).

---

## 🆔 User — KYC

### `GET /users/kyc`

Get KYC status.

### `POST /users/kyc/submit`

Submit KYC documents.

**Request:**
\`\`\`json
{
  "documentType": "nid",
  "documentNumber": "1234567890",
  "frontImageUrl": "https://...",
  "backImageUrl": "https://...",
  "selfieUrl": "https://..."
}
\`\`\`

### `GET /users/kyc/status`

Check verification status.

---

## 📈 User — Activity

### `GET /users/activity`

Get own activity log.

### `GET /users/activity/logins`

Get login history.

---

## 🌐 Public Profile

No authentication required.

### `GET /public/profile/:username`

Get public user profile.

**Response 200:**
\`\`\`json
{
  "username": "johndoe",
  "firstName": "John",
  "lastName": "Doe",
  "avatarUrl": "...",
  "bio": "...",
  "joinedAt": "2026-01-01T00:00:00.000Z"
}
\`\`\`

### `GET /public/profile/:username/activity`

Get public activity summary.

### `GET /public/profile/:username/stats`

Get public stats.

---

## 📋 Error Responses

All errors follow this format:

\`\`\`json
{
  "statusCode": 401,
  "code": "AUTH-001",
  "message": "Invalid credentials",
  "context": { ... },
  "timestamp": "2026-10-14T01:00:00.000Z"
}
\`\`\`

### Common Error Codes

| Code | HTTP | Meaning |
|------|------|---------|
| `AUTH-001` | 401 | Invalid credentials |
| `AUTH-002` | 401 | Token expired |
| `AUTH-005` | 403 | Forbidden |
| `AUTH-007` | 423 | Account locked |
| `AUTH-016` | 400 | Verification expired |
| `AUTH-025` | 429 | Too many attempts |
| `USR-001` | 404 | User not found |
| `USR-002` | 409 | User already exists |
| `VAL-001` | 422 | Validation failed |
| `VAL-004` | 409 | Duplicate (email) |

---

## 🔄 HTTP Status Codes

| Status | Meaning |
|--------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Unprocessable |
| 423 | Locked |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 503 | Service Unavailable |
