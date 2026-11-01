import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  ROUTE_REPOSITORY,
  type RouteRepository,
} from '@domain/repositories/route.repository.interface';
import { RouteEntity } from '@domain/entities/route.entity';
import { RouteIdVO } from '@domain/primitives/route-id.vo';
import { RouteNameVO } from '@domain/primitives/route-name.vo';
import { RouteTypeVO } from '@domain/primitives/route-type.vo';
import { RouteOptimizationVO } from '@domain/primitives/route-optimization.vo';

import { RouteMapper } from '@application/mappers/route/route.mapper';
import { RouteValidator } from '@application/validators/route/route.validator';

import {
  ROUTE_SERVICE,
  type IRouteService,
  type RouteListOptionsDTO,
} from '@application/services/interfaces/route.service.interface';

import type {
  RouteResponseDTO,
  RouteListResponseDTO,
  RouteStatsResponseDTO,
} from '@application/dtos/responses/route/index.js';

import type {
  CreateRouteRequestDTO,
  UpdateRouteRequestDTO,
  RouteActionRequestDTO,
  OptimizeRouteRequestDTO,
  StartRouteRequestDTO,
  CompleteStopRequestDTO,
  CancelRouteRequestDTO,
} from '@application/dtos/requests/route/index.js';

import {
  RouteNotFoundApplicationError,
  RouteByCodeNotFoundError,
  CreateRouteError,
  RouteAlreadyExistsError,
  RouteOperationError,
} from '@application/errors/route.errors';

export interface IRouteEventBridge {
  publishFromEntity(entity: RouteEntity): Promise<void>;
}
export const ROUTE_EVENT_BRIDGE = Symbol('ROUTE_EVENT_BRIDGE');

@Injectable()
export class RouteService implements IRouteService {
  private readonly logger = new Logger(RouteService.name);

  constructor(
    @Inject(ROUTE_REPOSITORY)
    private readonly repo: RouteRepository,
    @Inject(ROUTE_EVENT_BRIDGE)
    private readonly eventBridge: IRouteEventBridge,
  ) {}

  async create(dto: CreateRouteRequestDTO, actorId: string): Promise<RouteResponseDTO> {
    this.logger.log(`create route code=${dto.code}`);
    try {
      const v = RouteValidator.validateCreate(dto);
      if (await this.repo.existsByCode(v.code)) throw new RouteAlreadyExistsError(v.code);
      const now = new Date().toISOString();
      const entity = RouteEntity.create({
        id: RouteIdVO.create(randomUUID()),
        now,
        props: {
          name: RouteNameVO.create(v.name),
          code: v.code,
          type: RouteTypeVO.create(v.type),
          optimization: RouteOptimizationVO.create(v.optimization),
          stops: v.stops.map((s) => ({
            id: s.id,
            order: s.order,
            location: s.location,
            address: s.address,
            latitude: s.latitude,
            longitude: s.longitude,
            shipmentIds: s.shipmentIds,
            estimatedArrivalAt: s.estimatedArrivalAt,
            actualArrivalAt: undefined,
            completed: false,
            notes: s.notes,
          })),
          warehouseId: v.warehouseId,
          vehicleId: v.vehicleId,
          driverId: v.driverId,
          scheduledDate: v.scheduledDate,
          isRecurring: v.isRecurring ?? false,
          recurrenceRule: v.recurrenceRule,
        },
      });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return RouteMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async update(dto: UpdateRouteRequestDTO, actorId: string): Promise<RouteResponseDTO> {
    const v = RouteValidator.validateUpdate(dto);
    const entity = await this.loadEntity(v.routeId);
    return this.persistAndPublish(entity);
  }
  async plan(dto: RouteActionRequestDTO, actorId: string): Promise<RouteResponseDTO> {
    const v = RouteValidator.validateAction(dto);
    const entity = await this.loadEntity(v.routeId);
    entity.plan();
    return this.persistAndPublish(entity);
  }
  async optimize(dto: OptimizeRouteRequestDTO, actorId: string): Promise<RouteResponseDTO> {
    const v = RouteValidator.validateOptimize(dto);
    const entity = await this.loadEntity(v.routeId);
    entity.optimize(v.newDistanceKm, v.newDurationMinutes);
    return this.persistAndPublish(entity);
  }
  async start(dto: StartRouteRequestDTO, actorId: string): Promise<RouteResponseDTO> {
    const v = RouteValidator.validateStart(dto);
    const entity = await this.loadEntity(v.routeId);
    entity.start(v.driverId, v.vehicleId);
    return this.persistAndPublish(entity);
  }
  async completeStop(dto: CompleteStopRequestDTO, actorId: string): Promise<RouteResponseDTO> {
    const v = RouteValidator.validateCompleteStop(dto);
    const entity = await this.loadEntity(v.routeId);
    entity.completeStop(v.stopId);
    return this.persistAndPublish(entity);
  }
  async complete(dto: RouteActionRequestDTO, actorId: string): Promise<RouteResponseDTO> {
    const v = RouteValidator.validateAction(dto);
    const entity = await this.loadEntity(v.routeId);
    entity.complete();
    return this.persistAndPublish(entity);
  }
  async cancel(dto: CancelRouteRequestDTO, actorId: string): Promise<RouteResponseDTO> {
    const v = RouteValidator.validateCancel(dto);
    const entity = await this.loadEntity(v.routeId);
    entity.cancel(v.reason);
    return this.persistAndPublish(entity);
  }
  async archive(dto: RouteActionRequestDTO, actorId: string): Promise<RouteResponseDTO> {
    const v = RouteValidator.validateAction(dto);
    const entity = await this.loadEntity(v.routeId);
    entity.archive();
    return this.persistAndPublish(entity);
  }

  async getById(id: string): Promise<RouteResponseDTO> {
    const entity = await this.loadEntity(id);
    return RouteMapper.toResponse(entity);
  }
  async getByCode(code: string): Promise<RouteResponseDTO> {
    const entity = await this.repo.findByCode(code);
    if (!entity) throw new RouteByCodeNotFoundError(code);
    return RouteMapper.toResponse(entity);
  }
  async list(options: RouteListOptionsDTO): Promise<RouteListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return RouteMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }
  async listByWarehouse(warehouseId: string): Promise<RouteListResponseDTO> {
    const items = await this.repo.findByWarehouseId(warehouseId);
    return RouteMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByDriver(driverId: string): Promise<RouteListResponseDTO> {
    const items = await this.repo.findByDriverId(driverId);
    return RouteMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listByScheduledDate(date: string): Promise<RouteListResponseDTO> {
    const items = await this.repo.findByScheduledDate(date);
    return RouteMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listActive(): Promise<RouteListResponseDTO> {
    const items = await this.repo.findActive();
    return RouteMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async listPendingOptimization(): Promise<RouteListResponseDTO> {
    const items = await this.repo.findPendingOptimization();
    return RouteMapper.toListResponse(items, items.length, 1, items.length || 1);
  }
  async getStats(): Promise<RouteStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return RouteMapper.toStatsResponse(stats);
  }

  private async loadEntity(id: string): Promise<RouteEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new RouteNotFoundApplicationError(id);
    return entity;
  }
  private async persistAndPublish(entity: RouteEntity): Promise<RouteResponseDTO> {
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return RouteMapper.toResponse(saved);
  }
  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateRouteError(err.message);
      return new RouteOperationError(op, err.message);
    }
    return new RouteOperationError(op, String(err));
  }
}
