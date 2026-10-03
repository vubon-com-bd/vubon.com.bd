/**
 * UserRepositoryInMemory — dev/test only
 * @module user-service/infrastructure/persistence/in-memory
 *
 * Purpose: allow running user-service WITHOUT Prisma (e.g. Termux/ARM64)
 * where Prisma engine cannot load. NOT for production.
 *
 * Data is stored in a process-local Map.
 */
import { Injectable } from '@nestjs/common';
import type {
  UserRepository,
  UserPaginationOptions,
} from '@domain/repositories/user.repository.interface';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

@Injectable()
export class UserRepositoryInMemory implements UserRepository {
  private readonly store = new Map<string, UserEntity>();

  async findById(id: string): Promise<UserEntity | null> {
    return this.store.get(id) ?? null;
  }

  async findAll(): Promise<readonly UserEntity[]> {
    return [...this.store.values()];
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    this.store.set(entity.id, entity);
    return entity;
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }

  async exists(id: string): Promise<boolean> {
    return this.store.has(id);
  }

  async findByEmail(email: UserEmailVO): Promise<UserEntity | null> {
    for (const u of this.store.values()) {
      if (u.email.value === email.value) return u;
    }
    return null;
  }

  async existsByEmail(email: UserEmailVO): Promise<boolean> {
    return (await this.findByEmail(email)) !== null;
  }

  async findByStatus(status: UserStatusVO): Promise<readonly UserEntity[]> {
    return [...this.store.values()].filter((u) => u.status.value === status.value);
  }

  async findByType(type: UserTypeVO): Promise<readonly UserEntity[]> {
    return [...this.store.values()].filter((u) => u.type.value === type.value);
  }

  async findPaginated(options: UserPaginationOptions): Promise<{
    readonly items: readonly UserEntity[];
    readonly total: number;
  }> {
    let all = [...this.store.values()];
    if (options.status) all = all.filter((u) => u.status.value === options.status!.value);
    if (options.type) all = all.filter((u) => u.type.value === options.type!.value);
    if (options.search) {
      const s = options.search.toLowerCase();
      all = all.filter(
        (u) => u.email.value.toLowerCase().includes(s) || u.name.value.toLowerCase().includes(s)
      );
    }
    const total = all.length;
    const start = (options.page - 1) * options.limit;
    const items = all.slice(start, start + options.limit);
    return { items, total };
  }

  async countByStatus(status: UserStatusVO): Promise<number> {
    return [...this.store.values()].filter((u) => u.status.value === status.value).length;
  }

  async softDelete(_id: UserIdVO): Promise<void> {
    // no-op for in-memory
  }
}
