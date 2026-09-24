import type { SlaEntity } from '../../../domain/entities/sla.entity';
import type { SlaIdVO } from '../../../domain/value-objects/primitives/sla-id.vo';
import type { CreateSlaRequestDTO } from '../../dtos/requests/sla';
import type { SlaResponseDTO } from '../../dtos/responses/sla-response.dto';

export interface SlaServiceInterface {
  create(input: CreateSlaRequestDTO): Promise<SlaResponseDTO>;
  findById(id: SlaIdVO): Promise<SlaEntity | null>;
}
