# API Examples — Identity Service

Place API request/response examples here.

## Categories

- `requests/` — Sample request bodies
- `responses/` — Sample responses
- `curl/` — curl command examples
- `postman/` — Postman collections

## curl Examples

### Health
\`\`\`bash
curl http://localhost:3001/health
\`\`\`

### Register User
\`\`\`bash
curl -X POST http://localhost:3001/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "SecureP@ss123",
    "confirmPassword": "SecureP@ss123",
    "firstName": "John",
    "lastName": "Doe",
    "acceptTerms": true
  }'
\`\`\`

### Login
\`\`\`bash
curl -X POST http://localhost:3001/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "identifier": "user@example.com",
    "password": "SecureP@ss123"
  }'
\`\`\`

### Get Current User
\`\`\`bash
curl http://localhost:3001/auth/me \\
  -H "Authorization: Bearer <access-token>"
\`\`\`

### Logout
\`\`\`bash
curl -X POST http://localhost:3001/auth/logout \\
  -H "Authorization: Bearer <access-token>"
\`\`\`

### List Sessions
\`\`\`bash
curl http://localhost:3001/auth/sessions \\
  -H "Authorization: Bearer <access-token>"
\`\`\`

### Enable MFA
\`\`\`bash
curl -X POST http://localhost:3001/auth/mfa/enable \\
  -H "Authorization: Bearer <access-token>"
\`\`\`

### Verify MFA Code
\`\`\`bash
curl -X POST http://localhost:3001/auth/mfa/verify \\
  -H "Authorization: Bearer <access-token>" \\
  -H "Content-Type: application/json" \\
  -d '{"code": "123456"}'
\`\`\`

### Update Profile
\`\`\`bash
curl -X PUT http://localhost:3001/users/profile \\
  -H "Authorization: Bearer <access-token>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "bio": "Software developer"
  }'
\`\`\`

### Add Address
\`\`\`bash
curl -X POST http://localhost:3001/users/addresses \\
  -H "Authorization: Bearer <access-token>" \\
  -H "Content-Type: application/json" \\
  -d '{
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
  }'
\`\`\`

### Get Public Profile
\`\`\`bash
curl http://localhost:3001/public/profile/johndoe
\`\`\`
