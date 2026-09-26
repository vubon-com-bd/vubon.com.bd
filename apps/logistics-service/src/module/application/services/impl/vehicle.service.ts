import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { VehicleServiceInterface } from '../interfaces/vehicle.service.interface';
import type { VehicleRepository } from '../../../domain/repositories/vehicle.repository.interface';
import { VehicleEntity } from '../../../domain/entities/vehicle.entity';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo';
import { VehicleNumberVO } from '../../../domain/value-objects/primitives/vehicle-number.vo';
import { VehicleStatusVO } from '../../../domain/value-objects/primitives/vehicle-status.vo';
import { VehicleTypeVO } from '../../../domain/value-objects/primitives/vehicle-type.vo';
import type { RegisterVehicleRequestDTO } from '../../dtos/requests/vehicle/register-vehicle.dto';
import type { UpdateVehicleRequestDTO } from '../../dtos/requests/vehicle/update-vehicle.dto';
import type { SetVehicleStatusRequestDTO } from '../../dtos/requests/vehicle/set-vehicle-status.dto';
import type { VehicleResponseDTO } from '../../dtos/responses/vehicle-response.dto';

@Injectable()
export class VehicleService
  extends BaseService<VehicleEntity, string>
  implements VehicleServiceInterface
{
  readonly name = 'VehicleService';

  constructor(private readonly repo: VehicleRepository) {
    super();
  }

  async register(input: RegisterVehicleRequestDTO): Promise<VehicleResponseDTO> {
    const entity = VehicleEntity.create({
      number: VehicleNumberVO.create(input.vehicleNumber),
      type: VehicleTypeVO.create(input.type),
      status: VehicleStatusVO.create('available'),
      capacity: null,
      fuelType: null,
    });
    const saved = await this.repo.save(entity);
    return this.toDTO(saved);
  }

  async update(input: UpdateVehicleRequestDTO): Promise<VehicleResponseDTO> {
    const entity = await this.repo.findById(VehicleIdVO.create(input.vehicleId));
    if (!entity) throw new Error('Vehicle not found');
    return this.toDTO(entity);
  }

  async setStatus(input: SetVehicleStatusRequestDTO): Promise<VehicleResponseDTO> {
    const entity = await this.repo.findById(VehicleIdVO.create(input.vehicleId));
    if (!entity) throw new Error('Vehicle not found');
    return this.toDTO(entity);
  }

  async listAvailable(): Promise<readonly VehicleResponseDTO[]> {
    const entities = await this.repo.findAvailable();
    return entities.map((e) => this.toDTO(e));
  }

  private toDTO(entity: VehicleEntity): VehicleResponseDTO {
    return {
      id: entity.id.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as VehicleResponseDTO;
  }
}
