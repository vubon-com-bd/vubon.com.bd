/**
 * Branded Token Types
 * @module shared-types/common/primitives
 */

import type { Branded } from '../utils/branded.types';

export type AccessToken = Branded<string, 'AccessToken'>;
export type RefreshToken = Branded<string, 'RefreshToken'>;
export type IdToken = Branded<string, 'IdToken'>;
export type ResetToken = Branded<string, 'ResetToken'>;
export type VerifyToken = Branded<string, 'VerifyToken'>;
export type ApiKey = Branded<string, 'ApiKey'>;
export type CsrfToken = Branded<string, 'CsrfToken'>;
export type OtpCode = Branded<string, 'OtpCode'>;
export type InviteToken = Branded<string, 'InviteToken'>;

export const toAccessToken = (token: string): AccessToken => token as AccessToken;
