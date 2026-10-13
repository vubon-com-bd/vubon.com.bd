/**
 * Test DB Helper — Prisma / DB utilities for tests
 * @module identity-service/test/helpers
 */
import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient | undefined;

/**
 * Get a Prisma client instance for direct DB assertions.
 */
export function getTestPrisma(): PrismaClient {
  if (!prismaClient) {
    prismaClient = new PrismaClient({
      datasources: {
        db: {
          url:
            process.env['TEST_DATABASE_URL'] ??
            process.env['DATABASE_URL'] ??
            'postgresql://localhost:5432/vubon_test',
        },
      },
    });
  }
  return prismaClient;
}

/**
 * Disconnect Prisma client.
 */
export async function disconnectTestPrisma(): Promise<void> {
  if (prismaClient) {
    await prismaClient.$disconnect();
    prismaClient = undefined;
  }
}

/**
 * Clean up test data for a given email.
 */
export async function deleteTestUserByEmail(email: string): Promise<void> {
  const prisma = getTestPrisma();
  try {
    await prisma.user.deleteMany({ where: { email } });
  } catch {
    /* ignore if not found or degraded */
  }
}
