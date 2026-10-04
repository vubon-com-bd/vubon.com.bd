/**
 * DeliverySchedulerService — DI-injectable wrapper for domain scheduling
 * @module order-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { DeliverySchedulingService } from '../../../domain/services/delivery-scheduling.service.js';

export const DELIVERY_SCHEDULER = Symbol('DELIVERY_SCHEDULER');

export interface DeliveryEstimate {
  readonly estimatedAt: string;
  readonly earliestAt: string;
  readonly latestAt: string;
  readonly estimatedDays: number;
}

export interface IDeliverySchedulerService {
  estimateForType(type: string, fromDate?: Date): DeliveryEstimate;
  estimate(days: number, fromDate?: Date): DeliveryEstimate;
  canAttemptNow(at?: Date): boolean;
  nextAvailableSlot(at?: Date): Date;
  graceEnd(scheduledAt: Date): Date;
  canRetry(lastAttemptAt: Date, now?: Date): boolean;
}

@Injectable()
export class DeliverySchedulerService implements IDeliverySchedulerService {
  estimateForType(type: string, fromDate: Date = new Date()): DeliveryEstimate {
    return DeliverySchedulingService.estimateForType(type, fromDate);
  }
  estimate(days: number, fromDate: Date = new Date()): DeliveryEstimate {
    return DeliverySchedulingService.estimate(days, fromDate);
  }
  canAttemptNow(at: Date = new Date()): boolean {
    return DeliverySchedulingService.canAttemptNow(at);
  }
  nextAvailableSlot(at: Date = new Date()): Date {
    return DeliverySchedulingService.nextAvailableSlot(at);
  }
  graceEnd(scheduledAt: Date): Date {
    return DeliverySchedulingService.graceEnd(scheduledAt);
  }
  canRetry(lastAttemptAt: Date, now: Date = new Date()): boolean {
    return DeliverySchedulingService.canRetry(lastAttemptAt, now);
  }
}
