/**
 * Order Delivery Types — order-service specific view of delivery
 * @module shared-types/business/order
 *
 * NOTE: renamed to `OrderDelivery*` to avoid clash with
 *       `logistics/delivery.types.ts` (`Delivery`, `DeliveryStatusValue`, ...).
 */
import type {
  DELIVERY_STATUS,
  DELIVERY_TYPE,
} from '@vubon/shared-constants/logistics';
import type {
  OrderId,
  DeliveryId,
  Money,
} from '../../common/primitives/index.js';
import type { BaseEntity } from '../../common/base/index.js';

export type OrderDeliveryStatusValue =
  (typeof DELIVERY_STATUS)[keyof typeof DELIVERY_STATUS];
export type OrderDeliveryTypeValue =
  (typeof DELIVERY_TYPE)[keyof typeof DELIVERY_TYPE];

export interface OrderDelivery extends BaseEntity<DeliveryId> {
  readonly orderId: OrderId;
  readonly deliveryMethodId?: string;
  readonly status: OrderDeliveryStatusValue;
  readonly type: OrderDeliveryTypeValue;
  readonly trackingNumber?: string;
  readonly courierId?: string;
  readonly estimatedAt?: string;
  readonly deliveredAt?: string;
  readonly attempts: number;
  readonly notes?: string;
}

export interface OrderDeliveryDTO {
  readonly id: DeliveryId;
  readonly orderId: OrderId;
  readonly deliveryMethodId?: string;
  readonly status: OrderDeliveryStatusValue;
  readonly type: OrderDeliveryTypeValue;
  readonly trackingNumber?: string;
  readonly courierId?: string;
  readonly estimatedAt?: string;
  readonly deliveredAt?: string;
  readonly attempts: number;
  readonly notes?: string;
  readonly isInTransit: boolean;
  readonly isComplete: boolean;
  readonly canRetry: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface DeliveryMethodDTO {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly carrier?: string;
  readonly baseCost: Money;
  readonly currency: string;
  readonly estimatedDays: number;
  readonly isActive: boolean;
  readonly isFree: boolean;
  readonly isFast: boolean;
}

export interface ScheduleDeliveryInput {
  readonly orderId: OrderId;
  readonly deliveryMethodId?: string;
  readonly type?: OrderDeliveryTypeValue;
  readonly estimatedAt?: string;
  readonly notes?: string;
}

export interface RescheduleDeliveryInput {
  readonly deliveryId: DeliveryId;
  readonly orderId: OrderId;
  readonly reason: string;
  readonly newEstimatedAt?: string;
}

export interface ConfirmDeliveryInput {
  readonly deliveryId: DeliveryId;
  readonly orderId: OrderId;
  readonly receivedBy?: string;
  readonly signature?: string;
  readonly notes?: string;
}
