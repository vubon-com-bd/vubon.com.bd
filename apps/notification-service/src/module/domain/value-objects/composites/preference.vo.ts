/**
 * PreferenceVO — user notification preferences snapshot
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PreferenceIdVO } from '../primitives/preference-id.vo.js';

export interface PreferenceVOProps {
  readonly id: PreferenceIdVO;
  readonly userId: string;
  readonly channelPreferences: Readonly<Record<string, boolean>>;
  readonly categoryPreferences: Readonly<Record<string, boolean>>;
  readonly quietHoursEnabled: boolean;
  readonly quietHoursStart?: number;
  readonly quietHoursEnd?: number;
  readonly timezone: string;
  readonly locale?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class PreferenceVO extends BaseVO<PreferenceVOProps> {
  private constructor(props: PreferenceVOProps) {
    super(props);
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
          'Quiet hours enabled requires start and end hour',
          'quietHours',
        );
      }
      if (v.quietHoursStart < 0 || v.quietHoursStart > 23) {
        throw new ValidationError('quietHoursStart must be 0-23', 'quietHoursStart');
      }
      if (v.quietHoursEnd < 0 || v.quietHoursEnd > 23) {
        throw new ValidationError('quietHoursEnd must be 0-23', 'quietHoursEnd');
      }
    }
  }

  get id(): PreferenceIdVO { return this.value.id; }
  get userId(): string { return this.value.userId; }
  get channelPreferences(): Readonly<Record<string, boolean>> { return this.value.channelPreferences; }
  get categoryPreferences(): Readonly<Record<string, boolean>> { return this.value.categoryPreferences; }
  get quietHoursEnabled(): boolean { return this.value.quietHoursEnabled; }
  get quietHoursStart(): number | undefined { return this.value.quietHoursStart; }
  get quietHoursEnd(): number | undefined { return this.value.quietHoursEnd; }
  get timezone(): string { return this.value.timezone; }
  get locale(): string | undefined { return this.value.locale; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isChannelEnabled(channel: string): boolean {
    return this.value.channelPreferences[channel] ?? true;
  }

  isCategoryEnabled(category: string): boolean {
    return this.value.categoryPreferences[category] ?? true;
  }

  isInQuietHours(hour: number): boolean {
    if (!this.value.quietHoursEnabled) return false;
    const s = this.value.quietHoursStart ?? 22;
    const e = this.value.quietHoursEnd ?? 8;
    if (s === e) return false;
    if (s < e) return hour >= s && hour < e;
    return hour >= s || hour < e;
  }
}
