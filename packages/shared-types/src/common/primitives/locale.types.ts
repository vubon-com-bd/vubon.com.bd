/**
 * Locale Types
 * @module shared-types/common/primitives
 *
 * Values আসে shared-constants/common/locale.constants থেকে।
 */

import type { LOCALE } from '@vubon/shared-constants/common';

export type LocaleCode = (typeof LOCALE)[keyof typeof LOCALE];

export interface Locale {
  readonly code: LocaleCode;
  readonly language: string;
  readonly country: string;
  readonly timezone: string;
}
