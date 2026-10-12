/**
 * Analytics Base Prisma Repository
 * @module analytics-service/infrastructure/persistence/prisma
 */
import { AnalyticsPrismaService } from './prisma.service.js';

export interface PrismaDelegate<TModel> {
  findUnique(args: unknown): Promise<TModel | null>;
  findFirst(args?: unknown): Promise<TModel | null>;
  findMany(args?: unknown): Promise<TModel[]>;
  create(args: unknown): Promise<TModel>;
  createMany(args: unknown): Promise<{ count: number }>;
  update(args: unknown): Promise<TModel>;
  updateMany(args: unknown): Promise<{ count: number }>;
  upsert(args: unknown): Promise<TModel>;
  delete(args: unknown): Promise<TModel>;
  deleteMany(args?: unknown): Promise<{ count: number }>;
  count(args?: unknown): Promise<number>;
  groupBy(args: unknown): Promise<Array<Record<string, unknown>>>;
}

export abstract class AnalyticsBasePrismaRepository<TDomain, TModel, TId> {
  protected abstract readonly delegateName: string;

  protected abstract toDomain(raw: TModel): TDomain;
  protected abstract toPersistence(domain: TDomain): Record<string, unknown>;
  protected abstract idOf(domain: TDomain): TId;
  protected abstract whereForId(id: TId): Record<string, unknown>;

  protected constructor(protected readonly prisma: AnalyticsPrismaService) {}

  protected get model(): PrismaDelegate<TModel> {
    return this.prisma.getModel<PrismaDelegate<TModel>>(this.delegateName);
  }

  async findById(id: TId): Promise<TDomain | null> {
    return this.prisma.withEngine(async () => {
      const raw = await this.model.findUnique({ where: this.whereForId(id) });
      return raw ? this.toDomain(raw) : null;
    });
  }

  async findAll(): Promise<readonly TDomain[]> {
    return this.prisma.withEngine(async () => {
      const rows = await this.model.findMany();
      return rows.map((r) => this.toDomain(r));
    });
  }

  async save(domain: TDomain): Promise<TDomain> {
    return this.prisma.withEngine(async () => {
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
    });
  }

  async delete(id: TId): Promise<void> {
    return this.prisma.withEngine(async () => {
      await this.model.delete({ where: this.whereForId(id) });
    });
  }

  async exists(id: TId): Promise<boolean> {
    return this.prisma.withEngine(async () => {
      const count = await this.model.count({ where: this.whereForId(id) });
      return count > 0;
    });
  }
}
