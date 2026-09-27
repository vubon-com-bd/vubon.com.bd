# Prisma Schema

The canonical Prisma schema for `@vubon/user-service` lives at:

    apps/user-service/prisma/schema.prisma

This directory is kept per the Infrastructure Layer Registry (schema folder),
but the actual schema is a single-file schema for build-tool compatibility.

To run migrations / generate client:

    pnpm prisma generate
    pnpm prisma migrate dev

For per-model documentation see comments inside the canonical schema file.
