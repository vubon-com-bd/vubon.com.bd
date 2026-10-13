# Postman Collection — Identity Service

Complete Postman collection for testing the Identity Service API (auth + user).

---

## 📦 Files

| File | Purpose |
|------|---------|
| `Identity Service.postman_collection.json` | Main collection — 78 requests, 21 folders |
| `environments/dev.postman_environment.json` | Dev environment (localhost:3000) |
| `environments/staging.postman_environment.json` | Staging environment |
| `environments/prod.postman_environment.json` | Production environment |

---

## 🚀 Quick Start

### 1. Install Postman

Download from [postman.com/downloads](https://www.postman.com/downloads/) or use [web.postman.co](https://web.postman.co).

### 2. Import Collection

1. Open Postman
2. Click **Import** (top-left)
3. Drag & drop `Identity Service.postman_collection.json`
4. Click **Import**

### 3. Import Environment

1. Click **Environments** (left sidebar)
2. Click **Import**
3. Select `environments/dev.postman_environment.json`
4. Import

### 4. Select Environment

Top-right dropdown → Select **"Identity Service — Dev"**.

### 5. Get Auth Token

**Option A — Auto (recommended):**
1. Run **🔐 Auth Core → Register** (auto-saves accessToken)
2. Or run **🔐 Auth Core → Login** (auto-saves accessToken + refreshToken)
3. All subsequent requests auto-use `{{accessToken}}`

**Option B — Manual:**
1. Login via API (Swagger or curl)
2. Copy JWT
3. Environments → Dev → set `accessToken`

---

## 📂 Collection Structure (21 folders · 78 requests)

\`\`\`
📮 Identity Service
│
├── 🏥 Health (1)
│
├── 🔐 Auth Core (8)
│   ├── Register
│   ├── Login
│   ├── Refresh Token
│   ├── Logout
│   ├── Forgot Password
│   ├── Reset Password
│   ├── Verify Email
│   └── Resend Verification
│
├── 🔒 Auth MFA (7)
│   ├── Setup MFA
│   ├── Enable MFA
│   ├── Disable MFA
│   ├── Verify MFA
│   ├── Verify Backup Code
│   ├── Get MFA Settings
│   └── Get Recovery Codes
│
├── 👤 Auth Roles & Permissions (6)
├── 🔑 Auth Sessions (3)
├── 📱 Auth Devices (4)
├── 🔐 Auth Biometric (3)
├── 🔒 Auth Account Lock (3)
├── 🕵️ Auth Login Attempts (1)
├── 🔑 Auth Recovery Codes (2)
├── 🔗 Auth Social & SSO (5)
├── ⚙️ Auth Settings & Tokens (3)
│
├── 👥 Users (9)
├── 📋 User Profile (2)
├── 📍 User Addresses (5)
├── 📞 User Contacts (5)
├── 🪪 User KYC (4)
├── ⚙️ User Preferences (3)
├── 🎛️ User Settings (2)
├── 📊 User Activity (1)
└── 🌐 Public Profile (1)
\`\`\`

---

## 🔐 Authentication Flow

### Register → Login → Access Protected

\`\`\`
1. 🔐 Auth Core → Register
   ↓ Auto-saves: userId, accessToken, refreshToken

2. 🔐 Auth Core → Login
   ↓ Auto-saves: accessToken, refreshToken

3. Any protected request
   ↓ Auto-uses: {{accessToken}}
\`\`\`

**Collection-level auth:**
- Type: `Bearer Token`
- Value: `{{accessToken}}`
- All requests inherit — no per-request config needed

---

## 🌍 Environments

| Environment | Base URL |
|-------------|----------|
| **Dev** | `http://localhost:3000` |
| **Staging** | `https://identity-staging.vubon.com.bd` |
| **Prod** | `https://identity.vubon.com.bd` |

### Environment Variables

| Variable | Purpose | Auto-set by |
|----------|---------|-------------|
| `baseUrl` | Service URL | Manual |
| `accessToken` | JWT bearer | Register/Login |
| `refreshToken` | Refresh JWT | Register/Login |
| `userId` | Target user UUID | Register |
| `sessionId` | Session UUID | Manual |
| `deviceId` | Device UUID | Manual |
| `addressId` | Address UUID | Manual |
| `contactId` | Contact UUID | Manual |
| `uniqueEmail` | Auto-generated test email | Pre-request script |
| `uniqueSuffix` | Auto-generated suffix | Pre-request script |
| `timestamp` | Auto-generated ISO timestamp | Pre-request script |

---

## 🎯 Auto-Variables (Pre-request Script)

Every request auto-generates:

\`\`\`javascript
pm.variables.set('timestamp', new Date().toISOString());
pm.variables.set('uniqueSuffix', Date.now().toString(36));
pm.variables.set('uniqueEmail', 'test-' + Date.now() + '@example.com');
\`\`\`

Used in requests as: `{{uniqueSuffix}}`, `{{uniqueEmail}}`, `{{timestamp}}`.

---

## 🧪 Test Assertions

Each request has built-in tests:

\`\`\`javascript
pm.test('Status is 200', () => pm.response.to.have.status(200));
pm.test('Has service field', () => pm.expect(pm.response.json()).to.have.property('service'));
\`\`\`

**Register request auto-saves tokens** for subsequent requests.

---

## 🚀 Running with Newman (CLI)

### Install Newman

\`\`\`bash
npm install -g newman
npm install -g newman-reporter-html
\`\`\`

### Run All Tests

\`\`\`bash
newman run "postman/Identity Service.postman_collection.json" \\
  -e "postman/environments/dev.postman_environment.json" \\
  --reporters cli,html \\
  --reporter-html-export newman-report.html
\`\`\`

### Run Specific Folder

\`\`\`bash
newman run "postman/Identity Service.postman_collection.json" \\
  -e "postman/environments/dev.postman_environment.json" \\
  --folder "🔐 Auth Core"
\`\`\`

### Run with Token

\`\`\`bash
newman run "postman/Identity Service.postman_collection.json" \\
  -e "postman/environments/dev.postman_environment.json" \\
  --env-var "accessToken=<your-jwt>"
\`\`\`

### CI Integration

\`\`\`yaml
- name: Identity Postman Tests
  run: |
    npm install -g newman
    newman run "postman/Identity Service.postman_collection.json" \\
      -e "postman/environments/dev.postman_environment.json" \\
      --bail
\`\`\`

---

## 📊 Collection Stats

| Metric | Value |
|--------|-------|
| Folders | 21 |
| Requests | 78 |
| Environments | 3 |
| Variables | 11 |
| Test assertions | ~50 |
| Collection size | ~2,100 lines |

---

## 🎯 Common Workflows

### 1. Full Auth Cycle

\`\`\`
1. Register → saves tokens
2. Login → refreshes tokens
3. Get Profile
4. Update Profile
5. Logout
\`\`\`

### 2. MFA Flow

\`\`\`
1. Setup MFA (get QR + secret)
2. Enable MFA (with code from authenticator)
3. Login (now requires MFA code)
4. Verify MFA
\`\`\`

### 3. User Management (Admin)

\`\`\`
1. Login as admin
2. List Users
3. Get User
4. Update User
5. Suspend/Activate
\`\`\`

### 4. KYC Flow

\`\`\`
1. Login
2. Submit KYC (with docs)
3. Admin: Verify KYC
4. User: Check KYC Status
\`\`\`

---

## 💡 Tips

### Tip 1 — Save Login Token to Environment

After Login request:
- **Test** tab: `pm.collectionVariables.set('accessToken', json.tokens.accessToken)`
- Auto-saves to collection variables

### Tip 2 — Refresh Token Flow

When token expires:
1. Run **Refresh Token** with `{{refreshToken}}`
2. New token auto-saved

### Tip 3 — Environment Switcher

Top-right dropdown switches Dev/Staging/Prod instantly.

### Tip 4 — Collection Runner

Right-click collection → **Run collection**:
- Run all 78 requests
- Iterations: 1 (or more for load test)
- Delay: 100ms (avoid rate limit)

### Tip 5 — Bulk Testing

Use folders:
- **Run folder** → runs all requests in folder
- **Run collection** → runs all 78 requests

---

## 🎯 Troubleshooting

### Collection won't import

\`\`\`bash
python3 -c "import json; json.load(open('postman/Identity Service.postman_collection.json'))"
\`\`\`

Must be valid JSON. Postman version >= 10.

### 401 Unauthorized

- Check `accessToken` variable is set
- Run Login first to auto-save token
- Token not expired (default 15 min)

### 400 on Register

- Email may already exist — used unique email via `{{uniqueEmail}}`
- Password must meet policy (8+ chars, uppercase, lowercase, digit, special)
- `acceptTerms: true` required

### 404 Not Found

- Ensure service running on `{{baseUrl}}`
- Check path — some require `{{userId}}` etc.

### Connection Refused

\`\`\`bash
curl http://localhost:3000/health
# If fails:
pnpm start:dev
\`\`\`

---

## 📚 Related Documentation

- [../README.md](../README.md) — Project overview
- [../API.md](../API.md) — Full API reference
- [../TESTING.md](../TESTING.md) — Test guide
- [../ARCHITECTURE.md](../ARCHITECTURE.md) — Architecture

---

## 🎯 Endpoint Categories

| Category | Folders | Requests |
|----------|---------|----------|
| **Auth** | 11 | 49 |
| **User** | 8 | 27 |
| **Health** | 1 | 1 |
| **Public** | 1 | 1 |
| **TOTAL** | **21** | **78** |
