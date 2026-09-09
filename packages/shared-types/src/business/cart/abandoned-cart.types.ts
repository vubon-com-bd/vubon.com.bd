import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { ABANDONED_CART } from '@vubon/shared-constants/src/business/cart/abandoned-cart.constants';
import { Cart } from './cart.types';

export interface ReminderHistory {
  sentAt: Date;
  type: 'email' | 'sms' | 'push';
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'failed';
  metadata: Record<string, unknown>;
}

export interface AbandonedCart extends BaseEntity {
  abandonedId: string;
  cartId: string;
  cart: Cart;
  userId?: string;
  user?: User;
  email: string;
  phone?: string;
  status: keyof typeof ABANDONED_CART.STATUS | string;
  abandonedAt: Date;
  lastReminderSentAt?: Date;
  reminderCount: number;
  reminderHistory: ReminderHistory[];
  recoveredAt?: Date;
  recoveryMethod?: string;
  metadata: Record<string, unknown>;
}
