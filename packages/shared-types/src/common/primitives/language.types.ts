/**
 * Language Types
 * @module shared-types/common/primitives
 *
 * Values আসে shared-constants/common/language.constants থেকে।
 */

import type { LANGUAGE } from '@vubon/shared-constants/common';

export type LanguageCode = (typeof LANGUAGE)[keyof typeof LANGUAGE];

export interface Language {
  readonly code: LanguageCode;
  readonly name: string;
  readonly nativeName: string;
  readonly rtl: boolean;
}
