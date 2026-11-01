/**
 * ReturnReasonEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ReturnReasonIdVO } from '../value-objects/primitives/return-reason-id.vo.js';
import { ReturnReasonTypeVO } from '../value-objects/primitives/return-reason-type.vo.js';
import { ReturnReasonLabelVO } from '../value-objects/primitives/return-reason-label.vo.js';

import {
  ReturnReasonCreatedEvent,
  ReturnReasonActivatedEvent,
  ReturnReasonDeactivatedEvent,
  ReturnReasonUpdatedEvent,
} from '../events/return-reason.events.js';

export interface ReturnReasonEntityProps {
  readonly code: string;
  readonly type: ReturnReasonTypeVO;
  readonly label: ReturnReasonLabelVO;
  readonly description?: string;
  readonly requiresPhoto: boolean;
  readonly autoApprove: boolean;
  readonly isActive: boolean;
  readonly priority: number;
  readonly deactivatedAt?: string;
  readonly deactivateReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class ReturnReasonEntity extends AggregateRoot<string> {
  private _label: ReturnReasonLabelVO;
  private _description?: string;
  private _requiresPhoto: boolean;
  private _autoApprove: boolean;
  private _isActive: boolean;
  private _priority: number;
  private _deactivatedAt?: string;
  private _deactivateReason?: string;

  private readonly _code: string;
  private readonly _type: ReturnReasonTypeVO;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ReturnReasonEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._code = props.code;
    this._type = props.type;
    this._label = props.label;
    this._description = props.description;
    this._requiresPhoto = props.requiresPhoto;
    this._autoApprove = props.autoApprove;
    this._isActive = props.isActive;
    this._priority = props.priority;
    this._deactivatedAt = props.deactivatedAt;
    this._deactivateReason = props.deactivateReason;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._code || this._code.trim().length === 0) {
      throw new ValidationError('Code required', 'code');
    }
    if (!Number.isInteger(this._priority) || this._priority < 0) {
      throw new ValidationError('Priority must be non-negative integer', 'priority');
    }
  }

  get code(): string { return this._code; }
  get type(): ReturnReasonTypeVO { return this._type; }
  get label(): ReturnReasonLabelVO { return this._label; }
  get description(): string | undefined { return this._description; }
  get requiresPhoto(): boolean { return this._requiresPhoto; }
  get autoApprove(): boolean { return this._autoApprove; }
  get isActive(): boolean { return this._isActive; }
  get priority(): number { return this._priority; }
  get deactivatedAt(): string | undefined { return this._deactivatedAt; }
  get deactivateReason(): string | undefined { return this._deactivateReason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): ReturnReasonIdVO {
    return ReturnReasonIdVO.reconstitute(this.id);
  }

  isSellerFault(): boolean { return this._type.isSellerFault(); }
  isCustomerFault(): boolean { return this._type.isCustomerFault(); }
  isCarrierFault(): boolean { return this._type.isCarrierFault(); }

  needsPhoto(): boolean {
    return this._requiresPhoto || this._type.requiresPhoto();
  }

  isUsable(): boolean {
    return this._isActive;
  }

  // ═══ Business Actions ═══
  activate(now: string = new Date().toISOString()): void {
    if (this._isActive) {
      throw new BusinessRuleError(
        'Return reason is already active',
        'RETURN_REASON_ALREADY_ACTIVE',
        { reasonId: this.id },
      );
    }
    this._isActive = true;
    this._deactivatedAt = undefined;
    this._deactivateReason = undefined;
    this.addDomainEvent(
      new ReturnReasonActivatedEvent({
        aggregateId: this.id,
        payload: { reasonId: this.id, activatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason?: string, now: string = new Date().toISOString()): void {
    if (!this._isActive) {
      throw new BusinessRuleError(
        'Return reason is already inactive',
        'RETURN_REASON_ALREADY_INACTIVE',
        { reasonId: this.id },
      );
    }
    this._isActive = false;
    this._deactivatedAt = now;
    this._deactivateReason = reason;
    this.addDomainEvent(
      new ReturnReasonDeactivatedEvent({
        aggregateId: this.id,
        payload: { reasonId: this.id, reason, deactivatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateDetails(
    updates: {
      label?: ReturnReasonLabelVO;
      description?: string;
      requiresPhoto?: boolean;
      autoApprove?: boolean;
      priority?: number;
    },
    now: string = new Date().toISOString(),
  ): void {
    const changed: string[] = [];

    if (updates.label !== undefined) {
      this._label = updates.label;
      changed.push('label');
    }
    if (updates.description !== undefined) {
      this._description = updates.description;
      changed.push('description');
    }
    if (updates.requiresPhoto !== undefined) {
      this._requiresPhoto = updates.requiresPhoto;
      changed.push('requiresPhoto');
    }
    if (updates.autoApprove !== undefined) {
      this._autoApprove = updates.autoApprove;
      changed.push('autoApprove');
    }
    if (updates.priority !== undefined) {
      if (!Number.isInteger(updates.priority) || updates.priority < 0) {
        throw new ValidationError('Priority must be non-negative integer', 'priority');
      }
      this._priority = updates.priority;
      changed.push('priority');
    }

    if (changed.length === 0) return;

    this.addDomainEvent(
      new ReturnReasonUpdatedEvent({
        aggregateId: this.id,
        payload: { reasonId: this.id, updatedFields: changed, updatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: ReturnReasonIdVO;
    props: ReturnReasonEntityProps;
    now: string;
  }): ReturnReasonEntity {
    const entity = new ReturnReasonEntity(
      params.id.value,
      params.now,
      params.now,
      params.props,
    );
    entity.addDomainEvent(
      new ReturnReasonCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          reasonId: params.id.value,
          code: params.props.code,
          label: params.props.label.en,
          type: params.props.type.value,
          createdAt: params.now,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: ReturnReasonEntityProps;
    version?: number;
  }): ReturnReasonEntity {
    const entity = new ReturnReasonEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
