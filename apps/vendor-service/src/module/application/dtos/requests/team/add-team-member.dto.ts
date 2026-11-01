/**
 * Add Team Member Request DTO
 * @module vendor-service/application/dtos/requests/team
 *
 * Shape derives from AddTeamMemberRequestSchema in shared-schemas.
 */
import type { AddTeamMemberRequestSchemaType } from '@vubon/shared-schemas/business/vendor';

export type AddTeamMemberRequestDTO = AddTeamMemberRequestSchemaType;

export interface AddTeamMemberCommandDTO extends AddTeamMemberRequestDTO {
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
