/**
 * InviteTeamMemberRequestDto
 * @module vendor-service/application/dtos/requests
 */
import type { VENDOR_ROLE } from '@vubon/shared-constants/business';

export class InviteTeamMemberRequestDto {
  vendorId!: string;
  email!: string;
  role!: (typeof VENDOR_ROLE)[keyof typeof VENDOR_ROLE];
  message?: string;
  invitedBy!: string;
  idempotencyKey?: string;
}
