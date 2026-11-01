/**
 * Test DB Helper — direct DB utilities
 * @module logistics-service/test/helpers
 */
import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient | undefined;

export function getTestPrisma(): PrismaClient {
  if (!prismaClient) {
    prismaClient = new PrismaClient({
      datasources: {
        db: {
          url:
            process.env['TEST_DATABASE_URL'] ??
            process.env['DATABASE_URL'] ??
            'postgresql://localhost:5432/vubon_product',
        },
      },
    });
  }
  return prismaClient;
}

export async function disconnectTestPrisma(): Promise<void> {
  if (prismaClient) {
    await prismaClient.$disconnect();
    prismaClient = undefined;
  }
}

export async function deleteTestProductBySku(sku: string): Promise<void> {
  const prisma = getTestPrisma();
  try {
    await prisma.product.deleteMany({ where: { sku } });
  } catch {
    /* ignore degraded mode */
  }
}
