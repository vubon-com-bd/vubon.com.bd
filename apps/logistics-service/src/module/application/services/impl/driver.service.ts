import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IDriverService, DriverListOptionsDTO } from '../interfaces/driver.service.interface.js';
import { DRIVER_REPOSITORY, type DriverRepository } from '../../../domain/repositories/driver.repository.interface.js';
import { DriverEntity } from '../../../domain/entities/driver.entity.js';
import { DriverIdVO } from '../../../domain/value-objects/primitives/driver-id.vo.js';
import { DriverStatusVO } from '../../../domain/value-objects/primitives/driver-status.vo.js';
import { DriverTypeVO } from '../../../domain/value-objects/primitives/driver-type.vo.js';
import { DriverLicenseTypeVO } from '../../../domain/value-objects/primitives/driver-license-type.vo.js';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo.js';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { DriverMapper } from '../../mappers/driver.mapper.js';
import { DriverNotFoundApplicationError, DriverOperationFailedApplicationError } from '../../errors/driver.errors.js';
import type {
  RegisterDriverRequestDTO, UpdateDriverRequestDTO, SetDriverStatusRequestDTO,
  AssignDriverVehicleRequestDTO, ReceiveDriverCashRequestDTO, RemitDriverCashRequestDTO,
} from '../../dtos/requests/driver/driver.dto.js';
import type { DriverResponseDTO, DriverListResponseDTO } from '../../dtos/responses/driver/driver-response.dto.js';

@Injectable()
export class DriverService implements IDriverService {
  private readonly logger = new Logger(DriverService.name);
  constructor(@Inject(DRIVER_REPOSITORY) private readonly repo: DriverRepository) {}

  async register(dto: RegisterDriverRequestDTO, actorId?: string): Promise<DriverResponseDTO> {
    const now = new Date().toISOString();
    if (await this.repo.existsByLicense(dto.licenseNumber)) {
      throw new DriverOperationFailedApplicationError('register', `license exists: ${dto.licenseNumber}`);
    }
    const id = randomUUID();
    let e: DriverEntity;
    try {
      e = DriverEntity.create({ id, now, props: {
        userId: dto.userId as never,
        name: dto.name, phone: dto.phone as never, email: dto.email as never,
        type: DriverTypeVO.create(dto.type),
        licenseNumber: dto.licenseNumber,
        licenseType: DriverLicenseTypeVO.create(dto.licenseType),
        licenseExpiresAt: dto.licenseExpiresAt,
        dateOfBirth: dto.dateOfBirth, address: dto.address,
        warehouseId: dto.warehouseId ? WarehouseIdVO.create(dto.warehouseId) : undefined,
        cashLimit: dto.cashLimit,
      }});
    } catch (err) {
      throw new DriverOperationFailedApplicationError('register', err instanceof Error ? err.message : 'unknown');
    }
    const saved = await this.repo.save(e);
    this.logger.log(`Driver ${saved.id} registered by ${actorId ?? 'system'}`);
    return DriverMapper.toResponse(saved);
  }

  async update(dto: UpdateDriverRequestDTO, actorId?: string): Promise<DriverResponseDTO> {
    const e = await this.load(dto.driverId);
    if (dto.email !== undefined) e.updateEmail(dto.email as never);
    if (dto.warehouseId !== undefined) e.assignWarehouse(WarehouseIdVO.create(dto.warehouseId));
    const saved = await this.repo.save(e);
    this.logger.log(`Driver ${saved.id} updated by ${actorId ?? 'system'}`);
    return DriverMapper.toResponse(saved);
  }

  async setStatus(dto: SetDriverStatusRequestDTO, actorId?: string): Promise<DriverResponseDTO> {
    const e = await this.load(dto.driverId);
    switch (dto.status) {
      case 'on_duty': e.goOnDuty(); break;
      case 'off_duty': e.goOffDuty(dto.reason); break;
      case 'on_break': e.startBreak(); break;
      case 'available': e.reactivate(); break;
      case 'suspended': e.suspend(dto.reason ?? 'manual'); break;
      default: e.updateStatus(DriverStatusVO.create(dto.status), dto.reason); break;
    }
    const saved = await this.repo.save(e);
    this.logger.log(`Driver ${saved.id} status=${dto.status} by ${actorId ?? 'system'}`);
    return DriverMapper.toResponse(saved);
  }

  async assignVehicle(dto: AssignDriverVehicleRequestDTO, actorId?: string): Promise<DriverResponseDTO> {
    const e = await this.load(dto.driverId);
    e.assignVehicle(VehicleIdVO.create(dto.vehicleId));
    const saved = await this.repo.save(e);
    this.logger.log(`Driver ${saved.id} vehicle-assigned by ${actorId ?? 'system'}`);
    return DriverMapper.toResponse(saved);
  }

  async receiveCash(dto: ReceiveDriverCashRequestDTO, actorId?: string): Promise<DriverResponseDTO> {
    const e = await this.load(dto.driverId); e.receiveCash(dto.amount);
    const saved = await this.repo.save(e);
    this.logger.log(`Driver ${saved.id} received cash=${dto.amount} by ${actorId ?? 'system'}`);
    return DriverMapper.toResponse(saved);
  }

  async remitCash(dto: RemitDriverCashRequestDTO, actorId?: string): Promise<DriverResponseDTO> {
    const e = await this.load(dto.driverId); e.remitCash(dto.amount);
    const saved = await this.repo.save(e);
    this.logger.log(`Driver ${saved.id} remitted cash=${dto.amount} by ${actorId ?? 'system'}`);
    return DriverMapper.toResponse(saved);
  }

  async getById(driverId: string): Promise<DriverResponseDTO> {
    return DriverMapper.toResponse(await this.load(driverId));
  }

  async list(options: DriverListOptionsDTO): Promise<DriverListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page, limit: options.limit,
      sortBy: options.sortBy, sortDir: options.sortDir, filter: options.filter,
    });
    return DriverMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  private async load(id: string): Promise<DriverEntity> {
    const vo = DriverIdVO.create(id);
    const e = await this.repo.findByIdVO(vo);
    if (!e) throw new DriverNotFoundApplicationError(id);
    return e;
  }
}
