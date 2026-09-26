import { PrismaClient } from '@prisma/client';

/**
 * Standalone Prisma client — for scripts, migrations, seeding.
 * Do NOT use this in NestJS services — inject PrismaService instead.
 */
export const prismaClient = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL ?? '' },
  },
  log: process.env.NODE_ENV === 'development'
    ? ['query', 'warn', 'error']
    : ['warn', 'error'],
});
