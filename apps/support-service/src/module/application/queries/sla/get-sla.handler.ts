/**
 * GetSlaHandler
 * @module support-service/application/queries/sla
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSlaQuery } from './get-sla.query';
import type { SlaResponseDTO } from '../../dtos/responses/sla-response.dto';
import type { SlaServiceInterface } from '../../services/interfaces/sla.service.interface';

export class GetSlaHandler extends BaseQueryHandler<
  GetSlaQuery,
  SlaResponseDTO
> {
  readonly queryType = 'support.sla.get';

  constructor(private readonly slaService: SlaServiceInterface) {
    super();
  }

  async execute(query: GetSlaQuery): Promise<SlaResponseDTO> {
    return this.slaService.getById(query.slaId);
  }
}
