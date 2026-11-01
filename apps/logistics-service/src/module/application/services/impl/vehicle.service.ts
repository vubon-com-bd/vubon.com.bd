import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VEHICLE_REPOSITORY,
  type VehicleRepository,
} from '@domain/repositories/vehicle.repository.interface';
import { VehicleEntity } from '@domain/entities/vehicle.entity';
import { VehicleIdVO } from '@domain/primitives/vehicle-id.vo';
import { VehicleNumberVO } from '@domain/primitives/vehicle-number.vo';
import { VehicleTypeVO } from '@domain/primitives/vehicle-type.vo';
import { VehicleFuelTypeVO } from '@domain/primitives/vehicle-fuel-type.vo';

import { VehicleMapper } from '@application/mappers/vehicle/vehicle.mapper';
import { VehicleValidator } from '@application/validators/vehicle/vehicle.validator';

import {
  VEHICLE_SERVICE,
  type IVehicleService,
  type VehicleListOptionsDTO,
} from '@application/services/interfaces/vehicle.service.interface';

import type {
  VehicleResponseDTO,
  VehicleListResponseDTO,
  VehicleStatsResponseDTO,
} from '@application/dtos/responses/vehicle/index.js';

import type {
  CreateVehicleRequestDTO,
  UpdateVehicleRequestDTO,
  VehicleActionRequestDTO,
  AssignVehicleRequestDTO,
  StartVehicleMaintenanceRequestDTO,
  RetireVehicleRequestDTO,
  AssignDriverToVehicleRequestDTO,
} from '@application/dtos/requests/vehicle/index.js';

import {
  VehicleNotFoundApplicationError,
  VehicleByRegistrationNotFoundError,
  CreateVehicleError,
  VehicleAlreadyExistsError,
  VehicleOperationError,
} from '@application/errors/vehicle.errors';

export interface IVehicleEventBridge {
  publishFromEntity(entity: VehicleEntity): Promise<void>;
}
export const VEHICLE_EVENT_BRIDGE = Symbol('VEHICLE_EVENT_BRIDGE');

@Injectable()
export class VehicleService implements IVehicleService {
  private readonly logger = new Logger(VehicleService.name);

  constructor(
    @Inject(VEHICLE_REPOSITORY)
    private readonly repo: VehicleRepository,
    @Inject(VEHICLE_EVENT_BRIDGE)
    private readonly eventBridge: IVehicleEventBridge,
  ) {}

