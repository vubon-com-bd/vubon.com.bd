/**
 * VendorOrder Decorator Tests
 * @module order-service/test/unit/interfaces/decorators
 */
import {
  VendorOrder,
  VENDOR_ORDER_META_KEY,
} from '@interfaces/decorators/vendor-order.decorator.js';

describe('@VendorOrder() decorator', () => {
  it('should set metadata on method', () => {
    class TestClass {
      @VendorOrder()
      testMethod(): void {
        /* noop */
      }
    }
    const metadata = Reflect.getMetadata(
      VENDOR_ORDER_META_KEY,
      TestClass.prototype.testMethod,
    );
    expect(metadata).toBe(true);
  });

  it('should export correct metadata key', () => {
    expect(VENDOR_ORDER_META_KEY).toBe('order_vendor_check');
  });
});
