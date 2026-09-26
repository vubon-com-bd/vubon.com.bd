import { PrismaClient } from '@prisma/client';
import { getOptionalEnv } from '@vubon/shared-config/common';

export const prismaClient = new PrismaClient({
  datasources: {
    db: { url: getOptionalEnv('DATABASE_URL', '') },
  },
});
