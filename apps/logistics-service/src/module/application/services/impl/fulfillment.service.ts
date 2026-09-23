import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { FulfillmentServiceInterface } from '../interfaces/fulfillment.service.interface';
import type { FulfillmentRepository } from '../../../domain/repositories/fulfillment.repository.interface';
import { FulfillmentEntity } from '../../../domain/entities/fulfillment.entity';
import { FulfillmentIdVO } from '../../../domain/value-objects/primitives/fulfillment-id.vo';
import { FulfillmentStatusVO } from '../../../domain/value-objects/primitives/fulfillment-status.vo';
import { FulfillmentTypeVO } from '../../../domain/value-objects/primitives/fulfillment-type.vo';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo';
import type { StartFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/start-fulfillment.dto';
import type { PickItemsRequestDTO } from '../../dtos/requests/fulfillment/pick-items.dto';
import type { PackItemsRequestDTO } from '../../dtos/requests/fulfillment/pack-items.dto';
import type { CompleteFulfillmentRequestDTO } from '../../dtos/requests/fulfillment/complete-fulfillment.dto';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto';

@Injectable()
export class FulfillmentService
  extends BaseService<FulfillmentEntity, string>
  implements FulfillmentServiceInterface
{
  readonly name = 'FulfillmentService';

  constructor(private readonly repo: FulfillmentRepository) {
    super();
  }

  async start(input: StartFulfillmentRequestDTO): Promise<FulfillmentResponseDTO> {
    const entity = FulfillmentEntity.create({
      orderId: OrderIdVO.create(input.orderId),
      warehouseId: WarehouseIdVO.create(input.warehouseId),
      status: FulfillmentStatusVO.create('in_progress'),
      type: FulfillmentTypeVO.create(input.type),
      strategy: input.strategy ?? null,
      startedAt: new Date(),
      completedAt: null,
    });
    const saved = await this.repo.save(entity);
    return this.toDTO(saved);
  }

  async pick(input: PickItemsRequestDTO): Promise<FulfillmentResponseDTO> {
    const entity = await this.repo.findById(FulfillmentIdVO.create(input.fulfillmentId));
    if (!entity) throw new Error('Fulfillment not found');
    return this.toDTO(entity);
  }

  async pack(input: PackItemsRequestDTO): Promise<FulfillmentResponseDTO> {
    const entity = await this.repo.findById(FulfillmentIdVO.create(input.fulfillmentId));
    if (!entity) throw new Error('Fulfillment not found');
    return this.toDTO(entity);
  }

  async complete(input: CompleteFulfillmentRequestDTO): Promise<FulfillmentResponseDTO> {
    const entity = await this.repo.findById(FulfillmentIdVO.create(input.fulfillmentId));
    if (!entity) throw new Error('Fulfillment not found');
    const updated = entity.complete();
    const saved = await this.repo.save(updated);
    return this.toDTO(saved);
  }

  private toDTO(entity: FulfillmentEntity): FulfillmentResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as FulfillmentResponseDTO;
  }
}
