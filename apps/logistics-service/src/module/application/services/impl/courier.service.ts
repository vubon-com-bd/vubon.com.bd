/**
 * CourierService — Application Service
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  COURIER_REPOSITORY,
  type CourierRepository,
} from '@domain/repositories/courier.repository.interface';
import { CourierEntity } from '@domain/entities/courier.entity';
import { CourierIdVO } from '@domain/primitives/courier-id.vo';
import { CourierNameVO } from '@domain/primitives/courier-name.vo';
import { CourierTypeVO } from '@domain/primitives/courier-type.vo';

import { CourierMapper } from '@application/mappers/courier/courier.mapper';
import { CourierValidator } from '@application/validators/courier/courier.validator';

import {
  COURIER_SERVICE,
  type ICourierService,
  type CourierListOptionsDTO,
} from '@application/services/interfaces/courier.service.interface';

import type {
  CourierResponseDTO,
  CourierPublicResponseDTO,
  CourierListResponseDTO,
  CourierStatsResponseDTO,
} from '@application/dtos/responses/courier/index.js';

import type {
  CreateCourierRequestDTO,
  UpdateCourierRequestDTO,
  ActivateCourierRequestDTO,
  DeactivateCourierRequestDTO,
  SuspendCourierRequestDTO,
  TerminateCourierRequestDTO,
  AssignCourierToShipmentRequestDTO,
} from '@application/dtos/requests/courier/index.js';

import {
  CourierNotFoundApplicationError,
  CourierByCodeNotFoundError,
  CreateCourierError,
  CourierAlreadyExistsError,
  CourierOperationError,
} from '@application/errors/courier.errors';

// ─── Event bridge (re-use shared contract) ───
export interface ICourierEventBridge {
  publishFromEntity(entity: CourierEntity): Promise<void>;
}
export const COURIER_EVENT_BRIDGE = Symbol('COURIER_EVENT_BRIDGE');

@Injectable()
export class CourierService implements ICourierService {
  private readonly logger = new Logger(CourierService.name);

  constructor(
    @Inject(COURIER_REPOSITORY)
    private readonly repo: CourierRepository,
    @Inject(COURIER_EVENT_BRIDGE)
    private readonly eventBridge: ICourierEventBridge,
  ) {}

  // ═══ Commands ═══
  async create(dto: CreateCourierRequestDTO, actorId: string): Promise<CourierResponseDTO> {
    this.logger.log(`create courier code=${dto.code}`);
    try {
      const validated = CourierValidator.validateCreate(dto);
      const exists = await this.repo.existsByCode(validated.code);
      if (exists) throw new CourierAlreadyExistsError(validated.code);

      const now = new Date().toISOString();
      const id = randomUUID();

      const entity = CourierEntity.create({
        id: CourierIdVO.create(id),
        now,
        props: {
          code: validated.code,
          name: CourierNameVO.create(validated.name),
          displayName: validated.displayName,
          type: CourierTypeVO.create(validated.type),
          logoUrl: validated.logoUrl,
          website: validated.website,
          contactPhone: validated.contactPhone,
          contactEmail: validated.contactEmail,
          trackingUrlTemplate: validated.trackingUrlTemplate,
          apiEnabled: validated.apiEnabled,
          coverageZones: validated.coverageZones,
          supportsCOD: validated.supportsCOD,
          supportsInsurance: validated.supportsInsurance,
          supportsInternational: validated.supportsInternational,
          averageDeliveryDays: validated.averageDeliveryDays,
          isDefault: validated.isDefault ?? false,
          priority: validated.priority ?? 0,
        },
      });

      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);
      return CourierMapper.toResponse(saved);
    } catch (err) {
      throw this.wrap(err, 'create');
    }
  }

  async update(dto: UpdateCourierRequestDTO, actorId: string): Promise<CourierResponseDTO> {
    const validated = CourierValidator.validateUpdate(dto);
    const entity = await this.loadEntity(validated.courierId);
    entity.updateDetails(
      {
        displayName: validated.displayName,
        logoUrl: validated.logoUrl,
        website: validated.website,
        contactPhone: validated.contactPhone,
        contactEmail: validated.contactEmail,
        trackingUrlTemplate: validated.trackingUrlTemplate,
        apiEnabled: validated.apiEnabled,
        coverageZones: validated.coverageZones,
        supportsCOD: validated.supportsCOD,
        supportsInsurance: validated.supportsInsurance,
        supportsInternational: validated.supportsInternational,
        averageDeliveryDays: validated.averageDeliveryDays,
        isDefault: validated.isDefault,
        priority: validated.priority,
      },
    );
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return CourierMapper.toResponse(saved);
  }

  async activate(dto: ActivateCourierRequestDTO, actorId: string): Promise<CourierResponseDTO> {
    const entity = await this.loadEntity(dto.courierId);
    entity.activate();
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return CourierMapper.toResponse(saved);
  }

  async deactivate(dto: DeactivateCourierRequestDTO, actorId: string): Promise<CourierResponseDTO> {
    const entity = await this.loadEntity(dto.courierId);
    entity.deactivate(dto.reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return CourierMapper.toResponse(saved);
  }

  async suspend(dto: SuspendCourierRequestDTO, actorId: string): Promise<CourierResponseDTO> {
    const entity = await this.loadEntity(dto.courierId);
    entity.suspend(dto.reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return CourierMapper.toResponse(saved);
  }

  async terminate(dto: TerminateCourierRequestDTO, actorId: string): Promise<CourierResponseDTO> {
    const entity = await this.loadEntity(dto.courierId);
    entity.terminate(dto.reason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return CourierMapper.toResponse(saved);
  }

  async assignToShipment(
    dto: AssignCourierToShipmentRequestDTO,
    actorId: string,
  ): Promise<CourierResponseDTO> {
    // Business rule: courier must exist + be operational
    const entity = await this.loadEntity(dto.courierId);
    if (!entity.isOperational()) {
      throw new CourierOperationError(
        'assignToShipment',
        `Courier is not operational (status: ${entity.status.value})`,
      );
    }
    // Note: actual shipment assignment happens in ShipmentService
    return CourierMapper.toResponse(entity);
  }

  // ═══ Queries ═══
  async getById(id: string): Promise<CourierResponseDTO> {
    const entity = await this.loadEntity(id);
    return CourierMapper.toResponse(entity);
  }

  async getPublicById(id: string): Promise<CourierPublicResponseDTO> {
    const entity = await this.loadEntity(id);
    return CourierMapper.toPublicResponse(entity);
  }

  async getByCode(code: string): Promise<CourierResponseDTO> {
    const entity = await this.repo.findByCode(code);
    if (!entity) throw new CourierByCodeNotFoundError(code);
    return CourierMapper.toResponse(entity);
  }

  async list(options: CourierListOptionsDTO): Promise<CourierListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return CourierMapper.toListResponse(
      result.items,
      result.total,
      result.page,
      result.limit,
    );
  }

  async listOperational(): Promise<CourierListResponseDTO> {
    const items = await this.repo.findOperational();
    return CourierMapper.toListResponse(items, items.length, 1, items.length || 1);
  }

  async listByZone(zone: string): Promise<CourierListResponseDTO> {
    const items = await this.repo.findByZone(zone);
    return CourierMapper.toListResponse(items, items.length, 1, items.length || 1);
  }

  async getDefault(): Promise<CourierResponseDTO | null> {
    const entity = await this.repo.findDefault();
    return entity ? CourierMapper.toResponse(entity) : null;
  }

  async getStats(): Promise<CourierStatsResponseDTO> {
    const stats = await this.repo.getStats();
    return CourierMapper.toStatsResponse(stats);
  }

  // ═══ Helpers ═══
  private async loadEntity(id: string): Promise<CourierEntity> {
    const entity = await this.repo.findById(id);
    if (!entity) throw new CourierNotFoundApplicationError(id);
    return entity;
  }

  private wrap(err: unknown, op: string): Error {
    if (err instanceof Error) {
      if (err.name.includes('Application')) return err;
      if (err.name.startsWith('Invalid') || err.name.includes('Not Found')) return err;
      this.logger.error(`[${op}] ${err.message}`, err.stack);
      if (op === 'create') return new CreateCourierError(err.message);
      return new CourierOperationError(op, err.message);
    }
    return new CourierOperationError(op, String(err));
  }
}
