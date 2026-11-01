/**
 * ProductMediaApplicationService — orchestrates media use cases
 * @module product-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import {
  MEDIA_REPOSITORY,
  type ProductMediaRepository,
} from '../../../domain/repositories/product-media.repository.interface.js';
import { ProductMediaEntity } from '../../../domain/entities/product-media.entity.js';
import {
  ProductMediaVO,
  type ProductMediaItem,
} from '../../../domain/value-objects/composites/product-media.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { ProductMediaService as ProductMediaDomainService } from '../../../domain/services/product-media.service.js';

import type {
  IProductMediaService,
  MediaResponseDTO,
  MediaItemDTO,
  AddMediaRequestDTO,
  RemoveMediaRequestDTO,
  SetPrimaryMediaRequestDTO,
} from '../interfaces/product-media.service.interface.js';

@Injectable()
export class ProductMediaApplicationService implements IProductMediaService {
  private readonly logger = new Logger(ProductMediaApplicationService.name);

  constructor(
    @Inject(MEDIA_REPOSITORY)
    private readonly repo: ProductMediaRepository,
  ) {}

  // ═══════════════ COMMANDS ═══════════════
  async addMedia(dto: AddMediaRequestDTO): Promise<MediaResponseDTO> {
    const now = new Date().toISOString();
    const existing = await this.repo.findByProduct(ProductIdVO.create(dto.productId));

    const existingItems: readonly ProductMediaItem[] = existing ? existing.vo.items : [];

    const newItems: readonly ProductMediaItem[] = dto.items.map((i) => ({
      url: i.url,
      type: i.type,
      alt: i.alt,
      order: i.order,
      isPrimary: i.isPrimary,
    }));

    const combined = [...existingItems, ...newItems];

    const validation = ProductMediaDomainService.validate(combined);
    if (!validation.valid) {
      throw new Error(`Media validation failed: ${validation.reasons.join('; ')}`);
    }

    const ordered = ProductMediaDomainService.order(combined);
    const thumbnailUrl = ProductMediaDomainService.selectThumbnail(ordered);

    const vo = ProductMediaVO.create({
      productId: dto.productId,
      items: ordered,
      thumbnailUrl,
      videoUrl: undefined,
    });

    let entity: ProductMediaEntity;
    if (existing) {
      entity = ProductMediaEntity.reconstitute({
        id: existing.id,
        createdAt: existing.createdAt,
        updatedAt: now,
        vo,
      });
    } else {
      const id = randomUUID();
      entity = ProductMediaEntity.create({ id, vo, now });
    }

    const saved = await this.repo.save(entity);
    this.logger.log(`Media added to product ${dto.productId}: +${newItems.length} item(s)`);
    return this.toResponse(saved);
  }

  async removeMedia(dto: RemoveMediaRequestDTO): Promise<MediaResponseDTO> {
    const existing = await this.repo.findByProduct(ProductIdVO.create(dto.productId));
    if (!existing) throw new Error(`Media for product ${dto.productId} not found`);

    const filtered = existing.vo.items.filter((i) => i.url !== dto.mediaUrl);
    const now = new Date().toISOString();

    const vo = ProductMediaVO.create({
      productId: dto.productId,
      items: filtered,
      thumbnailUrl: ProductMediaDomainService.selectThumbnail(filtered),
      videoUrl: existing.videoUrl,
    });

    const entity = ProductMediaEntity.reconstitute({
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: now,
      vo,
    });

    const saved = await this.repo.save(entity);
    this.logger.log(`Media removed from product ${dto.productId}: ${dto.mediaUrl}`);
    return this.toResponse(saved);
  }

  async setPrimary(dto: SetPrimaryMediaRequestDTO): Promise<MediaResponseDTO> {
    const existing = await this.repo.findByProduct(ProductIdVO.create(dto.productId));
    if (!existing) throw new Error(`Media for product ${dto.productId} not found`);

    const updated = ProductMediaDomainService.setPrimary(existing.vo.items, dto.mediaUrl);
    const now = new Date().toISOString();

    const vo = ProductMediaVO.create({
      productId: dto.productId,
      items: updated,
      thumbnailUrl: ProductMediaDomainService.selectThumbnail(updated),
      videoUrl: existing.videoUrl,
    });

    const entity = ProductMediaEntity.reconstitute({
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: now,
      vo,
    });

    const saved = await this.repo.save(entity);
    this.logger.log(`Primary media set for product ${dto.productId}: ${dto.mediaUrl}`);
    return this.toResponse(saved);
  }

  // ═══════════════ QUERIES ═══════════════
  async getByProduct(productId: string): Promise<MediaResponseDTO> {
    const entity = await this.repo.findByProduct(ProductIdVO.create(productId));
    if (!entity) {
      return { productId, items: [], imageCount: 0, videoCount: 0 };
    }
    return this.toResponse(entity);
  }

  // ═══════════════ HELPERS ═══════════════
  private toResponse(entity: ProductMediaEntity): MediaResponseDTO {
    const vo = entity.vo;
    const items: readonly MediaItemDTO[] = vo.items.map((i) => ({
      url: i.url,
      type: i.type,
      alt: i.alt,
      order: i.order,
      isPrimary: i.isPrimary,
    }));
    return {
      productId: vo.productId,
      items,
      thumbnailUrl: vo.thumbnailUrl,
      videoUrl: vo.videoUrl,
      imageCount: vo.imageItems.length,
      videoCount: vo.videoItems.length,
    };
  }
}
