/**
 * User Settings Types
 * @module shared-types/user
 *
 * Values আসে shared-constants/user/user-settings.constants থেকে।
 */

import type { USER_SETTINGS, USER_SETTINGS_KEY } from '@vubon/shared-constants/user';
import type { UserId } from '../common/primitives';
import type { LanguageCode } from '../common/primitives/language.types';
import type { LocaleCode } from '../common/primitives/locale.types';
import type { CurrencyCode } from '../common/primitives/currency.types';
import type { TimezoneValue } from '../common/geo';

export type ThemeValue = (typeof USER_SETTINGS)[keyof typeof USER_SETTINGS];
export type SettingsKey = (typeof USER_SETTINGS_KEY)[keyof typeof USER_SETTINGS_KEY];

export interface UserSettings {
  readonly userId: UserId;
  readonly theme: ThemeValue;
  readonly language: LanguageCode;
  readonly locale: LocaleCode;
  readonly timezone: TimezoneValue;
  readonly currency: CurrencyCode;
  readonly dateFormat: string;
  readonly timeFormat: string;
  readonly itemsPerPage: number;
  readonly notifications: boolean;
  readonly twoFactor: boolean;
  readonly updatedAt: string;
}

export interface UserSettingsInput {
  readonly theme?: ThemeValue;
  readonly language?: LanguageCode;
  readonly locale?: LocaleCode;
  readonly timezone?: string;
  readonly currency?: CurrencyCode;
  readonly dateFormat?: string;
  readonly timeFormat?: string;
  readonly itemsPerPage?: number;
  readonly notifications?: boolean;
  readonly twoFactor?: boolean;
}
