/**
 * PreferenceVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * User-এর per-channel/category notification preference।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { PreferenceValueVO } from '@domain/primitives/preference-value.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

export interface PreferenceVOProps {
  readonly id: PreferenceIdVO;
  readonly userId: UserIdVO;
  readonly type: PreferenceTypeVO;
  readonly options: readonly PreferenceOptionVO[];
  readonly quietHoursEnabled: boolean;
  readonly quietHoursStart?: number;
  readonly quietHoursEnd?: number;
  readonly timezone: string;
  readonly locale: string;
  readonly locked: boolean;
}

export class PreferenceVO extends BaseVO<PreferenceVOProps> {
  private constructor(props: PreferenceVOProps) {
    super(Object.freeze(props));
  }

  static create(props: PreferenceVOProps): PreferenceVO {
    const vo = new PreferenceVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: PreferenceVOProps): PreferenceVO {
    return new PreferenceVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.quietHoursEnabled) {
      if (v.quietHoursStart === undefined || v.quietHoursEnd === undefined) {
        throw new ValidationError(
          'Quiet hours enabled requires both start and end',
          'quietHours',
        );
      }
      if (!Number.isInteger(v.quietHoursStart) || v.quietHoursStart < 0 || v.quietHoursStart > 23) {
        throw new ValidationError('quietHoursStart must be 0-23', 'quietHoursStart');
      }
      if (!Number.isInteger(v.quietHoursEnd) || v.quietHoursEnd < 0 || v.quietHoursEnd > 23) {
        throw new ValidationError('quietHoursEnd must be 0-23', 'quietHoursEnd');
      }
      if (v.quietHoursStart === v.quietHoursEnd) {
        throw new ValidationError(
          'quietHoursStart and quietHoursEnd cannot be equal',
          'quietHours',
        );
      }
    }
    // Duplicate channel+category pairs check
    const seen = new Set<string>();
    for (const option of v.options) {
      const key = `${option.channel}:${option.category ?? '*'}`;
      if (seen.has(key)) {
        throw new ValidationError(
          `Duplicate preference option for ${key}`,
          'options',
        );
      }
      seen.add(key);
    }
  }

  get id(): PreferenceIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): PreferenceTypeVO { return this.value.type; }
  get options(): readonly PreferenceOptionVO[] { return this.value.options; }
  get quietHoursEnabled(): boolean { return this.value.quietHoursEnabled; }
  get quietHoursStart(): number | undefined { return this.value.quietHoursStart; }
  get quietHoursEnd(): number | undefined { return this.value.quietHoursEnd; }
  get timezone(): string { return this.value.timezone; }
  get locale(): string { return this.value.locale; }
  get locked(): boolean { return this.value.locked; }

  isLocked(): boolean { return this.value.locked; }

  isChannelEnabled(channel: string): boolean {
    const opt = this.value.options.find((o) => o.channel === channel && o.category === undefined);
    return opt?.enabled ?? true;
  }

  isCategoryEnabled(channel: string, category: string): boolean {
    // Category-specific takes precedence
    const catOpt = this.value.options.find(
      (o) => o.channel === channel && o.category === category,
    );
    if (catOpt) return catOpt.enabled;
    // Fall back to channel-wide
    return this.isChannelEnabled(channel);
  }

  isInQuietHours(hour: number): boolean {
    if (!this.value.quietHoursEnabled) return false;
    const start = this.value.quietHoursStart!;
    const end = this.value.quietHoursEnd!;
    if (start < end) {
      return hour >= start && hour < end;
    }
    // Wraps midnight (e.g., 22-08)
    return hour >= start || hour < end;
  }

  get enabledChannels(): readonly string[] {
    const set = new Set<string>();
    for (const opt of this.value.options) {
      if (opt.enabled && opt.category === undefined) set.add(opt.channel);
    }
    return Array.from(set);
  }

  get disabledChannels(): readonly string[] {
    const set = new Set<string>();
    for (const opt of this.value.options) {
      if (!opt.enabled && opt.category === undefined) set.add(opt.channel);
    }
    return Array.from(set);
  }

  get activeCategoryCount(): number {
    return this.value.options.filter((o) => o.category !== undefined && o.enabled).length;
  }

  withOptions(options: readonly PreferenceOptionVO[]): PreferenceVO {
    return PreferenceVO.create({ ...this.value, options });
  }

  withQuietHours(enabled: boolean, start?: number, end?: number): PreferenceVO {
    return PreferenceVO.create({
      ...this.value,
      quietHoursEnabled: enabled,
      quietHoursStart: start,
      quietHoursEnd: end,
    });
  }

  withLocked(locked: boolean): PreferenceVO {
    return PreferenceVO.create({ ...this.value, locked });
  }
}
