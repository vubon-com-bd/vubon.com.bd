/**
 * CheckoutEntity — AGGREGATE ROOT
 * @module order-service/domain/entities
 *
 * State machine:
 *   started → in_progress → completed
 *   Any non-terminal → abandoned | expired
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CheckoutVO } from '../value-objects/composites/checkout.vo.js';
import { CheckoutStatusVO } from '../value-objects/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../value-objects/primitives/checkout-step.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';

import {
  CheckoutStartedEvent,
  CheckoutStepChangedEvent,
  CheckoutCompletedEvent,
  CheckoutAbandonedEvent,
  CheckoutExpiredEvent,
} from '../events/checkout.events.js';

export interface CheckoutEntityProps {
  readonly vo: CheckoutVO;
}

export class CheckoutEntity extends AggregateRoot<string> {
  private _vo: CheckoutVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CheckoutEntityProps,
    deletedAt?: string | null,
    skipInvariants: boolean = false,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    if (!skipInvariants) {
      this.assertInvariants();
    }
  }

  private assertInvariants(): void {
    if (this._vo.isExpired() && !this._vo.status.isExpired()) {
      throw new ValidationError('Expired checkout must have expired status', 'status');
    }
  }

  // ═══ Getters ═══
  get vo(): CheckoutVO { return this._vo; }
  get customerId(): CustomerIdVO { return this._vo.customerId; }
  get status(): CheckoutStatusVO { return this._vo.status; }
  get currentStep(): CheckoutStepVO { return this._vo.currentStep; }
  get expiresAt(): string { return this._vo.expiresAt; }

  // ═══ Predicates ═══
  isStarted(): boolean { return this.status.isStarted(); }
  isInProgress(): boolean { return this.status.isInProgress(); }
  isCompleted(): boolean { return this.status.isCompleted(); }
  isAbandoned(): boolean { return this.status.isAbandoned(); }
  isExpired(now: string = new Date().toISOString()): boolean {
    return this.status.isExpired() || this._vo.isExpired(now);
  }
  isTerminal(): boolean { return this.status.isTerminal(); }

  // ═══ Business Actions ═══
  advanceTo(step: CheckoutStepVO, now: string = new Date().toISOString()): void {
    if (this.isTerminal()) {
      throw new BusinessRuleError(
        `Cannot advance checkout in status "${this.status.value}"`,
        'CHECKOUT_CANNOT_BE_MODIFIED',
        { checkoutId: this.id, status: this.status.value },
      );
    }
    if (!this.currentStep.canAdvanceTo(step)) {
      throw new BusinessRuleError(
        `Cannot move to step "${step.value}" from "${this.currentStep.value}"`,
        'CHECKOUT_STEP_OUT_OF_ORDER',
        { current: this.currentStep.value, requested: step.value },
      );
    }
    const from = this.currentStep.value;
    this._vo = CheckoutVO.create({
      ...this._vo.value,
      currentStep: step,
      status: CheckoutStatusVO.inProgress(),
    });
    this.addDomainEvent(
      new CheckoutStepChangedEvent({
        aggregateId: this.id,
        payload: { checkoutId: this.id, fromStep: from, toStep: step.value },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  complete(orderId: string, now: string = new Date().toISOString()): void {
    if (this.isTerminal()) {
      throw new BusinessRuleError(
        `Cannot complete checkout in status "${this.status.value}"`,
        'CHECKOUT_CANNOT_BE_COMPLETED',
        { checkoutId: this.id, status: this.status.value },
      );
    }
    this._vo = CheckoutVO.create({
      ...this._vo.value,
      status: CheckoutStatusVO.completed(),
    });
    this.addDomainEvent(
      new CheckoutCompletedEvent({
        aggregateId: this.id,
        payload: { checkoutId: this.id, orderId, completedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  abandon(reason: string | undefined, now: string = new Date().toISOString()): void {
    if (this.isTerminal()) {
      throw new BusinessRuleError(
        `Cannot abandon checkout in status "${this.status.value}"`,
        'CHECKOUT_CANNOT_BE_ABANDONED',
        { checkoutId: this.id, status: this.status.value },
      );
    }
    this._vo = CheckoutVO.create({
      ...this._vo.value,
      status: CheckoutStatusVO.abandoned(),
    });
    this.addDomainEvent(
      new CheckoutAbandonedEvent({
        aggregateId: this.id,
        payload: { checkoutId: this.id, reason, abandonedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  expire(now: string = new Date().toISOString()): void {
    if (this.isTerminal()) {
      return;
    }
    this._vo = CheckoutVO.create({
      ...this._vo.value,
      status: CheckoutStatusVO.expired(),
    });
    this.addDomainEvent(
      new CheckoutExpiredEvent({
        aggregateId: this.id,
        payload: { checkoutId: this.id, expiredAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  // ═══ Private Helpers ═══
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: CheckoutVO;
    now: string;
  }): CheckoutEntity {
    if (!params.vo.status.isStarted()) {
      throw new ValidationError('New checkout must be in started status', 'status');
    }
    const entity = new CheckoutEntity(
      params.id,
      params.now,
      params.now,
      { vo: params.vo },
      null,
    );
    entity.addDomainEvent(
      new CheckoutStartedEvent({
        aggregateId: params.id,
        payload: {
          checkoutId: params.id,
          customerId: params.vo.customerId.value,
          startedAt: params.now,
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
    props: CheckoutEntityProps;
    version?: number;
  }): CheckoutEntity {
    const entity = new CheckoutEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
      true,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
