/**
 * Branded Timestamp Type
 * @module shared-types/common/primitives
 */

import type { Branded } from '../utils/branded.types';

export type Timestamp = Branded<number, 'Timestamp'>;
export type UnixTimestamp = Branded<number, 'UnixTimestamp'>;
export type MillisecondTimestamp = Branded<number, 'MillisecondTimestamp'>;

export const toTimestamp = (value: number): Timestamp => value as Timestamp;
