/**
 * PreferenceMatrixVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Full channel × category grid + quiet hours state।
 * Read-only snapshot; mutate via PreferenceVO.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

export interface PreferenceMatrixVOProps {
  readonly userId: UserIdVO;
  readonly options: readonly PreferenceOptionVO[];
  readonly quietHoursEnabled: boolean;
  readonly quietHoursStart?: number;
  readonly quietHoursEnd?: number;
  readonly timezone: string;
  readonly locale: string;
}

export class PreferenceMatrixVO extends BaseVO<PreferenceMatrixVOProps> {
  private constructor(props: PreferenceMatrixVOProps) {
    super(Object.freeze(props));
  }

  static create(props: PreferenceMatrixVOProps): PreferenceMatrixVO {
    const vo = new PreferenceMatrixVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: PreferenceMatrixVOProps): PreferenceMatrixVO {
    return new PreferenceMatrixVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.quietHoursEnabled) {
      if (v.quietHoursStart === undefined || v.quietHoursEnd === undefined) {
        throw new ValidationError(
          'Quiet hours enabled requires start and end',
          'quietHours',
        );
      }
    }
  }

  get userId(): UserIdVO { return this.value.userId; }
  get options(): readonly PreferenceOptionVO[] { return this.value.options; }
  get quietHoursEnabled(): boolean { return this.value.quietHoursEnabled; }
  get quietHoursStart(): number | undefined { return this.value.quietHoursStart; }
  get quietHoursEnd(): number | undefined { return this.value.quietHoursEnd; }
  get timezone(): string { return this.value.timezone; }
  get locale(): string { return this.value.locale; }

  find(channel: string, category?: string): PreferenceOptionVO | undefined {
    return this.value.options.find(
      (o) => o.channel === channel && o.category === category,
    );
  }

  isEnabled(channel: string, category?: string): boolean {
    const opt = this.find(channel, category);
    if (opt) return opt.enabled;
    const channelOpt = this.find(channel);
    return channelOpt?.enabled ?? true;
  }

  isInQuietHours(hour: number): boolean {
    if (!this.value.quietHoursEnabled) return false;
    const start = this.value.quietHoursStart!;
    const end = this.value.quietHoursEnd!;
    if (start < end) return hour >= start && hour < end;
    return hour >= start || hour < end;
  }

  get totalOptions(): number { return this.value.options.length; }
  get enabledCount(): number { return this.value.options.filter((o) => o.enabled).length; }
  get disabledCount(): number { return this.value.options.filter((o) => !o.enabled).length; }

  /**
   * Flat snapshot for logging / analytics / event payloads।
   * ⚠️ intentionally NOT `toJSON()` — BaseVO.toJSON() returns Props type।
   */
  toSnapshot(): Readonly<Record<string, unknown>> {
    return {
      userId: this.value.userId.value,
      options: this.value.options.map((o) => ({
        channel: o.channel,
        category: o.category,
        enabled: o.enabled,
      })),
      quietHours: this.value.quietHoursEnabled
        ? { start: this.value.quietHoursStart, end: this.value.quietHoursEnd }
        : null,
      timezone: this.value.timezone,
      locale: this.value.locale,
    };
  }
}
