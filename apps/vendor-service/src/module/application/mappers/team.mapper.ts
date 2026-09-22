import { VendorTeamEntity } from '../../domain/entities/vendor-team.entity';
import type { TeamMemberResponseDto } from '../dtos/responses/team-response.dto';

export class TeamMapper {
  static toDto(entity: VendorTeamEntity): TeamMemberResponseDto {
    return {
      id: entity.id.value,
      vendorId: entity.vendorId.value,
      userId: entity.userId.value,
      role: entity.role.value,
      permissions: entity.permissions.map((p) => p.value),
      invitedAt: entity.invitedAt.toISOString(),
      joinedAt: entity.joinedAt?.toISOString() ?? null,
    };
  }
}
