/**
 * ShippingAddressPrismaRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { ShippingAddressRepository } from '../../../../domain/repositories/shipping-address.repository.interface.js';
import { ShippingAddressEntity } from '../../../../domain/entities/shipping-address.entity.js';
import { ShippingAddressLineVO } from '../../../../domain/value-objects/primitives/shipping-address-line.vo.js';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo.js';

interface Row {
  id: string; orderId: string; customerId: string;
  fullName: string; phone: string; line1: string; line2: string | null;
  city: string; state: string | null; postalCode: string | null;
  country: string; label: string | null;
  createdAt: Date;
}
interface Delegate {
  findUnique(a: unknown): Promise<Row | null>;
  findFirst(a: unknown): Promise<Row | null>;
  findMany(a?: unknown): Promise<Row[]>;
  create(a: unknown): Promise<Row>;
  update(a: unknown): Promise<Row>;
  deleteMany(a: unknown): Promise<{ count: number }>;
  count(a?: unknown): Promise<number>;
}

@Injectable()
export class ShippingAddressPrismaRepository implements ShippingAddressRepository {
  private readonly logger = new Logger(ShippingAddressPrismaRepository.name);
  constructor(private readonly prisma: PrismaService) {}
  private get d(): Delegate { return (this.prisma as unknown as { shippingAddress: Delegate }).shippingAddress; }

  async findById(id: string): Promise<ShippingAddressEntity | null> {
    try { const r = await this.d.findUnique({ where: { id } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findByIdVO(id: { value: string }): Promise<ShippingAddressEntity | null> { return this.findById(id.value); }
  async findByOrderId(orderId: string): Promise<ShippingAddressEntity | null> {
    try { const r = await this.d.findFirst({ where: { orderId } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findByCustomerId(customerId: CustomerIdVO): Promise<readonly ShippingAddressEntity[]> {
    try { const rows = await this.d.findMany({ where: { customerId: customerId.value } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findAll(): Promise<readonly ShippingAddressEntity[]> {
    try { const rows = await this.d.findMany(); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async exists(id: string): Promise<boolean> {
    try { return (await this.d.count({ where: { id } })) > 0; } catch { return false; }
  }
  async save(entity: ShippingAddressEntity): Promise<ShippingAddressEntity> {
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
  async deleteByOrderId(orderId: string): Promise<void> {
    try { await this.d.deleteMany({ where: { orderId } }); }
    catch (err) { this.logger.warn(`deleteByOrderId failed: ${String(err)}`); }
  }

  private toDomain(raw: Row): ShippingAddressEntity {
    return ShippingAddressEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.createdAt.toISOString(),
      props: {
        orderId: raw.orderId,
        customerId: CustomerIdVO.reconstitute(raw.customerId),
        line: ShippingAddressLineVO.reconstitute({
          fullName: raw.fullName,
          phone: raw.phone,
          line1: raw.line1,
          line2: raw.line2 ?? undefined,
          city: raw.city,
          state: raw.state ?? undefined,
          postalCode: raw.postalCode ?? undefined,
          country: raw.country,
        }),
        label: raw.label ?? undefined,
      },
    });
  }
  private toPersistence(entity: ShippingAddressEntity): Record<string, unknown> {
    return {
      id: entity.id,
      orderId: entity.orderId,
      customerId: entity.customerId.value,
      fullName: entity.line.value.fullName,
      phone: entity.line.value.phone,
      line1: entity.line.value.line1,
      line2: entity.line.value.line2 ?? null,
      city: entity.line.value.city,
      state: entity.line.value.state ?? null,
      postalCode: entity.line.value.postalCode ?? null,
      country: entity.line.value.country,
      label: entity.label ?? null,
    };
  }
}
