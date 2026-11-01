/**
 * DeliveryService — Application Service
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  DELIVERY_REPOSITORY,
  type DeliveryRepository,
} from '@domain/repositories/delivery.repository.interface';
import { DeliveryEntity } from '@domain/entities/delivery.entity';
import { DeliveryIdVO } from '@domain/primitives/delivery-id.vo';
import { DeliveryTypeVO } from '@domain/primitives/delivery-type.vo';
import { DeliveryWindowVO } from '@domain/primitives/delivery-window.vo';

import { DeliveryMapper } from '@application/mappers/delivery/delivery.mapper';
import { DeliveryValidator } from '@application/validators/delivery/delivery.validator';

import {
  DELIVERY_SERVICE,
  type IDeliveryService,
  type DeliveryListOptionsDTO,
} from '@application/services/interfaces/delivery.service.interface';

import type {
  DeliveryResponseDTO,
  DeliveryPublicResponseDTO,
  DeliveryListResponseDTO,
  DeliveryStatsResponseDTO,
} from '@application/dtos/responses/delivery/index.js';

import type {
  CreateDeliveryRequestDTO,
  ScheduleDeliveryRequestDTO,
  AssignDeliveryRequestDTO,
  PickUpDeliveryRequestDTO,
  DeliveryStartTransitRequestDTO,
  DeliveryOutForDeliveryRequestDTO,
  ArriveDeliveryRequestDTO,
  CompleteDeliveryRequestDTO,
  FailDeliveryRequestDTO,
  RescheduleDeliveryRequestDTO,
  CancelDeliveryRequestDTO,
  RefuseDeliveryRequestDTO,
} from '@application/dtos/requests/delivery/index.js';

import {
  DeliveryNotFoundApplicationError,
  DeliveryByShipmentNotFoundError,
  CreateDeliveryError,
  DeliveryAlreadyExistsError,
  DeliveryOperationError,
} from '@application/errors/delivery.errors';

export interface IDeliveryEventBridge {
  publishFromEntity(entity: DeliveryEntity): Promise<void>;
}
export const DELIVERY_EVENT_BRIDGE = Symbol('DELIVERY_EVENT_BRIDGE');

@Injectable()
export class DeliveryService implements IDeliveryService {
  private readonly logger = new Logger(DeliveryService.name);

  constructor(
    @Inject(DELIVERY_REPOSITORY)
    private readonly repo: DeliveryRepository,
    @Inject(DELIVERY_EVENT_BRIDGE)
    private readonly eventBridge: IDeliveryEventBridge,
  ) {}

  // ═══ Commands ═══
  async create(dto: CreateDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO> {
    this.logger.log(`create delivery for shipment ${dto.shipmentId}`);
    try {
      const validated = DeliveryValidator.validateCreate(dto);
      const existing = await this.repo.findByShipmentId(validated.shipmentId);
      if (existing) throw new DeliveryAlreadyExistsError(validated.shipmentId);

      const now = new Date().toISOString();
      const window = validated.window
        ? DeliveryWindowVO.create(validated.window)
        : undefined;

      const entity = DeliveryEntity.create({
        id: DeliveryIdVO.create(randomUUID()),
        now,
        props: {
          shipmentId: validated.shipmentId,
          orderId: validated.orderId,
          userId: validated.userId,
          type: DeliveryTypeVO.create(validated.type),
          window,
          driverId: validated.driverId,
          vehicleId: validated.vehicleId,
          routeId: validated.routeId,
          recipientName: validated.recipientName,
          recipientPhone: validated.recipientPhone,
          deliveryAddress: validated.deliveryAddress,
          scheduledAt: validated.scheduledAt,
          attemptCount: 0,
          notes: validated.notes,
        },
      });

      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return DeliveryMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async schedule(dto: ScheduleDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO> {
    const validated = DeliveryValidator.validateSchedule(dto);
    const entity = await this.loadEntity(validated.deliveryId);
    const window = validated.window ? DeliveryWindowVO.create(validated.window) : undefined;
    entity.schedule(window);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeliveryMapper.toResponse(saved);
  }

  async assign(dto: AssignDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO> {
    const validated = DeliveryValidator.validateAssign(dto);
    const entity = await this.loadEntity(validated.deliveryId);
    entity.assign(validated.driverId, validated.vehicleId, validated.routeId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeliveryMapper.toResponse(saved);
  }

  async pickUp(dto: PickUpDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO> {
    const validated = DeliveryValidator.validatePickUp(dto);
    const entity = await this.loadEntity(validated.deliveryId);
    entity.pickUp();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeliveryMapper.toResponse(saved);
  }

  async startTransit(dto: DeliveryStartTransitRequestDTO, actorId: string): Promise<DeliveryResponseDTO> {
    const validated = DeliveryValidator.validateStartTransit(dto);
    const entity = await this.loadEntity(validated.deliveryId);
    entity.startTransit();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeliveryMapper.toResponse(saved);
  }

  async outForDelivery(dto: DeliveryOutForDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO> {
    const validated = DeliveryValidator.validateOutForDelivery(dto);
    const entity = await this.loadEntity(validated.deliveryId);
    entity.outForDelivery();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeliveryMapper.toResponse(saved);
  }

  async arrive(dto: ArriveDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO> {
    const validated = DeliveryValidator.validateArrive(dto);
    const entity = await this.loadEntity(validated.deliveryId);
    entity.arrive();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeliveryMapper.toResponse(saved);
  }

  async complete(dto: CompleteDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO> {
    const validated = DeliveryValidator.validateComplete(dto);
    const entity = await this.loadEntity(validated.deliveryId);
    entity.markDelivered(validated.recipientName, validated.signedBy);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeliveryMapper.toResponse(saved);
  }

  async fail(dto: FailDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO> {
    const validated = DeliveryValidator.validateFail(dto);
    const entity = await this.loadEntity(validated.deliveryId);
    entity.markFailed(validated.reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeliveryMapper.toResponse(saved);
  }

  async reschedule(dto: RescheduleDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO> {
    const validated = DeliveryValidator.validateReschedule(dto);
    const entity = await this.loadEntity(validated.deliveryId);
    const window = validated.window ? DeliveryWindowVO.create(validated.window) : undefined;
    entity.reschedule(window);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeliveryMapper.toResponse(saved);
  }

  async cancel(dto: CancelDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO> {
    const validated = DeliveryValidator.validateCancel(dto);
    const entity = await this.loadEntity(validated.deliveryId);
    entity.cancel(validated.reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeliveryMapper.toResponse(saved);
  }

  async refuse(dto: RefuseDeliveryRequestDTO, actorId: string): Promise<DeliveryResponseDTO> {
    const validated = DeliveryValidator.validateRefuse(dto);
    const entity = await this.loadEntity(validated.deliveryId);
    entity.markRefused(validated.reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return DeliveryMapper.toResponse(saved);
  }

  // ═══ Queries ═══
  async getById(id: string): Promise<DeliveryResponseDTO> {
    const entity = await this.loadEntity(id);
    return DeliveryMapper.toResponse(entity);
  }
  async getPublicById(id: string): Promise<DeliveryPublicResponseDTO> {
    const entity = await this.loadEntity(id);
    return DeliveryMapper.toPublicResponse(entity);
  }
  async getByShipmentId(shipmentId: string): Promise<DeliveryResponseDTO> {
    const entity = await this.repo.findByShipmentId(shipmentId);
    if (!entity) throw new DeliveryByShipmentNotFoundError(shipmentId);
    return DeliveryMapper.toResponse(entity);
  }
  async list(options: DeliveryListOptionsDTO): Promise<DeliveryListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return DeliveryMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listByOrder(orderId: string): Promise<DeliveryListResponseDTO> {
    const items = await this.repo.findByOrderId(orderId);
    return DeliveryMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByDriver(driverId: string): Promise<DeliveryListResponseDTO> {
    const items = await this.repo.findByDriverId(driverId);
    return DeliveryMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listInTransit(): Promise<DeliveryListResponseDTO> {
    const items = await this.repo.findInTransit();
    return DeliveryMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listScheduled(): Promise<DeliveryListResponseDTO> {
    const items = await this.repo.findScheduled();
    return DeliveryMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async getStats(driverId?: string, fromDate?: string, toDate?: string): Promise<DeliveryStatsResponseDTO> {
    const stats = await this.repo.getStats(driverId, fromDate, toDate);
    return DeliveryMapper.toStatsResponse(stats);
  }

  private async loadEntity(id: string): Promise<DeliveryEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new DeliveryNotFoundApplicationError(id);
    return entity;
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateDeliveryError(err.message);
      return new DeliveryOperationError(op, err.message);
    }
    return new DeliveryOperationError(op, String(err));
  }
}
