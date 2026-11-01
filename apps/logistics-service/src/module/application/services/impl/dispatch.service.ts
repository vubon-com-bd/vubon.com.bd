import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  DISPATCH_REPOSITORY,
  type DispatchRepository,
} from '@domain/repositories/dispatch.repository.interface';
import { DispatchEntity } from '@domain/entities/dispatch.entity';
import { DispatchIdVO } from '@domain/primitives/dispatch-id.vo';
import { DispatchNumberVO } from '@domain/primitives/dispatch-number.vo';
import { DispatchTypeVO } from '@domain/primitives/dispatch-type.vo';

import { DispatchMapper } from '@application/mappers/dispatch/dispatch.mapper';
import { DispatchValidator } from '@application/validators/dispatch/dispatch.validator';

import {
  DISPATCH_SERVICE,
  type IDispatchService,
  type DispatchListOptionsDTO,
} from '@application/services/interfaces/dispatch.service.interface';

import type {
  DispatchResponseDTO,
  DispatchListResponseDTO,
  DispatchStatsResponseDTO,
} from '@application/dtos/responses/dispatch/index.js';

import type {
  CreateDispatchRequestDTO,
  AssignDispatchRequestDTO,
  DispatchActionRequestDTO,
  DispatchWithManifestRequestDTO,
  FailDispatchRequestDTO,
  CancelDispatchRequestDTO,
  ReturnDispatchRequestDTO,
} from '@application/dtos/requests/dispatch/index.js';

import {
  DispatchNotFoundApplicationError,
  DispatchByNumberNotFoundError,
  CreateDispatchError,
  DispatchAlreadyExistsError,
  DispatchOperationError,
} from '@application/errors/dispatch.errors';

export interface IDispatchEventBridge {
  publishFromEntity(entity: DispatchEntity): Promise<void>;
}
export const DISPATCH_EVENT_BRIDGE = Symbol('DISPATCH_EVENT_BRIDGE');

@Injectable()
export class DispatchService implements IDispatchService {
  private readonly logger = new Logger(DispatchService.name);

  constructor(
    @Inject(DISPATCH_REPOSITORY)
    private readonly repo: DispatchRepository,
    @Inject(DISPATCH_EVENT_BRIDGE)
    private readonly eventBridge: IDispatchEventBridge,
  ) {}

  async create(dto: CreateDispatchRequestDTO, actorId: string): Promise<DispatchResponseDTO> {
    this.logger.log(`create dispatch with ${dto.shipmentIds.length} shipments`);
    try {
      const v = DispatchValidator.validateCreate(dto);
      const now = new Date().toISOString();
      const dispatchNumber = await this.generateDispatchNumber();

      const entity = DispatchEntity.create({
        id: DispatchIdVO.create(randomUUID()),
        now,
        props: {
          dispatchNumber: DispatchNumberVO.create(dispatchNumber),
          type: DispatchTypeVO.create(v.type),
          shipmentIds: v.shipmentIds,
          courierId: v.courierId,
          vehicleId: v.vehicleId,
          driverId: v.driverId,
          warehouseId: v.warehouseId,
          totalWeight: v.totalWeight,
          estimatedArrivalAt: v.estimatedArrivalAt,
          notes: v.notes,
        },
      });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return DispatchMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async assign(dto: AssignDispatchRequestDTO, actorId: string): Promise<DispatchResponseDTO> {
    const v = DispatchValidator.validateAssign(dto);
    const entity = await this.loadEntity(v.dispatchId);
    entity.assign({ courierId: v.courierId, vehicleId: v.vehicleId, driverId: v.driverId });
    return this.persistAndPublish(entity);
  }

  async dispatch(dto: DispatchWithManifestRequestDTO, actorId: string): Promise<DispatchResponseDTO> {
    const v = DispatchValidator.validateDispatch(dto);
    const entity = await this.loadEntity(v.dispatchId);
    entity.dispatch(v.manifestUrl);
    return this.persistAndPublish(entity);
  }

  async startTransit(dto: DispatchActionRequestDTO, actorId: string): Promise<DispatchResponseDTO> {
    const v = DispatchValidator.validateAction(dto);
    const entity = await this.loadEntity(v.dispatchId);
    entity.startTransit();
    return this.persistAndPublish(entity);
  }

  async markDelivered(dto: DispatchActionRequestDTO, actorId: string): Promise<DispatchResponseDTO> {
    const v = DispatchValidator.validateAction(dto);
    const entity = await this.loadEntity(v.dispatchId);
    entity.markDelivered();
    return this.persistAndPublish(entity);
  }

  async markFailed(dto: FailDispatchRequestDTO, actorId: string): Promise<DispatchResponseDTO> {
    const v = DispatchValidator.validateFail(dto);
    const entity = await this.loadEntity(v.dispatchId);
    entity.markFailed(v.reason);
    return this.persistAndPublish(entity);
  }

  async markReturned(dto: ReturnDispatchRequestDTO, actorId: string): Promise<DispatchResponseDTO> {
    const v = DispatchValidator.validateReturn(dto);
    const entity = await this.loadEntity(v.dispatchId);
    entity.markReturned(v.reason);
    return this.persistAndPublish(entity);
  }

  async cancel(dto: CancelDispatchRequestDTO, actorId: string): Promise<DispatchResponseDTO> {
    const v = DispatchValidator.validateCancel(dto);
    const entity = await this.loadEntity(v.dispatchId);
    entity.cancel(v.reason);
    return this.persistAndPublish(entity);
  }

  async getById(id: string): Promise<DispatchResponseDTO> {
    const entity = await this.loadEntity(id);
    return DispatchMapper.toResponse(entity);
  }
  async getByNumber(num: string): Promise<DispatchResponseDTO> {
    const entity = await this.repo.findByDispatchNumber(num);
    if (!entity) throw new DispatchByNumberNotFoundError(num);
    return DispatchMapper.toResponse(entity);
  }
  async list(options: DispatchListOptionsDTO): Promise<DispatchListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return DispatchMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listByCourier(courierId: string): Promise<DispatchListResponseDTO> {
    const items = await this.repo.findByCourierId(courierId);
    return DispatchMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByDriver(driverId: string): Promise<DispatchListResponseDTO> {
    const items = await this.repo.findByDriverId(driverId);
    return DispatchMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listPending(): Promise<DispatchListResponseDTO> {
    const items = await this.repo.findPending();
    return DispatchMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listInTransit(): Promise<DispatchListResponseDTO> {
    const items = await this.repo.findInTransit();
    return DispatchMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listContainingShipment(shipmentId: string): Promise<DispatchListResponseDTO> {
    const items = await this.repo.findContainingShipment(shipmentId);
    return DispatchMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async getStats(): Promise<DispatchStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return DispatchMapper.toStatsResponse(stats);
  }

  private async generateDispatchNumber(): Promise<string> {
    for (let i = 0; i < 5; i++) {
      const candidate = `DSP${Date.now().toString().slice(-10)}${Math.random().toString(36).slice(2, 4).toUpperCase()}`;
      if (!(await this.repo.existsByDispatchNumber(candidate))) return candidate;
    }
    throw new DispatchOperationError('generateNumber', '5 attempts failed');
  }

  private async loadEntity(id: string): Promise<DispatchEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new DispatchNotFoundApplicationError(id);
    return entity;
  }
  private async persistAndPublish(entity: DispatchEntity): Promise<DispatchResponseDTO> {
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DispatchMapper.toResponse(saved);
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateDispatchError(err.message);
      return new DispatchOperationError(op, err.message);
    }
    return new DispatchOperationError(op, String(err));
  }
}
