/**
 * DeliveryMethodPrismaRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { DeliveryMethodRepository } from '../../../../domain/repositories/delivery-method.repository.interface.js';
import { DeliveryMethodEntity } from '../../../../domain/entities/delivery-method.entity.js';
import { DeliveryMethodTypeVO } from '../../../../domain/value-objects/primitives/delivery-method-type.vo.js';

interface Row {
  id: string; name: string; type: string; carrier: string | null;
  baseCost: unknown; currency: string; estimatedDays: number; isActive: boolean;
  createdAt: Date; updatedAt: Date;
}
interface Delegate {
  findUnique(a: unknown): Promise<Row | null>;
  findFirst(a: unknown): Promise<Row | null>;
  findMany(a?: unknown): Promise<Row[]>;
  create(a: unknown): Promise<Row>;
  update(a: unknown): Promise<Row>;
  count(a?: unknown): Promise<number>;
}

@Injectable()
export class DeliveryMethodPrismaRepository implements DeliveryMethodRepository {
  private readonly logger = new Logger(DeliveryMethodPrismaRepository.name);
  constructor(private readonly prisma: PrismaService) {}
  private get d(): Delegate { return (this.prisma as unknown as { deliveryMethod: Delegate }).deliveryMethod; }

  async findById(id: string): Promise<DeliveryMethodEntity | null> {
    try { const r = await this.d.findUnique({ where: { id } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findByIdVO(id: { value: string }): Promise<DeliveryMethodEntity | null> { return this.findById(id.value); }
  async findByName(name: string): Promise<DeliveryMethodEntity | null> {
    try { const r = await this.d.findFirst({ where: { name } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findByType(type: DeliveryMethodTypeVO): Promise<readonly DeliveryMethodEntity[]> {
    try { const rows = await this.d.findMany({ where: { type: type.value } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findActive(): Promise<readonly DeliveryMethodEntity[]> {
    try { const rows = await this.d.findMany({ where: { isActive: true } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findActiveByType(type: DeliveryMethodTypeVO): Promise<readonly DeliveryMethodEntity[]> {
    try { const rows = await this.d.findMany({ where: { type: type.value, isActive: true } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findAll(): Promise<readonly DeliveryMethodEntity[]> {
    try { const rows = await this.d.findMany(); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async exists(id: string): Promise<boolean> {
    try { return (await this.d.count({ where: { id } })) > 0; } catch { return false; }
  }
  async existsByName(name: string): Promise<boolean> {
    try { return (await this.d.count({ where: { name } })) > 0; } catch { return false; }
  }
  async save(entity: DeliveryMethodEntity): Promise<DeliveryMethodEntity> {
    const data = this.toPersistence(entity);
    try {
      const existing = await this.d.findUnique({ where: { id: entity.id } });
      const raw = existing ? await this.d.update({ where: { id: entity.id }, data }) : await this.d.create({ data });
      return this.toDomain(raw);
    } catch (err) { this.logger.error(`save failed: ${String(err)}`); throw err; }
  }
  async delete(id: string): Promise<void> {
    try { await this.d.update({ where: { id }, data: { isActive: false } }); }
    catch (err) { this.logger.warn(`delete failed: ${String(err)}`); }
  }

  private toDomain(raw: Row): DeliveryMethodEntity {
    return DeliveryMethodEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        name: raw.name,
        type: DeliveryMethodTypeVO.reconstitute(raw.type),
        carrier: raw.carrier ?? undefined,
        baseCost: Number(raw.baseCost),
        currency: raw.currency,
        estimatedDays: raw.estimatedDays,
        isActive: raw.isActive,
      },
    });
  }
  private toPersistence(entity: DeliveryMethodEntity): Record<string, unknown> {
    return {
      id: entity.id,
      name: entity.name,
      type: entity.type.value,
      carrier: entity.carrier ?? null,
      baseCost: entity.baseCost,
      currency: entity.currency,
      estimatedDays: entity.estimatedDays,
      isActive: entity.isActive,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
