/**
 * VendorSubscriptionEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import {
  VendorSubscriptionVO,
  type VendorSubscriptionVOProps,
  type SubscriptionStatusValue,
} from '../value-objects/composites/vendor-subscription.vo.js';
import { SubscriptionPlanVO } from '../value-objects/primitives/subscription-plan.vo.js';

export interface VendorSubscriptionEntityProps {
  readonly vo: VendorSubscriptionVO;
}

export class VendorSubscriptionEntity extends BaseEntity<string> {
  private _vo: VendorSubscriptionVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorSubscriptionEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorSubscriptionVO { return this._vo; }
  get subscriptionId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get plan() { return this._vo.plan; }
  get status(): SubscriptionStatusValue { return this._vo.status; }
  get cycle() { return this._vo.cycle; }
  get priceAmount(): number { return this._vo.priceAmount; }
  get currency(): string { return this._vo.currency; }
  get startedAt(): string { return this._vo.startedAt; }
  get trialEndsAt(): string | undefined { return this._vo.trialEndsAt; }
  get currentPeriodStart(): string { return this._vo.currentPeriodStart; }
  get currentPeriodEnd(): string { return this._vo.currentPeriodEnd; }
  get cancelledAt(): string | undefined { return this._vo.cancelledAt; }
  get cancelAtPeriodEnd(): boolean { return this._vo.cancelAtPeriodEnd; }
  get autoRenew(): boolean { return this._vo.autoRenew; }
  get nextPaymentAt(): string | undefined { return this._vo.nextPaymentAt; }
  get daysRemainingInPeriod(): number { return this._vo.daysRemainingInPeriod; }
  get trialDaysRemaining(): number | null { return this._vo.trialDaysRemaining; }
  get monthlyEquivalent(): number { return this._vo.monthlyEquivalent; }
  get totalPaid(): number { return this._vo.totalPaid; }

  // ═══ Predicates ═══
  isTrial(): boolean { return this._vo.isTrial(); }
  isActive(): boolean { return this._vo.isActive(); }
  isPastDue(): boolean { return this._vo.isPastDue(); }
  isCancelled(): boolean { return this._vo.isCancelled(); }
  isExpired(): boolean { return this._vo.isExpired(); }
  isSuspended(): boolean { return this._vo.isSuspended(); }
  isFree(): boolean { return this._vo.isFree(); }
  isPaid(): boolean { return this._vo.isPaid(); }
  isPremium(): boolean { return this._vo.isPremium(); }
  isEnterprise(): boolean { return this._vo.isEnterprise(); }
  isEntitled(): boolean { return this._vo.isEntitled(); }
  isInGracePeriod(): boolean { return this._vo.isInGracePeriod(); }
  isTrialExpired(): boolean { return this._vo.isTrialExpired(); }
  isCancellingAtPeriodEnd(): boolean { return this._vo.isCancellingAtPeriodEnd(); }
  canUpgradeTo(target: SubscriptionPlanVO): boolean { return this._vo.canUpgradeTo(target); }
  canDowngradeTo(target: SubscriptionPlanVO): boolean { return this._vo.canDowngradeTo(target); }

  // ═══ Business Actions ═══
  startTrial(trialEndsAt: string, now: string = new Date().toISOString()): void {
    if (!this.isTrial()) {
      throw new BusinessRuleError(
        'Cannot start trial: not in trial-eligible state',
        'SUBSCRIPTION_NOT_ELIGIBLE_FOR_TRIAL',
        { subscriptionId: this.id },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSubscriptionVO.create({
      ...current,
      trialEndsAt,
      currentPeriodStart: now,
    });
    this.touch(now);
  }

  convertToPaid(now: string = new Date().toISOString()): void {
    if (!this.isTrial()) {
      throw new BusinessRuleError(
        'Cannot convert: not in trial',
        'SUBSCRIPTION_NOT_IN_TRIAL',
        { subscriptionId: this.id },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSubscriptionVO.create({
      ...current,
      status: 'active',
      startedAt: now,
      trialEndsAt: undefined,
      currentPeriodStart: now,
    });
    this.touch(now);
  }

  upgradeToPlan(newPlan: SubscriptionPlanVO, newPrice: number, now: string = new Date().toISOString()): void {
    if (!this.canUpgradeTo(newPlan)) {
      throw new BusinessRuleError(
        `Cannot upgrade from "${this.plan.value}" to "${newPlan.value}"`,
        'SUBSCRIPTION_CANNOT_UPGRADE',
        { subscriptionId: this.id, from: this.plan.value, to: newPlan.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSubscriptionVO.create({
      ...current,
      plan: newPlan,
      priceAmount: newPrice,
    });
    this.touch(now);
  }

  downgradeToPlan(newPlan: SubscriptionPlanVO, newPrice: number, now: string = new Date().toISOString()): void {
    if (!this.canDowngradeTo(newPlan)) {
      throw new BusinessRuleError(
        `Cannot downgrade from "${this.plan.value}" to "${newPlan.value}"`,
        'SUBSCRIPTION_CANNOT_DOWNGRADE',
        { subscriptionId: this.id, from: this.plan.value, to: newPlan.value },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSubscriptionVO.create({
      ...current,
      plan: newPlan,
      priceAmount: newPrice,
    });
    this.touch(now);
  }

  renew(newPeriodEnd: string, paymentAmount: number, now: string = new Date().toISOString()): void {
    if (!this.isActive() && !this.isPastDue()) {
      throw new BusinessRuleError(
        `Cannot renew subscription in status "${this.status}"`,
        'SUBSCRIPTION_CANNOT_BE_RENEWED',
        { subscriptionId: this.id, status: this.status },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSubscriptionVO.create({
      ...current,
      status: 'active',
      currentPeriodStart: now,
      currentPeriodEnd: newPeriodEnd,
      lastPaymentAt: now,
      nextPaymentAt: newPeriodEnd,
    });
    this.touch(now);
  }

  markPastDue(now: string = new Date().toISOString()): void {
    if (this.isFinal()) return;
    const current = this._vo.value;
    this._vo = VendorSubscriptionVO.create({ ...current, status: 'past_due' });
    this.touch(now);
  }

  cancel(cancelledBy: string, reason: string, cancelAtPeriodEnd: boolean, now: string = new Date().toISOString()): void {
    if (this.isCancelled() || this.isExpired()) {
      throw new BusinessRuleError(
        `Cannot cancel subscription in status "${this.status}"`,
        'SUBSCRIPTION_CANNOT_BE_CANCELLED',
        { subscriptionId: this.id, status: this.status },
      );
    }
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Cancellation reason is required', 'reason');
    }
    const current = this._vo.value;
    this._vo = VendorSubscriptionVO.create({
      ...current,
      status: cancelAtPeriodEnd ? current.status : 'cancelled',
      cancelledAt: now,
      cancellationReason: reason,
      cancelAtPeriodEnd,
      autoRenew: false,
    });
    this.touch(now);
  }

  resume(now: string = new Date().toISOString()): void {
    if (!this.isCancellingAtPeriodEnd()) {
      throw new BusinessRuleError(
        'Cannot resume: not scheduled for cancellation',
        'SUBSCRIPTION_NOT_CANCELLING',
        { subscriptionId: this.id },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSubscriptionVO.create({
      ...current,
      cancelAtPeriodEnd: false,
      cancelledAt: undefined,
      cancellationReason: undefined,
      autoRenew: true,
    });
    this.touch(now);
  }

  markExpired(now: string = new Date().toISOString()): void {
    if (this.isExpired()) return;
    const current = this._vo.value;
    this._vo = VendorSubscriptionVO.create({ ...current, status: 'expired' });
    this.touch(now);
  }

  suspend(reason: string, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot suspend subscription in status "${this.status}"`,
        'SUBSCRIPTION_CANNOT_BE_SUSPENDED',
        { subscriptionId: this.id, status: this.status },
      );
    }
    const current = this._vo.value;
    this._vo = VendorSubscriptionVO.create({
      ...current,
      status: 'suspended',
      cancellationReason: reason,
    });
    this.touch(now);
  }

  enableAutoRenew(now: string = new Date().toISOString()): void {
    if (this.autoRenew) return;
    const current = this._vo.value;
    this._vo = VendorSubscriptionVO.create({ ...current, autoRenew: true });
    this.touch(now);
  }

  disableAutoRenew(now: string = new Date().toISOString()): void {
    if (!this.autoRenew) return;
    const current = this._vo.value;
    this._vo = VendorSubscriptionVO.create({ ...current, autoRenew: false });
    this.touch(now);
  }

  private isFinal(): boolean {
    return this.isCancelled() || this.isExpired();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorSubscriptionVO;
    now: string;
  }): VendorSubscriptionEntity {
    return new VendorSubscriptionEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorSubscriptionEntityProps;
  }): VendorSubscriptionEntity {
    return new VendorSubscriptionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
