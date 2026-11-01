/**
 * ReminderChainService — schedules multi-step reminder sequences
 * @module notification-service/application/services/impl
 *
 * Handles:
 *  - Abandoned cart: 1h, 24h, 72h reminders
 *  - Payment failed: 1d, 3d, 7d retry reminders
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  SCHEDULE_SERVICE,
  type IScheduleService,
} from '../interfaces/schedule.service.interface.js';

export const REMINDER_CHAIN_SERVICE = Symbol('REMINDER_CHAIN_SERVICE');

export interface ReminderChain {
  readonly name: string;
  readonly steps: readonly {
    readonly delayHours: number;
    readonly templateType: string;
    readonly subject: string;
    readonly bodyTemplate: string;
  }[];
}

const ABANDONED_CART_CHAIN: ReminderChain = {
  name: 'abandoned-cart',
  steps: [
    {
      delayHours: 1,
      templateType: 'CART_ABANDONED_1H',
      subject: 'আপনার কার্টে পণ্য অপেক্ষা করছে!',
      bodyTemplate: 'আপনার কার্টে {{itemCount}}টি পণ্য রয়েছে। এখনই চেকআউট করুন।',
    },
    {
      delayHours: 24,
      templateType: 'CART_ABANDONED_24H',
      subject: '২৪ ঘণ্টা হয়ে গেল — আপনার পণ্য এখনো অপেক্ষা করছে',
      bodyTemplate: 'আপনার কার্টের পণ্যগুলো শীঘ্রই স্টক শেষ হতে পারে। এখনই অর্ডার করুন!',
    },
    {
      delayHours: 72,
      templateType: 'CART_ABANDONED_72H',
      subject: 'শেষ সুযোগ — আপনার কার্ট ৩ দিনের জন্য সংরক্ষিত',
      bodyTemplate: 'আপনার কার্টের পণ্য ৩ দিন পর মুছে যাবে। এখনই চেকআউট করুন!',
    },
  ],
};

const PAYMENT_RETRY_CHAIN: ReminderChain = {
  name: 'payment-retry',
  steps: [
    {
      delayHours: 24,
      templateType: 'PAYMENT_RETRY_1D',
      subject: 'পেমেন্ট সম্পন্ন হয়নি — আবার চেষ্টা করুন',
      bodyTemplate: 'আপনার অর্ডার #{{orderId}}-এর পেমেন্ট ব্যর্থ হয়েছে। ৳{{amount}} পেমেন্ট করতে আবার চেষ্টা করুন।',
    },
    {
      delayHours: 72,
      templateType: 'PAYMENT_RETRY_3D',
      subject: 'আপনার অর্ডার #{{orderId}} এখনো অপেক্ষা করছে',
      bodyTemplate: '৩ দিন হয়ে গেল, পেমেন্ট সম্পন্ন হয়নি। আপনার অর্ডার বাতিল হতে পারে।',
    },
    {
      delayHours: 168, // 7 days
      templateType: 'PAYMENT_RETRY_7D',
      subject: 'শেষ সুযোগ — আপনার অর্ডার #{{orderId}} ২৪ ঘণ্টায় বাতিল হবে',
      bodyTemplate: 'আপনার অর্ডার বাতিলের পথে। এখনই পেমেন্ট করুন!',
    },
  ],
};

@Injectable()
export class ReminderChainService {
  private readonly logger = new Logger(ReminderChainService.name);

  constructor(
    @Inject(SCHEDULE_SERVICE)
    private readonly scheduleService: IScheduleService,
  ) {}

  /**
   * Schedule abandoned cart reminder chain
   */
  async scheduleAbandonedCartReminders(input: {
    cartId: string;
    userId: string;
    itemCount: number;
    triggeredAt?: Date;
  }): Promise<readonly string[]> {
    const chain = ABANDONED_CART_CHAIN;
    const baseTime = input.triggeredAt ?? new Date();
    const scheduleIds: string[] = [];

    for (const step of chain.steps) {
      try {
        const scheduledAt = new Date(baseTime.getTime() + step.delayHours * 60 * 60 * 1000);

        const schedule = await this.scheduleService.create({
          name: `${chain.name}-${input.cartId}-${step.delayHours}h`,
          type: 'delayed',
          recurrence: 'none',
          scheduledAt: scheduledAt.toISOString(),
          timezone: 'Asia/Dhaka',
          recipientIds: [input.userId],
          data: {
            templateType: step.templateType,
            cartId: input.cartId,
            itemCount: input.itemCount,
            subject: step.subject,
            bodyTemplate: step.bodyTemplate,
          },
          createdBy: input.userId,
          idempotencyKey: `cart-reminder-${input.cartId}-${step.delayHours}h`,
        } as never);

        scheduleIds.push(schedule.id);
        this.logger.log(
          `  ✅ Cart reminder scheduled: ${step.delayHours}h later → ${schedule.id}`,
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(
          `  ❌ Cart reminder ${step.delayHours}h failed: ${msg}`,
        );
      }
    }

    this.logger.log(
      `📅 Abandoned cart ${input.cartId}: ${scheduleIds.length}/${chain.steps.length} reminders scheduled`,
    );
    return scheduleIds;
  }

  /**
   * Schedule payment retry reminder chain
   */
  async schedulePaymentRetryReminders(input: {
    paymentId: string;
    orderId: string;
    userId: string;
    amount: number;
    currency: string;
    triggeredAt?: Date;
  }): Promise<readonly string[]> {
    const chain = PAYMENT_RETRY_CHAIN;
    const baseTime = input.triggeredAt ?? new Date();
    const scheduleIds: string[] = [];

    for (const step of chain.steps) {
      try {
        const scheduledAt = new Date(baseTime.getTime() + step.delayHours * 60 * 60 * 1000);

        const schedule = await this.scheduleService.create({
          name: `${chain.name}-${input.paymentId}-${step.delayHours}h`,
          type: 'delayed',
          recurrence: 'none',
          scheduledAt: scheduledAt.toISOString(),
          timezone: 'Asia/Dhaka',
          recipientIds: [input.userId],
          data: {
            templateType: step.templateType,
            paymentId: input.paymentId,
            orderId: input.orderId,
            amount: input.amount,
            currency: input.currency,
            subject: step.subject,
            bodyTemplate: step.bodyTemplate,
          },
          createdBy: input.userId,
          idempotencyKey: `pay-reminder-${input.paymentId}-${step.delayHours}h`,
        } as never);

        scheduleIds.push(schedule.id);
        this.logger.log(
          `  ✅ Payment reminder scheduled: ${step.delayHours}h later → ${schedule.id}`,
        );
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.error(
          `  ❌ Payment reminder ${step.delayHours}h failed: ${msg}`,
        );
      }
    }

    this.logger.log(
      `📅 Payment ${input.paymentId}: ${scheduleIds.length}/${chain.steps.length} reminders scheduled`,
    );
    return scheduleIds;
  }
}
