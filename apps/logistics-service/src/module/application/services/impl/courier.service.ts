/**
 * CourierService — orchestrates courier use cases
 * @module logistics-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import type { ICourierService, CourierListOptionsDTO } from '../interfaces/courier.service.interface.js';
import {
  COURIER_REPOSITORY,
  type CourierRepository,
} from '../../../domain/repositories/courier.repository.interface.js';
import { CourierEntity } from '../../../domain/entities/courier.entity.js';
import { CourierIdVO } from '../../../domain/value-objects/primitives/courier-id.vo.js';
import { CourierStatusVO } from '../../../domain/value-objects/primitives/courier-status.vo.js';
import { CourierTypeVO } from '../../../domain/value-objects/primitives/courier-type.vo.js';
import { CourierNameVO } from '../../../domain/value-objects/primitives/courier-name.vo.js';

import { CourierMapper } from '../../mappers/courier.mapper.js';
import {
  CourierNotFoundApplicationError,
  CourierOperationFailedApplicationError,
} from '../../errors/courier.errors.js';

import type {
  RegisterCourierRequestDTO,
  UpdateCourierRequestDTO,
  SuspendCourierRequestDTO,
  ActivateCourierRequestDTO,
  DeactivateCourierRequestDTO,
  SetCourierDefaultRequestDTO,
} from '../../dtos/requests/courier/courier.dto.js';
import type {
  CourierResponseDTO,
  CourierPublicResponseDTO,
  CourierListResponseDTO,
} from '../../dtos/responses/courier/courier-response.dto.js';

@Injectable()
export class CourierService implements ICourierService {
  private readonly logger = new Logger(CourierService.name);

  constructor(@Inject(COURIER_REPOSITORY) private readonly repo: CourierRepository) {}

  async register(dto: RegisterCourierRequestDTO, actorId?: string): Promise<CourierResponseDTO> {
    const now = new Date().toISOString();
    const codeVO = CourierNameVO.create(dto.code);
    const exists = await this.repo.existsByCode(codeVO);
    if (exists) {
      throw new CourierOperationFailedApplicationError('register', `courier code already exists: ${dto.code}`);
    }
    const typeVO = CourierTypeVO.create(dto.type);
    const id = randomUUID();
    let entity: CourierEntity;
    try {
      entity = CourierEntity.create({
        id,
        now,
        props: {
          name: dto.name,
          code: codeVO,
          displayName: dto.displayName,
          type: typeVO,
          logoUrl: dto.logoUrl as never,
          website: dto.website as never,
          contactPhone: dto.contactPhone as never,
          contactEmail: dto.contactEmail as never,
          trackingUrlTemplate: dto.trackingUrlTemplate,
          apiEnabled: dto.apiEnabled ?? false,
          coverageZones: dto.coverageZones ?? [],
          supportsCOD: dto.supportsCOD,
          supportsInsurance: dto.supportsInsurance,
          supportsInternational: dto.supportsInternational,
          averageDeliveryDays: dto.averageDeliveryDays,
          isDefault: false,
          priority: dto.priority ?? 50,
        },
      });
    } catch (e) {
      throw new CourierOperationFailedApplicationError('register', e instanceof Error ? e.message : 'unknown');
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`Courier ${saved.id} registered by ${actorId ?? 'system'}`);
    return CourierMapper.toResponse(saved);
  }

  async update(dto: UpdateCourierRequestDTO, actorId?: string): Promise<CourierResponseDTO> {
    const entity = await this.load(dto.courierId);
    if (dto.priority !== undefined) entity.changePriority(dto.priority);
    const saved = await this.repo.save(entity);
    this.logger.log(`Courier ${saved.id} updated by ${actorId ?? 'system'}`);
    return CourierMapper.toResponse(saved);
  }

  async activate(dto: ActivateCourierRequestDTO, actorId?: string): Promise<CourierResponseDTO> {
    const entity = await this.load(dto.courierId);
    entity.activate();
    const saved = await this.repo.save(entity);
    this.logger.log(`Courier ${saved.id} activated by ${actorId ?? 'system'}`);
    return CourierMapper.toResponse(saved);
  }

  async deactivate(dto: DeactivateCourierRequestDTO, actorId?: string): Promise<CourierResponseDTO> {
    const entity = await this.load(dto.courierId);
    entity.deactivate(dto.reason);
    const saved = await this.repo.save(entity);
    this.logger.log(`Courier ${saved.id} deactivated by ${actorId ?? 'system'}`);
    return CourierMapper.toResponse(saved);
  }

  async suspend(dto: SuspendCourierRequestDTO, actorId?: string): Promise<CourierResponseDTO> {
    const entity = await this.load(dto.courierId);
    entity.suspend(dto.reason);
    const saved = await this.repo.save(entity);
    this.logger.warn(`Courier ${saved.id} suspended by ${actorId ?? 'system'}: ${dto.reason}`);
    return CourierMapper.toResponse(saved);
  }

  async setDefault(dto: SetCourierDefaultRequestDTO, actorId?: string): Promise<CourierResponseDTO> {
    const entity = await this.load(dto.courierId);
    if (dto.isDefault) {
      await this.repo.clearDefaultExcept(entity.id);
      entity.markAsDefault();
    } else {
      entity.unmarkAsDefault();
    }
    const saved = await this.repo.save(entity);
    this.logger.log(`Courier ${saved.id} default=${dto.isDefault} by ${actorId ?? 'system'}`);
    return CourierMapper.toResponse(saved);
  }

  async getById(courierId: string): Promise<CourierResponseDTO> {
    return CourierMapper.toResponse(await this.load(courierId));
  }

  async getPublic(courierId: string): Promise<CourierPublicResponseDTO> {
    return CourierMapper.toPublicResponse(await this.load(courierId));
  }

  async list(options: CourierListOptionsDTO): Promise<CourierListResponseDTO> {
    const r = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return CourierMapper.toListResponse(r.items, r.total, r.page, r.limit);
  }

  async getDefault(): Promise<CourierResponseDTO | null> {
    const c = await this.repo.findDefault();
    return c ? CourierMapper.toResponse(c) : null;
  }

  private async load(courierId: string): Promise<CourierEntity> {
    const vo = CourierIdVO.create(courierId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new CourierNotFoundApplicationError(courierId);
    return entity;
  }
}
