import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListPendingReturnsQuery } from './list-pending-returns.query';
import type { ReturnShipmentRepository } from '../../../domain/repositories/return-shipment.repository.interface';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment-response.dto';

@QueryHandler(ListPendingReturnsQuery)
export class ListPendingReturnsHandler
  extends BaseQueryHandler<ListPendingReturnsQuery, readonly ReturnShipmentResponseDTO[]>
  implements IQueryHandler<ListPendingReturnsQuery>
{
  readonly queryType = 'logistics.return-shipment.list-pending';

  constructor(private readonly repo: ReturnShipmentRepository) {
    super();
  }

  async execute(_query: ListPendingReturnsQuery): Promise<readonly ReturnShipmentResponseDTO[]> {
    const entities = await this.repo.findPending();
    return entities.map((e) => ({ id: e.id, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as ReturnShipmentResponseDTO));
  }
}
