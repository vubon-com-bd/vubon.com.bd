import { PaymentOwner, PAYMENT_OWNER_METADATA_KEY } from '../../../../src/module/interfaces/decorators/payment-owner.decorator.js';
import { PaymentStatus, PAYMENT_STATUS_METADATA_KEY } from '../../../../src/module/interfaces/decorators/payment-status.decorator.js';

describe('PaymentOwner decorator', () => {
  it('sets metadata key=true on method', () => {
    class Dummy {
      @PaymentOwner()
      handler(): void {}
    }
    const meta = Reflect.getMetadata(PAYMENT_OWNER_METADATA_KEY, Dummy.prototype.handler);
    expect(meta).toBe(true);
  });
});

describe('PaymentStatus decorator', () => {
  it('sets status metadata array on method', () => {
    class Dummy {
      @PaymentStatus('captured', 'paid')
      handler(): void {}
    }
    const meta = Reflect.getMetadata(PAYMENT_STATUS_METADATA_KEY, Dummy.prototype.handler);
    expect(meta).toEqual(['captured', 'paid']);
  });
});
