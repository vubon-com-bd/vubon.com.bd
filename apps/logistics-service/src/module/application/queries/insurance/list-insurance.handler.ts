import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListInsuranceQuery } from './list-insurance.query';
import type { InsuranceRepository } from '../../../domain/repositories/insurance.repository.interface';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo';
import type { InsuranceResponseDTO } from '../../dtos/responses/insurance-response.dto';

@QueryHandler(ListInsuranceQuery)
export class ListInsuranceHandler
  extends BaseQueryHandler<ListInsuranceQuery, readonly InsuranceResponseDTO[]>
  implements IQueryHandler<ListInsuranceQuery>
{
  readonly queryType = 'logistics.insurance.list';

  constructor(private readonly repo: InsuranceRepository) {
    super();
  }

  async execute(query: ListInsuranceQuery): Promise<readonly InsuranceResponseDTO[]> {
    if (query.shipmentId) {
      const entity = await this.repo.findByShipment(ShipmentIdVO.create(query.shipmentId));
      return entity ? [{ id: entity.id.value, createdAt: entity.createdAt, updatedAt: entity.updatedAt } as unknown as InsuranceResponseDTO] : [];
    }
    const entities = await this.repo.findAll();
    return entities.map((e) => ({ id: e.id.value, createdAt: e.createdAt, updatedAt: e.updatedAt } as unknown as InsuranceResponseDTO));
  }
}
