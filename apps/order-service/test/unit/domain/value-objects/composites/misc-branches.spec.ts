/**
 * Miscellaneous VO branches
 * @module order-service/test/unit/domain/value-objects/composites
 */
import { describe, it, expect } from '@jest/globals';
import { OrderHistoryVO } from '@domain/composites/order-history.vo.js';
import { OrderItemVO } from '@domain/composites/order-item.vo.js';
import { OrderTrackingVO } from '@domain/composites/order-tracking.vo.js';
import { HistoryIdVO } from '@domain/primitives/history-id.vo.js';
import { HistoryTypeVO } from '@domain/primitives/history-type.vo.js';
import { OrderIdVO } from '@domain/primitives/order-id.vo.js';
import { OrderItemIdVO } from '@domain/primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '@domain/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '@domain/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '@domain/primitives/order-item-status.vo.js';
import { ProductIdVO } from '@domain/primitives/product-id.vo.js';
import { TrackingIdVO } from '@domain/primitives/tracking-id.vo.js';
import { TrackingStatusVO } from '@domain/primitives/tracking-status.vo.js';
import { TrackingNumberVO } from '@domain/primitives/tracking-number.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ID = '550e8400-e29b-41d4-a716-446655440000';
const ID_2 = '660f9511-f3ac-52e5-b827-557766551111';

describe('OrderHistoryVO branches', () => {
  it('throws for empty message', () => {
    expect(() =>
      OrderHistoryVO.create({
        id: HistoryIdVO.create(ID),
        orderId: OrderIdVO.create(ID_2),
        type: HistoryTypeVO.create('created'),
        message: '   ',
        occurredAt: '2024-06-15T10:00:00.000Z',
      }),
    ).toThrow(ValidationError);
  });

  it('throws for too long message', () => {
    expect(() =>
      OrderHistoryVO.create({
        id: HistoryIdVO.create(ID),
        orderId: OrderIdVO.create(ID_2),
        type: HistoryTypeVO.create('created'),
        message: 'x'.repeat(2001),
        occurredAt: '2024-06-15T10:00:00.000Z',
      }),
    ).toThrow(ValidationError);
  });

  it('isSystemGenerated returns true for created', () => {
    const vo = OrderHistoryVO.create({
      id: HistoryIdVO.create(ID),
      orderId: OrderIdVO.create(ID_2),
      type: HistoryTypeVO.create('created'),
      message: 'Order created',
      occurredAt: '2024-06-15T10:00:00.000Z',
    });
    expect(vo.isSystemGenerated()).toBe(true);
  });

  it('hasPerformer returns false when no performer', () => {
    const vo = OrderHistoryVO.create({
      id: HistoryIdVO.create(ID),
      orderId: OrderIdVO.create(ID_2),
      type: HistoryTypeVO.create('created'),
      message: 'Order created',
      occurredAt: '2024-06-15T10:00:00.000Z',
    });
    expect(vo.hasPerformer()).toBe(false);
  });

  it('hasPerformer returns true when performer set', () => {
    const vo = OrderHistoryVO.create({
      id: HistoryIdVO.create(ID),
      orderId: OrderIdVO.create(ID_2),
      type: HistoryTypeVO.create('created'),
      message: 'Order created',
      performedBy: 'admin',
      occurredAt: '2024-06-15T10:00:00.000Z',
    });
    expect(vo.hasPerformer()).toBe(true);
  });
});

describe('OrderItemVO branches', () => {
  it('throws for empty name', () => {
    expect(() =>
      OrderItemVO.create({
        id: OrderItemIdVO.create(ID),
        orderId: OrderIdVO.create(ID_2),
        productId: ProductIdVO.create(ID),
        name: '',
        sku: 'SKU-1',
        quantity: OrderItemQuantityVO.create(1),
        unitPrice: OrderItemPriceVO.create(100, 'BDT'),
        status: OrderItemStatusVO.pending(),
      }),
    ).toThrow(ValidationError);
  });

  it('throws for empty sku', () => {
    expect(() =>
      OrderItemVO.create({
        id: OrderItemIdVO.create(ID),
        orderId: OrderIdVO.create(ID_2),
        productId: ProductIdVO.create(ID),
        name: 'X',
        sku: '',
        quantity: OrderItemQuantityVO.create(1),
        unitPrice: OrderItemPriceVO.create(100, 'BDT'),
        status: OrderItemStatusVO.pending(),
      }),
    ).toThrow(ValidationError);
  });

  it('hasVariant returns false when no variant', () => {
    const vo = OrderItemVO.create({
      id: OrderItemIdVO.create(ID),
      orderId: OrderIdVO.create(ID_2),
      productId: ProductIdVO.create(ID),
      name: 'X',
      sku: 'SKU-1',
      quantity: OrderItemQuantityVO.create(1),
      unitPrice: OrderItemPriceVO.create(100, 'BDT'),
      status: OrderItemStatusVO.pending(),
    });
    expect(vo.hasVariant()).toBe(false);
  });

  it('isCancellable delegates to status', () => {
    const vo = OrderItemVO.create({
      id: OrderItemIdVO.create(ID),
      orderId: OrderIdVO.create(ID_2),
      productId: ProductIdVO.create(ID),
      name: 'X',
      sku: 'SKU-1',
      quantity: OrderItemQuantityVO.create(1),
      unitPrice: OrderItemPriceVO.create(100, 'BDT'),
      status: OrderItemStatusVO.pending(),
    });
    expect(vo.isCancellable()).toBe(true);
  });
});

describe('OrderTrackingVO branches', () => {
  it('throws for empty message', () => {
    expect(() =>
      OrderTrackingVO.create({
        id: TrackingIdVO.create(ID),
        orderId: OrderIdVO.create(ID_2),
        status: TrackingStatusVO.create('in_transit'),
        trackingNumber: TrackingNumberVO.create('TRK-ABCD1234'),
        message: '',
        occurredAt: '2024-06-15T10:00:00.000Z',
      }),
    ).toThrow(ValidationError);
  });

  it('hasLocation returns false when no location', () => {
    const vo = OrderTrackingVO.create({
      id: TrackingIdVO.create(ID),
      orderId: OrderIdVO.create(ID_2),
      status: TrackingStatusVO.create('in_transit'),
      trackingNumber: TrackingNumberVO.create('TRK-ABCD1234'),
      message: 'In transit',
      occurredAt: '2024-06-15T10:00:00.000Z',
    });
    expect(vo.hasLocation()).toBe(false);
  });

  it('hasCarrier returns false when no carrier', () => {
    const vo = OrderTrackingVO.create({
      id: TrackingIdVO.create(ID),
      orderId: OrderIdVO.create(ID_2),
      status: TrackingStatusVO.create('in_transit'),
      trackingNumber: TrackingNumberVO.create('TRK-ABCD1234'),
      message: 'In transit',
      occurredAt: '2024-06-15T10:00:00.000Z',
    });
    expect(vo.hasCarrier()).toBe(false);
  });

  it('isTerminal returns true for delivered', () => {
    const vo = OrderTrackingVO.create({
      id: TrackingIdVO.create(ID),
      orderId: OrderIdVO.create(ID_2),
      status: TrackingStatusVO.create('delivered'),
      trackingNumber: TrackingNumberVO.create('TRK-ABCD1234'),
      message: 'Delivered',
      occurredAt: '2024-06-15T10:00:00.000Z',
    });
    expect(vo.isTerminal()).toBe(true);
  });
});
