/**
 * Mock for @prisma/client — prevents native engine load on Termux ARM64
 * @module order-service/test/__mocks__
 */
export class PrismaClient {
  $connect = async (): Promise<void> => undefined;
  $disconnect = async (): Promise<void> => undefined;
  $queryRaw = async (): Promise<unknown[]> => [{ 1: 1 }];
  $transaction = async (fnOrArr: unknown): Promise<unknown> => {
    if (typeof fnOrArr === 'function') return (fnOrArr as (arg: unknown) => unknown)(this);
    return [];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const Prisma = {
  // Add minimal Prisma namespace for type resolution
};
