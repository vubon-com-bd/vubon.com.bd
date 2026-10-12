/**
 * InMemoryRepository — Base generic in-memory repository
 * @module shared-kernel/infrastructure/persistence/memory
 *
 * Note: Uses structural typing (any shape with `id` property) instead of
 * strict BaseEntity constraint. This allows entities that extend
 * AggregateRoot/BaseEntity in the domain layer to work seamlessly.
 */
export abstract class InMemoryRepository<TDomain extends { id: string }, TId = string> {
  protected readonly store = new Map<string, TDomain>();
  protected readonly softDeleted = new Set<string>();

  protected abstract idOf(domain: TDomain): TId;

  async findById(id: TId): Promise<TDomain | null> {
    if (this.softDeleted.has(String(id))) return null;
    return this.store.get(String(id)) ?? null;
  }

  async findAll(): Promise<readonly TDomain[]> {
    return Array.from(this.store.values()).filter(
      (e) => !this.softDeleted.has(String(this.idOf(e))),
    );
  }

  async save(entity: TDomain): Promise<TDomain> {
    const id = String(this.idOf(entity));
    this.store.set(id, entity);
    this.softDeleted.delete(id);
    return entity;
  }

  async delete(id: TId): Promise<void> {
    this.store.delete(String(id));
    this.softDeleted.delete(String(id));
  }

  async exists(id: TId): Promise<boolean> {
    return this.store.has(String(id)) && !this.softDeleted.has(String(id));
  }

  protected async softDeleteById(id: TId): Promise<void> {
    this.softDeleted.add(String(id));
  }

  protected async restoreById(id: TId): Promise<void> {
    this.softDeleted.delete(String(id));
  }

  protected async clearAll(): Promise<void> {
    this.store.clear();
    this.softDeleted.clear();
  }
}
