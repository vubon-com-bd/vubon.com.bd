import { PrismaClient } from '@prisma/client';

let prismaClient: PrismaClient | null = null;

export const getPrismaClient = (): PrismaClient => {
  if (!prismaClient) {
    prismaClient = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }
  return prismaClient;
};

export const disconnectPrisma = async (): Promise<void> => {
  if (prismaClient) {
    await prismaClient.$disconnect();
    prismaClient = null;
  }
};

export const cleanPrismaDatabase = async (): Promise<void> => {
  const client = getPrismaClient();
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Cannot clean database in production');
  }

  const tables = await client.$queryRaw<{ tablename: string }[]>`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;

  for (const { tablename } of tables) {
    if (tablename !== '_prisma_migrations') {
      await client.$executeRawUnsafe(`TRUNCATE TABLE "${tablename}" CASCADE;`);
    }
  }
};
