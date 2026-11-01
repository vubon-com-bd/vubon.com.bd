import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  RETURN_SHIPMENT_REPOSITORY,
  type ReturnShipmentRepository,
} from '@domain/repositories/return-shipment.repository.interface';
import { ReturnShipmentEntity } from '@domain/entities/return-shipment.entity';
import { ReturnShipmentIdVO } from '@domain/primitives/return-shipment-id.vo';
import { ReturnShipmentTypeVO } from '@domain/primitives/return-shipment-type.vo';
import { ReturnReasonVO } from '@domain/primitives/return-reason.vo';

import { ReturnShipmentMapper } from '@application/mappers/return-shipment/return-shipment.mapper';
import { ReturnShipmentValidator } from '@application/validators/return-shipment/return-shipment.validator';

import {
  RETURN_SHIPMENT_SERVICE,
  type IReturnShipmentService,
  type ReturnShipmentListOptionsDTO,
} from '@application/services/interfaces/return-shipment.service.interface';

import type {
  ReturnShipmentResponseDTO,
  ReturnShipmentListResponseDTO,
  ReturnShipmentStatsResponseDTO,
} from '@application/dtos/responses/return-shipment/index.js';

import type {
  CreateReturnShipmentRequestDTO,
  ReturnShipmentActionRequestDTO,
  ApproveReturnRequestDTO,
  RejectReturnRequestDTO,
  SchedulePickupRequestDTO,
  MarkReceivedRequestDTO,
  InspectReturnRequestDTO,
  CompleteReturnRequestDTO,
  CancelReturnRequestDTO,
} from '@application/dtos/requests/return-shipment/index.js';

import {
  ReturnShipmentNotFoundApplicationError,
  ReturnShipmentByRmaNotFoundError,
  CreateReturnShipmentError,
  ReturnShipmentAlreadyExistsError,
  ReturnShipmentOperationError,
} from '@application/errors/return-shipment.errors';

export interface IReturnShipmentEventBridge {
  publishFromEntity(entity: ReturnShipmentEntity): Promise<void>;
}
export const RETURN_SHIPMENT_EVENT_BRIDGE = Symbol('RETURN_SHIPMENT_EVENT_BRIDGE');

@Injectable()
export class ReturnShipmentService implements IReturnShipmentService {
  private readonly logger = new Logger(ReturnShipmentService.name);

  constructor(
    @Inject(RETURN_SHIPMENT_REPOSITORY)
    private readonly repo: ReturnShipmentRepository,
    @Inject(RETURN_SHIPMENT_EVENT_BRIDGE)
    private readonly eventBridge: IReturnShipmentEventBridge,
  ) {}

