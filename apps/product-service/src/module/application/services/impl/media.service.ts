/**
 * MediaService
 */
import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IMediaService, MediaItemDTO } from '../interfaces/media.service.interface.js';
import { MEDIA_REPOSITORY, type MediaRepository } from '../../../domain/repositories/media.repository.interface.js';
import { ProductMediaEntity, type ProductMediaType } from '../../../domain/entities/product-media.entity.js';
import { MediaMapper } from '../../mappers/media.mapper.js';
import { MediaNotFoundApplicationError } from '../../errors/media.errors.js';

@Injectable()
export class MediaService implements IMediaService {
  constructor(@Inject(MEDIA_REPOSITORY) private readonly mediaRepo: MediaRepository) {}

  async add(params: {
    productId: string;
    type: ProductMediaType;
    url: string;
    thumbnailUrl?: string;
    alt?: string;
    sortOrder?: number;
    sizeBytes?: number;
    mimeType?: string;
    width?: number;
    height?: number;
    isPrimary?: boolean;
  }, actorId: string): Promise<MediaItemDTO> {
    const now = new Date().toISOString();
    const media = ProductMediaEntity.create({
      id: randomUUID(),
      now,
      props: {
        productId: params.productId,
        type: params.type,
        url: params.url,
        thumbnailUrl: params.thumbnailUrl,
        alt: params.alt,
        sortOrder: params.sortOrder ?? 0,
        sizeBytes: params.sizeBytes,
        mimeType: params.mimeType,
        width: params.width,
        height: params.height,
        isPrimary: params.isPrimary ?? false,
      },
    });
    if (media.isPrimary) await this.mediaRepo.clearPrimaryForProduct(params.productId);
    await this.mediaRepo.save(media);
    void actorId;
    return MediaMapper.toDTO(media);
  }

  async remove(mediaId: string, actorId: string): Promise<void> {
    const media = await this.mediaRepo.findById(mediaId);
    if (!media) throw new MediaNotFoundApplicationError(mediaId);
    await this.mediaRepo.delete(mediaId);
    void actorId;
  }

  async setPrimary(mediaId: string, actorId: string): Promise<MediaItemDTO> {
    const media = await this.mediaRepo.findById(mediaId);
    if (!media) throw new MediaNotFoundApplicationError(mediaId);
    await this.mediaRepo.clearPrimaryForProduct(media.productId);
    media.setPrimary(true);
    await this.mediaRepo.save(media);
    void actorId;
    return MediaMapper.toDTO(media);
  }

  async reorder(productId: string, orderedIds: readonly string[], actorId: string): Promise<void> {
    await this.mediaRepo.reorder(productId, orderedIds);
    void actorId;
  }

  async listByProduct(productId: string): Promise<readonly MediaItemDTO[]> {
    const items = await this.mediaRepo.findByProductId(productId);
    return MediaMapper.toDTOList(items);
  }
}
