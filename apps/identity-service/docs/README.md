# Identity Service — Documentation

Additional documentation for the Identity Service.

## 📚 Files

| Document | Purpose |
|----------|---------|
| [../README.md](../README.md) | Project overview + quick start |
| [../ARCHITECTURE.md](../ARCHITECTURE.md) | Layer patterns + deep-dive |
| [../API.md](../API.md) | REST API reference |
| [../TESTING.md](../TESTING.md) | Testing guide |
| [../DEVELOPMENT.md](../DEVELOPMENT.md) | Local development setup |
| [../DEPLOYMENT.md](../DEPLOYMENT.md) | Production deployment |
| [../CHANGELOG.md](../CHANGELOG.md) | Version history |

## 📂 Folders

- `architecture/` — Architecture diagrams (coming soon)
- `api/` — API examples (coming soon)
- `tutorials/` — Step-by-step guides (coming soon)

## 🎯 Quick Links

- **Swagger UI**: http://localhost:3001/api/docs
- **Health Check**: http://localhost:3001/health
- **OpenAPI JSON**: http://localhost:3001/api/docs-json

## 🔐 Auth Endpoints (Quick Reference)

- `POST /auth/register` — Register new user
- `POST /auth/login` — Login
- `POST /auth/logout` — Logout
- `POST /auth/refresh` — Refresh token
- `POST /auth/forgot-password` — Forgot password
- `POST /auth/reset-password` — Reset password
- `POST /auth/mfa/enable` — Enable MFA
- `GET /auth/sessions` — List sessions
