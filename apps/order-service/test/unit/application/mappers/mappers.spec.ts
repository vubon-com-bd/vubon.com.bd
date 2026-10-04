/**
 * Application Mappers — smoke tests (entity → DTO shape)
 */
import { OrderMapper } from '../../../../src/module/application/mappers/order.mapper.js';
import { OrderItemMapper } from '../../../../src/module/application/mappers/order-item.mapper.js';
import { CheckoutMapper } from '../../../../src/module/application/mappers/checkout.mapper.js';
import { DeliveryMapper } from '../../../../src/module/application/mappers/delivery.mapper.js';
import { CancelMapper } from '../../../../src/module/application/mappers/cancel.mapper.js';
import { ReturnMapper } from '../../../../src/module/application/mappers/return.mapper.js';
import { FulfillmentMapper } from '../../../../src/module/application/mappers/fulfillment.mapper.js';
import { TrackingMapper } from '../../../../src/module/application/mappers/tracking.mapper.js';
import {
  makeOrder,
  makeItem,
  UUID_ORDER,
} from '../services/_helpers.js';
import { CheckoutEntity } from '../../../../src/module/domain/entities/checkout.entity.js';
import { CheckoutStatusVO } from '../../../../src/module/domain/value-objects/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../../../../src/module/domain/value-objects/primitives/checkout-step.vo.js';
import { CustomerIdVO } from '../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { DeliveryEntity } from '../../../../src/module/domain/entities/delivery.entity.js';
import { DeliveryStatusVO } from '../../../../src/module/domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../../../../src/module/domain/value-objects/primitives/delivery-type.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { OrderCancelEntity } from '../../../../src/module/domain/entities/order-cancel.entity.js';
import { CancelReasonVO } from '../../../../src/module/domain/value-objects/primitives/cancel-reason.vo.js';
import { CancelStatusVO } from '../../../../src/module/domain/value-objects/primitives/cancel-status.vo.js';
import { OrderReturnEntity } from '../../../../src/module/domain/entities/order-return.entity.js';
import { ReturnReasonVO } from '../../../../src/module/domain/value-objects/primitives/return-reason.vo.js';
import { ReturnStatusVO } from '../../../../src/module/domain/value-objects/primitives/return-status.vo.js';
import { OrderItemIdVO } from '../../../../src/module/domain/value-objects/primitives/order-item-id.vo.js';
import { OrderFulfillmentEntity } from '../../../../src/module/domain/entities/order-fulfillment.entity.js';
import { FulfillmentStatusVO } from '../../../../src/module/domain/value-objects/primitives/fulfillment-status.vo.js';
import { OrderTrackingEntity } from '../../../../src/module/domain/entities/order-tracking.entity.js';
import { TrackingStatusVO } from '../../../../src/module/domain/value-objects/primitives/tracking-status.vo.js';

const NOW = '2026-01-01T10:00:00Z';
const FUTURE = '2027-01-01T10:00:00Z';
const UUID_CUSTOMER = '22222222-2222-4222-8222-222222222222';
const UUID_ITEM = '44444444-4444-4444-8444-444444444444';

describe('OrderMapper', () => {
  it('toResponse maps full order', () => {
    const dto = OrderMapper.toResponse(makeOrder());
    expect(dto.id).toBe(UUID_ORDER);
    expect(dto.orderNumber).toBe('ORD-2026-000001');
    expect(dto.items).toHaveLength(1);
    expect(dto.total).toBe(100);
  });

  it('toPublicResponse redacts sensitive fields', () => {
    const dto = OrderMapper.toPublicResponse(makeOrder());
    expect(dto.id).toBe(UUID_ORDER);
    expect((dto as Record<string, unknown>).customerId).toBeUndefined();
    expect((dto as Record<string, unknown>).paymentId).toBeUndefined();
  });

  it('toSummary', () => {
    const dto = OrderMapper.toSummary(makeOrder());
    expect(dto.id).toBe(UUID_ORDER);
    expect(dto.itemCount).toBe(1);
  });

  it('toListResponse', () => {
    const dto = OrderMapper.toListResponse([makeOrder()], 1, 1, 20);
    expect(dto.items).toHaveLength(1);
    expect(dto.totalPages).toBe(1);
  });

  it('toDetail wraps order + items', () => {
    const dto = OrderMapper.toDetail(makeOrder());
    expect(dto.order.id).toBe(UUID_ORDER);
    expect(dto.items).toHaveLength(1);
    expect(dto.statusHistory).toEqual([]);
  });
});

describe('OrderItemMapper', () => {
  it('toResponse maps item', () => {
    const dto = OrderItemMapper.toResponse(makeItem());
    expect(dto.id).toBe(UUID_ITEM);
    expect(dto.lineSubtotal).toBe(100);
  });

  it('toResponseList maps array', () => {
    const list = OrderItemMapper.toResponseList([makeItem(), makeItem()]);
    expect(list).toHaveLength(2);
  });
});

