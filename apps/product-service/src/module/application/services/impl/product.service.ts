import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ProductServiceInterface } from '../interfaces/product.service.interface';
import type { ProductRepository } from '../../../domain/repositories/product.repository.interface';
import { ProductEntity } from '../../../domain/entities/product.entity';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo';
import { ProductSlugVO } from '../../../domain/value-objects/primitives/product-slug.vo';
import { ProductOperationFailedError } from '../../errors/product.errors';
import type { CreateProductRequestDTO } from '../../dtos/requests/product/create-product.dto';
import type { UpdateProductRequestDTO } from '../../dtos/requests/product/update-product.dto';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto';

@Injectable()
export class ProductService
  extends BaseService<ProductEntity, string>
  implements ProductServiceInterface
{
  readonly name = 'ProductService';

  constructor(
    private readonly productRepo: ProductRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateProductRequestDTO): Promise<ProductResponseDTO> {
    void input;
    void this.productRepo;
    throw new ProductOperationFailedError('create not yet wired');
  }

  async update(productId: string, input: UpdateProductRequestDTO): Promise<ProductResponseDTO> {
    void input;
    const entity = await this.productRepo.findById(ProductIdVO.create(productId));
    if (!entity) {
      throw new ProductOperationFailedError(`product not found: ${productId}`);
    }
    await this.productRepo.save(entity);
    return this.toDTO(entity);
  }

  async delete(productId: string): Promise<void> {
    const entity = await this.productRepo.findById(ProductIdVO.create(productId));
    if (!entity) {
      throw new ProductOperationFailedError(`product not found: ${productId}`);
    }
    const deleted = entity.softDelete();
    await this.productRepo.save(deleted);
    await this.publishEvents(deleted);
  }

  async publish(productId: string): Promise<ProductResponseDTO> {
    const entity = await this.productRepo.findById(ProductIdVO.create(productId));
    if (!entity) {
      throw new ProductOperationFailedError(`product not found: ${productId}`);
    }
    const published = entity.publish();
    await this.productRepo.save(published);
    await this.publishEvents(published);
    return this.toDTO(published);
  }

  async archive(productId: string): Promise<ProductResponseDTO> {
    const entity = await this.productRepo.findById(ProductIdVO.create(productId));
    if (!entity) {
      throw new ProductOperationFailedError(`product not found: ${productId}`);
    }
    const archived = entity.archive();
    await this.productRepo.save(archived);
    await this.publishEvents(archived);
    return this.toDTO(archived);
  }

  async findById(productId: string): Promise<ProductResponseDTO | null> {
    const entity = await this.productRepo.findById(ProductIdVO.create(productId));
    return entity ? this.toDTO(entity) : null;
  }

  async findBySlug(slug: string): Promise<ProductResponseDTO | null> {
    const entity = await this.productRepo.findBySlug(ProductSlugVO.create(slug));
    return entity ? this.toDTO(entity) : null;
  }

  async list(page: number, limit: number): Promise<readonly ProductResponseDTO[]> {
    void page;
    void limit;
    const rows = await this.productRepo.findAll();
    return rows.map((r) => this.toDTO(r));
  }

  async search(term: string, limit: number): Promise<readonly ProductResponseDTO[]> {
    void term;
    void limit;
    const rows = await this.productRepo.findAll();
    return rows.map((r) => this.toDTO(r));
  }

  private toDTO(entity: ProductEntity): ProductResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      slug: entity.slug.value,
      sku: entity.sku.value,
      status: entity.status.value,
      type: entity.type.value,
      vendorId: entity.vendorId.value,
      categoryId: entity.categoryId?.value ?? null,
      brandId: entity.brandId?.value ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    } as unknown as ProductResponseDTO;
  }

  private async publishEvents(entity: ProductEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
