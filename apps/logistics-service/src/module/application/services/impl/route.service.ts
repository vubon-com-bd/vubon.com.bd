/**
 * RouteService — orchestrates routes + stop ordering + optimization
 * @module logistics-service/application/services/impl
 *
 * Uses domain:
 *  - RouteEntity (aggregate with stops collection)
 *  - RouteOptimizationService (nearest-neighbor TSP pass)
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { IRouteService, RouteListOptionsDTO } from '../interfaces/route.service.interface.js';
import { ROUTE_REPOSITORY, type RouteRepository } from '../../../domain/repositories/route.repository.interface.js';
import { RouteEntity } from '../../../domain/entities/route.entity.js';
import { RouteIdVO } from '../../../domain/value-objects/primitives/route-id.vo.js';
import { RouteCodeVO } from '../../../domain/value-objects/primitives/route-code.vo.js';
import { RouteTypeVO } from '../../../domain/value-objects/primitives/route-type.vo.js';
import { RouteOptimizationVO } from '../../../domain/value-objects/primitives/route-optimization.vo.js';
import { WarehouseIdVO } from '../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { VehicleIdVO } from '../../../domain/value-objects/primitives/vehicle-id.vo.js';
import { DriverIdVO } from '../../../domain/value-objects/primitives/driver-id.vo.js';
import { RouteStopVO } from '../../../domain/value-objects/composites/route-stop.vo.js';

import { RouteOptimizationService } from '../../../domain/services/route-optimization.service.js';
import { RouteMapper } from '../../mappers/route.mapper.js';
import {
  RouteNotFoundApplicationError,
  RouteOperationFailedApplicationError,
  RouteTooLongApplicationError,
} from '../../errors/route.errors.js';

import type {
  CreateRouteRequestDTO, AddRouteStopRequestDTO, RemoveRouteStopRequestDTO,
  ReorderRouteStopsRequestDTO, CompleteRouteStopRequestDTO, OptimizeRouteRequestDTO,
  StartRouteRequestDTO, CompleteRouteRequestDTO, CancelRouteRequestDTO, PlanRouteRequestDTO,
} from '../../dtos/requests/route/route.dto.js';
import type { RouteResponseDTO, RouteListResponseDTO } from '../../dtos/responses/route/route-response.dto.js';

@Injectable()
export class RouteService implements IRouteService {
  private readonly logger = new Logger(RouteService.name);

  constructor(@Inject(ROUTE_REPOSITORY) private readonly repo: RouteRepository) {}

  async create(dto: CreateRouteRequestDTO, actorId?: string): Promise<RouteResponseDTO> {
    const now = new Date().toISOString();
    const codeVO = RouteCodeVO.create(dto.code);
    if (await this.repo.existsByCode(codeVO)) {
      throw new RouteOperationFailedApplicationError('create', `route code exists: ${dto.code}`);
    }
    const id = randomUUID();
    let entity: RouteEntity;
    try {
      entity = RouteEntity.create({
        id, now,
        props: {
          name: dto.name,
          code: codeVO,
          type: RouteTypeVO.create(dto.type),
          optimization: RouteOptimizationVO.create(dto.optimization),
          warehouseId: dto.warehouseId ? WarehouseIdVO.create(dto.warehouseId) : undefined,
          vehicleId: dto.vehicleId ? VehicleIdVO.create(dto.vehicleId) : undefined,
          driverId: dto.driverId ? DriverIdVO.create(dto.driverId) : undefined,
          scheduledDate: dto.scheduledDate,
          isRecurring: dto.isRecurring ?? false,
          recurrenceRule: dto.recurrenceRule,
        },
      });
    } catch (e) {
      throw new RouteOperationFailedApplicationError('create', e instanceof Error ? e.message : 'unknown');
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`Route ${saved.id} created by ${actorId ?? 'system'}`);
    return RouteMapper.toResponse(saved);
  }

  async addStop(dto: AddRouteStopRequestDTO, actorId?: string): Promise<RouteResponseDTO> {
    const entity = await this.load(dto.routeId);
    entity.addStop(RouteStopVO.create({
      id: dto.stopId,
      order: dto.order,
      location: dto.location,
      address: dto.address,
      latitude: dto.latitude,
      longitude: dto.longitude,
      shipmentIds: dto.shipmentIds,
      estimatedArrivalAt: dto.estimatedArrivalAt,
      actualArrivalAt: undefined,
      completed: false,
      notes: dto.notes,
    }));
    const saved = await this.repo.save(entity);
    this.logger.log(`Route ${saved.id} stop added by ${actorId ?? 'system'}`);
    return RouteMapper.toResponse(saved);
  }

  async removeStop(dto: RemoveRouteStopRequestDTO, actorId?: string): Promise<RouteResponseDTO> {
    const entity = await this.load(dto.routeId);
    entity.removeStop(dto.stopId);
    const saved = await this.repo.save(entity);
    this.logger.log(`Route ${saved.id} stop removed by ${actorId ?? 'system'}`);
    return RouteMapper.toResponse(saved);
  }

  async reorderStops(dto: ReorderRouteStopsRequestDTO, actorId?: string): Promise<RouteResponseDTO> {
    const entity = await this.load(dto.routeId);
    entity.reorderStops(dto.orderedStopIds);
    const saved = await this.repo.save(entity);
    this.logger.log(`Route ${saved.id} stops reordered by ${actorId ?? 'system'}`);
    return RouteMapper.toResponse(saved);
  }

  async completeStop(dto: CompleteRouteStopRequestDTO, actorId?: string): Promise<RouteResponseDTO> {
    const entity = await this.load(dto.routeId);
    entity.completeStop(dto.stopId);
    const saved = await this.repo.save(entity);
    this.logger.log(`Route ${saved.id} stop completed by ${actorId ?? 'system'}`);
    return RouteMapper.toResponse(saved);
  }

  async optimize(dto: OptimizeRouteRequestDTO, actorId?: string): Promise<RouteResponseDTO> {
    const entity = await this.load(dto.routeId);

    // 1. Compute new order (off entity state, current stops)
    const result = RouteOptimizationService.optimize({
      stops: entity.stops,
      startLat: dto.startLat,
      startLng: dto.startLng,
      mode: entity.optimization,
    });

    // 2. Validate feasibility before touching state
    if (result.totalDistanceKm > 2000) {
      throw new RouteTooLongApplicationError(dto.routeId, `${result.totalDistanceKm}km > 2000km`);
    }

    // 3. Reorder first (allowed only while editable: draft/planned)
    entity.reorderStops(result.orderedStopIds);

    // 4. Now flip status via start → complete optimization
    entity.startOptimization();
    entity.completeOptimization(result.totalDistanceKm, result.estimatedDurationMinutes);

    const saved = await this.repo.save(entity);
    this.logger.log(`Route ${saved.id} optimized by ${actorId ?? 'system'}`);
    return RouteMapper.toResponse(saved);
  }

  async plan(dto: PlanRouteRequestDTO, actorId?: string): Promise<RouteResponseDTO> {
    const entity = await this.load(dto.routeId);
    entity.plan();
    const saved = await this.repo.save(entity);
    this.logger.log(`Route ${saved.id} planned by ${actorId ?? 'system'}`);
    return RouteMapper.toResponse(saved);
  }

  async start(dto: StartRouteRequestDTO, actorId?: string): Promise<RouteResponseDTO> {
    const entity = await this.load(dto.routeId);
    entity.start();
    const saved = await this.repo.save(entity);
    this.logger.log(`Route ${saved.id} started by ${actorId ?? 'system'}`);
    return RouteMapper.toResponse(saved);
  }

  async complete(dto: CompleteRouteRequestDTO, actorId?: string): Promise<RouteResponseDTO> {
    const entity = await this.load(dto.routeId);
    entity.complete();
    const saved = await this.repo.save(entity);
    this.logger.log(`Route ${saved.id} completed by ${actorId ?? 'system'}`);
    return RouteMapper.toResponse(saved);
  }

  async cancel(dto: CancelRouteRequestDTO, actorId?: string): Promise<RouteResponseDTO> {
    const entity = await this.load(dto.routeId);
    entity.cancel(dto.reason);
    const saved = await this.repo.save(entity);
    this.logger.log(`Route ${saved.id} cancelled by ${actorId ?? 'system'}`);
    return RouteMapper.toResponse(saved);
  }

  async getById(routeId: string): Promise<RouteResponseDTO> {
    return RouteMapper.toResponse(await this.load(routeId));
  }

  async list(options: RouteListOptionsDTO): Promise<RouteListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page, limit: options.limit,
      sortBy: options.sortBy, sortDir: options.sortDir, filter: options.filter,
    });
    return RouteMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  private async load(id: string): Promise<RouteEntity> {
    const vo = RouteIdVO.create(id);
    const e = await this.repo.findByIdVO(vo);
    if (!e) throw new RouteNotFoundApplicationError(id);
    return e;
  }
}
