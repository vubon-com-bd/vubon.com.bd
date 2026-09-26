/**
 * Branded Date Type
 * @module shared-types/common/primitives
 */

import type { Branded } from '../utils/branded.types';

export type DateString = Branded<string, 'DateString'>;
export type DateOnly = Branded<string, 'DateOnly'>;

export const toDateString = (date: string): DateString => date as DateString;
