import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  FULFILLMENT_REPOSITORY,
  type FulfillmentRepository,
} from '@domain/repositories/fulfillment.repository.interface';
import { FulfillmentEntity } from '@domain/entities/fulfillment.entity';
import { FulfillmentIdVO } from '@domain/primitives/fulfillment-id.vo';
import { FulfillmentTypeVO } from '@domain/primitives/fulfillment-type.vo';
import { FulfillmentPriorityVO } from '@domain/primitives/fulfillment-priority.vo';

import { FulfillmentMapper } from '@application/mappers/fulfillment/fulfillment.mapper';
import { FulfillmentValidator } from '@application/validators/fulfillment/fulfillment.validator';

import {
  FULFILLMENT_SERVICE,
  type IFulfillmentService,
  type FulfillmentListOptionsDTO,
} from '@application/services/interfaces/fulfillment.service.interface';

import type {
  FulfillmentResponseDTO,
  FulfillmentListResponseDTO,
  FulfillmentStatsResponseDTO,
} from '@application/dtos/responses/fulfillment/index.js';

import type {
  CreateFulfillmentRequestDTO,
  StartFulfillmentRequestDTO,
  BeginPickingRequestDTO,
  BeginPackingRequestDTO,
  MarkReadyToShipRequestDTO,
  ShipFulfillmentRequestDTO,
  FulfillRequestDTO,
  PartiallyFulfillRequestDTO,
  CancelFulfillmentRequestDTO,
  FailFulfillmentRequestDTO,
  PutFulfillmentOnHoldRequestDTO,
  ResumeFulfillmentFromHoldRequestDTO,
} from '@application/dtos/requests/fulfillment/index.js';

import {
  FulfillmentNotFoundApplicationError,
  CreateFulfillmentError,
  FulfillmentAlreadyExistsError,
  FulfillmentOperationError,
} from '@application/errors/fulfillment.errors';

export interface IFulfillmentEventBridge {
  publishFromEntity(entity: FulfillmentEntity): Promise<void>;
}
export const FULFILLMENT_EVENT_BRIDGE = Symbol('FULFILLMENT_EVENT_BRIDGE');

@Injectable()
export class FulfillmentService implements IFulfillmentService {
  private readonly logger = new Logger(FulfillmentService.name);

  constructor(
    @Inject(FULFILLMENT_REPOSITORY)
    private readonly repo: FulfillmentRepository,
    @Inject(FULFILLMENT_EVENT_BRIDGE)
    private readonly eventBridge: IFulfillmentEventBridge,
  ) {}

