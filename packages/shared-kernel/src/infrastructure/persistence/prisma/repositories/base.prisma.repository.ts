import { IRepository } from '../../../../domain/base/base.repository.interface';
import { Entity } from '../../../../domain/base/base.entity';
import { PrismaService } from '../prisma.service';

export abstract class BasePrismaRepository<
  TEntity extends Entity<unknown>,
> implements IRepository<TEntity> {
  constructor(protected readonly prisma: PrismaService) {}

  abstract save(entity: TEntity): Promise<void>;
  abstract findById(id: string): Promise<TEntity | null>;
  abstract findAll(): Promise<TEntity[]>;
  abstract delete(id: string): Promise<void>;

  async exists(id: string): Promise<boolean> {
    const entity = await this.findById(id);
    return !!entity;
  }

  async count(): Promise<number> {
    const all = await this.findAll();
    return all.length;
  }

  protected toJSON(entity: TEntity): Record<string, unknown> {
    return entity.toJSON();
  }

  protected fromJSON(_data: Record<string, unknown>): TEntity {
    // This should be implemented in child classes
    throw new Error('fromJSON method must be implemented in child class');
  }
}
