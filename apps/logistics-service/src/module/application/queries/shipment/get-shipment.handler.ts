import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetShipmentQuery } from './get-shipment.query';
import type { ShipmentRepository } from '../../../domain/repositories/shipment.repository.interface';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo';
import { ShipmentOperationFailedError } from '../../errors/shipment.errors';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment-response.dto';

@QueryHandler(GetShipmentQuery)
export class GetShipmentHandler
  extends BaseQueryHandler<GetShipmentQuery, ShipmentResponseDTO>
  implements IQueryHandler<GetShipmentQuery>
{
  readonly queryType = 'logistics.shipment.get';

  constructor(private readonly repo: ShipmentRepository) {
    super();
  }

  async execute(query: GetShipmentQuery): Promise<ShipmentResponseDTO> {
    const entity = await this.repo.findById(ShipmentIdVO.create(query.shipmentId));
    if (!entity) throw new ShipmentOperationFailedError(`not found: ${query.shipmentId}`);
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as ShipmentResponseDTO;
  }
}
