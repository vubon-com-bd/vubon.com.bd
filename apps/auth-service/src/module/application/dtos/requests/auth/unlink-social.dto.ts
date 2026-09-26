/**
 * UnlinkSocialRequest DTO
 * @module auth-service/application/dtos/requests/auth
 */
import {
  SocialAccountUnlinkInputSchema,
  type SocialAccountUnlinkInputSchemaType,
} from '@vubon/shared-schemas/auth';

export type UnlinkSocialRequestDTO = SocialAccountUnlinkInputSchemaType;

export function validateUnlinkSocialRequest(
  input: unknown,
): UnlinkSocialRequestDTO {
  return SocialAccountUnlinkInputSchema.parse(input);
}
