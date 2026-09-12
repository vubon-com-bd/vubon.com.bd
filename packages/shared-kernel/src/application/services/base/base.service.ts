import {
  IRepository,
  IRepositoryWithSoftDelete,
  IRepositoryWithSearch,
} from '../../../domain/base/base.repository.interface';
import { Entity } from '../../../domain/base/base.entity';
import { PaginationDTO, PaginatedResponseDTO } from '../../dtos/common';
import { NotFoundError } from '../../errors/base.errors';
import {
  IBaseService,
  IBaseServiceWithSoftDelete,
  IBaseServiceWithSearch,
} from './base.service.interface';

export abstract class BaseService<
  TEntity extends Entity<unknown>,
  TCreateDTO,
  TUpdateDTO,
> implements IBaseService<TEntity, TCreateDTO, TUpdateDTO> {
  protected abstract repository: IRepository<TEntity>;

  abstract create(dto: TCreateDTO): Promise<TEntity>;
  abstract update(id: string, dto: TUpdateDTO): Promise<TEntity>;

  async delete(id: string): Promise<void> {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new NotFoundError('Entity');
    }
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<TEntity | null> {
    return this.repository.findById(id);
  }

  async findAll(pagination: PaginationDTO): Promise<PaginatedResponseDTO<TEntity>> {
    pagination.validate();
    const items = await this.repository.findAll();
    const total = await this.repository.count();

    const start = pagination.skip;
    const end = Math.min(start + pagination.take, items.length);
    const paginatedItems = items.slice(start, end);

    return PaginatedResponseDTO.fromItems(paginatedItems, total, pagination);
  }

  async exists(id: string): Promise<boolean> {
    return this.repository.exists(id);
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  protected async findByIdOrThrow(id: string): Promise<TEntity> {
    const entity = await this.repository.findById(id);
    if (!entity) {
      throw new NotFoundError('Entity');
    }
    return entity;
  }
}

export abstract class BaseServiceWithSoftDelete<
  TEntity extends Entity<unknown>,
  TCreateDTO,
  TUpdateDTO,
>
  extends BaseService<TEntity, TCreateDTO, TUpdateDTO>
  implements IBaseServiceWithSoftDelete<TEntity, TCreateDTO, TUpdateDTO>
{
  protected abstract override repository: IRepositoryWithSoftDelete<TEntity>;

  async softDelete(id: string): Promise<void> {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new NotFoundError('Entity');
    }
    await this.repository.softDelete(id);
  }

  async restore(id: string): Promise<void> {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new NotFoundError('Entity');
    }
    await this.repository.restore(id);
  }

  async findDeleted(): Promise<TEntity[]> {
    return this.repository.findDeleted();
  }

  async permanentlyDelete(id: string): Promise<void> {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new NotFoundError('Entity');
    }
    await this.repository.permanentlyDelete(id);
  }
}

export abstract class BaseServiceWithSearch<TEntity extends Entity<unknown>, TCreateDTO, TUpdateDTO>
  extends BaseService<TEntity, TCreateDTO, TUpdateDTO>
  implements IBaseServiceWithSearch<TEntity, TCreateDTO, TUpdateDTO>
{
  // Override repository with search capability
  protected abstract override repository: IRepositoryWithSearch<TEntity>;

  async search(query: string): Promise<TEntity[]> {
    return this.repository.search(query);
  }

  async searchPaginated(
    query: string,
    pagination: PaginationDTO
  ): Promise<PaginatedResponseDTO<TEntity>> {
    pagination.validate();
    const result = await this.repository.searchPaginated(query, pagination.page, pagination.limit);
    return PaginatedResponseDTO.fromItems(result.items, result.total, pagination);
  }
}
