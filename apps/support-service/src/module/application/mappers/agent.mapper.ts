/**
 * AgentMapper — domain ↔ DTO
 * @module support-service/application/mappers
 */
import { OneWayMapper } from '@vubon/shared-kernel/application/mappers';
import { SupportAgentEntity } from '../../domain/entities/support-agent.entity';
import type { AgentResponseDTO } from '../dtos/responses/agent-response.dto';

export class AgentMapper extends OneWayMapper<SupportAgentEntity, AgentResponseDTO> {
  map(entity: SupportAgentEntity): AgentResponseDTO {
    const snapshot = entity.toSnapshot();
    return {
      id: snapshot.id,
      userId: snapshot.userId,
      name: snapshot.userId,
      email: '',
      status: snapshot.status as AgentResponseDTO['status'],
      level: 'L1' as AgentResponseDTO['level'],
      skills: [],
      teamIds: snapshot.teamId ? [snapshot.teamId] : [],
      languages: ['en'],
      activeTicketCount: snapshot.currentTicketIds.length,
      activeChatCount: 0,
      maxConcurrentTickets: snapshot.maxConcurrentTickets,
      maxConcurrentChats: 3,
      resolvedToday: 0,
      averageResolutionMinutes: 0,
      satisfactionScore: 0,
      lastActiveAt: snapshot.updatedAt,
      isAvailable: entity.canTakeTicket,
      createdAt: snapshot.createdAt,
      updatedAt: snapshot.updatedAt,
    };
  }

  toList(entities: readonly SupportAgentEntity[]): readonly AgentResponseDTO[] {
    return entities.map((e) => this.map(e));
  }
}
