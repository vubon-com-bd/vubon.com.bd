/**
 * Branded Email Type
 * @module shared-types/common/primitives
 */

import type { Branded } from '../utils/branded.types';

export type Email = Branded<string, 'Email'>;

export const toEmail = (email: string): Email => email as Email;
