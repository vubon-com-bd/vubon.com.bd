/**
 * OrderHistoryPrismaRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { OrderHistoryRepository } from '../../../../domain/repositories/order-history.repository.interface.js';
import { OrderHistoryEntity } from '../../../../domain/entities/order-history.entity.js';
import { HistoryTypeVO } from '../../../../domain/value-objects/primitives/history-type.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';

interface Row {
  id: string; orderId: string; type: string;
  fromValue: string | null; toValue: string | null;
  actorId: string | null; actorType: string | null; metadata: unknown;
  createdAt: Date;
}
interface Delegate {
  findUnique(a: unknown): Promise<Row | null>;
  findMany(a?: unknown): Promise<Row[]>;
  create(a: unknown): Promise<Row>;
  update(a: unknown): Promise<Row>;
  deleteMany(a: unknown): Promise<{ count: number }>;
  count(a?: unknown): Promise<number>;
}

@Injectable()
export class OrderHistoryPrismaRepository implements OrderHistoryRepository {
  private readonly logger = new Logger(OrderHistoryPrismaRepository.name);
  constructor(private readonly prisma: PrismaService) {}
  private get d(): Delegate { return (this.prisma as unknown as { orderHistory: Delegate }).orderHistory; }

  async findById(id: string): Promise<OrderHistoryEntity | null> {
    try { const r = await this.d.findUnique({ where: { id } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findByIdVO(id: { value: string }): Promise<OrderHistoryEntity | null> { return this.findById(id.value); }
  async findByOrderId(orderId: OrderIdVO): Promise<readonly OrderHistoryEntity[]> {
    try { const rows = await this.d.findMany({ where: { orderId: orderId.value }, orderBy: { createdAt: 'desc' } } as unknown); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findByType(orderId: OrderIdVO, type: HistoryTypeVO): Promise<readonly OrderHistoryEntity[]> {
    try { const rows = await this.d.findMany({ where: { orderId: orderId.value, type: type.value } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findRecentByOrder(orderId: OrderIdVO, limit: number): Promise<readonly OrderHistoryEntity[]> {
    try {
      const rows = await this.d.findMany({ where: { orderId: orderId.value }, take: limit, orderBy: { createdAt: 'desc' } } as unknown);
      return rows.map((r) => this.toDomain(r));
    } catch { return []; }
  }
  async countByOrder(orderId: OrderIdVO): Promise<number> {
    try { return await this.d.count({ where: { orderId: orderId.value } }); } catch { return 0; }
  }
  async deleteByOrder(orderId: OrderIdVO): Promise<void> {
    try { await this.d.deleteMany({ where: { orderId: orderId.value } }); }
    catch (err) { this.logger.warn(`deleteByOrder failed: ${String(err)}`); }
  }
  async findAll(): Promise<readonly OrderHistoryEntity[]> {
    try { const rows = await this.d.findMany(); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async exists(id: string): Promise<boolean> {
    try { return (await this.d.count({ where: { id } })) > 0; } catch { return false; }
  }
  async save(entity: OrderHistoryEntity): Promise<OrderHistoryEntity> {
    const data = this.toPersistence(entity);
    try {
      const existing = await this.d.findUnique({ where: { id: entity.id } });
      const raw = existing ? await this.d.update({ where: { id: entity.id }, data }) : await this.d.create({ data });
      return this.toDomain(raw);
    } catch (err) { this.logger.error(`save failed: ${String(err)}`); throw err; }
  }
  async delete(id: string): Promise<void> {
    try { await this.d.deleteMany({ where: { id } }); }
    catch (err) { this.logger.warn(`delete failed: ${String(err)}`); }
  }

  private toDomain(raw: Row): OrderHistoryEntity {
    return OrderHistoryEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.createdAt.toISOString(),
      props: {
        orderId: OrderIdVO.reconstitute(raw.orderId),
        type: HistoryTypeVO.reconstitute(raw.type),
        fromValue: raw.fromValue ?? undefined,
        toValue: raw.toValue ?? undefined,
        actorId: raw.actorId ?? undefined,
        actorType: raw.actorType ?? undefined,
        metadata: (raw.metadata as Readonly<Record<string, unknown>> | null) ?? undefined,
      },
    });
  }
  private toPersistence(entity: OrderHistoryEntity): Record<string, unknown> {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      type: entity.type.value,
      fromValue: entity.fromValue ?? null,
      toValue: entity.toValue ?? null,
      actorId: entity.actorId ?? null,
      actorType: entity.actorType ?? null,
      metadata: entity.metadata ?? null,
    };
  }
}
