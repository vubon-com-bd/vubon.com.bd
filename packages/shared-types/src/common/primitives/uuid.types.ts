/**
 * Branded UUID Type
 * @module shared-types/common/primitives
 */

import type { Branded } from '../utils/branded.types';

export type Uuid = Branded<string, 'Uuid'>;
export type UuidV4 = Branded<string, 'UuidV4'>;

export const toUuid = (value: string): Uuid => value as Uuid;
