/**
 * CheckoutSessionPrismaRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { CheckoutSessionRepository } from '../../../../domain/repositories/checkout-session.repository.interface.js';
import { CheckoutSessionEntity } from '../../../../domain/entities/checkout-session.entity.js';
import { CheckoutIdVO } from '../../../../domain/value-objects/primitives/checkout-id.vo.js';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo.js';

interface Row {
  id: string; checkoutId: string; customerId: string; token: string;
  stepData: unknown; ipAddress: string | null; userAgent: string | null;
  expiresAt: Date; createdAt: Date; updatedAt: Date;
}
interface Delegate {
  findUnique(a: unknown): Promise<Row | null>;
  findFirst(a: unknown): Promise<Row | null>;
  findMany(a?: unknown): Promise<Row[]>;
  create(a: unknown): Promise<Row>;
  update(a: unknown): Promise<Row>;
  delete(a: unknown): Promise<Row>;
  deleteMany(a: unknown): Promise<{ count: number }>;
  count(a?: unknown): Promise<number>;
}

@Injectable()
export class CheckoutSessionPrismaRepository implements CheckoutSessionRepository {
  private readonly logger = new Logger(CheckoutSessionPrismaRepository.name);
  constructor(private readonly prisma: PrismaService) {}
  private get d(): Delegate {
    return (this.prisma as unknown as { checkoutSession: Delegate }).checkoutSession;
  }

  async findById(id: string): Promise<CheckoutSessionEntity | null> {
    try { const r = await this.d.findUnique({ where: { id } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }

  async findByCheckoutId(checkoutId: CheckoutIdVO): Promise<CheckoutSessionEntity | null> {
    try {
      const r = await this.d.findFirst({ where: { checkoutId: checkoutId.value } });
      return r ? this.toDomain(r) : null;
    } catch { return null; }
  }

  async findByToken(token: string): Promise<CheckoutSessionEntity | null> {
    try { const r = await this.d.findFirst({ where: { token } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }

  async findByCustomerId(customerId: CustomerIdVO): Promise<readonly CheckoutSessionEntity[]> {
    try {
      const rows = await this.d.findMany({ where: { customerId: customerId.value } });
      return rows.map((r) => this.toDomain(r));
    } catch { return []; }
  }

  async findExpired(before: string): Promise<readonly CheckoutSessionEntity[]> {
    try {
      const rows = await this.d.findMany({ where: { expiresAt: { lt: new Date(before) } } });
      return rows.map((r) => this.toDomain(r));
    } catch { return []; }
  }

  async findAll(): Promise<readonly CheckoutSessionEntity[]> {
    try { const rows = await this.d.findMany(); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }

  async exists(id: string): Promise<boolean> {
    try { return (await this.d.count({ where: { id } })) > 0; } catch { return false; }
  }

  async save(entity: CheckoutSessionEntity): Promise<CheckoutSessionEntity> {
    const data = this.toPersistence(entity);
    try {
      const existing = await this.d.findUnique({ where: { id: entity.id } });
      const raw = existing
        ? await this.d.update({ where: { id: entity.id }, data })
        : await this.d.create({ data });
      return this.toDomain(raw);
    } catch (err) {
      this.logger.error(`save failed: ${err instanceof Error ? err.message : String(err)}`);
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    try { await this.d.delete({ where: { id } }); }
    catch (err) { this.logger.warn(`delete failed: ${String(err)}`); }
  }

  async deleteByCheckoutId(checkoutId: CheckoutIdVO): Promise<void> {
    try { await this.d.deleteMany({ where: { checkoutId: checkoutId.value } }); }
    catch (err) { this.logger.warn(`deleteByCheckoutId failed: ${String(err)}`); }
  }

  private toDomain(raw: Row): CheckoutSessionEntity {
    return CheckoutSessionEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        checkoutId: CheckoutIdVO.reconstitute(raw.checkoutId),
        customerId: CustomerIdVO.reconstitute(raw.customerId),
        token: raw.token,
        ipAddress: raw.ipAddress ?? undefined,
        userAgent: raw.userAgent ?? undefined,
        stepData: (raw.stepData as Readonly<Record<string, unknown>> | null) ?? undefined,
        expiresAt: raw.expiresAt.toISOString(),
      },
    });
  }

  private toPersistence(entity: CheckoutSessionEntity): Record<string, unknown> {
    return {
      id: entity.id,
      checkoutId: entity.checkoutId.value,
      customerId: entity.customerId.value,
      token: entity.token,
      stepData: entity.stepData ?? null,
      ipAddress: entity.ipAddress ?? null,
      userAgent: entity.userAgent ?? null,
      expiresAt: new Date(entity.expiresAt),
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
