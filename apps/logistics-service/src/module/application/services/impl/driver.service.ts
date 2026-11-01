import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  DRIVER_REPOSITORY,
  type DriverRepository,
} from '@domain/repositories/driver.repository.interface';
import { DriverEntity } from '@domain/entities/driver.entity';
import { DriverIdVO } from '@domain/primitives/driver-id.vo';
import { DriverNameVO } from '@domain/primitives/driver-name.vo';
import { DriverTypeVO } from '@domain/primitives/driver-type.vo';
import { DriverLicenseVO } from '@domain/primitives/driver-license.vo';

import { DriverMapper } from '@application/mappers/driver/driver.mapper';
import { DriverValidator } from '@application/validators/driver/driver.validator';

import {
  DRIVER_SERVICE,
  type IDriverService,
  type DriverListOptionsDTO,
} from '@application/services/interfaces/driver.service.interface';

import type {
  DriverResponseDTO,
  DriverListResponseDTO,
  DriverStatsResponseDTO,
} from '@application/dtos/responses/driver/index.js';

import type {
  CreateDriverRequestDTO,
  UpdateDriverRequestDTO,
  DriverActionRequestDTO,
  DeactivateDriverRequestDTO,
  SuspendDriverRequestDTO,
  OnLeaveDriverRequestDTO,
  AssignVehicleToDriverRequestDTO,
  CollectCashRequestDTO,
  DepositCashRequestDTO,
  RecordDeliveryRequestDTO,
} from '@application/dtos/requests/driver/index.js';

import {
  DriverNotFoundApplicationError,
  DriverByLicenseNotFoundError,
  DriverByPhoneNotFoundError,
  CreateDriverError,
  DriverAlreadyExistsError,
  DriverOperationError,
} from '@application/errors/driver.errors';

export interface IDriverEventBridge {
  publishFromEntity(entity: DriverEntity): Promise<void>;
}
export const DRIVER_EVENT_BRIDGE = Symbol('DRIVER_EVENT_BRIDGE');

@Injectable()
export class DriverService implements IDriverService {
  private readonly logger = new Logger(DriverService.name);

  constructor(
    @Inject(DRIVER_REPOSITORY)
    private readonly repo: DriverRepository,
    @Inject(DRIVER_EVENT_BRIDGE)
    private readonly eventBridge: IDriverEventBridge,
  ) {}

