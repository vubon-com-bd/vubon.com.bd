/**
 * AgentControllerMapper
 * @module support-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { AgentResponseDTO as AppAgentResponseDTO } from '../../application/dtos/responses/agent-response.dto';
import { AgentResponseDTO } from '../dtos/responses/agent-response.dto';

@Injectable()
export class AgentControllerMapper {
  toResponse(app: AppAgentResponseDTO): AgentResponseDTO {
    const res = new AgentResponseDTO();
    res.id = app.id;
    res.userId = app.userId;
    res.name = app.name;
    res.email = app.email;
    res.status = app.status;
    res.level = app.level;
    res.skills = [...app.skills];
    res.teamIds = [...app.teamIds];
    res.languages = [...app.languages];
    res.activeTicketCount = app.activeTicketCount;
    res.activeChatCount = app.activeChatCount;
    res.maxConcurrentTickets = app.maxConcurrentTickets;
    res.maxConcurrentChats = app.maxConcurrentChats;
    res.resolvedToday = app.resolvedToday;
    res.averageResolutionMinutes = app.averageResolutionMinutes;
    res.satisfactionScore = app.satisfactionScore;
    res.lastActiveAt = app.lastActiveAt;
    res.isAvailable = app.isAvailable;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }
}
