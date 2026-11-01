/**
 * OwnOrder Decorator Tests
 * @module order-service/test/unit/interfaces/decorators
 */
import {
  OwnOrder,
  OWN_ORDER_META_KEY,
} from '@interfaces/decorators/own-order.decorator.js';

describe('@OwnOrder() decorator', () => {
  it('should set metadata on method', () => {
    class TestClass {
      @OwnOrder()
      testMethod(): void {
        /* noop */
      }
    }
    const descriptor = Object.getOwnPropertyDescriptor(
      TestClass.prototype,
      'testMethod',
    );
    expect(descriptor).toBeDefined();
    const metadata = Reflect.getMetadata(
      OWN_ORDER_META_KEY,
      TestClass.prototype.testMethod,
    );
    expect(metadata).toBe(true);
  });

  it('should set metadata on class', () => {
    @OwnOrder()
    class TestClass {
      method(): void {
        /* noop */
      }
    }
    const metadata = Reflect.getMetadata(OWN_ORDER_META_KEY, TestClass);
    expect(metadata).toBe(true);
  });

  it('should export correct metadata key', () => {
    expect(OWN_ORDER_META_KEY).toBe('order_own_check');
  });
});