  async create(dto: CreateReturnShipmentRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO> {
    this.logger.log(`create return shipment for order=${dto.orderId}`);
    try {
      const v = ReturnShipmentValidator.validateCreate(dto);
      const now = new Date().toISOString();
      const rmaNumber = await this.generateRmaNumber();

      const entity = ReturnShipmentEntity.create({
        id: ReturnShipmentIdVO.create(randomUUID()),
        now,
        props: {
          rmaNumber,
          orderId: v.orderId,
          originalShipmentId: v.originalShipmentId,
          userId: v.userId,
          type: ReturnShipmentTypeVO.create(v.type),
          reason: ReturnReasonVO.create(v.reason),
          description: v.description,
          images: v.images,
          itemIds: v.itemIds,
          pickupAddress: v.pickupAddress,
          refundCurrency: v.refundCurrency,
        },
      });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return ReturnShipmentMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async approve(dto: ApproveReturnRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO> {
    const v = ReturnShipmentValidator.validateApprove(dto);
    const entity = await this.loadEntity(v.returnId);
    entity.approve(v.approvedBy);
    return this.persistAndPublish(entity);
  }
  async reject(dto: RejectReturnRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO> {
    const v = ReturnShipmentValidator.validateReject(dto);
    const entity = await this.loadEntity(v.returnId);
    entity.reject(v.reason);
    return this.persistAndPublish(entity);
  }
  async schedulePickup(dto: SchedulePickupRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO> {
    const v = ReturnShipmentValidator.validateAction(dto);
    const entity = await this.loadEntity(v.returnId);
    entity.schedulePickup();
    return this.persistAndPublish(entity);
  }
  async markPickedUp(dto: ReturnShipmentActionRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO> {
    const v = ReturnShipmentValidator.validateAction(dto);
    const entity = await this.loadEntity(v.returnId);
    entity.markPickedUp();
    return this.persistAndPublish(entity);
  }
  async startTransit(dto: ReturnShipmentActionRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO> {
    const v = ReturnShipmentValidator.validateAction(dto);
    const entity = await this.loadEntity(v.returnId);
    entity.startTransit();
    return this.persistAndPublish(entity);
  }
  async markReceived(dto: MarkReceivedRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO> {
    const v = ReturnShipmentValidator.validateMarkReceived(dto);
    const entity = await this.loadEntity(v.returnId);
    entity.markReceived(v.receivedBy);
    return this.persistAndPublish(entity);
  }
  async inspect(dto: InspectReturnRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO> {
    const v = ReturnShipmentValidator.validateInspect(dto);
    const entity = await this.loadEntity(v.returnId);
    entity.inspect({ restockable: v.restockable, inspectedBy: v.inspectedBy });
    return this.persistAndPublish(entity);
  }
  async complete(dto: CompleteReturnRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO> {
    const v = ReturnShipmentValidator.validateComplete(dto);
    const entity = await this.loadEntity(v.returnId);
    entity.complete({ refundAmount: v.refundAmount, restockFeeAmount: v.restockFeeAmount });
    return this.persistAndPublish(entity);
  }
  async cancel(dto: CancelReturnRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO> {
    const v = ReturnShipmentValidator.validateCancel(dto);
    const entity = await this.loadEntity(v.returnId);
    entity.cancel(v.reason);
    return this.persistAndPublish(entity);
  }
  async markLost(dto: ReturnShipmentActionRequestDTO, actorId: string): Promise<ReturnShipmentResponseDTO> {
    const v = ReturnShipmentValidator.validateAction(dto);
    const entity = await this.loadEntity(v.returnId);
    entity.markLost();
    return this.persistAndPublish(entity);
  }

  async getById(id: string): Promise<ReturnShipmentResponseDTO> {
    const entity = await this.loadEntity(id);
    return ReturnShipmentMapper.toResponse(entity);
  }
  async getByRma(rmaNumber: string): Promise<ReturnShipmentResponseDTO> {
    const entity = await this.repo.findByRmaNumber(rmaNumber);
    if (!entity) throw new ReturnShipmentByRmaNotFoundError(rmaNumber);
    return ReturnShipmentMapper.toResponse(entity);
  }
  async list(options: ReturnShipmentListOptionsDTO): Promise<ReturnShipmentListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return ReturnShipmentMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listByOrder(orderId: string): Promise<ReturnShipmentListResponseDTO> {
    const items = await this.repo.findByOrderId(orderId);
    return ReturnShipmentMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByUser(userId: string): Promise<ReturnShipmentListResponseDTO> {
    const items = await this.repo.findByUserId(userId);
    return ReturnShipmentMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listPendingApproval(): Promise<ReturnShipmentListResponseDTO> {
    const items = await this.repo.findPendingApproval();
    return ReturnShipmentMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async getStats(): Promise<ReturnShipmentStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return ReturnShipmentMapper.toStatsResponse(stats);
  }

  private async generateRmaNumber(): Promise<string> {
    for (let i = 0; i < 5; i++) {
      const candidate = `RMA${Date.now().toString().slice(-10)}${Math.random().toString(36).slice(2, 4).toUpperCase()}`;
      if (!(await this.repo.existsByRmaNumber(candidate))) return candidate;
    }
    throw new ReturnShipmentOperationError('generateRmaNumber', '5 attempts failed');
  }
  private async loadEntity(id: string): Promise<ReturnShipmentEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new ReturnShipmentNotFoundApplicationError(id);
    return entity;
  }
  private async persistAndPublish(entity: ReturnShipmentEntity): Promise<ReturnShipmentResponseDTO> {
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return ReturnShipmentMapper.toResponse(saved);
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateReturnShipmentError(err.message);
      return new ReturnShipmentOperationError(op, err.message);
    }
    return new ReturnShipmentOperationError(op, String(err));
  }
}
