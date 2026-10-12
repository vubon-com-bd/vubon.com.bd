import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IVehicleService, VehicleListOptionsDTO } from '../interfaces/vehicle.service.interface.js';
import { VEHICLE_REPOSITORY, type VehicleRepository } from '../../../domain/repositories/vehicle.repository.interface.js';
import { VehicleEntity } from '../../../domain/entities/vehicle.entity.js';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo.js';
import { VehicleStatusVO } from '../../../domain/value-objects/primitives/vehicle-status.vo.js';
import { VehicleTypeVO } from '../../../domain/value-objects/primitives/vehicle-type.vo.js';
import { VehicleFuelTypeVO } from '../../../domain/value-objects/primitives/vehicle-fuel-type.vo.js';
import { DriverIdVO } from '../../../domain/value-objects/primitives/driver-id.vo.js';
import { VehicleMapper } from '../../mappers/vehicle.mapper.js';
import { VehicleNotFoundApplicationError, VehicleOperationFailedApplicationError, VehicleNotAvailableApplicationError } from '../../errors/vehicle.errors.js';
import type {
  RegisterVehicleRequestDTO, UpdateVehicleRequestDTO, SetVehicleStatusRequestDTO,
  AssignVehicleDriverRequestDTO, UpdateVehicleMileageRequestDTO,
} from '../../dtos/requests/vehicle/vehicle.dto.js';
import type { VehicleResponseDTO, VehicleListResponseDTO } from '../../dtos/responses/vehicle/vehicle-response.dto.js';

@Injectable()
export class VehicleService implements IVehicleService {
  private readonly logger = new Logger(VehicleService.name);
  constructor(@Inject(VEHICLE_REPOSITORY) private readonly repo: VehicleRepository) {}

  async register(dto: RegisterVehicleRequestDTO, actorId?: string): Promise<VehicleResponseDTO> {
    const now = new Date().toISOString();
    if (await this.repo.existsByRegistration(dto.registrationNumber)) {
      throw new VehicleOperationFailedApplicationError('register', `registration exists: ${dto.registrationNumber}`);
    }
    const id = randomUUID();
    let e: VehicleEntity;
    try {
      e = VehicleEntity.create({ id, now, props: {
        registrationNumber: dto.registrationNumber,
        type: VehicleTypeVO.create(dto.type),
        fuelType: VehicleFuelTypeVO.create(dto.fuelType),
        make: dto.make, model: dto.model, year: dto.year, color: dto.color,
        maxWeightKg: dto.maxWeightKg, maxVolumeM3: dto.maxVolumeM3, capacity: dto.capacity,
        mileageKm: dto.mileageKm, insuranceExpiresAt: dto.insuranceExpiresAt,
        registrationExpiresAt: dto.registrationExpiresAt, isActive: true,
      }});
    } catch (err) {
      throw new VehicleOperationFailedApplicationError('register', err instanceof Error ? err.message : 'unknown');
    }
    const saved = await this.repo.save(e);
    this.logger.log(`Vehicle ${saved.id} registered by ${actorId ?? 'system'}`);
    return VehicleMapper.toResponse(saved);
  }

  async update(dto: UpdateVehicleRequestDTO, actorId?: string): Promise<VehicleResponseDTO> {
    const e = await this.load(dto.vehicleId);
    if (dto.mileageKm !== undefined) e.updateMileage(dto.mileageKm);
    const saved = await this.repo.save(e);
    this.logger.log(`Vehicle ${saved.id} updated by ${actorId ?? 'system'}`);
    return VehicleMapper.toResponse(saved);
  }

  async setStatus(dto: SetVehicleStatusRequestDTO, actorId?: string): Promise<VehicleResponseDTO> {
    const e = await this.load(dto.vehicleId);
    switch (dto.status) {
      case 'available': e.markAvailable(); break;
      case 'in_use': e.markInUse(); break;
      case 'maintenance': e.startMaintenance(dto.reason); break;
      case 'out_of_service': e.markOutOfService(dto.reason ?? 'manual'); break;
      case 'retired': e.retire(dto.reason ?? 'retired'); break;
    }
    const saved = await this.repo.save(e);
    this.logger.log(`Vehicle ${saved.id} status=${dto.status} by ${actorId ?? 'system'}`);
    return VehicleMapper.toResponse(saved);
  }

  async assignDriver(dto: AssignVehicleDriverRequestDTO, actorId?: string): Promise<VehicleResponseDTO> {
    const e = await this.load(dto.vehicleId);
    if (!e.canBeAssigned()) throw new VehicleNotAvailableApplicationError(dto.vehicleId, e.status.value);
    e.assignDriver(DriverIdVO.create(dto.driverId));
    const saved = await this.repo.save(e);
    this.logger.log(`Vehicle ${saved.id} driver-assigned by ${actorId ?? 'system'}`);
    return VehicleMapper.toResponse(saved);
  }

  async updateMileage(dto: UpdateVehicleMileageRequestDTO, actorId?: string): Promise<VehicleResponseDTO> {
    const e = await this.load(dto.vehicleId);
    e.updateMileage(dto.mileageKm);
    const saved = await this.repo.save(e);
    this.logger.log(`Vehicle ${saved.id} mileage=${dto.mileageKm} by ${actorId ?? 'system'}`);
    return VehicleMapper.toResponse(saved);
  }

  async getById(vehicleId: string): Promise<VehicleResponseDTO> {
    return VehicleMapper.toResponse(await this.load(vehicleId));
  }

  async list(options: VehicleListOptionsDTO): Promise<VehicleListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page, limit: options.limit,
      sortBy: options.sortBy, sortDir: options.sortDir, filter: options.filter,
    });
    return VehicleMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  private async load(id: string): Promise<VehicleEntity> {
    const vo = VehicleIdVO.create(id);
    const e = await this.repo.findByIdVO(vo);
    if (!e) throw new VehicleNotFoundApplicationError(id);
    return e;
  }
}
