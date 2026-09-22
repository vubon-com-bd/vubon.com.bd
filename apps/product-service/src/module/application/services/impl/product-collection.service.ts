import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ProductCollectionServiceInterface } from '../interfaces/product-collection.service.interface';
import type { ProductCollectionRepository } from '../../../domain/repositories/product-collection.repository.interface';
import { ProductCollectionEntity } from '../../../domain/entities/product-collection.entity';
import { CollectionIdVO } from '../../../domain/value-objects/primitives/collection-id.vo';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo';
import { CollectionOperationFailedError } from '../../errors/collection.errors';
import type { CreateCollectionRequestDTO } from '../../dtos/requests/collection/create-collection.dto';
import type { CollectionResponseDTO } from '../../dtos/responses/collection-response.dto';

@Injectable()
export class ProductCollectionService
  extends BaseService<ProductCollectionEntity, string>
  implements ProductCollectionServiceInterface
{
  readonly name = 'ProductCollectionService';

  constructor(private readonly collectionRepo: ProductCollectionRepository) {
    super();
  }

  async create(input: CreateCollectionRequestDTO): Promise<CollectionResponseDTO> {
    void input;
    throw new CollectionOperationFailedError('create not yet wired');
  }

  async update(collectionId: string, name: string): Promise<CollectionResponseDTO> {
    void name;
    const entity = await this.collectionRepo.findById(CollectionIdVO.create(collectionId));
    if (!entity) throw new CollectionOperationFailedError('collection not found');
    await this.collectionRepo.save(entity);
    return this.toDTO(entity);
  }

  async delete(collectionId: string): Promise<void> {
    await this.collectionRepo.delete(CollectionIdVO.create(collectionId));
  }

  async addProduct(collectionId: string, productId: string): Promise<void> {
    const entity = await this.collectionRepo.findById(CollectionIdVO.create(collectionId));
    if (!entity) throw new CollectionOperationFailedError('collection not found');
    const updated = entity.addProduct(ProductIdVO.create(productId));
    await this.collectionRepo.save(updated);
  }

  async findById(collectionId: string): Promise<CollectionResponseDTO | null> {
    const entity = await this.collectionRepo.findById(CollectionIdVO.create(collectionId));
    return entity ? this.toDTO(entity) : null;
  }

  async list(): Promise<readonly CollectionResponseDTO[]> {
    const rows = await this.collectionRepo.findAll();
    return rows.map((r) => this.toDTO(r));
  }

  private toDTO(entity: ProductCollectionEntity): CollectionResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      type: entity.type.value,
      productIds: entity.productIds.map((p) => p.value),
    } as unknown as CollectionResponseDTO;
  }
}
