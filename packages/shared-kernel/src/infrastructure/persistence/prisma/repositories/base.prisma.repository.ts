/**
 * BasePrismaRepository — Generic CRUD via Prisma
 * @module shared-kernel/infrastructure/persistence/prisma/repositories
 *
 * Subclasses implement toDomain / toPersistence / idOf / whereForId.
 * All other operations are handled generically. Repository logic stays
 * thin — no business logic.
 *
 * NOTE: Uses structural typing rather than Prisma's generated delegates
 * to avoid leaking @prisma/client into the kernel package.
 */
export interface PrismaDelegate<TModel> {
  findUnique(args: unknown): Promise<TModel | null>;
  findMany(args?: unknown): Promise<TModel[]>;
  create(args: unknown): Promise<TModel>;
  update(args: unknown): Promise<TModel>;
  delete(args: unknown): Promise<TModel>;
  count(args?: unknown): Promise<number>;
}

export abstract class BasePrismaRepository<TDomain, TModel, TId> {
  protected abstract readonly model: PrismaDelegate<TModel>;

  /** Map a Prisma row to its domain entity. */
  protected abstract toDomain(raw: TModel): TDomain;

  /** Map a domain entity to Prisma shape. */
  protected abstract toPersistence(domain: TDomain): Record<string, unknown>;

  /** Get the raw Prisma primary key from a domain entity. */
  protected abstract idOf(domain: TDomain): TId;

  /** Get the raw Prisma where-clause for a given id. */
  protected abstract whereForId(id: TId): Record<string, unknown>;

  async findById(id: TId): Promise<TDomain | null> {
    const raw = await this.model.findUnique({
      where: this.whereForId(id),
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TDomain[]> {
    const rows = await this.model.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(domain: TDomain): Promise<TDomain> {
    const data = this.toPersistence(domain);
    const id = this.idOf(domain);
    const where = this.whereForId(id);

    const existing = await this.model.findUnique({ where });

    if (existing) {
      const raw = await this.model.update({ where, data });
      return this.toDomain(raw);
    }

    const raw = await this.model.create({ data });
    return this.toDomain(raw);
  }

  async delete(id: TId): Promise<void> {
    await this.model.delete({ where: this.whereForId(id) });
  }

  async exists(id: TId): Promise<boolean> {
    const count = await this.model.count({ where: this.whereForId(id) });
    return count > 0;
  }
}
