import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { CategoryServiceInterface } from '../interfaces/category.service.interface';
import type { CategoryRepository } from '../../../domain/repositories/category.repository.interface';
import { CategoryEntity } from '../../../domain/entities/category.entity';
import { CategoryIdVO } from '../../../domain/value-objects/primitives/category-id.vo';
import { CategoryNameVO } from '../../../domain/value-objects/primitives/category-name.vo';
import { CategorySlugVO } from '../../../domain/value-objects/primitives/category-slug.vo';
import { CategoryPathVO } from '../../../domain/value-objects/primitives/category-path.vo';
import { CategoryOperationFailedError } from '../../errors/category.errors';
import type { CreateCategoryRequestDTO } from '../../dtos/requests/category/create-category.dto';
import type { CategoryResponseDTO } from '../../dtos/responses/category-response.dto';

@Injectable()
export class CategoryService
  extends BaseService<CategoryEntity, string>
  implements CategoryServiceInterface
{
  readonly name = 'CategoryService';

  constructor(
    private readonly categoryRepo: CategoryRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateCategoryRequestDTO): Promise<CategoryResponseDTO> {
    const slug = CategorySlugVO.create(input.slug);
    const path = CategoryPathVO.create(input.parentId ? `${input.parentId}/${slug.value}` : slug.value);
    const entity = CategoryEntity.create({
      name: CategoryNameVO.create(input.name),
      slug,
      path,
      parentId: input.parentId ? CategoryIdVO.create(input.parentId) : null,
    });
    await this.categoryRepo.save(entity);
    await this.publishEvents(entity);
    return this.toDTO(entity);
  }

  async update(categoryId: string, name?: string, parentId?: string | null): Promise<CategoryResponseDTO> {
    let entity = await this.categoryRepo.findById(CategoryIdVO.create(categoryId));
    if (!entity) throw new CategoryOperationFailedError('category not found');
    if (name) entity = entity.changeName(CategoryNameVO.create(name));
    if (parentId !== undefined) {
      const newParent = parentId ? CategoryIdVO.create(parentId) : null;
      entity = entity.moveTo(newParent, entity.path);
    }
    await this.categoryRepo.save(entity);
    await this.publishEvents(entity);
    return this.toDTO(entity);
  }

  async delete(categoryId: string): Promise<void> {
    await this.categoryRepo.delete(CategoryIdVO.create(categoryId));
  }

  async findById(categoryId: string): Promise<CategoryResponseDTO | null> {
    const entity = await this.categoryRepo.findById(CategoryIdVO.create(categoryId));
    return entity ? this.toDTO(entity) : null;
  }

  async findBySlug(slug: string): Promise<CategoryResponseDTO | null> {
    const entity = await this.categoryRepo.findBySlug(CategorySlugVO.create(slug));
    return entity ? this.toDTO(entity) : null;
  }

  async list(): Promise<readonly CategoryResponseDTO[]> {
    const rows = await this.categoryRepo.findAll();
    return rows.map((r) => this.toDTO(r));
  }

  async getTree(): Promise<readonly CategoryResponseDTO[]> {
    const roots = await this.categoryRepo.findRoots();
    return roots.map((r) => this.toDTO(r));
  }

  private toDTO(entity: CategoryEntity): CategoryResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      slug: entity.slug.value,
      path: entity.path.value,
      parentId: entity.parentId?.value ?? null,
    } as unknown as CategoryResponseDTO;
  }

  private async publishEvents(entity: CategoryEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
