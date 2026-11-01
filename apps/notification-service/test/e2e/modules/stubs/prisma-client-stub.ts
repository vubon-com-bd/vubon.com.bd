/**
 * @prisma/client stub for Termux ARM64 E2E tests
 * @module notification-service/test/e2e/modules/stubs
 *
 * Mapped via jest config `moduleNameMapper`.
 * Real @prisma/client can't load native engine on Termux ARM64.
 */
export class PrismaClient {
  $connect = async (): Promise<void> => undefined;
  $disconnect = async (): Promise<void> => undefined;
  $queryRaw = async (): Promise<unknown[]> => [];
  $queryRawUnsafe = async (): Promise<unknown[]> => [];
  $executeRaw = async (): Promise<number> => 0;
  $executeRawUnsafe = async (): Promise<number> => 0;
  $transaction = async <T>(fn: () => Promise<T>): Promise<T> => fn();
  $on = (): void => undefined;
  $use = (): void => undefined;
  $extends = (): PrismaClient => this;
}

export const Prisma = {
  Decimal: class Decimal {
    constructor(public value: number | string) {}
    toNumber(): number { return Number(this.value); }
    toString(): string { return String(this.value); }
  },
  JsonNull: null,
  JsonObject: {},
  JsonArray: [],
  DbNull: null,
  AnyNull: null,
};

export default { PrismaClient, Prisma };
