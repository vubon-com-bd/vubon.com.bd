/**
 * PaymentCommonModule — unit test
 * @module test/unit/modules
 */
import 'reflect-metadata';
import { PaymentCommonModule } from '@modules/common/common.module';

describe('PaymentCommonModule', () => {
  it('is defined', () => {
    expect(PaymentCommonModule).toBeDefined();
  });

  it('is marked @Global()', () => {
    const isGlobal = Reflect.getMetadata('__module:global__', PaymentCommonModule);
    expect(isGlobal).toBe(true);
  });
});
