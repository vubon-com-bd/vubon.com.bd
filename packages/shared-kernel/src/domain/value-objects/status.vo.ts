import { ValueObject } from '../base/base.vo';
import { STATUS } from '@vubon/shared-constants';

export type StatusValue = (typeof STATUS)[keyof typeof STATUS];

// Define status categories for transitions
const ORDER_STATUSES = [
  STATUS.ORDER_PENDING,
  STATUS.ORDER_PROCESSING,
  STATUS.ORDER_CONFIRMED,
  STATUS.ORDER_SHIPPED,
  STATUS.ORDER_DELIVERED,
  STATUS.ORDER_CANCELLED,
  STATUS.ORDER_RETURNED,
  STATUS.ORDER_REFUNDED,
] as const;

const PAYMENT_STATUSES = [
  STATUS.PAYMENT_PENDING,
  STATUS.PAYMENT_PROCESSING,
  STATUS.PAYMENT_COMPLETED,
  STATUS.PAYMENT_FAILED,
  STATUS.PAYMENT_CANCELLED,
  STATUS.PAYMENT_REFUNDED,
  STATUS.PAYMENT_PARTIAL_REFUNDED,
] as const;

const DELIVERY_STATUSES = [
  STATUS.DELIVERY_PENDING,
  STATUS.DELIVERY_PICKED,
  STATUS.DELIVERY_IN_TRANSIT,
  STATUS.DELIVERY_OUT_FOR_DELIVERY,
  STATUS.DELIVERY_ATTEMPTED,
  STATUS.DELIVERY_DELIVERED,
  STATUS.DELIVERY_FAILED,
  STATUS.DELIVERY_RETURNED,
] as const;

const PRODUCT_STATUSES = [
  STATUS.PRODUCT_DRAFT,
  STATUS.PRODUCT_PUBLISHED,
  STATUS.PRODUCT_OUT_OF_STOCK,
  STATUS.PRODUCT_DISCONTINUED,
  STATUS.PRODUCT_PENDING_APPROVAL,
  STATUS.PRODUCT_REJECTED,
] as const;

const USER_STATUSES = [
  STATUS.ACTIVE,
  STATUS.INACTIVE,
  STATUS.PENDING,
  STATUS.DELETED,
  STATUS.SUSPENDED,
  STATUS.VERIFIED,
  STATUS.BANNED,
] as const;

type OrderStatus = (typeof ORDER_STATUSES)[number];
type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
type DeliveryStatus = (typeof DELIVERY_STATUSES)[number];
type ProductStatus = (typeof PRODUCT_STATUSES)[number];
type UserStatus = (typeof USER_STATUSES)[number];

export class Status extends ValueObject<StatusValue> {
  protected validate(): void {
    if (!Object.values(STATUS).includes(this._value)) {
      throw new Error(`Invalid status: ${this._value}`);
    }
  }

  // Getter for value (public)
  get status(): StatusValue {
    return this._value;
  }

  // Basic status checks
  isActive(): boolean {
    return this._value === STATUS.ACTIVE;
  }

  isInactive(): boolean {
    return this._value === STATUS.INACTIVE;
  }

  isPending(): boolean {
    return this._value === STATUS.PENDING;
  }

  isDeleted(): boolean {
    return this._value === STATUS.DELETED;
  }

  isSuspended(): boolean {
    return this._value === STATUS.SUSPENDED;
  }

  isVerified(): boolean {
    return this._value === STATUS.VERIFIED;
  }

  isBanned(): boolean {
    return this._value === STATUS.BANNED;
  }

  // Order status checks
  isOrderPending(): boolean {
    return this._value === STATUS.ORDER_PENDING;
  }

  isOrderProcessing(): boolean {
    return this._value === STATUS.ORDER_PROCESSING;
  }

  isOrderConfirmed(): boolean {
    return this._value === STATUS.ORDER_CONFIRMED;
  }

  isOrderShipped(): boolean {
    return this._value === STATUS.ORDER_SHIPPED;
  }

  isOrderDelivered(): boolean {
    return this._value === STATUS.ORDER_DELIVERED;
  }

  isOrderCancelled(): boolean {
    return this._value === STATUS.ORDER_CANCELLED;
  }

  isOrderReturned(): boolean {
    return this._value === STATUS.ORDER_RETURNED;
  }

  isOrderRefunded(): boolean {
    return this._value === STATUS.ORDER_REFUNDED;
  }

  // Payment status checks
  isPaymentPending(): boolean {
    return this._value === STATUS.PAYMENT_PENDING;
  }

  isPaymentProcessing(): boolean {
    return this._value === STATUS.PAYMENT_PROCESSING;
  }

  isPaymentCompleted(): boolean {
    return this._value === STATUS.PAYMENT_COMPLETED;
  }

  isPaymentFailed(): boolean {
    return this._value === STATUS.PAYMENT_FAILED;
  }

  isPaymentRefunded(): boolean {
    return this._value === STATUS.PAYMENT_REFUNDED;
  }

