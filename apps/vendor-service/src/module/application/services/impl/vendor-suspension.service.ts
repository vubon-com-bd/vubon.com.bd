/**
 * VendorSuspensionService
 * @module vendor-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import {
  VENDOR_SUSPENSION_REPOSITORY,
  type VendorSuspensionRepository,
} from '../../../domain/repositories/vendor-suspension.repository.interface.js';
import { VendorSuspensionEntity } from '../../../domain/entities/vendor-suspension.entity.js';
import { SuspensionReasonVO } from '../../../domain/value-objects/primitives/suspension-reason.vo.js';
import {
  VENDOR_SUSPENSION_SERVICE,
  type IVendorSuspensionService,
} from '../interfaces/vendor-suspension.service.interface.js';
import type { SuspendVendorRequestDto } from '../../dtos/requests/suspend-vendor.dto.js';
import type { ReinstateVendorRequestDto } from '../../dtos/requests/reinstate-vendor.dto.js';
import type { AppealSuspensionRequestDto } from '../../dtos/requests/appeal-suspension.dto.js';
import type { VendorSuspensionResponseDto } from '../../dtos/responses/vendor-suspension-response.dto.js';
import { VendorIdGeneratorService } from '../../../domain/services/vendor-id-generator.service.js';

@Injectable()
export class VendorSuspensionService implements IVendorSuspensionService {
  constructor(
    @Inject(VENDOR_SUSPENSION_REPOSITORY)
    private readonly repo: VendorSuspensionRepository,
  ) {}

  async suspend(dto: SuspendVendorRequestDto, _actorId?: string): Promise<VendorSuspensionResponseDto> {
    const now = new Date().toISOString();
    const entity = VendorSuspensionEntity.create({
      id: VendorIdGeneratorService.generateUUID(),
      vendorId: dto.vendorId,
      reason: SuspensionReasonVO.create(dto.reason),
      durationDays: dto.durationDays,
      suspendedBy: dto.suspendedBy,
      notes: dto.notes,
      now,
    });
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async lift(dto: ReinstateVendorRequestDto, _actorId?: string): Promise<VendorSuspensionResponseDto> {
    const entity = await this.requireActive(dto.vendorId);
    entity.lift(dto.liftedBy, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async appeal(dto: AppealSuspensionRequestDto, _actorId?: string): Promise<VendorSuspensionResponseDto> {
    const entity = await this.repo.findById(dto.suspensionId);
    if (!entity) {
      throw new Error(`Suspension "${dto.suspensionId}" not found`);
    }
    entity.submitAppeal(dto.appealReason, new Date().toISOString());
    const saved = await this.repo.save(entity);
    return this.toResponse(saved);
  }

  async getById(suspensionId: string): Promise<VendorSuspensionResponseDto> {
    const entity = await this.repo.findById(suspensionId);
    if (!entity) {
      throw new Error(`Suspension "${suspensionId}" not found`);
    }
    return this.toResponse(entity);
  }

  async getActiveByVendorId(vendorId: string): Promise<VendorSuspensionResponseDto | null> {
    const entity = await this.repo.findActiveByVendorId(vendorId);
    return entity ? this.toResponse(entity) : null;
  }

  async listByVendor(vendorId: string): Promise<readonly VendorSuspensionResponseDto[]> {
    const entities = await this.repo.findByVendorId(vendorId);
    return entities.map((e) => this.toResponse(e));
  }

  private async requireActive(vendorId: string): Promise<VendorSuspensionEntity> {
    const entity = await this.repo.findActiveByVendorId(vendorId);
    if (!entity) {
      throw new Error(`No active suspension for vendor "${vendorId}"`);
    }
    return entity;
  }

  private toResponse(entity: VendorSuspensionEntity): VendorSuspensionResponseDto {
    return {
      id: entity.id,
      vendorId: entity.vendorId,
      reason: entity.reason.value as VendorSuspensionResponseDto['reason'],
      suspendedAt: entity.suspendedAt,
      suspendedBy: entity.suspendedBy,
      durationDays: entity.durationDays,
      liftedAt: entity.liftedAt,
      isLifted: entity.isLifted,
      isExpired: entity.isExpired(),
      daysRemaining: entity.daysRemaining(),
      autoLiftOnResolution: true,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
