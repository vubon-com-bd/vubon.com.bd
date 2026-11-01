/**
 * IVendorTeamService — contract
 * @module vendor-service/application/services/interfaces
 */
import type {
  AddTeamMemberCommandDTO,
  UpdateTeamMemberRequestDTO,
  RemoveTeamMemberRequestDTO,
  AssignRoleRequestDTO,
} from '../../dtos/requests/team/index.js';
import type {
  TeamMemberResponseDTO,
  TeamMemberSummaryResponseDTO,
  TeamListResponseDTO,
  TeamInviteResponseDTO,
  TeamMemberStatsResponseDTO,
} from '../../dtos/responses/team-response.dto.js';

export const VENDOR_TEAM_SERVICE = Symbol('VENDOR_TEAM_SERVICE');

export interface TeamListFilterDTO {
  readonly vendorId?: string;
  readonly role?: string | readonly string[];
  readonly status?: string | readonly string[];
  readonly isOwner?: boolean;
  readonly isStale?: boolean;
}

export interface TeamListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'invitedAt' | 'joinedAt' | 'lastActiveAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: TeamListFilterDTO;
}

export interface IVendorTeamService {
  // Commands
  invite(dto: AddTeamMemberCommandDTO, actorId: string): Promise<TeamInviteResponseDTO>;
  acceptInvite(token: string, userId: string): Promise<TeamMemberResponseDTO>;
  rejectInvite(token: string, userId: string, reason?: string): Promise<{ readonly success: true }>;
  update(dto: UpdateTeamMemberRequestDTO, actorId: string): Promise<TeamMemberResponseDTO>;
  remove(dto: RemoveTeamMemberRequestDTO, actorId: string): Promise<{ readonly success: true }>;
  assignRole(dto: AssignRoleRequestDTO, actorId: string): Promise<TeamMemberResponseDTO>;
  suspend(memberId: string, reason: string, actorId: string): Promise<TeamMemberResponseDTO>;
  reactivate(memberId: string, actorId: string): Promise<TeamMemberResponseDTO>;

  // Queries
  getById(id: string): Promise<TeamMemberResponseDTO>;
  listByVendor(vendorId: string, options?: TeamListOptionsDTO): Promise<TeamListResponseDTO>;
  getOwner(vendorId: string): Promise<TeamMemberResponseDTO | null>;
  listPendingInvites(vendorId: string): Promise<readonly TeamMemberSummaryResponseDTO[]>;
  getStats(vendorId: string): Promise<TeamMemberStatsResponseDTO>;
}