  async create(dto: CreateFulfillmentRequestDTO, actorId: string): Promise<FulfillmentResponseDTO> {
    this.logger.log(`create fulfillment for order ${dto.orderId}`);
    try {
      const v = FulfillmentValidator.validateCreate(dto);
      const existing = await this.repo.findByOrderId(v.orderId);
      if (existing.length > 0) throw new FulfillmentAlreadyExistsError(v.orderId);

      const now = new Date().toISOString();
      const entity = FulfillmentEntity.create({
        id: FulfillmentIdVO.create(randomUUID()),
        now,
        props: {
          orderId: v.orderId,
          vendorId: v.vendorId,
          warehouseId: v.warehouseId,
          type: FulfillmentTypeVO.create(v.type),
          priority: FulfillmentPriorityVO.create(v.priority ?? 'normal'),
          itemIds: v.itemIds,
          assignedTo: v.assignedTo,
          slaDueAt: v.slaDueAt,
          notes: v.notes,
        },
      });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return FulfillmentMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async start(dto: StartFulfillmentRequestDTO, actorId: string): Promise<FulfillmentResponseDTO> {
    const v = FulfillmentValidator.validateStart(dto);
    const entity = await this.loadEntity(v.fulfillmentId);
    entity.start();
    return this.persistAndPublish(entity);
  }

  async beginPicking(dto: BeginPickingRequestDTO, actorId: string): Promise<FulfillmentResponseDTO> {
    const v = FulfillmentValidator.validateBeginPicking(dto);
    const entity = await this.loadEntity(v.fulfillmentId);
    entity.beginPicking();
    return this.persistAndPublish(entity);
  }

  async beginPacking(dto: BeginPackingRequestDTO, actorId: string): Promise<FulfillmentResponseDTO> {
    const v = FulfillmentValidator.validateBeginPacking(dto);
    const entity = await this.loadEntity(v.fulfillmentId);
    entity.beginPacking();
    return this.persistAndPublish(entity);
  }

  async markReadyToShip(dto: MarkReadyToShipRequestDTO, actorId: string): Promise<FulfillmentResponseDTO> {
    const v = FulfillmentValidator.validateReadyToShip(dto);
    const entity = await this.loadEntity(v.fulfillmentId);
    entity.markReadyToShip();
    return this.persistAndPublish(entity);
  }

  async ship(dto: ShipFulfillmentRequestDTO, actorId: string): Promise<FulfillmentResponseDTO> {
    const v = FulfillmentValidator.validateShip(dto);
    const entity = await this.loadEntity(v.fulfillmentId);
    entity.ship(v.shipmentId);
    return this.persistAndPublish(entity);
  }

  async fulfill(dto: FulfillRequestDTO, actorId: string): Promise<FulfillmentResponseDTO> {
    const v = FulfillmentValidator.validateFulfill(dto);
    const entity = await this.loadEntity(v.fulfillmentId);
    entity.fulfill();
    return this.persistAndPublish(entity);
  }

  async partiallyFulfill(dto: PartiallyFulfillRequestDTO, actorId: string): Promise<FulfillmentResponseDTO> {
    const v = FulfillmentValidator.validatePartiallyFulfill(dto);
    const entity = await this.loadEntity(v.fulfillmentId);
    entity.markPartiallyFulfilled(v.fulfilledItemCount);
    return this.persistAndPublish(entity);
  }

  async cancel(dto: CancelFulfillmentRequestDTO, actorId: string): Promise<FulfillmentResponseDTO> {
    const v = FulfillmentValidator.validateCancel(dto);
    const entity = await this.loadEntity(v.fulfillmentId);
    entity.cancel(v.reason);
    return this.persistAndPublish(entity);
  }

  async fail(dto: FailFulfillmentRequestDTO, actorId: string): Promise<FulfillmentResponseDTO> {
    const v = FulfillmentValidator.validateFail(dto);
    const entity = await this.loadEntity(v.fulfillmentId);
    entity.markFailed(v.reason);
    return this.persistAndPublish(entity);
  }

  async putOnHold(dto: PutFulfillmentOnHoldRequestDTO, actorId: string): Promise<FulfillmentResponseDTO> {
    const v = FulfillmentValidator.validatePutOnHold(dto);
    const entity = await this.loadEntity(v.fulfillmentId);
    entity.putOnHold(v.reason);
    return this.persistAndPublish(entity);
  }

  async resumeFromHold(dto: ResumeFulfillmentFromHoldRequestDTO, actorId: string): Promise<FulfillmentResponseDTO> {
    const v = FulfillmentValidator.validateResumeFromHold(dto);
    const entity = await this.loadEntity(v.fulfillmentId);
    entity.resumeFromHold();
    return this.persistAndPublish(entity);
  }

  async getById(id: string): Promise<FulfillmentResponseDTO> {
    const entity = await this.loadEntity(id);
    return FulfillmentMapper.toResponse(entity);
  }
  async list(options: FulfillmentListOptionsDTO): Promise<FulfillmentListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return FulfillmentMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listByOrder(orderId: string): Promise<FulfillmentListResponseDTO> {
    const items = await this.repo.findByOrderId(orderId);
    return FulfillmentMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByVendor(vendorId: string): Promise<FulfillmentListResponseDTO> {
    const items = await this.repo.findByVendorId(vendorId);
    return FulfillmentMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByWarehouse(warehouseId: string): Promise<FulfillmentListResponseDTO> {
    const items = await this.repo.findByWarehouseId(warehouseId);
    return FulfillmentMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listPending(): Promise<FulfillmentListResponseDTO> {
    const items = await this.repo.findPendingByPriority();
    return FulfillmentMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listSlaBreached(): Promise<FulfillmentListResponseDTO> {
    const items = await this.repo.findSlaBreached();
    return FulfillmentMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async getStats(): Promise<FulfillmentStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return FulfillmentMapper.toStatsResponse(stats);
  }

  private async loadEntity(id: string): Promise<FulfillmentEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new FulfillmentNotFoundApplicationError(id);
    return entity;
  }
  private async persistAndPublish(entity: FulfillmentEntity): Promise<FulfillmentResponseDTO> {
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return FulfillmentMapper.toResponse(saved);
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateFulfillmentError(err.message);
      return new FulfillmentOperationError(op, err.message);
    }
    return new FulfillmentOperationError(op, String(err));
  }
}
