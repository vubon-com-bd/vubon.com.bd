import {
  OwnOrder,
  OWN_ORDER_METADATA_KEY,
} from '../../../../src/module/interfaces/decorators/own-order.decorator.js';
import {
  VendorOrder,
  VENDOR_ORDER_METADATA_KEY,
} from '../../../../src/module/interfaces/decorators/vendor-order.decorator.js';
import {
  OrderStatus,
  ORDER_STATUS_METADATA_KEY,
} from '../../../../src/module/interfaces/decorators/order-status.decorator.js';

describe('OwnOrder decorator', () => {
  it('exposes metadata key', () => {
    expect(OWN_ORDER_METADATA_KEY).toBe('ownOrder');
  });
  it('applies to method', () => {
    class T { @OwnOrder() method() {} }
    const meta = Reflect.getMetadata(OWN_ORDER_METADATA_KEY, T.prototype.method);
    expect(meta).toBe(true);
  });
});

describe('VendorOrder decorator', () => {
  it('exposes metadata key', () => {
    expect(VENDOR_ORDER_METADATA_KEY).toBe('vendorOrder');
  });
  it('applies to method', () => {
    class T { @VendorOrder() method() {} }
    const meta = Reflect.getMetadata(VENDOR_ORDER_METADATA_KEY, T.prototype.method);
    expect(meta).toBe(true);
  });
});

describe('OrderStatus decorator', () => {
  it('exposes metadata key', () => {
    expect(ORDER_STATUS_METADATA_KEY).toBe('orderStatus');
  });
  it('stores list of statuses', () => {
    class T { @OrderStatus('pending', 'confirmed') method() {} }
    const meta = Reflect.getMetadata(ORDER_STATUS_METADATA_KEY, T.prototype.method);
    expect(meta).toEqual(['pending', 'confirmed']);
  });
});
