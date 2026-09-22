import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { CartEntity } from '../../../../domain/entities/cart.entity';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { CartStatusVO } from '../../../../domain/value-objects/primitives/cart-status.vo';
import { CartTypeVO } from '../../../../domain/value-objects/primitives/cart-type.vo';
import type { CartRepository } from '../../../../domain/repositories/cart.repository.interface';

@Injectable()
export class CartPrismaRepository
  extends BasePrismaRepository<CartEntity, CartIdVO>
  implements CartRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: unknown): CartEntity {
    const r = raw as Record<string, unknown>;
    return CartEntity.reconstitute(
      CartIdVO.create(String(r['id'])),
      {
        userId: r['userId'] ? UserIdVO.create(String(r['userId'])) : null,
        type: CartTypeVO.create(String(r['type'])),
        status: CartStatusVO.create(String(r['status'])),
        itemCount: Number(r['itemCount'] ?? 0),
        subtotal: Number(r['subtotal'] ?? 0),
        discountTotal: Number(r['discountTotal'] ?? 0),
        taxTotal: Number(r['taxTotal'] ?? 0),
        shippingTotal: Number(r['shippingTotal'] ?? 0),
        grandTotal: Number(r['grandTotal'] ?? 0),
        currency: String(r['currency']),
      },
      new Date(String(r['createdAt'])).toISOString(),
      new Date(String(r['updatedAt'])).toISOString(),
      r['deletedAt'] ? new Date(String(r['deletedAt'])).toISOString() : null,
    );
  }

  async findById(id: CartIdVO): Promise<CartEntity | null> {
    const raw = await this.prisma.cart.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CartEntity[]> {
    const rows = await this.prisma.cart.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: CartEntity): Promise<CartEntity> {
    const data = {
      userId: entity.userId?.value ?? null,
      type: entity.type.value,
      status: entity.status.value,
      itemCount: entity.itemCount,
      subtotal: entity.subtotal,
      discountTotal: entity.discountTotal,
      taxTotal: entity.taxTotal,
      shippingTotal: entity.shippingTotal,
      grandTotal: entity.grandTotal,
      currency: entity.currency,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.cart.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: CartIdVO): Promise<void> {
    await this.prisma.cart.delete({ where: { id: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<CartEntity | null> {
    const raw = await this.prisma.cart.findFirst({
      where: { userId: userId.value, deletedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findActiveByUser(userId: UserIdVO): Promise<CartEntity | null> {
    const raw = await this.prisma.cart.findFirst({
      where: { userId: userId.value, status: 'active', deletedAt: null },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