  async create(dto: CreateDriverRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    this.logger.log(`create driver license=${dto.licenseNumber}`);
    try {
      const v = DriverValidator.validateCreate(dto);
      if (await this.repo.existsByLicenseNumber(v.licenseNumber)) {
        throw new DriverAlreadyExistsError(v.licenseNumber);
      }
      const now = new Date().toISOString();
      const entity = DriverEntity.create({
        id: DriverIdVO.create(randomUUID()),
        now,
        props: {
          userId: v.userId,
          name: DriverNameVO.create(v.name),
          phone: v.phone,
          email: v.email,
          type: DriverTypeVO.create(v.type),
          license: DriverLicenseVO.create({
            licenseNumber: v.licenseNumber,
            licenseType: v.licenseType,
            expiresAt: v.licenseExpiresAt,
          }),
          dateOfBirth: v.dateOfBirth,
          address: v.address,
          warehouseId: v.warehouseId,
          totalDeliveries: 0,
          cashLimit: v.cashLimit,
          cashInHand: 0,
        },
      });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return DriverMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async update(dto: UpdateDriverRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    const v = DriverValidator.validateUpdate(dto);
    const entity = await this.loadEntity(v.driverId);
    return this.persistAndPublish(entity);
  }

  async markAvailable(dto: DriverActionRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    const v = DriverValidator.validateAction(dto);
    const entity = await this.loadEntity(v.driverId);
    entity.markAvailable();
    return this.persistAndPublish(entity);
  }
  async goOnDuty(dto: DriverActionRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    const v = DriverValidator.validateAction(dto);
    const entity = await this.loadEntity(v.driverId);
    entity.goOnDuty();
    return this.persistAndPublish(entity);
  }
  async goOnBreak(dto: DriverActionRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    const v = DriverValidator.validateAction(dto);
    const entity = await this.loadEntity(v.driverId);
    entity.goOnBreak();
    return this.persistAndPublish(entity);
  }
  async goOffDuty(dto: DriverActionRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    const v = DriverValidator.validateAction(dto);
    const entity = await this.loadEntity(v.driverId);
    entity.goOffDuty();
    return this.persistAndPublish(entity);
  }
  async goOnLeave(dto: OnLeaveDriverRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    const v = DriverValidator.validateOnLeave(dto);
    const entity = await this.loadEntity(v.driverId);
    entity.goOnLeave(v.leaveEndAt);
    return this.persistAndPublish(entity);
  }
  async suspend(dto: SuspendDriverRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    const v = DriverValidator.validateSuspend(dto);
    const entity = await this.loadEntity(v.driverId);
    entity.suspend(v.reason);
    return this.persistAndPublish(entity);
  }
  async deactivate(dto: DeactivateDriverRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    const v = DriverValidator.validateDeactivate(dto);
    const entity = await this.loadEntity(v.driverId);
    entity.deactivate(v.reason);
    return this.persistAndPublish(entity);
  }
  async assignVehicle(dto: AssignVehicleToDriverRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    const v = DriverValidator.validateAssignVehicle(dto);
    const entity = await this.loadEntity(v.driverId);
    entity.assignVehicle(v.vehicleId);
    return this.persistAndPublish(entity);
  }
  async unassignVehicle(dto: DriverActionRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    const v = DriverValidator.validateAction(dto);
    const entity = await this.loadEntity(v.driverId);
    entity.unassignVehicle();
    return this.persistAndPublish(entity);
  }
  async collectCash(dto: CollectCashRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    const v = DriverValidator.validateCollectCash(dto);
    const entity = await this.loadEntity(v.driverId);
    entity.collectCash(v.amount, v.currency);
    return this.persistAndPublish(entity);
  }
  async depositCash(dto: DepositCashRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    const v = DriverValidator.validateDepositCash(dto);
    const entity = await this.loadEntity(v.driverId);
    entity.depositCash(v.amount, v.currency);
    return this.persistAndPublish(entity);
  }
  async recordDelivery(dto: RecordDeliveryRequestDTO, actorId: string): Promise<DriverResponseDTO> {
    const v = DriverValidator.validateRecordDelivery(dto);
    const entity = await this.loadEntity(v.driverId);
    entity.recordDelivery(v.deliveryId, v.distanceKm);
    return this.persistAndPublish(entity);
  }

  async getById(id: string): Promise<DriverResponseDTO> {
    const entity = await this.loadEntity(id);
    return DriverMapper.toResponse(entity);
  }
  async getByLicense(license: string): Promise<DriverResponseDTO> {
    const entity = await this.repo.findByLicenseNumber(license);
    if (!entity) throw new DriverByLicenseNotFoundError(license);
    return DriverMapper.toResponse(entity);
  }
  async getByPhone(phone: string): Promise<DriverResponseDTO> {
    const entity = await this.repo.findByPhone(phone);
    if (!entity) throw new DriverByPhoneNotFoundError(phone);
    return DriverMapper.toResponse(entity);
  }
  async list(options: DriverListOptionsDTO): Promise<DriverListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return DriverMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listAvailable(): Promise<DriverListResponseDTO> {
    const items = await this.repo.findAvailable();
    return DriverMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByWarehouse(warehouseId: string): Promise<DriverListResponseDTO> {
    const items = await this.repo.findByWarehouseId(warehouseId);
    return DriverMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async getStats(): Promise<DriverStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return DriverMapper.toStatsResponse(stats);
  }

  private async loadEntity(id: string): Promise<DriverEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new DriverNotFoundApplicationError(id);
    return entity;
  }
  private async persistAndPublish(entity: DriverEntity): Promise<DriverResponseDTO> {
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DriverMapper.toResponse(saved);
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateDriverError(err.message);
      return new DriverOperationError(op, err.message);
    }
    return new DriverOperationError(op, String(err));
  }
}
