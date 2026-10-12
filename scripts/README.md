# Operational Scripts

Utility scripts for vendor-service operations.

## Usage

	bash scripts/<script>.sh

All scripts assume the service is running at http://localhost:4006/api/v1.

## Scripts

| Script             | Purpose                         |
|--------------------|---------------------------------|
| health-check.sh    | Ping health endpoint            |
| wait-for-ready.sh  | Block until service is healthy  |
| migrate.sh         | Run Prisma migrations           |
| seed.sh            | Seed sample data (dev only)     |
| smoke-test.sh      | Basic API smoke test            |

## Environment Variables

| Variable               | Default                          | Purpose   |
|------------------------|----------------------------------|-----------|
| VENDOR_SERVICE_URL     | http://localhost:4006/api/v1     | Base URL  |
| WAIT_TIMEOUT_SECONDS   | 60                               | Timeout   |