  // Category checks
  private isOrderStatus(value: StatusValue): value is OrderStatus {
    return (ORDER_STATUSES as readonly string[]).includes(value);
  }

  private isPaymentStatus(value: StatusValue): value is PaymentStatus {
    return (PAYMENT_STATUSES as readonly string[]).includes(value);
  }

  private isDeliveryStatus(value: StatusValue): value is DeliveryStatus {
    return (DELIVERY_STATUSES as readonly string[]).includes(value);
  }

  private isProductStatus(value: StatusValue): value is ProductStatus {
    return (PRODUCT_STATUSES as readonly string[]).includes(value);
  }

  private isUserStatus(value: StatusValue): value is UserStatus {
    return (USER_STATUSES as readonly string[]).includes(value);
  }

  isTerminalStatus(): boolean {
    const terminalStatuses: string[] = [
      STATUS.DELETED,
      STATUS.ORDER_DELIVERED,
      STATUS.ORDER_CANCELLED,
      STATUS.ORDER_REFUNDED,
      STATUS.PAYMENT_COMPLETED,
      STATUS.PAYMENT_FAILED,
      STATUS.PAYMENT_CANCELLED,
      STATUS.PAYMENT_REFUNDED,
      STATUS.DELIVERY_DELIVERED,
      STATUS.DELIVERY_FAILED,
      STATUS.DELIVERY_RETURNED,
      STATUS.PRODUCT_DISCONTINUED,
      STATUS.PRODUCT_REJECTED,
    ];
    return terminalStatuses.includes(this._value);
  }

  canTransitionTo(newStatus: Status): boolean {
    const current = this._value;
    const target = newStatus._value;

    // If statuses are the same, no transition needed
    if (current === target) return true;

    // Order status transitions
    if (this.isOrderStatus(current) && this.isOrderStatus(target)) {
      return this.canTransitionOrder(current as OrderStatus, target as OrderStatus);
    }

    // Payment status transitions
    if (this.isPaymentStatus(current) && this.isPaymentStatus(target)) {
      return this.canTransitionPayment(current as PaymentStatus, target as PaymentStatus);
    }

    // Delivery status transitions
    if (this.isDeliveryStatus(current) && this.isDeliveryStatus(target)) {
      return this.canTransitionDelivery(current as DeliveryStatus, target as DeliveryStatus);
    }

    // Product status transitions
    if (this.isProductStatus(current) && this.isProductStatus(target)) {
      return this.canTransitionProduct(current as ProductStatus, target as ProductStatus);
    }

    // User status transitions
    if (this.isUserStatus(current) && this.isUserStatus(target)) {
      return this.canTransitionUser(current as UserStatus, target as UserStatus);
    }

    // Cross-category transitions
    return this.canTransitionCrossCategory(current, target);
  }

  private canTransitionOrder(current: OrderStatus, target: OrderStatus): boolean {
    if (current === STATUS.ORDER_PENDING) {
      return target === STATUS.ORDER_PROCESSING || target === STATUS.ORDER_CANCELLED;
    }
    if (current === STATUS.ORDER_PROCESSING) {
      return target === STATUS.ORDER_CONFIRMED || target === STATUS.ORDER_CANCELLED;
    }
    if (current === STATUS.ORDER_CONFIRMED) {
      return target === STATUS.ORDER_SHIPPED || target === STATUS.ORDER_CANCELLED;
    }
    if (current === STATUS.ORDER_SHIPPED) {
      return target === STATUS.ORDER_DELIVERED || target === STATUS.ORDER_RETURNED;
    }
    if (current === STATUS.ORDER_DELIVERED) {
      return target === STATUS.ORDER_RETURNED;
    }
    if (current === STATUS.ORDER_RETURNED) {
      return target === STATUS.ORDER_REFUNDED;
    }

    return false;
  }

  private canTransitionPayment(current: PaymentStatus, target: PaymentStatus): boolean {
    if (current === STATUS.PAYMENT_PENDING) {
      return (
        target === STATUS.PAYMENT_PROCESSING ||
        target === STATUS.PAYMENT_CANCELLED ||
        target === STATUS.PAYMENT_FAILED
      );
    }
    if (current === STATUS.PAYMENT_PROCESSING) {
      return target === STATUS.PAYMENT_COMPLETED || target === STATUS.PAYMENT_FAILED;
    }
    if (current === STATUS.PAYMENT_COMPLETED) {
      return target === STATUS.PAYMENT_REFUNDED || target === STATUS.PAYMENT_PARTIAL_REFUNDED;
    }
    if (current === STATUS.PAYMENT_PARTIAL_REFUNDED) {
      return target === STATUS.PAYMENT_REFUNDED;
    }

    return false;
  }

