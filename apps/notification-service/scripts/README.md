# Operational Scripts

Utility scripts for notification-service operations.

## Usage

    bash scripts/<script>.sh

All scripts assume the service is running at `http://localhost:4007/api/v1`.

## Scripts

| Script | Purpose |
|--------|---------|
| `health-check.sh` | Ping health endpoint |
| `wait-for-ready.sh` | Block until service is healthy |
| `migrate.sh` | Run Prisma migrations |
| `seed.sh` | Seed sample data (dev only) |
| `smoke-test.sh` | Basic API smoke test |

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `NOTIFICATION_SERVICE_URL` | `http://localhost:4007/api/v1` | Base URL |
