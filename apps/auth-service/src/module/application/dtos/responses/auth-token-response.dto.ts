import { z } from 'zod';

/**
 * Auth Token Response DTO
 *
 * Note: shared-schemas-এ dedicated AuthTokenPairSchema নেই।
 * তাই এখানে inline define করা হলো।
 */
export const AuthTokenResponseSchema = z.object({
  accessToken: z.string().min(1),
  refreshToken: z.string().min(1),
  accessExpiresAt: z.number().int().positive(),
  refreshExpiresAt: z.number().int().positive(),
  tokenType: z.literal('Bearer').default('Bearer'),
});

export type AuthTokenResponseDTO = z.infer<typeof AuthTokenResponseSchema>;
