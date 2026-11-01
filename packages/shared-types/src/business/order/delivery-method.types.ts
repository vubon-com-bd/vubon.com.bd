/**
 * Delivery Method Types
 * @module shared-types/business/order
 */
import type { Money } from '../../common/primitives/index.js';

export interface DeliveryMethod {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly carrier?: string;
  readonly baseCost: Money;
  readonly currency: string;
  readonly estimatedDays: number;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface DeliveryMethodPublic {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly carrier?: string;
  readonly baseCost: Money;
  readonly currency: string;
  readonly estimatedDays: number;
  readonly isFree: boolean;
}
