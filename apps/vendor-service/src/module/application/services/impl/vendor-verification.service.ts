/**
 * VendorVerificationService — verification lifecycle
 * @module vendor-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VENDOR_VERIFICATION_REPOSITORY,
  type VendorVerificationRepository,
} from '../../../domain/repositories/vendor-verification.repository.interface.js';
import { VendorVerificationEntity } from '../../../domain/entities/vendor-verification.entity.js';
import { VendorVerificationVO } from '../../../domain/value-objects/composites/vendor-verification.vo.js';
import { VerificationIdVO } from '../../../domain/value-objects/primitives/verification-id.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { VerificationStatusVO } from '../../../domain/value-objects/primitives/verification-status.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VerificationMapper } from '../../mappers/verification.mapper.js';
import { VendorValidationError, VendorNotFoundApplicationError } from '../../errors/vendor.errors.js';
import { VerificationValidationError } from '../../errors/verification.errors.js';
import type {
  SubmitVerificationRequestDTO,
  ReverifyRequestDTO,
} from '../../dtos/requests/verification/index.js';
import type {
  VerificationResponseDTO,
  VerificationListResponseDTO,
  VerificationStatusResponseDTO,
} from '../../dtos/responses/verification-response.dto.js';
import type { IVendorVerificationService } from '../interfaces/vendor-verification.service.interface.js';

@Injectable()
export class VendorVerificationService implements IVendorVerificationService {
  private readonly logger = new Logger(VendorVerificationService.name);

  constructor(
    @Inject(VENDOR_VERIFICATION_REPOSITORY)
    private readonly repo: VendorVerificationRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  async submit(dto: SubmitVerificationRequestDTO, _actorId?: string): Promise<VerificationResponseDTO> {
    const now = new Date().toISOString();
    const id = randomUUID();

    // ─── Uniqueness check ───
    const existing = await this.repo.findByVendorAndType(dto.vendorId, dto.type);
    if (existing && existing.isApproved()) {
      throw new VerificationValidationError(
        `Verification of type "${dto.type}" already approved`,
        'type',
      );
    }

    const vo = VendorVerificationVO.create({
      id: VerificationIdVO.create(id),
      vendorId: VendorIdVO.create(dto.vendorId),
      type: dto.type,
      status: VerificationStatusVO.pending(),
      referenceId: dto.referenceId,
      submittedAt: now,
      attempts: 1,
      createdAt: now,
      updatedAt: now,
    });

    const entity = VendorVerificationEntity.create({ id, vo, now });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    this.logger.log(`Verification ${saved.id} submitted for vendor ${dto.vendorId}`);
    return VerificationMapper.toResponse(saved as never);
  }

  async reverify(dto: ReverifyRequestDTO, _actorId?: string): Promise<VerificationResponseDTO> {
    const entity = await this.load(dto.verificationId);
    entity.submit(dto.referenceId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return VerificationMapper.toResponse(saved as never);
  }

  async approve(verificationId: string, actorId: string): Promise<VerificationResponseDTO> {
    const entity = await this.load(verificationId);
    entity.approve(actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return VerificationMapper.toResponse(saved as never);
  }

  async reject(verificationId: string, reason: string, actorId: string): Promise<VerificationResponseDTO> {
    const entity = await this.load(verificationId);
    entity.reject(reason, actorId);
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved as never);
    return VerificationMapper.toResponse(saved as never);
  }

  async getById(id: string): Promise<VerificationResponseDTO> {
    const entity = await this.load(id);
    return VerificationMapper.toResponse(entity);
  }

  async getStatus(vendorId: string): Promise<VerificationStatusResponseDTO> {
    const entities = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    const statuses: Record<string, string> = {};
    for (const e of entities) {
      statuses[e.type] = e.status.value;
    }
    const approved = entities.filter((e) => e.isApproved()).length;
    const required = entities.length;

    return {
      vendorId,
      fullyVerified: approved === required && required > 0,
      requiredCount: required,
      completedCount: approved,
      progressPercent: required === 0 ? 0 : Math.round((approved / required) * 100),
      missing: entities.filter((e) => e.isNotStarted()).map((e) => e.type),
      pending: entities.filter((e) => e.isPending() || e.isInReview()).map((e) => e.type),
      rejected: entities.filter((e) => e.isRejected()).map((e) => e.type),
      estimatedSlaHours: 48,
    };
  }

  async listByVendor(vendorId: string): Promise<VerificationListResponseDTO> {
    const entities = await this.repo.findByVendor(VendorIdVO.create(vendorId));
    return VerificationMapper.toListResponse(entities as never, entities.length, 1, entities.length);
  }

  async listPending(limit = 50): Promise<readonly VerificationResponseDTO[]> {
    const entities = await this.repo.findPending(limit);
    return entities.map((e) => VerificationMapper.toResponse(e as never));
  }

  async listOverdue(): Promise<readonly VerificationResponseDTO[]> {
    const entities = await this.repo.findOverdue();
    return entities.map((e) => VerificationMapper.toResponse(e as never));
  }

  private async load(id: string): Promise<VendorVerificationEntity> {
    const vo = VerificationIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VendorNotFoundApplicationError(id);
    return entity;
  }
}
