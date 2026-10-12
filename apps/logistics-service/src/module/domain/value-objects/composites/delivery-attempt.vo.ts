/**
 * DeliveryAttemptVO — one physical attempt to deliver
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DeliveryAttemptStatusVO } from '../primitives/delivery-attempt-status.vo.js';
import { AttemptNumberVO } from '../primitives/attempt-number.vo.js';

export interface DeliveryAttemptValue {
  readonly id: string;
  readonly attemptNumber: AttemptNumberVO;
  readonly status: DeliveryAttemptStatusVO;
  readonly reason?: string;
  readonly driverId?: string;
  readonly attemptedAt: string;
  readonly location?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly images: readonly string[];
  readonly notes?: string;
}

export class DeliveryAttemptVO extends BaseVO<DeliveryAttemptValue> {
  private constructor(value: DeliveryAttemptValue) { super(value); }

  static create(input: {
    id: string;
    attemptNumber: number;
    status: string;
    reason?: string;
    driverId?: string;
    attemptedAt: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    images?: readonly string[];
    notes?: string;
  }): DeliveryAttemptVO {
    if (!input.id || input.id.trim().length === 0) {
      throw new ValidationError('DeliveryAttempt id required', 'attemptId');
    }
    if (!input.attemptedAt) {
      throw new ValidationError('attemptedAt required', 'attemptedAt');
    }
    const images = input.images ?? [];
    if (images.length > 5) {
      throw new ValidationError('Delivery attempt images max 5', 'images');
    }
    return new DeliveryAttemptVO({
      id: input.id.trim(),
      attemptNumber: AttemptNumberVO.create(input.attemptNumber),
      status: DeliveryAttemptStatusVO.create(input.status),
      reason: input.reason,
      driverId: input.driverId,
      attemptedAt: input.attemptedAt,
      location: input.location,
      latitude: input.latitude,
      longitude: input.longitude,
      images,
      notes: input.notes,
    });
  }

  static reconstitute(value: DeliveryAttemptValue): DeliveryAttemptVO {
    return new DeliveryAttemptVO(value);
  }

  get id(): string { return this.value.id; }
  get attemptNumber(): AttemptNumberVO { return this.value.attemptNumber; }
  get status(): DeliveryAttemptStatusVO { return this.value.status; }
  get reason(): string | undefined { return this.value.reason; }
  get driverId(): string | undefined { return this.value.driverId; }
  get attemptedAt(): string { return this.value.attemptedAt; }
  get location(): string | undefined { return this.value.location; }
  get latitude(): number | undefined { return this.value.latitude; }
  get longitude(): number | undefined { return this.value.longitude; }
  get images(): readonly string[] { return this.value.images; }
  get notes(): string | undefined { return this.value.notes; }

  wasSuccessful(): boolean { return this.value.status.isSuccess(); }
  shouldRetry(): boolean { return this.value.status.shouldRetry(); }
  hasProof(): boolean { return this.value.images.length > 0; }
}
