/**
 * Social Callback Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import { SocialLoginRequestSchema } from '@vubon/shared-schemas/auth';

export const SocialCallbackRequestSchema = SocialLoginRequestSchema;
export type SocialCallbackRequestDTO = z.infer<typeof SocialCallbackRequestSchema>;