describe('CheckoutMapper', () => {
  function makeCheckout(): CheckoutEntity {
    return CheckoutEntity.create({
      id: '77777777-7777-4777-8777-777777777777',
      now: NOW,
      props: {
        customerId: CustomerIdVO.create(UUID_CUSTOMER),
        status: CheckoutStatusVO.pending(),
        currentStep: CheckoutStepVO.create('cart_review'),
        type: 'registered',
        currency: 'BDT',
        subtotal: 0,
        discountAmount: 0,
        taxAmount: 0,
        shippingAmount: 0,
        total: 0,
        expiresAt: FUTURE,
      },
    });
  }

  it('toResponse maps checkout', () => {
    const dto = CheckoutMapper.toResponse(makeCheckout());
    expect(dto.id).toBeDefined();
    expect(dto.remainingSteps.length).toBeGreaterThan(0);
  });
});

describe('DeliveryMapper', () => {
  function makeDelivery(): DeliveryEntity {
    return DeliveryEntity.create({
      id: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      now: NOW,
      props: {
        orderId: OrderIdVO.create(UUID_ORDER),
        status: DeliveryStatusVO.scheduled(),
        type: DeliveryTypeVO.create('standard'),
        attempts: 0,
      },
    });
  }

  it('toResponse maps delivery', () => {
    const dto = DeliveryMapper.toResponse(makeDelivery());
    expect(dto.status).toBe('scheduled');
    expect(dto.isComplete).toBe(false);
  });

  it('toList maps array', () => {
    expect(DeliveryMapper.toList([makeDelivery()])).toHaveLength(1);
  });
});

describe('CancelMapper', () => {
  function makeCancel(): OrderCancelEntity {
    return OrderCancelEntity.create({
      id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      now: NOW,
      props: {
        orderId: OrderIdVO.create(UUID_ORDER),
        reason: CancelReasonVO.create('customer_request'),
        status: CancelStatusVO.requested(),
        requestedBy: CustomerIdVO.create(UUID_CUSTOMER),
        currency: 'BDT',
        restockInventory: true,
        requestedAt: NOW,
      },
    });
  }

  it('toResponse', () => {
    const dto = CancelMapper.toResponse(makeCancel());
    expect(dto.reason).toBe('customer_request');
    expect(dto.status).toBe('requested');
  });

  it('toList', () => {
    const dto = CancelMapper.toList([makeCancel()]);
    expect(dto.items).toHaveLength(1);
  });
});

describe('ReturnMapper', () => {
  function makeReturn(): OrderReturnEntity {
    return OrderReturnEntity.create({
      id: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',
      now: NOW,
      props: {
        orderId: OrderIdVO.create(UUID_ORDER),
        customerId: CustomerIdVO.create(UUID_CUSTOMER),
        status: ReturnStatusVO.requested(),
        reason: ReturnReasonVO.create('defective'),
        itemIds: [OrderItemIdVO.create(UUID_ITEM)],
        images: [],
        currency: 'BDT',
        requestedAt: NOW,
      },
    });
  }

  it('toResponse with netRefund', () => {
    const dto = ReturnMapper.toResponse(makeReturn());
    expect(dto.status).toBe('requested');
    expect(dto.netRefund).toBe(0);
  });

  it('toList', () => {
    expect(ReturnMapper.toList([makeReturn()]).items).toHaveLength(1);
  });
});

describe('FulfillmentMapper', () => {
  function makeFulfillment(): OrderFulfillmentEntity {
    return OrderFulfillmentEntity.create({
      id: 'ffffffff-ffff-4fff-8fff-ffffffffffff',
      now: NOW,
      props: {
        orderId: OrderIdVO.create(UUID_ORDER),
        status: FulfillmentStatusVO.unfulfilled(),
        type: 'standard',
        itemIds: [OrderItemIdVO.create(UUID_ITEM)],
        currency: 'BDT',
      },
    });
  }

  it('toResponse', () => {
    const dto = FulfillmentMapper.toResponse(makeFulfillment());
    expect(dto.status).toBe('unfulfilled');
    expect(dto.itemCount).toBe(1);
  });

  it('toList', () => {
    expect(FulfillmentMapper.toList([makeFulfillment()]).items).toHaveLength(1);
  });
});

describe('TrackingMapper', () => {
  function makeTracking(): OrderTrackingEntity {
    return OrderTrackingEntity.create({
      id: 'tttttttt-tttt-4ttt-8ttt-tttttttttttt',
      now: NOW,
      props: {
        orderId: OrderIdVO.create(UUID_ORDER),
        event: TrackingStatusVO.create('order_placed'),
        message: 'Order placed',
        occurredAt: NOW,
      },
    });
  }

  it('toResponse', () => {
    const dto = TrackingMapper.toResponse(makeTracking());
    expect(dto.event).toBe('order_placed');
  });

  it('toList', () => {
    expect(TrackingMapper.toList([makeTracking()])).toHaveLength(1);
  });

  it('toSummary picks latest event', () => {
    const list = [makeTracking()];
    const dto = TrackingMapper.toSummary(UUID_ORDER, list);
    expect(dto.orderId).toBe(UUID_ORDER);
    expect(dto.events).toHaveLength(1);
  });
});
