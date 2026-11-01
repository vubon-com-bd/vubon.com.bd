/**
 * RequireOrderStatus Decorator Tests
 * @module order-service/test/unit/interfaces/decorators
 */
import {
  RequireOrderStatus,
  ORDER_STATUS_REQUIRED_KEY,
} from '@interfaces/decorators/order-status.decorator.js';

describe('@RequireOrderStatus() decorator', () => {
  it('should set metadata with allowed statuses', () => {
    class TestClass {
      @RequireOrderStatus('pending', 'confirmed')
      testMethod(): void {
        /* noop */
      }
    }
    const metadata = Reflect.getMetadata(
      ORDER_STATUS_REQUIRED_KEY,
      TestClass.prototype.testMethod,
    );
    expect(metadata).toEqual(['pending', 'confirmed']);
  });

  it('should handle empty list', () => {
    class TestClass {
      @RequireOrderStatus()
      testMethod(): void {
        /* noop */
      }
    }
    const metadata = Reflect.getMetadata(
      ORDER_STATUS_REQUIRED_KEY,
      TestClass.prototype.testMethod,
    );
    expect(metadata).toEqual([]);
  });

  it('should export correct metadata key', () => {
    expect(ORDER_STATUS_REQUIRED_KEY).toBe('order_status_allowed');
  });
});
