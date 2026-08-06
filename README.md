# Vubon Monorepo

## Prerequisites

- Node.js >= 22.0.0
- pnpm >= 9.0.0

## Setup

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm run build

# Run code checks
pnpm run check
```

## Development

```bash
# Start development server for customer app
pnpm --filter @vubon/customer-dashboard-auth dev

# Start development server for auth service
pnpm --filter @vubon/auth-service start:dev
```

## Project Structure

```
├── apps/
│   ├── auth-service/          # Backend NestJS service
│   ├── customer-dashboard/    # Customer frontend app
│   ├── admin-dashboard/       # Admin dashboard
│   └── seller-dashboard/      # Seller dashboard
├── packages/
│   └── auth/                  # Shared authentication packages
│       ├── shared-constants/
│       ├── shared-types/
│       ├── shared-schemas/
│       ├── shared-utils/
│       ├── shared-config/
│       ├── shared-api/
│       ├── shared-auth/
│       ├── shared-hooks/
│       └── shared-ui/
└── package.json
```

## License

MIT
# force trigger Fri Aug  7 01:43:29 +06 2026
# force Fri Aug  7 02:21:47 +06 2026
# force Fri Aug  7 02:22:43 +06 2026
