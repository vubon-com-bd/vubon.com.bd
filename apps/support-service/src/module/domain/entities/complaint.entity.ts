/**
 * ComplaintEntity — Complaint aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<ComplaintIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ComplaintIdVO } from '../value-objects/primitives/complaint-id.vo';
import { ComplaintTypeVO } from '../value-objects/primitives/complaint-type.vo';
import { ComplaintSeverityVO } from '../value-objects/primitives/complaint-severity.vo';
import { ComplaintStatusVO } from '../value-objects/primitives/complaint-status.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import {
  ComplaintReceivedEvent,
  ComplaintResolvedEvent,
} from '../events/complaint.events';

export interface CreateComplaintInput {
  readonly id: ComplaintIdVO;
  readonly type: ComplaintTypeVO;
  readonly severity: ComplaintSeverityVO;
  readonly userId: UserIdVO;
  readonly description: string;
  readonly orderId?: OrderIdVO;
  readonly vendorId?: VendorIdVO;
  readonly now: string;
}

export interface ComplaintSnapshot {
  readonly id: string;
  readonly type: string;
  readonly severity: string;
  readonly status: string;
  readonly userId: string;
  readonly description: string;
  readonly orderId?: string;
  readonly vendorId?: string;
  readonly resolverId?: string;
  readonly resolvedAt?: string;
  readonly resolution?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const DESC_MIN = 10;
const DESC_MAX = 5000;

export class ComplaintEntity extends AggregateRoot<ComplaintIdVO> {
  private readonly _type: ComplaintTypeVO;
  private _severity: ComplaintSeverityVO;
  private _status: ComplaintStatusVO;
  private readonly _userId: UserIdVO;
  private readonly _description: string;
  private readonly _orderId?: OrderIdVO;
  private readonly _vendorId?: VendorIdVO;
  private _resolverId?: UserIdVO;
  private _resolvedAt?: string;
  private _resolution?: string;

  private constructor(
    id: ComplaintIdVO,
    type: ComplaintTypeVO,
    severity: ComplaintSeverityVO,
    status: ComplaintStatusVO,
    userId: UserIdVO,
    description: string,
    createdAt: string,
    updatedAt: string,
    orderId?: OrderIdVO,
    vendorId?: VendorIdVO,
  ) {
    super(id, createdAt, updatedAt);
    this._type = type;
    this._severity = severity;
    this._status = status;
    this._userId = userId;
    this._description = description;
    this._orderId = orderId;
    this._vendorId = vendorId;
  }

  static create(input: CreateComplaintInput): ComplaintEntity {
    if (!input.id || !input.userId) {
      throw new ValidationError(
        'Complaint requires id and userId',
        'complaint',
      );
    }
    const desc = input.description?.trim();
    if (!desc || desc.length < DESC_MIN) {
      throw new ValidationError(
        `Complaint description too short (min ${DESC_MIN})`,
        'complaint',
      );
    }
    if (desc.length > DESC_MAX) {
      throw new ValidationError(
        `Complaint description too long (max ${DESC_MAX})`,
        'complaint',
      );
    }
    if (input.type.isSevere() && input.severity.weight < 3) {
      throw new BusinessRuleError(
        'Severe complaint types must have severity high or critical',
        'complaint.severe.severity',
      );
    }
    const now = input.now;
    const complaint = new ComplaintEntity(
      input.id,
      input.type,
      input.severity,
      ComplaintStatusVO.create('pending'),
      input.userId,
      desc,
      now,
      now,
      input.orderId,
      input.vendorId,
    );
    complaint.addDomainEvent(
      new ComplaintReceivedEvent(
        input.id,
        input.userId,
        input.type,
        input.severity,
        Date.parse(now),
      ),
    );
    return complaint;
  }

  static rehydrate(snapshot: ComplaintSnapshot): ComplaintEntity {
    const complaint = new ComplaintEntity(
      ComplaintIdVO.create(snapshot.id),
      ComplaintTypeVO.create(snapshot.type),
      ComplaintSeverityVO.create(snapshot.severity),
      ComplaintStatusVO.create(snapshot.status),
      UserIdVO.create(snapshot.userId),
      snapshot.description,
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.orderId ? OrderIdVO.create(snapshot.orderId) : undefined,
      snapshot.vendorId ? VendorIdVO.create(snapshot.vendorId) : undefined,
    );
    complaint._resolverId = snapshot.resolverId ? UserIdVO.create(snapshot.resolverId) : undefined;
    complaint._resolvedAt = snapshot.resolvedAt;
    complaint._resolution = snapshot.resolution;
    return complaint;
  }

  get type(): ComplaintTypeVO {
    return this._type;
  }

  get severity(): ComplaintSeverityVO {
    return this._severity;
  }

  get status(): ComplaintStatusVO {
    return this._status;
  }

  get userId(): UserIdVO {
    return this._userId;
  }

  get description(): string {
    return this._description;
  }

  get isCritical(): boolean {
    return this._severity.isCritical();
  }

  get isResolved(): boolean {
    return this._status.isResolved();
  }

  get needsImmediateAttention(): boolean {
    return this._severity.isCritical() && !this.isResolved;
  }

  escalate(now: string): void {
    if (this.isResolved) {
      throw new BusinessRuleError(
        'Cannot escalate a resolved complaint',
        'complaint.resolved',
      );
    }
    if (this._severity.isCritical()) {
      throw new BusinessRuleError(
        'Complaint already at critical severity',
        'complaint.severity.max',
      );
    }
    const order: readonly ('low' | 'medium' | 'high' | 'critical')[] = [
      'low', 'medium', 'high', 'critical',
    ];
    const currentIdx = order.indexOf(this._severity.value as 'low' | 'medium' | 'high' | 'critical');
    this._severity = ComplaintSeverityVO.create(order[currentIdx + 1]);
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  resolve(resolverId: UserIdVO, resolution: string, now: string): void {
    if (this.isResolved) {
      throw new BusinessRuleError(
        'Complaint already resolved',
        'complaint.already.resolved',
      );
    }
    if (typeof resolution !== 'string' || resolution.trim().length === 0) {
      throw new ValidationError('Resolution required', 'complaint');
    }
    this._status = ComplaintStatusVO.create('resolved');
    this._resolverId = resolverId;
    this._resolvedAt = now;
    this._resolution = resolution.trim();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    this.addDomainEvent(
      new ComplaintResolvedEvent(
        this.id,
        resolverId,
        this._resolution,
        Date.parse(now),
        this.version + 1,
      ),
    );
  }

  toSnapshot(): ComplaintSnapshot {
    return {
      id: this.id.value,
      type: this._type.value,
      severity: this._severity.value,
      status: this._status.value,
      userId: this._userId.value,
      description: this._description,
      orderId: this._orderId?.value,
      vendorId: this._vendorId?.value,
      resolverId: this._resolverId?.value,
      resolvedAt: this._resolvedAt,
      resolution: this._resolution,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
