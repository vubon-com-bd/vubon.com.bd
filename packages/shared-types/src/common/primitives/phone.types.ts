/**
 * Branded Phone Type
 * @module shared-types/common/primitives
 */

import type { Branded } from '../utils/branded.types';

export type Phone = Branded<string, 'Phone'>;

export const toPhone = (phone: string): Phone => phone as Phone;
