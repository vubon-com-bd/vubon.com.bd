/**
 * App structure — E2E (metadata check, no Prisma bootstrap)
 * @module test/e2e/modules
 */
import 'reflect-metadata';
import { PaymentAppModule } from '@modules/app.module';

describe('AppModule Structure (E2E)', () => {
  it('AppModule is defined', () => {
    expect(PaymentAppModule).toBeDefined();
  });

  it('imports at least 14 modules (Config + Cqrs + Common + Health + Gateway + 9 features)', () => {
    const imports = Reflect.getMetadata('imports', PaymentAppModule) as unknown[];
    expect(imports).toBeDefined();
    expect(imports.length).toBeGreaterThanOrEqual(14);
  });
});
