/**
 * ProductCollectionService — orchestrates collection use cases
 * @module product-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  COLLECTION_REPOSITORY,
  type ProductCollectionRepository,
  type CollectionListFilter,
  type CollectionListOptions,
} from '../../../domain/repositories/product-collection.repository.interface.js';
import { ProductCollectionEntity } from '../../../domain/entities/product-collection.entity.js';
import { ProductCollectionVO } from '../../../domain/value-objects/composites/product-collection.vo.js';
import { CollectionIdVO } from '../../../domain/value-objects/primitives/collection-id.vo.js';
import { CollectionNameVO } from '../../../domain/value-objects/primitives/collection-name.vo.js';
import { CollectionTypeVO } from '../../../domain/value-objects/primitives/collection-type.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { CollectionMapper } from '../../mappers/collection.mapper.js';
import type {
  IProductCollectionService,
  CollectionListOptionsDTO,
  CollectionListFilterDTO,
} from '../interfaces/product-collection.service.interface.js';
import {
  CollectionNotFoundApplicationError,
  CollectionCreateError,
  CollectionSlugConflictApplicationError,
  CollectionUpdateError,
} from '../../errors/collection.errors.js';
import type {
  CreateCollectionRequestDTO,
  UpdateCollectionRequestDTO,
  DeleteCollectionRequestDTO,
  AddProductToCollectionRequestDTO,
} from '../../dtos/requests/collection/index.js';
import type {
  CollectionResponseDTO,
  CollectionPublicResponseDTO,
  CollectionSummaryResponseDTO,
  CollectionListResponseDTO,
  CollectionStatsResponseDTO,
} from '../../dtos/responses/collection-response.dto.js';

@Injectable()
export class ProductCollectionService implements IProductCollectionService {
  private readonly logger = new Logger(ProductCollectionService.name);

  constructor(
    @Inject(COLLECTION_REPOSITORY)
    private readonly repo: ProductCollectionRepository,
    private readonly eventBridge: DomainEventBridgeService,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async create(dto: CreateCollectionRequestDTO): Promise<CollectionResponseDTO> {
    if (await this.repo.existsBySlug(dto.slug)) {
      throw new CollectionSlugConflictApplicationError(dto.slug);
    }

    const now = new Date().toISOString();
    const id = randomUUID();

    try {
      const vo = ProductCollectionVO.create({
        id: CollectionIdVO.create(id),
        name: CollectionNameVO.create(dto.name),
        slug: dto.slug,
        type: CollectionTypeVO.create(dto.type),
        description: dto.description,
        imageUrl: dto.imageUrl,
        productIds: (dto.productIds ?? []).map((p) => ProductIdVO.create(p)),
        isFeatured: dto.isFeatured ?? false,
        sortOrder: dto.sortOrder ?? 0,
        startAt: dto.startAt,
        endAt: dto.endAt,
      });

      const entity = ProductCollectionEntity.create({ id, vo, now });
      const saved = await this.repo.save(entity);
      await this.eventBridge.publishFromEntity(saved);

      this.logger.log(`Collection "${saved.name.value}" (${saved.id}) created`);
      return CollectionMapper.toResponse(saved);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new CollectionCreateError(msg);
    }
  }

  async update(dto: UpdateCollectionRequestDTO): Promise<CollectionResponseDTO> {
    const entity = await this.load(dto.collectionId);
    const current = entity.vo.value;

    const nextVo = ProductCollectionVO.create({
      ...current,
      name: dto.name ? CollectionNameVO.create(dto.name) : current.name,
      description: dto.description !== undefined ? dto.description : current.description,
      type: dto.type ? CollectionTypeVO.create(dto.type) : current.type,
      imageUrl: dto.imageUrl !== undefined ? dto.imageUrl : current.imageUrl,
      isFeatured: dto.isFeatured ?? current.isFeatured,
      sortOrder: dto.sortOrder ?? current.sortOrder,
      startAt: dto.startAt !== undefined ? dto.startAt : current.startAt,
      endAt: dto.endAt !== undefined ? dto.endAt : current.endAt,
    });

    const updated = ProductCollectionEntity.reconstitute({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: new Date().toISOString(),
      vo: nextVo,
      isActive: entity.isActive,
      version: entity.version,
    });

    const saved = await this.repo.save(updated);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Collection ${saved.id} updated`);
    return CollectionMapper.toResponse(saved);
  }

  async delete(
    dto: DeleteCollectionRequestDTO,
  ): Promise<{ readonly success: true; readonly collectionId: string }> {
    const entity = await this.load(dto.collectionId);

    try {
      entity.delete(dto.actorId);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown';
      throw new CollectionUpdateError(dto.collectionId, msg);
    }

    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Collection ${saved.id} deleted`);
    return { success: true, collectionId: saved.id };
  }

  async addProduct(dto: AddProductToCollectionRequestDTO): Promise<CollectionResponseDTO> {
    const entity = await this.load(dto.collectionId);
    entity.addProduct(ProductIdVO.create(dto.productId));
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Product ${dto.productId} added to collection ${saved.id}`);
    return CollectionMapper.toResponse(saved);
  }

  async removeProduct(dto: AddProductToCollectionRequestDTO): Promise<CollectionResponseDTO> {
    const entity = await this.load(dto.collectionId);
    entity.removeProduct(ProductIdVO.create(dto.productId));
    const saved = await this.repo.save(entity);
    await this.eventBridge.publishFromEntity(saved);
    this.logger.log(`Product ${dto.productId} removed from collection ${saved.id}`);
    return CollectionMapper.toResponse(saved);
  }

  // ═══════════════ QUERIES ═══════════════
  async getById(id: string): Promise<CollectionResponseDTO> {
    const entity = await this.load(id);
    return CollectionMapper.toResponse(entity);
  }

  async getBySlug(slug: string): Promise<CollectionResponseDTO> {
    const entity = await this.repo.findBySlug(slug);
    if (!entity) throw new CollectionNotFoundApplicationError(slug);
    return CollectionMapper.toResponse(entity);
  }

  async getPublic(id: string): Promise<CollectionPublicResponseDTO> {
    const entity = await this.load(id);
    return CollectionMapper.toPublicResponse(entity);
  }

  async list(options: CollectionListOptionsDTO): Promise<CollectionListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter as CollectionListFilter | undefined,
    } as CollectionListOptions);
    return CollectionMapper.toListResponse(result.items, result.total, result.page, result.limit);
  }

  async findActive(at?: string): Promise<readonly CollectionSummaryResponseDTO[]> {
    const now = at ?? new Date().toISOString();
    const entities = await this.repo.findActive(now);
    return entities.map((e) => CollectionMapper.toSummary(e));
  }

  async getFeatured(limit = 20): Promise<readonly CollectionSummaryResponseDTO[]> {
    const entities = await this.repo.findFeatured(limit);
    return entities.map((e) => CollectionMapper.toSummary(e));
  }

  async getStats(filter?: CollectionListFilterDTO): Promise<CollectionStatsResponseDTO> {
    const stats = await this.repo.getStats(filter as CollectionListFilter | undefined);
    return CollectionMapper.toStatsResponse(stats);
  }

  // ═══════════════ HELPERS ═══════════════
  private async load(id: string): Promise<ProductCollectionEntity> {
    const vo = CollectionIdVO.create(id);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) throw new CollectionNotFoundApplicationError(id);
    return entity;
  }
}
