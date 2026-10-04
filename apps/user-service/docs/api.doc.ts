/**
 * USER SERVICE — API DOCUMENTATION
 * @module user-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  🌐 REST API — Base URL
 * ══════════════════════════════════════════════════════════════════
 *
 *  Development:   http://localhost:4001/api/v1
 *  Production:    https://user.vubon.com.bd/api/v1
 *  Swagger UI:    /api/v1/docs
 *  OpenAPI JSON:  /api/v1/docs-json
 *
 *  Auth:         Bearer JWT in Authorization header
 *  Content-Type: application/json
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  👤 USER ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  GET    /users                    — List users (paginated)
 *  GET    /users/:id                — Get user by ID
 *  GET    /users/me                 — Get current authenticated user
 *  GET    /users/search/:term       — Search users
 *  POST   /users                    — Create user
 *  PUT    /users/:id                — Update user
 *  DELETE /users/:id                — Delete user
 *  POST   /users/:id/activate       — Activate user
 *  POST   /users/:id/suspend        — Suspend user
 *
 *  Query params (list):
 *    • page   (default: 1)
 *    • limit  (default: 20, max: 100)
 *    • status (active | inactive | suspended | pending)
 *    • type   (individual | business | vendor | admin)
 *    • search (free text)
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  👤 PROFILE ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  GET    /users/:userId/profile                 — Get profile
 *  PUT    /users/:userId/profile                 — Update profile
 *  PUT    /users/:userId/profile/avatar          — Update avatar URL
 *  PUT    /users/:userId/profile/bio             — Update bio
 *  PUT    /users/:userId/profile/visibility      — Update visibility
 *
 *  Visibility values:
 *    public | private | followers | friends | only_me
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  ⚙️  SETTINGS ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  GET    /users/:userId/settings               — Get settings
 *  PUT    /users/:userId/settings               — Update settings
 *  POST   /users/:userId/settings/reset         — Reset to defaults
 *
 *  Settings fields:
 *    • theme       (light | dark | system)
 *    • language    (bn | en | ...)
 *    • locale      (bn-BD | en-US | ...)
 *    • timezone    (Asia/Dhaka | UTC | ...)
 *    • currency    (BDT | USD | ...)
 *    • notifications (boolean)
 *    • twoFactor    (boolean)
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🎯 PREFERENCES ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  GET    /users/:userId/preferences            — Get preferences
 *  PUT    /users/:userId/preferences            — Update preferences
 *  POST   /users/:userId/preferences/reset      — Reset to defaults
 *
 *  Preference flags:
 *    • newsletter                 (boolean)
 *    • promotions                 (boolean)
 *    • orderUpdates               (boolean)
 *    • productRecommendations     (boolean)
 *    • securityAlerts             (boolean)
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📍 ADDRESS ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  GET    /users/:userId/addresses                        — List
 *  GET    /users/:userId/addresses/:addressId             — Get one
 *  POST   /users/:userId/addresses                        — Add
 *  PUT    /users/:userId/addresses/:addressId             — Update
 *  DELETE /users/:userId/addresses/:addressId             — Delete
 *  POST   /users/:userId/addresses/:addressId/default     — Set default
 *
 *  Address fields (BD-specific):
 *    • type       (home | work | billing | shipping | other)
 *    • line1      (required, 3-255 chars)
 *    • line2      (optional)
 *    • city       (required, 2-100 chars)
 *    • district   (required, must belong to division)
 *    • division   (required, one of 8 BD divisions)
 *    • postalCode (required, 4 digits)
 *
 *  Divisions: dhaka | chittagong | rajshahi | khulna |
 *             barishal | sylhet | rangpur | mymensingh
 *
 *  Business rules:
 *    • Max 10 addresses per user
 *    • District must belong to selected division
 *    • Only one default address
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📞 CONTACT ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  GET    /users/:userId/contacts                     — List
 *  GET    /users/:userId/contacts/:contactId          — Get one
 *  POST   /users/:userId/contacts                     — Add
 *  PUT    /users/:userId/contacts/:contactId          — Update
 *  DELETE /users/:userId/contacts/:contactId          — Delete
 *  POST   /users/:userId/contacts/:contactId/verify   — Verify
 *
 *  Contact types:
 *    email | phone | whatsapp | telegram | messenger |
 *    skype | website | social
 *
 *  Business rules:
 *    • Max 10 contacts per user
 *    • Email format validated via REGEX.EMAIL
 *    • Phone validated via REGEX.PHONE_BD / PHONE_INTL
 *    • Verification code: 6 digits
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🆔 KYC ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  GET    /users/:userId/kyc/status                       — Get status
 *  GET    /users/:userId/kyc/documents                    — List docs
 *  POST   /users/:userId/kyc/submit                       — Submit
 *  POST   /users/:userId/kyc/:kycId/verify                — Approve (admin)
 *  POST   /users/:userId/kyc/:kycId/reject                — Reject (admin)
 *
 *  Status values:
 *    not_started | pending | in_review | approved |
 *    rejected | expired | resubmitted
 *
 *  Document types:
 *    nid | passport | driving_license | birth_certificate |
 *    utility_bill | bank_statement | tin_certificate
 *
 *  Business rules:
 *    • Max 10 documents
 *    • Max 10 MB per document
 *    • Email must be verified before submission
 *    • Only active users can submit
 *    • Review SLA: 48 hours
 *    • Expiry: 365 days
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📊 ACTIVITY ENDPOINTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  GET    /users/:userId/activities               — List (paginated)
 *  GET    /users/:userId/activities/stats         — Stats summary
 *
 *  Query params:
 *    • page (default: 1)
 *    • limit (default: 20)
 *    • type (login | logout | register | profile_update | ...)
 *
 *  Stats response:
 *    • totalActivities
 *    • lastActivityAt
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🌐 PUBLIC PROFILE ENDPOINTS (no auth)
 * ══════════════════════════════════════════════════════════════════
 *
 *  GET    /public/users/:id                       — Public user info
 *  GET    /public/users/:id/profile               — Public profile
 *
 *  Response excludes sensitive fields:
 *    ❌ email, phone
 *    ❌ settings, preferences
 *    ❌ kyc data
 *    ❌ activity
 *
 *  Includes:
 *    ✅ id, displayName, username, avatarUrl
 *    ✅ status, type
 *    ✅ public profile fields (bio, avatar, visibility-respecting)
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📋 COMMON RESPONSE CODES
 * ══════════════════════════════════════════════════════════════════
 *
 *  200 OK              — Success
 *  201 Created         — Resource created
 *  204 No Content      — Successful delete
 *  400 Bad Request     — Validation failure
 *  401 Unauthorized    — Missing / invalid token
 *  403 Forbidden       — Insufficient permissions
 *  404 Not Found       — Resource not found
 *  409 Conflict        — Duplicate (email already exists)
 *  422 Unprocessable   — Business rule violation
 *  429 Too Many        — Rate limit exceeded
 *  500 Internal        — Server error
 *  503 Unavailable     — Dependency down (DB / cache)
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔐 AUTHENTICATION
 * ══════════════════════════════════════════════════════════════════
 *
 *  All authenticated endpoints require:
 *
 *    Authorization: Bearer <access_token>
 *
 *  Token issued by auth-service:
 *    • Access token  — 15 min TTL
 *    • Refresh token — 7 days TTL
 *
 *  Role-based access:
 *    • User            — own profile / settings / addresses / ...
 *    • Admin           — any user; KYC approve / reject
 *    • System          — internal events
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📄 EXAMPLE REQUESTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  Create user:
 *
 *    POST /api/v1/users
 *    {
 *      "email": "user@example.com",
 *      "password": "Test123!@#",
 *      "type": "individual",
 *      "firstName": "John",
 *      "lastName": "Doe",
 *      "acceptTerms": true
 *    }
 *
 *  Add address:
 *
 *    POST /api/v1/users/:userId/addresses
 *    {
 *      "type": "home",
 *      "line1": "123 Main Street",
 *      "city": "Dhaka",
 *      "district": "dhaka",
 *      "division": "dhaka",
 *      "postalCode": "1200",
 *      "country": "BD"
 *    }
 *
 *  Submit KYC:
 *
 *    POST /api/v1/users/:userId/kyc/submit
 *    {
 *      "documents": [
 *        {
 *          "type": "nid",
 *          "frontUrl": "https://cdn.example.com/nid-front.jpg"
 *        }
 *      ],
 *      "acceptTerms": true
 *    }
 */
