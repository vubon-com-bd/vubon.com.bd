import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { OrderNumberVO } from '../value-objects/primitives/order-number.vo';
import { OrderStatusVO } from '../value-objects/primitives/order-status.vo';
import { OrderSubtotalVO } from '../value-objects/primitives/order-subtotal.vo';
import { OrderDiscountVO } from '../value-objects/primitives/order-discount.vo';
import { OrderTaxVO } from '../value-objects/primitives/order-tax.vo';
import { OrderShippingVO } from '../value-objects/primitives/order-shipping.vo';
import { OrderTotalVO } from '../value-objects/primitives/order-total.vo';
import { OrderChannelVO } from '../value-objects/primitives/order-channel.vo';
import { OrderSourceVO } from '../value-objects/primitives/order-source.vo';
import { OrderNoteVO } from '../value-objects/primitives/order-note.vo';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo';
import {
  OrderCreatedEvent,
  OrderConfirmedEvent,
  OrderProcessingEvent,
  OrderShippedEvent,
  OrderDeliveredEvent,
  OrderCancelledEvent,
} from '../events/order.events';

export interface OrderEntityProps {
  readonly orderNumber: OrderNumberVO;
  readonly customerId: CustomerIdVO;
  readonly vendorId: VendorIdVO | null;
  readonly status: OrderStatusVO;
  readonly channel: OrderChannelVO;
  readonly source: OrderSourceVO;
  readonly subtotal: OrderSubtotalVO;
  readonly discount: OrderDiscountVO;
  readonly tax: OrderTaxVO;
  readonly shipping: OrderShippingVO;
  readonly total: OrderTotalVO;
  readonly note: OrderNoteVO | null;
  readonly paymentId: PaymentIdVO | null;
}

export class OrderEntity extends AggregateRoot<OrderIdVO> {
  private readonly _orderNumber: OrderNumberVO;
  private readonly _customerId: CustomerIdVO;
  private readonly _vendorId: VendorIdVO | null;
  private readonly _status: OrderStatusVO;
  private readonly _channel: OrderChannelVO;
  private readonly _source: OrderSourceVO;
  private readonly _subtotal: OrderSubtotalVO;
  private readonly _discount: OrderDiscountVO;
  private readonly _tax: OrderTaxVO;
  private readonly _shipping: OrderShippingVO;
  private readonly _total: OrderTotalVO;
  private readonly _note: OrderNoteVO | null;
  private readonly _paymentId: PaymentIdVO | null;

  private constructor(
    id: OrderIdVO,
    props: OrderEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderNumber = props.orderNumber;
    this._customerId = props.customerId;
    this._vendorId = props.vendorId;
    this._status = props.status;
    this._channel = props.channel;
    this._source = props.source;
    this._subtotal = props.subtotal;
    this._discount = props.discount;
    this._tax = props.tax;
    this._shipping = props.shipping;
    this._total = props.total;
    this._note = props.note;
    this._paymentId = props.paymentId;
  }

  static create(props: OrderEntityProps): OrderEntity {
    const now = new Date().toISOString();
    const id = OrderIdVO.create(crypto.randomUUID());
    const entity = new OrderEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new OrderCreatedEvent(
        id.value,
        id.value,
        props.orderNumber.value,
        props.customerId.value,
        props.total.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: OrderIdVO,
    props: OrderEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): OrderEntity {
    return new OrderEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  confirm(paymentId: PaymentIdVO): OrderEntity {
    const updated = new OrderEntity(
      this.id,
      { ...this._toProps(), status: OrderStatusVO.create('confirmed'), paymentId },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new OrderConfirmedEvent(this.id.value, this.id.value, paymentId.value, this.version + 1),
    );
    return updated;
  }

  startProcessing(): OrderEntity {
    const updated = new OrderEntity(
      this.id,
      { ...this._toProps(), status: OrderStatusVO.create('processing') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new OrderProcessingEvent(this.id.value, this.id.value, this.version + 1),
    );
    return updated;
  }

  ship(trackingNumber: string | null): OrderEntity {
    const updated = new OrderEntity(
      this.id,
      { ...this._toProps(), status: OrderStatusVO.create('shipped') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new OrderShippedEvent(this.id.value, this.id.value, trackingNumber, this.version + 1),
    );
    return updated;
  }

  deliver(): OrderEntity {
    const now = new Date().toISOString();
    const updated = new OrderEntity(
      this.id,
      { ...this._toProps(), status: OrderStatusVO.create('delivered') },
      this.createdAt,
      now,
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new OrderDeliveredEvent(this.id.value, this.id.value, now, this.version + 1),
    );
    return updated;
  }

  cancel(reason: string): OrderEntity {
    const updated = new OrderEntity(
      this.id,
      { ...this._toProps(), status: OrderStatusVO.create('cancelled') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new OrderCancelledEvent(this.id.value, this.id.value, reason, this.version + 1),
    );
    return updated;
  }

  get orderNumber(): OrderNumberVO { return this._orderNumber; }
  get customerId(): CustomerIdVO { return this._customerId; }
  get vendorId(): VendorIdVO | null { return this._vendorId; }
  get status(): OrderStatusVO { return this._status; }
  get channel(): OrderChannelVO { return this._channel; }
  get source(): OrderSourceVO { return this._source; }
  get subtotal(): OrderSubtotalVO { return this._subtotal; }
  get discount(): OrderDiscountVO { return this._discount; }
  get tax(): OrderTaxVO { return this._tax; }
  get shipping(): OrderShippingVO { return this._shipping; }
  get total(): OrderTotalVO { return this._total; }
  get note(): OrderNoteVO | null { return this._note; }
  get paymentId(): PaymentIdVO | null { return this._paymentId; }

  private _toProps(): OrderEntityProps {
    return {
      orderNumber: this._orderNumber,
      customerId: this._customerId,
      vendorId: this._vendorId,
      status: this._status,
      channel: this._channel,
      source: this._source,
      subtotal: this._subtotal,
      discount: this._discount,
      tax: this._tax,
      shipping: this._shipping,
      total: this._total,
      note: this._note,
      paymentId: this._paymentId,
    };
  }
}
