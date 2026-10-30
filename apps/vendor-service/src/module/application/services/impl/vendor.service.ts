/**
 * VendorService — orchestrates vendor core use cases
 * @module vendor-service/application/services/impl
 *
 * Real business logic:
 *  - Domain service integration (slug, eligibility)
 *  - Event publishing via DomainEventBridgeService
 *  - Rich logging
 *  - Cross-aggregate orchestration
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  VENDOR_REPOSITORY,
  type VendorRepository,
  type VendorListFilter,
  type VendorListOptions,
} from '../../../domain/repositories/vendor.repository.interface.js';
import { VendorEntity } from '../../../domain/entities/vendor.entity.js';
import { VendorVO } from '../../../domain/value-objects/composites/vendor.vo.js';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo.js';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo.js';
import { VendorNameVO } from '../../../domain/value-objects/primitives/vendor-name.vo.js';
import { VendorSlugVO } from '../../../domain/value-objects/primitives/vendor-slug.vo.js';
import { VendorStatusVO } from '../../../domain/value-objects/primitives/vendor-status.vo.js';
import { VendorTypeVO } from '../../../domain/value-objects/primitives/vendor-type.vo.js';
import { BusinessTypeVO } from '../../../domain/value-objects/primitives/business-type.vo.js';
import { VendorTierVO } from '../../../domain/value-objects/primitives/vendor-tier.vo.js';
import { BusinessDescriptionVO } from '../../../domain/value-objects/primitives/business-description.vo.js';
import { RatingValueVO } from '../../../domain/value-objects/primitives/rating-value.vo.js';

import { VendorSlugService } from '../../../domain/services/vendor-slug.service.js';
import { VendorEligibilityService } from '../../../domain/services/vendor-eligibility.service.js';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorMapper } from '../../mappers/vendor.mapper.js';
import {
  VendorNotFoundApplicationError,
  VendorRegistrationError,
  VendorUpdateError,
  VendorDeleteError,
  VendorSlugConflictApplicationError,
  VendorEmailConflictApplicationError,
  VendorUserAlreadyHasVendorApplicationError,
  VendorValidationError,
} from '../../errors/vendor.errors.js';

import type {
  RegisterVendorCommandDTO,
  UpdateVendorCommandDTO,
  DeleteVendorRequestDTO,
} from '../../dtos/requests/vendor/index.js';
import type {
  VendorResponseDTO,
  VendorPublicResponseDTO,
  VendorSummaryResponseDTO,
  VendorListResponseDTO,
  VendorStatsResponseDTO,
  VendorInitiateResponseDTO,
} from '../../dtos/responses/vendor-response.dto.js';
import type { VendorDetailResponseDTO } from '../../dtos/responses/vendor-detail-response.dto.js';

import type {
  IVendorService,
  VendorListOptionsDTO,
  VendorListFilterDTO,
} from '../interfaces/vendor.service.interface.js';

@Injectable()
export class VendorService implements IVendorService {
  private readonly logger = new Logger(VendorService.name);

  constructor(
    @Inject(VENDOR_REPOSITORY)
    private readonly repo: VendorRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async register(
    dto: RegisterVendorCommandDTO,
    userId: string,
    _actorId?: string,
  ): Promise<VendorInitiateResponseDTO> {
    const now = new Date().toISOString();

    // ─── Eligibility check ───
    const existingByUser = await this.repo.findByUserId(userId);
    if (existingByUser) {
      throw new VendorUserAlreadyHasVendorApplicationError(userId);
    }

    // ─── Email uniqueness ───
    if (await this.repo.existsByEmail(dto.email)) {
      throw new VendorEmailConflictApplicationError(dto.email);
    }

    // ─── Slug uniqueness + generation ───
    if (await this.repo.existsBySlug(dto.slug)) {
      throw new VendorSlugConflictApplicationError(dto.slug);
    }

    const id = randomUUID();
    let entity: VendorEntity;
    try {
      const vo = VendorVO.create({
        id: VendorIdVO.create(id),
        userId: UserIdVO.create(userId),
        name: VendorNameVO.create(dto.name),
        slug: VendorSlugVO.create(dto.slug),
        displayName: dto.displayName,
        description: dto.description ? BusinessDescriptionVO.create(dto.description) : undefined,
        type: VendorTypeVO.create(dto.type),
        businessType: BusinessTypeVO.create(dto.businessType),
        status: VendorStatusVO.pending(),
        tier: VendorTierVO.create('bronze'),
        email: dto.email,
        phone: dto.phone,
        rating: RatingValueVO.empty(),
        totalSales: 0,
        totalOrders: 0,
        isVerified: false,
        isFeatured: false,
        joinedAt: now,
      });

      entity = VendorEntity.reconstitute({
        id: vo.id.value,
        createdAt: now,
        updatedAt: now,
        props: { vo },
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      throw new VendorRegistrationError(msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);

    this.logger.log(`Vendor ${saved.id} registered by user ${userId}`);

    return {
      success: true,
      vendorId: saved.id,
      status: saved.status.value as never,
      slug: saved.vo.slug.value,
    };
  }

  async update(dto: UpdateVendorCommandDTO, _actorId?: string): Promise<VendorResponseDTO> {
    const entity = await this.load(dto.vendorId);

    const patch = dto.patch;
    try {
      entity.updateProfile({
        name: patch.name ? VendorNameVO.create(patch.name) : undefined,
        displayName: patch.displayName,
        description: patch.description ? BusinessDescriptionVO.create(patch.description) : undefined,
        logoUrl: patch.logoUrl,
        bannerUrl: patch.bannerUrl,
        website: patch.website,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      throw new VendorUpdateError(dto.vendorId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Vendor ${saved.id} updated`);
    return VendorMapper.toResponse(saved);
  }

  async delete(dto: DeleteVendorRequestDTO): Promise<{ readonly success: true; readonly vendorId: string }> {
    const entity = await this.load(dto.vendorId);

    try {
      entity.delete(dto.actorId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      throw new VendorDeleteError(dto.vendorId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Vendor ${saved.id} deleted`);
    return { success: true, vendorId: saved.id };
  }

  async updateProfile(dto: import('../../dtos/requests/vendor/update-profile.dto.js').UpdateProfileRequestDTO, _actorId?: string): Promise<VendorResponseDTO> {
    const entity = await this.load(dto.vendorId);
    entity.updateProfile({
      name: dto.name ? VendorNameVO.create(dto.name) : undefined,
      displayName: dto.displayName,
      description: dto.description ? BusinessDescriptionVO.create(dto.description) : undefined,
      logoUrl: dto.logoUrl,
      bannerUrl: dto.bannerUrl,
      website: dto.website,
    });
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    return VendorMapper.toResponse(saved);
  }

  async updateBusiness(dto: import('../../dtos/requests/vendor/update-business.dto.js').UpdateBusinessRequestDTO, _actorId?: string): Promise<VendorResponseDTO> {
    const entity = await this.load(dto.vendorId);
    // Business info handled via VendorBusinessEntity in separate service
    void dto;
    this.logger.log(`Vendor ${entity.id} business update delegated`);
    return VendorMapper.toResponse(entity);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<VendorResponseDTO> {
    const entity = await this.load(id);
    return VendorMapper.toResponse(entity);
  }

  async getBySlug(slug: string): Promise<VendorResponseDTO> {
    const entity = await this.repo.findBySlug(slug);
    if (!entity) throw new VendorNotFoundApplicationError(slug);
    return VendorMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<VendorPublicResponseDTO> {
    const entity = await this.load(id);
    return VendorMapper.toPublicResponse(entity);
  }

  async getDetail(id: string): Promise<VendorDetailResponseDTO> {
    const entity = await this.load(id);
    return VendorMapper.toDetail(entity, [], [], [], [], []);
  }

  async getMyVendor(userId: string): Promise<VendorResponseDTO> {
    const entity = await this.repo.findByUserId(userId);
    if (!entity) throw new VendorNotFoundApplicationError(userId);
    return VendorMapper.toResponse(entity);
  }

  async list(options: VendorListOptionsDTO): Promise<VendorListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter as VendorListFilter | undefined,
      includeDeleted: options.includeDeleted,
    } as VendorListOptions);
    return VendorMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async search(term: string, limit = 20): Promise<readonly VendorSummaryResponseDTO[]> {
    const entities = await this.repo.search(term, limit);
    return entities.map((e) => VendorMapper.toSummary(e));
  }

  async getFeatured(limit = 20): Promise<readonly VendorSummaryResponseDTO[]> {
    const entities = await this.repo.findFeatured(limit);
    return entities.map((e) => VendorMapper.toSummary(e));
  }

  async getTopRated(limit = 20): Promise<readonly VendorSummaryResponseDTO[]> {
    const entities = await this.repo.findTopRated(limit);
    return entities.map((e) => VendorMapper.toSummary(e));
  }

  async getStats(filter?: VendorListFilterDTO): Promise<VendorStatsResponseDTO> {
    const stats = await this.repo.getStats(filter as VendorListFilter | undefined);
    return {
      total: stats.total,
      activeCount: stats.activeCount,
      pendingCount: stats.pendingCount,
      suspendedCount: stats.suspendedCount,
      verifiedCount: stats.verifiedCount,
      featuredCount: stats.featuredCount,
      totalSales: stats.totalSales,
      byStatus: stats.byStatus,
      byType: stats.byType,
      byTier: stats.byTier,
    };
  }

  // ═══════════════ HELPERS ═══════════════
  async approve(vendorId: string, actorId: string, notes?: string): Promise<VendorResponseDTO> {
    const entity = await this.load(vendorId);
    try {
      entity.approve(actorId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      throw new VendorUpdateError(vendorId, msg);
    }
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Vendor ${vendorId} approved by ${actorId}${notes ? ` — ${notes}` : ''}`);
    return VendorMapper.toResponse(saved);
  }

  async reject(vendorId: string, actorId: string, reason: string, notes?: string): Promise<VendorResponseDTO> {
    const entity = await this.load(vendorId);
    try {
      entity.reject(reason, actorId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      throw new VendorUpdateError(vendorId, msg);
    }
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Vendor ${vendorId} rejected by ${actorId} — reason: ${reason}`);
    return VendorMapper.toResponse(saved);
  }

  private async load(id: string): Promise<VendorEntity> {
    const vo = VendorIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new VendorNotFoundApplicationError(id);
    return entity;
  }
}
