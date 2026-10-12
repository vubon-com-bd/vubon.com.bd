/**
 * SSO Logout Request DTO
 * @module identity-service/application/dtos/requests/auth
 */
import type { z } from 'zod';
import type { SsoLogoutRequestSchema } from '@vubon/shared-schemas/auth';

export type SsoLogoutRequestDTO = z.infer<typeof SsoLogoutRequestSchema>;
