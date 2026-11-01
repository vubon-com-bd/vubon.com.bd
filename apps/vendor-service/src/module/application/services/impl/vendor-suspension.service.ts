/**
 * VendorSuspensionService — suspension lifecycle
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VENDOR_SUSPENSION_REPOSITORY,
  type VendorSuspensionRepository,
} from '../../../domain/repositories/vendor-suspension.repository.interface.js';
import { VendorSuspensionEntity } from '../../../domain/entities/vendor-suspension.entity.js';
import { VendorSuspensionVO } from '../../../domain/value-objects/composites/vendor-suspension.vo.js';
import { SuspensionIdVO } from '../../../domain/value-objects/primitives/suspension-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { SuspensionReasonVO } from '../../../domain/value-objects/primitives/suspension-reason.vo.js';
import { SuspensionStatusVO } from '../../../domain/value-objects/primitives/suspension-status.vo.js';
import { SuspensionPolicyService } from '../../../domain/services/suspension-policy.service.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { SuspensionMapper } from '../../mappers/suspension.mapper.js';
import { VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import type {
  SuspendVendorRequestDTO,
  ReinstateVendorRequestDTO,
  AppealSuspensionRequestDTO,
} from '../../dtos/requests/suspension/index.js';
import type {
  SuspensionResponseDTO,
  SuspensionListResponseDTO,
} from '../../dtos/responses/suspension-response.dto.js';
import type { IVendorSuspensionService } from '../interfaces/vendor-suspension.service.interface.js';

@Injectable()
export class VendorSuspensionService implements IVendorSuspensionService {
  private readonly logger = new Logger(VendorSuspensionService.name);

  constructor(
    @Inject(VENDOR_SUSPENSION_REPOSITORY)
    private readonly repo: VendorSuspensionRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async suspend(dto: SuspendVendorRequestDTO, actorId: string): Promise<SuspensionResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();

    // ─── Domain policy decision ───
    const decision = SuspensionPolicyService.decide(
      dto.reason,
      dto.durationDays,
    );

    const expectedLiftDate = SuspensionPolicyService.computeExpectedLiftDate(
      dto.reason,
      now,
      decision.durationDays,
    );
    const appealDeadline = SuspensionPolicyService.computeAppealDeadline(
      dto.reason,
      now,
    );

    const vo = VendorSuspensionVO.create({
      id: SuspensionIdVO.create(id),
      vendorId: VendorIdVO.create(dto.vendorId),
      status: SuspensionStatusVO.active(),
      reason: SuspensionReasonVO.create(dto.reason),
      description: dto.description,
      suspendedAt: now,
      suspendedBy: actorId,
      durationDays: decision.durationDays,
      appealDeadline,
      createdAt: now,
      updatedAt: now,
    });

    const entity = VendorSuspensionEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);

    this.logger.log(
      `Vendor ${dto.vendorId} suspended by ${actorId} — reason=${dto.reason} duration=${decision.durationDays}d (expectedLift=${expectedLiftDate})`,
    );
    return SuspensionMapper.toResponse(saved as never);
  }

  async reinstate(dto: ReinstateVendorRequestDTO, actorId: string): Promise<SuspensionResponseDTO> {
    const suspension = dto.suspensionId
      ? await this.load(dto.suspensionId)
      : await this.repo.findActiveByVendor(VendorIdVO.create(dto.vendorId));
    if (!suspension) throw new VendorNotFoundApplicationError(dto.vendorId);
    suspension.lift(actorId, dto.reason);
    const saved = await this.repo.save(suspension);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Vendor ${dto.vendorId} reinstated by ${actorId}`);
    return SuspensionMapper.toResponse(saved as never);
  }

  async appeal(dto: AppealSuspensionRequestDTO, _actorId?: string): Promise<SuspensionResponseDTO> {
    const entity = await this.load(dto.suspensionId);
    entity.appeal(dto.appealNotes);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return SuspensionMapper.toResponse(saved as never);
  }

  async lift(suspensionId: string, liftReason: string | undefined, actorId: string): Promise<SuspensionResponseDTO> {
    const entity = await this.load(suspensionId);
    entity.lift(actorId, liftReason);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return SuspensionMapper.toResponse(saved as never);
  }

  async getById(id: string): Promise<SuspensionResponseDTO> {
    const entity = await this.load(id);
    return SuspensionMapper.toResponse(entity);
  }

  async getActive(vendorId: string): Promise<SuspensionResponseDTO | null> {
    const entity = await this.repo.findActiveByVendor(VendorIdVO.create(vendorId));
    return entity ? SuspensionMapper.toResponse(entity as never) : null;
  }

  async listByVendor(vendorId: string): Promise<SuspensionListResponseDTO> {
    const entities = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    return SuspensionMapper.toListResponse(entities as never, entities.length, 1, entities.length);
  }

  async listActive(limit = 50): Promise<readonly SuspensionResponseDTO[]> {
    const entities = await this.repo.findActive(limit);
    return entities.map((e) => SuspensionMapper.toResponse(e as never));
  }

  async listPastExpectedLift(): Promise<readonly SuspensionResponseDTO[]> {
    const entities = await this.repo.findPastExpectedLift();
    return entities.map((e) => SuspensionMapper.toResponse(e as never));
  }

  private async load(id: string): Promise<VendorSuspensionEntity> {
    const vo = SuspensionIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VendorNotFoundApplicationError(id);
    return entity;
  }
}
