/**
 * Repository Interface
 * @module shared-kernel/domain/interfaces
 *
 * References base repository (type only)।
 */
import type { BaseRepository } from '../base/base.repository.interface';
import type { BaseEntity } from '../base/base.entity';
import type { Specification } from '../base/base.specification';

export type RepositoryShape<TEntity extends BaseEntity<TId>, TId = string> = BaseRepository<
  TEntity,
  TId
>;

export interface SpecificationRepository<
  TEntity extends BaseEntity<TId>,
  TId = string,
> extends BaseRepository<TEntity, TId> {
  findBySpecification(spec: Specification<TEntity>): Promise<readonly TEntity[]>;
  countBySpecification(spec: Specification<TEntity>): Promise<number>;
  deleteBySpecification(spec: Specification<TEntity>): Promise<number>;
}
