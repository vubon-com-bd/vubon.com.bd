/**
 * Branded Password Types
 * @module shared-types/common/primitives
 */

import type { Branded } from '../utils/branded.types';

export type PlainPassword = Branded<string, 'PlainPassword'>;
export type PasswordHash = Branded<string, 'PasswordHash'>;
export type PasswordSalt = Branded<string, 'PasswordSalt'>;

export const toPasswordHash = (hash: string): PasswordHash => hash as PasswordHash;
