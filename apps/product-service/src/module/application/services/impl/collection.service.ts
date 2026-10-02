/**
 * CollectionService
 */
import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { ICollectionService } from '../interfaces/collection.service.interface.js';
import { COLLECTION_REPOSITORY, type CollectionRepository } from '../../../domain/repositories/collection.repository.interface.js';
import { CollectionEntity } from '../../../domain/entities/collection.entity.js';
import { CollectionNameVO } from '../../../domain/value-objects/primitives/collection-name.vo.js';
import { CollectionSlugVO } from '../../../domain/value-objects/primitives/collection-slug.vo.js';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo.js';
import { CollectionMapper } from '../../mappers/collection.mapper.js';
import { COLLECTION_STATUS } from '@vubon/shared-constants/business/product';
import type { CreateCollectionRequestDTO } from '../../dtos/requests/collection/create-collection.dto.js';
import type { UpdateCollectionRequestDTO } from '../../dtos/requests/collection/update-collection.dto.js';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto.js';
import { CollectionNotFoundApplicationError, CollectionSlugConflictError } from '../../errors/collection.errors.js';

@Injectable()
export class CollectionService implements ICollectionService {
  constructor(
    @Inject(COLLECTION_REPOSITORY) private readonly collectionRepo: CollectionRepository,
  ) {}

  async create(dto: CreateCollectionRequestDTO, actorId: string): Promise<CollectionResponseDTO> {
    const slug = CollectionSlugVO.create(dto.slug);
    if (await this.collectionRepo.existsBySlug(slug)) throw new CollectionSlugConflictError(dto.slug);
    const now = new Date().toISOString();
    const collection = CollectionEntity.create({
      id: randomUUID(),
      now,
      props: {
        name: CollectionNameVO.create(dto.name),
        slug,
        description: dto.description,
        type: dto.type,
        status: COLLECTION_STATUS.INACTIVE,
        imageUrl: dto.imageUrl,
        productIds: [],
        isFeatured: dto.isFeatured ?? false,
        sortOrder: 0,
      },
    });
    await this.collectionRepo.save(collection);
    void actorId;
    return CollectionMapper.toResponse(collection);
  }

  async update(dto: UpdateCollectionRequestDTO): Promise<CollectionResponseDTO> {
    const collection = await this.collectionRepo.findById(dto.collectionId);
    if (!collection) throw new CollectionNotFoundApplicationError(dto.collectionId);
    collection.update({
      name: dto.name ? CollectionNameVO.create(dto.name) : undefined,
      description: dto.description,
      imageUrl: dto.imageUrl,
      isFeatured: dto.isFeatured,
      sortOrder: dto.sortOrder,
    }, 'system');
    await this.collectionRepo.save(collection);
    return CollectionMapper.toResponse(collection);
  }

  async remove(collectionId: string, actorId: string): Promise<void> {
    const collection = await this.collectionRepo.findById(collectionId);
    if (!collection) throw new CollectionNotFoundApplicationError(collectionId);
    collection.softDelete(actorId);
    await this.collectionRepo.save(collection);
  }

  async addProduct(collectionId: string, productId: string, actorId: string): Promise<CollectionResponseDTO> {
    const collection = await this.collectionRepo.findById(collectionId);
    if (!collection) throw new CollectionNotFoundApplicationError(collectionId);
    collection.addProduct(ProductIdVO.create(productId), actorId);
    await this.collectionRepo.save(collection);
    return CollectionMapper.toResponse(collection);
  }

  async removeProduct(collectionId: string, productId: string, actorId: string): Promise<CollectionResponseDTO> {
    const collection = await this.collectionRepo.findById(collectionId);
    if (!collection) throw new CollectionNotFoundApplicationError(collectionId);
    collection.removeProduct(ProductIdVO.create(productId));
    await this.collectionRepo.save(collection);
    void actorId;
    return CollectionMapper.toResponse(collection);
  }

  async listFeatured(limit?: number): Promise<readonly CollectionResponseDTO[]> {
    const collections = await this.collectionRepo.findFeatured(limit);
    return CollectionMapper.toResponseList(collections);
  }

  async listActive(): Promise<readonly CollectionResponseDTO[]> {
    const collections = await this.collectionRepo.findActive(new Date().toISOString());
    return CollectionMapper.toResponseList(collections);
  }
}
