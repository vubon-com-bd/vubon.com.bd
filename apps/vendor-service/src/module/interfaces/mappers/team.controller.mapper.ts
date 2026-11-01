/**
 * TeamControllerMapper — HTTP ↔ Application DTO
 * @module vendor-service/interfaces/mappers
 */
import type {
  AddTeamMemberHttpDTO,
  UpdateTeamMemberHttpDTO,
  RemoveTeamMemberHttpDTO,
  AssignRoleHttpDTO,
} from '../dtos/requests/team.request.dto.js';
import type {
  AddTeamMemberCommandDTO,
  UpdateTeamMemberRequestDTO,
  RemoveTeamMemberRequestDTO,
  AssignRoleRequestDTO,
} from '../../application/dtos/requests/team/index.js';
import type {
  TeamMemberResponseDTO,
  TeamMemberSummaryResponseDTO,
  TeamListResponseDTO,
  TeamMemberStatsResponseDTO,
} from '../../application/dtos/responses/team-response.dto.js';
import type {
  TeamMemberHttpResponseDTO,
  TeamMemberSummaryHttpResponseDTO,
  TeamListHttpResponseDTO,
  TeamStatsHttpResponseDTO,
} from '../dtos/responses/team.response.dto.js';

export class TeamControllerMapper {
  static toAddAppDto(dto: AddTeamMemberHttpDTO): AddTeamMemberCommandDTO {
    return {
      vendorId: dto.vendorId,
      email: dto.email,
      role: dto.role as never,
      message: dto.message,
    };
  }

  static toUpdateAppDto(memberId: string, dto: UpdateTeamMemberHttpDTO): UpdateTeamMemberRequestDTO {
    return {
      memberId,
      fullName: dto.fullName,
      permissions: dto.permissions,
    };
  }

  static toRemoveAppDto(memberId: string, dto: RemoveTeamMemberHttpDTO): RemoveTeamMemberRequestDTO {
    return { memberId, reason: dto.reason };
  }

  static toAssignRoleAppDto(memberId: string, dto: AssignRoleHttpDTO): AssignRoleRequestDTO {
    return { memberId, role: dto.role };
  }

  static toHttpResponse(app: TeamMemberResponseDTO): TeamMemberHttpResponseDTO {
    return { ...app };
  }

  static toSummaryHttp(app: TeamMemberSummaryResponseDTO): TeamMemberSummaryHttpResponseDTO {
    return { ...app };
  }

  static toListHttp(app: TeamListResponseDTO): TeamListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      activeCount: app.activeCount,
    };
  }

  static toStatsHttp(app: TeamMemberStatsResponseDTO): TeamStatsHttpResponseDTO {
    return { ...app };
  }
}
