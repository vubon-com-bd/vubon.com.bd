/**
 * TeamMapper
 * @module vendor-service/application/mappers
 */
import type { VendorTeamEntity } from '../../domain/entities/vendor-team.entity.js';
import type {
  TeamMemberResponseDTO,
  TeamMemberSummaryResponseDTO,
  TeamListResponseDTO,
} from '../dtos/responses/team-response.dto.js';

export class TeamMapper {
  static toResponse(entity: VendorTeamEntity): TeamMemberResponseDTO {
    return {
      id: entity.id,
      vendorId: entity.vendorId.value,
      userId: entity.userId.value,
      role: entity.role.value,
      status: entity.status,
      inviteStatus: entity.inviteStatus,
      email: entity.email,
      fullName: entity.fullName,
      permissions: entity.permissions,
      invitedAt: entity.invitedAt,
      invitedBy: entity.invitedBy,
      joinedAt: entity.joinedAt,
      lastActiveAt: entity.lastActiveAt,
      suspendedAt: entity.suspendedAt,
      removedAt: entity.removedAt,
      removedBy: entity.removedBy,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  static toSummary(entity: VendorTeamEntity): TeamMemberSummaryResponseDTO {
    return {
      id: entity.id,
      fullName: entity.fullName,
      email: entity.email,
      role: entity.role.value,
      status: entity.status,
      isActive: entity.isActive(),
    };
  }

  static toListResponse(
    entities: readonly VendorTeamEntity[],
    activeCount: number,
  ): TeamListResponseDTO {
    return {
      items: entities.map((e) => this.toSummary(e)),
      total: entities.length,
      activeCount,
    };
  }
}
