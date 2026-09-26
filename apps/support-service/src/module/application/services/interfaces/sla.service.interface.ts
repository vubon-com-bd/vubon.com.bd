/**
 * SlaServiceInterface
 * @module support-service/application/services/interfaces
 */
import type { CreateSlaRequestDTO } from '../../dtos/requests/sla/create-sla.dto';
import type { UpdateSlaRequestDTO } from '../../dtos/requests/sla/update-sla.dto';
import type { SlaResponseDTO } from '../../dtos/responses/sla-response.dto';

export interface SlaServiceInterface {
  create(input: CreateSlaRequestDTO): Promise<SlaResponseDTO>;
  update(input: UpdateSlaRequestDTO): Promise<SlaResponseDTO>;
  getById(slaId: string): Promise<SlaResponseDTO>;
  listByTicket(ticketId: string): Promise<readonly SlaResponseDTO[]>;
  tick(slaId: string, elapsedMinutes: number): Promise<SlaResponseDTO>;
}