  private canTransitionDelivery(current: DeliveryStatus, target: DeliveryStatus): boolean {
    if (current === STATUS.DELIVERY_PENDING) {
      return target === STATUS.DELIVERY_PICKED || target === STATUS.DELIVERY_FAILED;
    }
    if (current === STATUS.DELIVERY_PICKED) {
      return target === STATUS.DELIVERY_IN_TRANSIT || target === STATUS.DELIVERY_FAILED;
    }
    if (current === STATUS.DELIVERY_IN_TRANSIT) {
      return target === STATUS.DELIVERY_OUT_FOR_DELIVERY || target === STATUS.DELIVERY_FAILED;
    }
    if (current === STATUS.DELIVERY_OUT_FOR_DELIVERY) {
      return (
        target === STATUS.DELIVERY_DELIVERED ||
        target === STATUS.DELIVERY_ATTEMPTED ||
        target === STATUS.DELIVERY_FAILED
      );
    }
    if (current === STATUS.DELIVERY_ATTEMPTED) {
      return target === STATUS.DELIVERY_OUT_FOR_DELIVERY || target === STATUS.DELIVERY_RETURNED;
    }
    if (current === STATUS.DELIVERY_RETURNED) {
      return target === STATUS.DELIVERY_PENDING;
    }

    return false;
  }

  private canTransitionProduct(current: ProductStatus, target: ProductStatus): boolean {
    if (current === STATUS.PRODUCT_DRAFT) {
      return target === STATUS.PRODUCT_PENDING_APPROVAL || target === STATUS.PRODUCT_PUBLISHED;
    }
    if (current === STATUS.PRODUCT_PENDING_APPROVAL) {
      return target === STATUS.PRODUCT_PUBLISHED || target === STATUS.PRODUCT_REJECTED;
    }
    if (current === STATUS.PRODUCT_PUBLISHED) {
      return target === STATUS.PRODUCT_OUT_OF_STOCK || target === STATUS.PRODUCT_DISCONTINUED;
    }
    if (current === STATUS.PRODUCT_OUT_OF_STOCK) {
      return target === STATUS.PRODUCT_PUBLISHED || target === STATUS.PRODUCT_DISCONTINUED;
    }

    return false;
  }

  private canTransitionUser(current: UserStatus, target: UserStatus): boolean {
    if (current === STATUS.PENDING) {
      return target === STATUS.VERIFIED || target === STATUS.ACTIVE || target === STATUS.INACTIVE;
    }
    if (current === STATUS.VERIFIED) {
      return target === STATUS.ACTIVE || target === STATUS.INACTIVE || target === STATUS.SUSPENDED;
    }
    if (current === STATUS.ACTIVE) {
      return (
        target === STATUS.INACTIVE ||
        target === STATUS.SUSPENDED ||
        target === STATUS.BANNED ||
        target === STATUS.DELETED
      );
    }
    if (current === STATUS.INACTIVE) {
      return target === STATUS.ACTIVE || target === STATUS.DELETED;
    }
    if (current === STATUS.SUSPENDED) {
      return target === STATUS.ACTIVE || target === STATUS.BANNED || target === STATUS.DELETED;
    }
    if (current === STATUS.BANNED) {
      return target === STATUS.DELETED;
    }

    return false;
  }

  private canTransitionCrossCategory(current: StatusValue, target: StatusValue): boolean {
    // Payment completed -> Order confirmed
    if (current === STATUS.PAYMENT_COMPLETED && target === STATUS.ORDER_CONFIRMED) {
      return true;
    }

    // Order refunded -> Payment refunded
    if (current === STATUS.ORDER_REFUNDED && target === STATUS.PAYMENT_REFUNDED) {
      return true;
    }

    // Order delivered -> Delivery delivered
    if (current === STATUS.ORDER_DELIVERED && target === STATUS.DELIVERY_DELIVERED) {
      return true;
    }

    return false;
  }

  // Static factory methods
  static fromString(value: string): Status {
    return new Status(value as StatusValue);
  }

  static active(): Status {
    return new Status(STATUS.ACTIVE);
  }

  static inactive(): Status {
    return new Status(STATUS.INACTIVE);
  }

  static pending(): Status {
    return new Status(STATUS.PENDING);
  }

  static deleted(): Status {
    return new Status(STATUS.DELETED);
  }

  static suspended(): Status {
    return new Status(STATUS.SUSPENDED);
  }

  static verified(): Status {
    return new Status(STATUS.VERIFIED);
  }

  static banned(): Status {
    return new Status(STATUS.BANNED);
  }

  static orderPending(): Status {
    return new Status(STATUS.ORDER_PENDING);
  }

  static orderProcessing(): Status {
    return new Status(STATUS.ORDER_PROCESSING);
  }

  static orderConfirmed(): Status {
    return new Status(STATUS.ORDER_CONFIRMED);
  }

  static orderShipped(): Status {
    return new Status(STATUS.ORDER_SHIPPED);
  }

  static orderDelivered(): Status {
    return new Status(STATUS.ORDER_DELIVERED);
  }

  static orderCancelled(): Status {
    return new Status(STATUS.ORDER_CANCELLED);
  }

  static paymentPending(): Status {
    return new Status(STATUS.PAYMENT_PENDING);
  }

  static paymentCompleted(): Status {
    return new Status(STATUS.PAYMENT_COMPLETED);
  }

  static paymentFailed(): Status {
    return new Status(STATUS.PAYMENT_FAILED);
  }
}
