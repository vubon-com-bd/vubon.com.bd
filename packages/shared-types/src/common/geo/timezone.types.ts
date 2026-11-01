/**
 * Timezone Types
 * @module shared-types/common/geo
 *
 * Values আসে shared-constants/common/timezone.constants থেকে।
 */

import type { TIMEZONE } from '@vubon/shared-constants/common';

export type TimezoneValue = (typeof TIMEZONE)[keyof typeof TIMEZONE];

export interface Timezone {
  readonly value: TimezoneValue;
  readonly label: string;
  readonly offsetMinutes: number;
  readonly isDst: boolean;
}

export interface TimezoneInfo extends Timezone {
  readonly abbreviation: string;
  readonly utcOffset: string;
}

export interface TimezoneConversion {
  readonly from: TimezoneValue;
  readonly to: TimezoneValue;
  readonly original: string;
  readonly converted: string;
}
