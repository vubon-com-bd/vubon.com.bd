/**
 * Unlink Social Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import { SocialLoginRequestSchema } from '@vubon/shared-schemas/auth';

export const UnlinkSocialRequestSchema = SocialLoginRequestSchema.pick({ provider: true });

export type UnlinkSocialRequestDTO = z.infer<typeof UnlinkSocialRequestSchema>;
