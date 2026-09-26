import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListReturnsQuery } from './list-returns.query';
import type { ReturnShipmentRepository } from '../../../domain/repositories/return-shipment.repository.interface';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment-response.dto';

@QueryHandler(ListReturnsQuery)
export class ListReturnsHandler
  extends BaseQueryHandler<ListReturnsQuery, readonly ReturnShipmentResponseDTO[]>
  implements IQueryHandler<ListReturnsQuery>
{
  readonly queryType = 'logistics.return-shipment.list';

  constructor(private readonly repo: ReturnShipmentRepository) {
    super();
  }

  async execute(query: ListReturnsQuery): Promise<readonly ReturnShipmentResponseDTO[]> {
    const entities = query.status ? await this.repo.findByStatus(query.status) : await this.repo.findAll();
    return entities.map((e) => ({ id: e.id, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as ReturnShipmentResponseDTO));
  }
}
