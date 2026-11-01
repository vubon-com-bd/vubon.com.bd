# Vendor Service — vubon.com.bd
Enterprise vendor management microservice.

## Overview
| Package | Port | Framework | Architecture |
|---------|------|-----------|--------------|
| @vubon/vendor-service | 3004 | NestJS 12 | DDD + CQRS |

## Quick Start
pnpm install
pnpm --filter @vubon/shared-kernel build
cp .env.example .env
pnpm start:dev

## Architecture
5-layer Clean Architecture: domain / application / infrastructure / interfaces / modules

## Testing
pnpm test:unit
pnpm test:e2e:custom

## License
MIT