  async create(dto: CreateVehicleRequestDTO, actorId: string): Promise<VehicleResponseDTO> {
    this.logger.log(`create vehicle reg=${dto.registrationNumber}`);
    try {
      const v = VehicleValidator.validateCreate(dto);
      if (await this.repo.existsByRegistrationNumber(v.registrationNumber)) {
        throw new VehicleAlreadyExistsError(v.registrationNumber);
      }
      const now = new Date().toISOString();
      const entity = VehicleEntity.create({
        id: VehicleIdVO.create(randomUUID()),
        now,
        props: {
          registrationNumber: VehicleNumberVO.create(v.registrationNumber),
          type: VehicleTypeVO.create(v.type),
          fuelType: VehicleFuelTypeVO.create(v.fuelType),
          make: v.make,
          model: v.model,
          year: v.year,
          color: v.color,
          maxWeightKg: v.maxWeightKg,
          maxVolumeM3: v.maxVolumeM3,
          capacity: v.capacity,
          mileageKm: v.mileageKm,
          insuranceExpiresAt: v.insuranceExpiresAt,
          registrationExpiresAt: v.registrationExpiresAt,
          warehouseId: v.warehouseId,
          isActive: true,
        },
      });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return VehicleMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async update(dto: UpdateVehicleRequestDTO, actorId: string): Promise<VehicleResponseDTO> {
    const v = VehicleValidator.validateUpdate(dto);
    const entity = await this.loadEntity(v.vehicleId);
    if (v.mileageKm !== undefined) entity.updateMileage(v.mileageKm);
    return this.persistAndPublish(entity);
  }

  async assign(dto: AssignVehicleRequestDTO, actorId: string): Promise<VehicleResponseDTO> {
    const v = VehicleValidator.validateAssign(dto);
    const entity = await this.loadEntity(v.vehicleId);
    entity.assign(v.dispatchId, v.driverId);
    return this.persistAndPublish(entity);
  }

  async release(dto: VehicleActionRequestDTO, actorId: string): Promise<VehicleResponseDTO> {
    const v = VehicleValidator.validateAction(dto);
    const entity = await this.loadEntity(v.vehicleId);
    entity.release();
    return this.persistAndPublish(entity);
  }

  async startMaintenance(dto: StartVehicleMaintenanceRequestDTO, actorId: string): Promise<VehicleResponseDTO> {
    const v = VehicleValidator.validateStartMaintenance(dto);
    const entity = await this.loadEntity(v.vehicleId);
    entity.startMaintenance(v.reason);
    return this.persistAndPublish(entity);
  }

  async completeMaintenance(dto: VehicleActionRequestDTO, actorId: string): Promise<VehicleResponseDTO> {
    const v = VehicleValidator.validateAction(dto);
    const entity = await this.loadEntity(v.vehicleId);
    entity.completeMaintenance();
    return this.persistAndPublish(entity);
  }

  async retire(dto: RetireVehicleRequestDTO, actorId: string): Promise<VehicleResponseDTO> {
    const v = VehicleValidator.validateRetire(dto);
    const entity = await this.loadEntity(v.vehicleId);
    entity.retire(v.reason);
    return this.persistAndPublish(entity);
  }

  async assignDriver(dto: AssignDriverToVehicleRequestDTO, actorId: string): Promise<VehicleResponseDTO> {
    const v = VehicleValidator.validateAssignDriver(dto);
    const entity = await this.loadEntity(v.vehicleId);
    entity.assignDriver(v.driverId);
    return this.persistAndPublish(entity);
  }

  async unassignDriver(dto: VehicleActionRequestDTO, actorId: string): Promise<VehicleResponseDTO> {
    const v = VehicleValidator.validateAction(dto);
    const entity = await this.loadEntity(v.vehicleId);
    entity.unassignDriver();
    return this.persistAndPublish(entity);
  }

  async updateMileage(
    dto: { vehicleId: string; km: number },
    actorId: string,
  ): Promise<VehicleResponseDTO> {
    const entity = await this.loadEntity(dto.vehicleId);
    entity.updateMileage(dto.km);
    return this.persistAndPublish(entity);
  }

  async getById(id: string): Promise<VehicleResponseDTO> {
    const entity = await this.loadEntity(id);
    return VehicleMapper.toResponse(entity);
  }
  async getByRegistrationNumber(reg: string): Promise<VehicleResponseDTO> {
    const entity = await this.repo.findByRegistrationNumber(reg);
    if (!entity) throw new VehicleByRegistrationNotFoundError(reg);
    return VehicleMapper.toResponse(entity);
  }
  async list(options: VehicleListOptionsDTO): Promise<VehicleListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return VehicleMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listAvailable(): Promise<VehicleListResponseDTO> {
    const items = await this.repo.findAvailable();
    return VehicleMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByWarehouse(warehouseId: string): Promise<VehicleListResponseDTO> {
    const items = await this.repo.findByWarehouseId(warehouseId);
    return VehicleMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByDriver(driverId: string): Promise<VehicleListResponseDTO> {
    const e = await this.repo.findByDriverId(driverId);
    return VehicleMapper.toListResponse(e ? [e] : [], e ? 1 : 0, 1, 1);
  }
  async getStats(): Promise<VehicleStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return VehicleMapper.toStatsResponse(stats);
  }

  private async loadEntity(id: string): Promise<VehicleEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new VehicleNotFoundApplicationError(id);
    return entity;
  }
  private async persistAndPublish(entity: VehicleEntity): Promise<VehicleResponseDTO> {
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return VehicleMapper.toResponse(saved);
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateVehicleError(err.message);
      return new VehicleOperationError(op, err.message);
    }
    return new VehicleOperationError(op, String(err));
  }
}
