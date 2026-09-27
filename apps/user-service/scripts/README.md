# Scripts

## `docker-entrypoint.sh`

Runs inside the Docker container on startup.

1. Prints environment summary (no secrets).
2. Runs `prisma migrate deploy` if `DATABASE_URL` is set.
3. Executes the container's `CMD` (`node dist/main.js`).

Do not modify unless you understand the Docker entrypoint flow.

## Adding New Scripts

Place executable shell scripts in this folder. Update the Dockerfile if the
script needs to run at build or start time.
