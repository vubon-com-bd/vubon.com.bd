import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ShipmentServiceInterface } from '../interfaces/shipment.service.interface';
import type { ShipmentRepository } from '../../../domain/repositories/shipment.repository.interface';
import { ShipmentEntity } from '../../../domain/entities/shipment.entity';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo';
import { ShipmentNumberVO } from '../../../domain/value-objects/primitives/shipment-number.vo';
import { ShipmentStatusVO } from '../../../domain/value-objects/primitives/shipment-status.vo';
import { ShipmentTypeVO } from '../../../domain/value-objects/primitives/shipment-type.vo';
import { ShipmentPriorityVO } from '../../../domain/value-objects/primitives/shipment-priority.vo';
import { OrderIdVO } from '../../../domain/value-objects/primitives/order-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import { ShipmentOperationFailedError } from '../../errors/shipment.errors';
import type { CreateShipmentRequestDTO } from '../../dtos/requests/shipment/create-shipment.dto';
import type { UpdateShipmentRequestDTO } from '../../dtos/requests/shipment/update-shipment.dto';
import type { CancelShipmentRequestDTO } from '../../dtos/requests/shipment/cancel-shipment.dto';
import type { PickUpShipmentRequestDTO } from '../../dtos/requests/shipment/pick-up-shipment.dto';
import type { DeliverShipmentRequestDTO } from '../../dtos/requests/shipment/deliver-shipment.dto';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment-response.dto';

const PLACEHOLDER_USER_ID = '00000000-0000-0000-0000-000000000000';

@Injectable()
export class ShipmentService
  extends BaseService<ShipmentEntity, string>
  implements ShipmentServiceInterface
{
  readonly name = 'ShipmentService';

  constructor(private readonly shipmentRepo: ShipmentRepository) {
    super();
  }

  async create(input: CreateShipmentRequestDTO): Promise<ShipmentResponseDTO> {
    const entity = ShipmentEntity.create({
      number: ShipmentNumberVO.create(`SH${Date.now()}`),
      orderId: OrderIdVO.create(input.orderId),
      userId: UserIdVO.create(PLACEHOLDER_USER_ID),
      vendorId: null,
      status: ShipmentStatusVO.create('pending'),
      type: ShipmentTypeVO.create(input.type ?? 'standard'),
      priority: ShipmentPriorityVO.create('normal'),
      weight: null,
      dimension: null,
      notes: null,
    });
    const saved = await this.shipmentRepo.save(entity);
    return this.toDTO(saved);
  }

  async update(
    shipmentId: string,
    input: UpdateShipmentRequestDTO,
  ): Promise<ShipmentResponseDTO> {
    const entity = await this.shipmentRepo.findById(ShipmentIdVO.create(shipmentId));
    if (!entity) throw new ShipmentOperationFailedError(`not found: ${shipmentId}`);
    void input;
    const saved = await this.shipmentRepo.save(entity);
    return this.toDTO(saved);
  }

  async cancel(input: CancelShipmentRequestDTO): Promise<void> {
    const entity = await this.shipmentRepo.findById(ShipmentIdVO.create(input.shipmentId));
    if (!entity) throw new ShipmentOperationFailedError(`not found: ${input.shipmentId}`);
    const cancelled = entity.cancel(input.reason);
    await this.shipmentRepo.save(cancelled);
  }

  async pickUp(input: PickUpShipmentRequestDTO): Promise<ShipmentResponseDTO> {
    const entity = await this.shipmentRepo.findById(ShipmentIdVO.create(input.shipmentId));
    if (!entity) throw new ShipmentOperationFailedError(`not found: ${input.shipmentId}`);
    const updated = entity.markPickedUp(input.courierId);
    const saved = await this.shipmentRepo.save(updated);
    return this.toDTO(saved);
  }

  async deliver(input: DeliverShipmentRequestDTO): Promise<ShipmentResponseDTO> {
    const entity = await this.shipmentRepo.findById(ShipmentIdVO.create(input.shipmentId));
    if (!entity) throw new ShipmentOperationFailedError(`not found: ${input.shipmentId}`);
    const updated = entity.markDelivered();
    const saved = await this.shipmentRepo.save(updated);
    return this.toDTO(saved);
  }

  async findById(shipmentId: string): Promise<ShipmentResponseDTO | null> {
    const entity = await this.shipmentRepo.findById(ShipmentIdVO.create(shipmentId));
    return entity ? this.toDTO(entity) : null;
  }

  private toDTO(entity: ShipmentEntity): ShipmentResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    } as unknown as ShipmentResponseDTO;
  }
}
