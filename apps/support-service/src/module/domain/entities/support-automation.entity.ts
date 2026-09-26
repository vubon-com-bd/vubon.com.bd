/**
 * SupportAutomationEntity — Automation job aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<AutomationIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { AutomationIdVO } from '../value-objects/primitives/automation-id.vo';
import { AutomationTypeVO } from '../value-objects/primitives/automation-type.vo';
import { AutomationStatusVO } from '../value-objects/primitives/automation-status.vo';
import { AutomationTriggeredEvent } from '../events/automation.events';

export interface CreateSupportAutomationInput {
  readonly id: AutomationIdVO;
  readonly type: AutomationTypeVO;
  readonly name: string;
  readonly schedule?: string;
  readonly now: string;
}

export interface SupportAutomationSnapshot {
  readonly id: string;
  readonly type: string;
  readonly status: string;
  readonly name: string;
  readonly schedule?: string;
  readonly lastRunAt?: string;
  readonly nextRunAt?: string;
  readonly totalRuns: number;
  readonly failureCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class SupportAutomationEntity extends AggregateRoot<AutomationIdVO> {
  private readonly _type: AutomationTypeVO;
  private _status: AutomationStatusVO;
  private _name: string;
  private readonly _schedule?: string;
  private _lastRunAt?: string;
  private _nextRunAt?: string;
  private _totalRuns: number;
  private _failureCount: number;

  private constructor(
    id: AutomationIdVO,
    type: AutomationTypeVO,
    status: AutomationStatusVO,
    name: string,
    createdAt: string,
    updatedAt: string,
    schedule?: string,
  ) {
    super(id, createdAt, updatedAt);
    this._type = type;
    this._status = status;
    this._name = name;
    this._schedule = schedule;
    this._totalRuns = 0;
    this._failureCount = 0;
  }

  static create(input: CreateSupportAutomationInput): SupportAutomationEntity {
    if (!input.id || !input.name) {
      throw new ValidationError(
        'SupportAutomation requires id and name',
        'supportAutomation',
      );
    }
    if (input.type.isTimeBased() && !input.schedule) {
      throw new ValidationError(
        'Time-based automation requires a schedule',
        'supportAutomation',
      );
    }
    const now = input.now;
    return new SupportAutomationEntity(
      input.id,
      input.type,
      AutomationStatusVO.create('active'),
      input.name.trim(),
      now,
      now,
      input.schedule,
    );
  }

  static rehydrate(snapshot: SupportAutomationSnapshot): SupportAutomationEntity {
    const automation = new SupportAutomationEntity(
      AutomationIdVO.create(snapshot.id),
      AutomationTypeVO.create(snapshot.type),
      AutomationStatusVO.create(snapshot.status),
      snapshot.name,
      snapshot.createdAt,
      snapshot.updatedAt,
      snapshot.schedule,
    );
    automation._lastRunAt = snapshot.lastRunAt;
    automation._nextRunAt = snapshot.nextRunAt;
    automation._totalRuns = snapshot.totalRuns;
    automation._failureCount = snapshot.failureCount;
    return automation;
  }

  get type(): AutomationTypeVO {
    return this._type;
  }

  get status(): AutomationStatusVO {
    return this._status;
  }

  get name(): string {
    return this._name;
  }

  get schedule(): string | undefined {
    return this._schedule;
  }

  get isEnabled(): boolean {
    return this._status.isEnabled();
  }

  get isScheduled(): boolean {
    return this._type.isTimeBased();
  }

  get totalRuns(): number {
    return this._totalRuns;
  }

  get failureCount(): number {
    return this._failureCount;
  }

  get failureRate(): number {
    if (this._totalRuns === 0) return 0;
    return (this._failureCount / this._totalRuns) * 100;
  }

  get hasEverRun(): boolean {
    return this._lastRunAt !== undefined;
  }

  markRun(
    outcome: 'success' | 'failure' | 'partial',
    now: string,
    errorMessage?: string,
  ): void {
    if (!this.isEnabled) {
      throw new BusinessRuleError(
        'Cannot run a disabled automation',
        'supportAutomation.disabled',
      );
    }
    this._totalRuns += 1;
    if (outcome === 'failure') {
      this._failureCount += 1;
    }
    this._lastRunAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    this.addDomainEvent(
      new AutomationTriggeredEvent(
        this.id,
        this._name,
        outcome,
        Date.parse(now),
        errorMessage,
      ),
    );
  }

  scheduleNextRun(nextRunAt: string, now: string): void {
    if (!this.isScheduled) {
      throw new BusinessRuleError(
        'Cannot schedule next run for non-time-based automation',
        'supportAutomation.not.scheduled',
      );
    }
    this._nextRunAt = nextRunAt;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  enable(now: string): void {
    if (this.isEnabled) return;
    this._status = AutomationStatusVO.create('active');
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  disable(now: string): void {
    if (!this.isEnabled) return;
    this._status = AutomationStatusVO.create('inactive');
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  toSnapshot(): SupportAutomationSnapshot {
    return {
      id: this.id.value,
      type: this._type.value,
      status: this._status.value,
      name: this._name,
      schedule: this._schedule,
      lastRunAt: this._lastRunAt,
      nextRunAt: this._nextRunAt,
      totalRuns: this._totalRuns,
      failureCount: this._failureCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
