/**
 * AcceptTeamInviteRequestDto
 * @module vendor-service/application/dtos/requests
 */
export class AcceptTeamInviteRequestDto {
  token!: string;
  userId!: string;
  name!: string;
  idempotencyKey?: string;
}
