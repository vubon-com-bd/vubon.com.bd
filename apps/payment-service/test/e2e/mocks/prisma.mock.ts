/**
 * Prisma mock — bypasses real PrismaClient (engine binary mismatch on ARM64)
 * @module test/e2e/mocks
 *
 * Used by E2E tests to prevent real PrismaClient instantiation, which would
 * fail on Termux ARM64 due to x86_64 engine binaries.
 */
export class PaymentPrismaServiceMock {
  isEngineAvailable(): boolean {
    return false;
  }

  async isHealthy(): Promise<boolean> {
    return false;
  }

  async $connect(): Promise<void> {
    // noop
  }

  async $disconnect(): Promise<void> {
    // noop
  }

  getModel<T>(): T {
    throw new Error(
      'PaymentPrismaEngineUnavailableError — Prisma engine disabled in E2E mock',
    );
  }

  getPaymentModel<T>(): T {
    throw new Error(
      'PaymentPrismaEngineUnavailableError — Prisma engine disabled in E2E mock',
    );
  }
}
