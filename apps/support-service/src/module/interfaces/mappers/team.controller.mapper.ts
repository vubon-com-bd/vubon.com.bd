/**
 * TeamControllerMapper
 * @module support-service/interfaces/mappers
 */
import { Injectable } from '@nestjs/common';
import type { TeamResponseDTO as AppTeamResponseDTO } from '../../application/dtos/responses/team-response.dto';
import { TeamResponseDTO } from '../dtos/responses/team-response.dto';

@Injectable()
export class TeamControllerMapper {
  toResponse(app: AppTeamResponseDTO): TeamResponseDTO {
    const res = new TeamResponseDTO();
    res.id = app.id;
    res.name = app.name;
    res.description = app.description;
    res.type = app.type;
    res.status = app.status;
    res.routing = app.routing;
    res.leaderId = app.leaderId;
    res.memberIds = [...app.memberIds];
    res.skills = [...app.skills];
    res.categories = [...app.categories];
    res.maxTickets = app.maxTickets;
    res.activeTicketCount = app.activeTicketCount;
    res.isDefault = app.isDefault;
    res.createdAt = app.createdAt;
    res.updatedAt = app.updatedAt;
    return res;
  }
}
