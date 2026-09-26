/**
 * TeamMapper — domain ↔ DTO
 * @module support-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { SupportTeamEntity } from '../../domain/entities/support-team.entity';
import type { TeamResponseDTO } from '../dtos/responses/team-response.dto';

export class TeamMapper extends OneWayMapper<SupportTeamEntity, TeamResponseDTO> {
  map(entity: SupportTeamEntity): TeamResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      name: snapshot.name,
      type: snapshot.type as TeamResponseDTO['type'],
      status: snapshot.isActive ? ('active' as TeamResponseDTO['status']) : ('inactive' as TeamResponseDTO['status']),
      routing: 'round_robin' as TeamResponseDTO['routing'],
      leaderId: snapshot.leadAgentId,
      memberIds: snapshot.memberIds,
      skills: [],
      categories: [],
      maxTickets: 100,
      activeTicketCount: 0,
      isDefault: false,
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly SupportTeamEntity[]): readonly TeamResponseDTO[] {
    return entities.map((e) => this.map(e));
  }
}
