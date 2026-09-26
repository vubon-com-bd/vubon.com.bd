import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetReturnQuery } from './get-return.query';
import type { ReturnShipmentRepository } from '../../../domain/repositories/return-shipment.repository.interface';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment-response.dto';

@QueryHandler(GetReturnQuery)
export class GetReturnHandler
  extends BaseQueryHandler<GetReturnQuery, ReturnShipmentResponseDTO | null>
  implements IQueryHandler<GetReturnQuery>
{
  readonly queryType = 'logistics.return-shipment.get';

  constructor(private readonly repo: ReturnShipmentRepository) {
    super();
  }

  async execute(query: GetReturnQuery): Promise<ReturnShipmentResponseDTO | null> {
    const entity = await this.repo.findById(query.returnShipmentId);
    if (!entity) return null;
    return { id: entity.id, createdAt: entity.createdAt, updatedAt: entity.updatedAt } as unknown as ReturnShipmentResponseDTO;
  }
}
