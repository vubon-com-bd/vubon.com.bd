/**
 * IVendorTeamService
 * @module vendor-service/application/services/interfaces
 */
import type { InviteTeamMemberRequestDto } from '../../dtos/requests/invite-team-member.dto.js';
import type { AcceptTeamInviteRequestDto } from '../../dtos/requests/accept-team-invite.dto.js';
import type {
  VendorTeamMemberResponseDto,
  VendorTeamMemberPublicDto,
} from '../../dtos/responses/vendor-team-member-response.dto.js';

export const VENDOR_TEAM_SERVICE = Symbol('VENDOR_TEAM_SERVICE');

export interface IVendorTeamService {
  invite(dto: InviteTeamMemberRequestDto, actorId?: string): Promise<{ inviteId: string; email: string; expiresAt: string }>;
  acceptInvite(dto: AcceptTeamInviteRequestDto, actorId?: string): Promise<VendorTeamMemberResponseDto>;
  removeMember(vendorId: string, memberId: string, actorId?: string): Promise<void>;
  changeRole(vendorId: string, memberId: string, newRole: string, actorId?: string): Promise<VendorTeamMemberResponseDto>;
  suspendMember(vendorId: string, memberId: string, actorId?: string): Promise<VendorTeamMemberResponseDto>;
  listByVendor(vendorId: string): Promise<readonly VendorTeamMemberPublicDto[]>;
  getMember(vendorId: string, memberId: string): Promise<VendorTeamMemberResponseDto>;
}
