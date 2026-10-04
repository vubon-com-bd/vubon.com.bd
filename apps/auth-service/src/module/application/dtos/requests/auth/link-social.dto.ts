/**
 * LinkSocialRequest DTO
 * @module auth-service/application/dtos/requests/auth
 */
import {
  SocialAccountLinkInputSchema,
  type SocialAccountLinkInputSchemaType,
} from '@vubon/shared-schemas/auth';

export type LinkSocialRequestDTO = SocialAccountLinkInputSchemaType;

export function validateLinkSocialRequest(
  input: unknown,
): LinkSocialRequestDTO {
  return SocialAccountLinkInputSchema.parse(input);
}
