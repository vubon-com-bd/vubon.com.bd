<!-- AUTO-GENERATED from docs/api.doc.ts. Do not edit directly. -->

AUTH SERVICE — API DOCUMENTATION
@module auth-service/docs

══════════════════════════════════════════════════════════════════
 🌐 REST API — Base URL
══════════════════════════════════════════════════════════════════

 Development:  http://localhost:3001/api/v1
 Production:   https://auth.vubon.com.bd/api/v1
 Swagger:      /api/docs

 Auth: Bearer JWT in Authorization header
 Content-Type: application/json

---

══════════════════════════════════════════════════════════════════
 🔐 AUTH ENDPOINTS (Core)
══════════════════════════════════════════════════════════════════

 POST /auth/login               — Login with email/phone + password
 POST /auth/register            — Register new user
 POST /auth/refresh             — Refresh access token
 POST /auth/logout              — Logout (revoke session)
 POST /auth/forgot-password     — Request password reset
 POST /auth/reset-password      — Reset with token
 POST /auth/verify-email        — Verify email with code
 POST /auth/resend-verification — Resend verification code

---

══════════════════════════════════════════════════════════════════
 🔒 MFA + RECOVERY + LOCK ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /auth/mfa/enable            — Begin MFA enrollment
 DELETE /auth/mfa/disable           — Disable MFA
 POST   /auth/mfa/verify            — Verify MFA code
 GET    /auth/mfa/status            — Get MFA status

 POST   /auth/recovery-codes/generate — Generate recovery codes
 POST   /auth/recovery-codes/recover  — Recover account
 GET    /auth/recovery-codes          — List recovery codes

 POST   /auth/account-lock/lock       — Lock account (admin)
 POST   /auth/account-lock/unlock     — Unlock account
 GET    /auth/account-lock/me         — Get lock status

 GET    /auth/login-attempts          — List login attempts
 GET    /auth/sessions/me             — List my sessions
 GET    /auth/sessions/:id            — Get session
 DELETE /auth/sessions/:id            — Revoke session
 GET    /auth/tokens                  — List active tokens
 GET    /auth/devices                 — List devices
 GET    /auth/devices/:id             — Get device

---

══════════════════════════════════════════════════════════════════
 🌍 SOCIAL / OAUTH / SSO ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /auth/social/login      — Initiate social login
 POST   /auth/social/callback   — Handle social callback
 POST   /auth/social/link       — Link social account
 DELETE /auth/social/unlink     — Unlink social account

 GET    /auth/oauth/authorize   — OAuth authorize redirect
 POST   /auth/oauth/callback    — OAuth callback

 POST   /auth/sso/login         — SSO login initiate
 POST   /auth/sso/callback      — SSO callback

 POST   /auth/2fa/enable        — Enable 2FA
 DELETE /auth/2fa/disable       — Disable 2FA
 GET    /auth/2fa/status        — Get 2FA status

 POST   /auth/biometric/enable  — Enroll biometric
 DELETE /auth/biometric/disable — Remove biometric
 POST   /auth/biometric/verify  — Verify biometric

 GET    /auth/permissions       — List permissions
 GET    /auth/roles             — List roles
 GET    /auth/settings          — Get auth settings
 PUT    /auth/settings          — Update auth settings
 GET    /auth/preferences       — Get preferences
 PUT    /auth/preferences       — Update preferences

---

══════════════════════════════════════════════════════════════════
 👤 USER ENDPOINTS
══════════════════════════════════════════════════════════════════

 POST   /users                  — Create user (admin)
 GET    /users                  — List users (admin)
 GET    /users/:id              — Get user
 PUT    /users/:id              — Update user
 DELETE /users/:id              — Delete user (soft)

 GET    /users/profile          — Get own profile
 PUT    /users/profile          — Update profile

 GET    /users/settings         — Get settings
 PUT    /users/settings         — Update settings

 GET    /users/preferences      — Get preferences
 PUT    /users/preferences      — Update preferences

 GET    /users/addresses        — List addresses
 POST   /users/addresses        — Add address
 GET    /users/addresses/:id    — Get address
 PUT    /users/addresses/:id    — Update address
 DELETE /users/addresses/:id    — Delete address

 GET    /users/contacts         — List contacts
 POST   /users/contacts         — Add contact
 GET    /users/contacts/:id     — Get contact
 PUT    /users/contacts         — Update contact
 DELETE /users/contacts/:id     — Delete contact

 GET    /users/verification/:type/status — Get verification status
 GET    /users/kyc/me           — Get own KYC status
 POST   /users/kyc/submit       — Submit KYC
 POST   /users/kyc/verify       — Approve KYC
 POST   /users/kyc/reject       — Reject KYC

 GET    /users/activity         — List activities
 GET    /users/permissions/:userId — List user permissions
 GET    /users/roles/:userId    — List user roles

---

══════════════════════════════════════════════════════════════════
 📝 REQUEST/RESPONSE EXAMPLES
══════════════════════════════════════════════════════════════════

 Example: Login
 ─────────────────────────────────────────────────────────────
 POST /api/v1/auth/login
 Content-Type: application/json

 {
   "identifier": "john@example.com",
   "password": "Test1234!",
   "rememberMe": true
 }

 Response 200:
 {
   "success": true,
   "user": {
     "id": "uuid-1",
     "email": "john@example.com",
     "name": "John Doe",
     "status": "active",
     "type": "customer",
     "roles": ["customer"],
     "emailVerified": true,
     "phoneVerified": false,
     "mfaEnabled": false,
     "createdAt": "2024-01-01T00:00:00.000Z",
     "updatedAt": "2024-01-01T00:00:00.000Z"
   },
   "session": {
     "sessionId": "uuid-sess",
     "userId": "uuid-1",
     "ipAddress": "192.168.1.1",
     "userAgent": "Mozilla/5.0",
     "createdAt": "2024-01-01T00:00:00.000Z",
     "expiresAt": "2024-01-01T01:00:00.000Z",
     "isActive": true
   },
   "accessToken": "eyJhbGciOi...",
   "refreshToken": "eyJhbGciOi...",
   "tokenType": "Bearer",
   "expiresAt": 1735689600000
 }

 Example: Error Response
 ─────────────────────────────────────────────────────────────
 Response 401:
 {
   "statusCode": 401,
   "message": "Invalid email or password",
   "error": "Unauthorized"
 }

---

══════════════════════════════════════════════════════════════════
 📊 ENDPOINT COUNT SUMMARY
══════════════════════════════════════════════════════════════════

 Auth Core:        8 endpoints
 MFA:              4 endpoints
 Recovery:         3 endpoints
 Account Lock:     3 endpoints
 Sessions:         3 endpoints
 Devices:          2 endpoints
 Login Attempts:   2 endpoints
 Social:           4 endpoints
 OAuth:            2 endpoints
 SSO:              2 endpoints
 2FA:              3 endpoints
 Biometric:        3 endpoints
 Permissions/Roles: 2 endpoints
 Settings:         4 endpoints
 Users:            5 endpoints
 Profile:          2 endpoints
 User Settings:    4 endpoints
 Addresses:        5 endpoints
 Contacts:         5 endpoints
 KYC:              4 endpoints
 User Extra:       4 endpoints
 ─────────────────────────────────────
 TOTAL:            ~70 endpoints
