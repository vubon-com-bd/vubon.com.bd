/**
 * Link Social Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import { SocialLoginRequestSchema } from '@vubon/shared-schemas/auth';

export const LinkSocialRequestSchema = SocialLoginRequestSchema;
export type LinkSocialRequestDTO = z.infer<typeof LinkSocialRequestSchema>;
