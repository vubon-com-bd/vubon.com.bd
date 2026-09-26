/**
 * GenerateRecoveryCodesRequest DTO — inline (no shared schema)
 * @module auth-service/application/dtos/requests/auth
 */
import { z } from 'zod';

export const GenerateRecoveryCodesSchema = z
  .object({
    password: z.string().min(1, 'Password required').max(128),
    count: z.number().int().min(6).max(20).optional().default(10),
    invalidatePrevious: z.boolean().optional().default(true),
  })
  .strict();

export type GenerateRecoveryCodesRequestDTO = z.infer<
  typeof GenerateRecoveryCodesSchema
>;

export function validateGenerateRecoveryCodesRequest(
  input: unknown,
): GenerateRecoveryCodesRequestDTO {
  return GenerateRecoveryCodesSchema.parse(input);
}
