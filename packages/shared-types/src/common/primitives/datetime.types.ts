/**
 * Branded DateTime Type
 * @module shared-types/common/primitives
 */

import type { Branded } from '../utils/branded.types';

export type DateTimeString = Branded<string, 'DateTimeString'>;
export type IsoDateTime = Branded<string, 'IsoDateTime'>;

export const toDateTimeString = (date: string): DateTimeString => date as DateTimeString;
