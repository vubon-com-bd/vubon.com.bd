import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { DispatchServiceInterface } from '../interfaces/dispatch.service.interface';
import type { DispatchRepository } from '../../../domain/repositories/dispatch.repository.interface';
import { DispatchEntity } from '../../../domain/entities/dispatch.entity';
import { DispatchIdVO } from '../../../domain/value-objects/primitives/dispatch-id.vo';
import { DispatchStatusVO } from '../../../domain/value-objects/primitives/dispatch-status.vo';
import { DispatchTypeVO } from '../../../domain/value-objects/primitives/dispatch-type.vo';
import { ShipmentIdVO } from '../../../domain/value-objects/primitives/shipment-id.vo';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo';
import { DriverIdVO } from '../../../domain/value-objects/primitives/driver-id.vo';
import type { CreateDispatchRequestDTO } from '../../dtos/requests/dispatch/create-dispatch.dto';
import type { AssignVehicleRequestDTO } from '../../dtos/requests/dispatch/assign-vehicle.dto';
import type { AssignDriverRequestDTO } from '../../dtos/requests/dispatch/assign-driver.dto';
import type { CompleteDispatchRequestDTO } from '../../dtos/requests/dispatch/complete-dispatch.dto';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch-response.dto';

@Injectable()
export class DispatchService
  extends BaseService<DispatchEntity, string>
  implements DispatchServiceInterface
{
  readonly name = 'DispatchService';

  constructor(private readonly repo: DispatchRepository) {
    super();
  }

  async create(input: CreateDispatchRequestDTO): Promise<DispatchResponseDTO> {
    const firstShipmentId = input.shipmentIds[0] ?? crypto.randomUUID();
    const entity = DispatchEntity.create({
      shipmentId: ShipmentIdVO.create(firstShipmentId),
      vehicleId: input.vehicleId ? VehicleIdVO.create(input.vehicleId) : null,
      driverId: input.driverId ? DriverIdVO.create(input.driverId) : null,
      routeId: null,
      status: DispatchStatusVO.create('pending'),
      type: DispatchTypeVO.create('standard'),
      departedAt: null,
      arrivedAt: null,
    });
    const saved = await this.repo.save(entity);
    return this.toDTO(saved);
  }

  async assignVehicle(input: AssignVehicleRequestDTO): Promise<DispatchResponseDTO> {
    const entity = await this.repo.findById(DispatchIdVO.create(input.dispatchId));
    if (!entity) throw new Error('Dispatch not found');
    void VehicleIdVO.create(input.vehicleId);
    return this.toDTO(entity);
  }

  async assignDriver(input: AssignDriverRequestDTO): Promise<DispatchResponseDTO> {
    const entity = await this.repo.findById(DispatchIdVO.create(input.dispatchId));
    if (!entity) throw new Error('Dispatch not found');
    void DriverIdVO.create(input.driverId);
    return this.toDTO(entity);
  }

  async complete(input: CompleteDispatchRequestDTO): Promise<DispatchResponseDTO> {
    const entity = await this.repo.findById(DispatchIdVO.create(input.dispatchId));
    if (!entity) throw new Error('Dispatch not found');
    const updated = entity.arrive();
    const saved = await this.repo.save(updated);
    return this.toDTO(saved);
  }

  private toDTO(entity: DispatchEntity): DispatchResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as DispatchResponseDTO;
  }
}
