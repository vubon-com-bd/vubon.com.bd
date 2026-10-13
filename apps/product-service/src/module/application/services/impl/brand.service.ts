/**
 * BrandService — orchestrates brand use cases
 * @module product-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  BRAND_REPOSITORY,
  type BrandRepository,
  type BrandListFilter,
  type BrandListOptions,
} from '../../../domain/repositories/brand.repository.interface.js';
import { BrandEntity } from '../../../domain/entities/brand.entity.js';
import { BrandVO } from '../../../domain/value-objects/composites/brand.vo.js';
import { BrandIdVO } from '../../../domain/value-objects/primitives/brand-id.vo.js';
import { BrandNameVO } from '../../../domain/value-objects/primitives/brand-name.vo.js';
import { BrandSlugVO } from '../../../domain/value-objects/primitives/brand-slug.vo.js';
import { BrandLogoVO } from '../../../domain/value-objects/primitives/brand-logo.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { BrandMapper } from '../../mappers/brand.mapper.js';
import type {
  IBrandService,
  BrandListOptionsDTO,
  BrandListFilterDTO,
} from '../interfaces/brand.service.interface.js';
import {
  BrandNotFoundApplicationError,
  BrandCreateError,
  BrandUpdateError,
  BrandSlugConflictApplicationError,
} from '../../errors/brand.errors.js';
import type {
  CreateBrandRequestDTO,
  UpdateBrandRequestDTO,
  DeleteBrandRequestDTO,
} from '../../dtos/requests/brand/index.js';
import type {
  BrandResponseDTO,
  BrandPublicResponseDTO,
  BrandSummaryResponseDTO,
  BrandListResponseDTO,
  BrandStatsResponseDTO,
} from '../../dtos/responses/brand-response.dto.js';

@Injectable()
export class BrandService implements IBrandService {
  private readonly logger = new Logger(BrandService.name);

  constructor(
    @Inject(BRAND_REPOSITORY)
    private readonly repo: BrandRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async create(dto: CreateBrandRequestDTO): Promise<BrandResponseDTO> {
    if (await this.repo.existsBySlug(dto.slug)) {
      throw new BrandSlugConflictApplicationError(dto.slug);
    }

    const now = new Date().toISOString();
    const id = randomUUID();

    try {
      const vo = BrandVO.create({
        id: BrandIdVO.create(id),
        name: BrandNameVO.create(dto.name),
        slug: BrandSlugVO.create(dto.slug),
        description: dto.description,
        logo: dto.logoUrl ? BrandLogoVO.create(dto.logoUrl) : undefined,
        bannerUrl: dto.bannerUrl,
        website: dto.website,
        status: 'active',
        isFeatured: dto.isFeatured ?? false,
        productCount: 0,
        country: dto.country,
      });

      const entity = BrandEntity.create({ id, vo, now });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);

      this.logger.log(`Brand "${saved.name.value}" (${saved.id}) created`);
      return BrandMapper.toResponse(saved);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new BrandCreateError(msg);
    }
  }

  async update(dto: UpdateBrandRequestDTO): Promise<BrandResponseDTO> {
    const entity = await this.load(dto.brandId);
    const current = entity.vo.value;

    const nextVo = BrandVO.create({
      ...current,
      name: dto.name ? BrandNameVO.create(dto.name) : current.name,
      description: dto.description !== undefined ? dto.description : current.description,
      logo: dto.logoUrl !== undefined
        ? (dto.logoUrl ? BrandLogoVO.create(dto.logoUrl) : undefined)
        : current.logo,
      bannerUrl: dto.bannerUrl !== undefined ? dto.bannerUrl : current.bannerUrl,
      website: dto.website !== undefined ? dto.website : current.website,
      status: dto.status ?? current.status,
      isFeatured: dto.isFeatured ?? current.isFeatured,
      country: dto.country !== undefined ? dto.country : current.country,
    });

    try {
      const updated = BrandEntity.reconstitute({
        id: entity.id,
        createdAt: entity.createdAt,
        updatedAt: new Date().toISOString(),
        vo: nextVo,
        version: entity.version,
      });

      const saved = await this.repo.save(updated);
      await this.eventBridge.publishFromEntity(saved);
      this.logger.log(`Brand ${saved.id} updated`);
      return BrandMapper.toResponse(saved);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new BrandUpdateError(dto.brandId, msg);
    }
  }

  async delete(
    dto: DeleteBrandRequestDTO,
  ): Promise<{ readonly success: true; readonly brandId: string }> {
    const entity = await this.load(dto.brandId);

    try {
      entity.delete(dto.actorId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new BrandUpdateError(dto.brandId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Brand ${saved.id} deleted`);
    return { success: true, brandId: saved.id };
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<BrandResponseDTO> {
    const entity = await this.load(id);
    return BrandMapper.toResponse(entity);
  }

  async getBySlug(slug: string): Promise<BrandResponseDTO> {
    const entity = await this.repo.findBySlug(slug);
    if (!entity) throw new BrandNotFoundApplicationError(slug);
    return BrandMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<BrandPublicResponseDTO> {
    const entity = await this.load(id);
    return BrandMapper.toPublicResponse(entity);
  }

  async list(options: BrandListOptionsDTO): Promise<BrandListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter as BrandListFilter | undefined,
    } as BrandListOptions);
    return BrandMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async findFeatured(limit = 20): Promise<readonly BrandSummaryResponseDTO[]> {
    const entities = await this.repo.findFeatured(limit);
    return entities.map((e) => BrandMapper.toSummary(e));
  }

  async search(term: string, limit = 20): Promise<readonly BrandSummaryResponseDTO[]> {
    const entities = await this.repo.search(term, limit);
    return entities.map((e) => BrandMapper.toSummary(e));
  }

  async getStats(filter?: BrandListFilterDTO): Promise<BrandStatsResponseDTO> {
    const stats = await this.repo.getStats(filter as BrandListFilter | undefined);
    return BrandMapper.toStatsResponse(stats);
  }

  // ═══════════════ HELPERS ═══════════════
  private async load(id: string): Promise<BrandEntity> {
    const vo = BrandIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new BrandNotFoundApplicationError(id);
    return entity;
  }
}
