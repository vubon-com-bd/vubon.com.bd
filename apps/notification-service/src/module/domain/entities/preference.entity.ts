/**
 * PreferenceEntity — AGGREGATE ROOT
 * @module notification-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import type { PreferenceVO } from '@domain/composites/preference.vo.js';
import type { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import type { UserIdVO } from '@domain/primitives/user-id.vo.js';

import {
  PreferenceCreatedEvent,
  PreferenceUpdatedEvent,
  QuietHoursChangedEvent,
  ChannelOptedOutEvent,
  ChannelOptedInEvent,
  PreferenceLockedEvent,
} from '@domain/events/preference.events.js';

export interface PreferenceEntityProps {
  readonly vo: PreferenceVO;
}

export class PreferenceEntity extends AggregateRoot<string> {
  private _vo: PreferenceVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: PreferenceEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._vo.options.length > 50) {
      throw new ValidationError('Too many preference options (max 50)', 'options');
    }
  }

  get vo(): PreferenceVO { return this._vo; }
  get preferenceId(): PreferenceIdVO { return this._vo.id; }
  get userId(): UserIdVO { return this._vo.userId; }
  get locked(): boolean { return this._vo.locked; }

  isChannelEnabled(channel: string): boolean {
    return this._vo.isChannelEnabled(channel);
  }

  isCategoryEnabled(channel: string, category: string): boolean {
    return this._vo.isCategoryEnabled(channel, category);
  }

  isInQuietHours(hour: number): boolean {
    return this._vo.isInQuietHours(hour);
  }

  optOut(
    channel: string,
    category?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertNotLocked('opt-out');
    const newOptions: PreferenceOptionVO[] = [];
    let replaced = false;
    for (const o of this._vo.options) {
      if (o.channel === channel && o.category === category) {
        newOptions.push(
          PreferenceOptionVO.create({
            channel: o.channel,
            category: o.category,
            enabled: false,
          }),
        );
        replaced = true;
      } else {
        newOptions.push(o);
      }
    }
    if (!replaced) {
      // should ideally construct via PreferenceOptionVO.create
      throw new BusinessRuleError(
        `No preference option exists for channel "${channel}"`,
        'PREFERENCE_OPTION_NOT_FOUND',
        { channel, category },
      );
    }
    this._vo = this._vo.withOptions(Object.freeze(newOptions));
    this.addDomainEvent(
      new ChannelOptedOutEvent({
        aggregateId: this.id,
        payload: {
          userId: this._vo.userId.value,
          channel,
          category,
          optedOutAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  optIn(
    channel: string,
    category?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertNotLocked('opt-in');
    const newOptions: PreferenceOptionVO[] = [];
    let replaced = false;
    for (const o of this._vo.options) {
      if (o.channel === channel && o.category === category) {
        newOptions.push(
          PreferenceOptionVO.create({
            channel: o.channel,
            category: o.category,
            enabled: true,
          }),
        );
        replaced = true;
      } else {
        newOptions.push(o);
      }
    }
    if (!replaced) {
      throw new BusinessRuleError(
        `No preference option exists for channel "${channel}"`,
        'PREFERENCE_OPTION_NOT_FOUND',
        { channel, category },
      );
    }
    this._vo = this._vo.withOptions(Object.freeze(newOptions));
    this.addDomainEvent(
      new ChannelOptedInEvent({
        aggregateId: this.id,
        payload: {
          userId: this._vo.userId.value,
          channel,
          category,
          optedInAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  changeQuietHours(
    enabled: boolean,
    start?: number,
    end?: number,
    now: string = new Date().toISOString(),
  ): void {
    this.assertNotLocked('change quiet hours');
    this._vo = this._vo.withQuietHours(enabled, start, end);
    this.addDomainEvent(
      new QuietHoursChangedEvent({
        aggregateId: this.id,
        payload: {
          userId: this._vo.userId.value,
          enabled,
          start,
          end,
          changedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  lock(reason?: string, now: string = new Date().toISOString()): void {
    if (this._vo.locked) return;
    this._vo = this._vo.withLocked(true);
    this.addDomainEvent(
      new PreferenceLockedEvent({
        aggregateId: this.id,
        payload: { userId: this._vo.userId.value, reason, lockedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertNotLocked(action: string): void {
    if (this._vo.locked) {
      throw new BusinessRuleError(
        `Cannot ${action} locked preference`,
        'PREFERENCES_IMMUTABLE',
        { userId: this._vo.userId.value, action },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: PreferenceIdVO;
    vo: PreferenceVO;
    now: string;
  }): PreferenceEntity {
    const entity = new PreferenceEntity(
      params.id.value,
      params.now,
      params.now,
      { vo: params.vo },
      null,
    );
    entity.addDomainEvent(
      new PreferenceCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          userId: params.vo.userId.value,
          timezone: params.vo.timezone,
          locale: params.vo.locale,
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
    props: PreferenceEntityProps;
    version?: number;
  }): PreferenceEntity {
    const entity = new PreferenceEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
