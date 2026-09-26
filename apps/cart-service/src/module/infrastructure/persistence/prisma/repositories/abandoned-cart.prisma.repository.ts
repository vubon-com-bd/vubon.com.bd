import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AbandonedCartEntity } from '../../../../domain/entities/abandoned-cart.entity';
import { AbandonedCartIdVO } from '../../../../domain/value-objects/primitives/abandoned-cart-id.vo';
import { AbandonedCartStatusVO } from '../../../../domain/value-objects/primitives/abandoned-cart-status.vo';
import { AbandonedCartReminderVO } from '../../../../domain/value-objects/primitives/abandoned-cart-reminder.vo';
import { CartIdVO } from '../../../../domain/value-objects/primitives/cart-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { AbandonedCartRepository } from '../../../../domain/repositories/abandoned-cart.repository.interface';

@Injectable()
export class AbandonedCartPrismaRepository
  extends BasePrismaRepository<AbandonedCartEntity, AbandonedCartIdVO>
  implements AbandonedCartRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: unknown): AbandonedCartEntity {
    const r = raw as Record<string, unknown>;
    return AbandonedCartEntity.reconstitute(
      AbandonedCartIdVO.create(String(r['id'])),
      {
        cartId: CartIdVO.create(String(r['cartId'])),
        userId: r['userId'] ? UserIdVO.create(String(r['userId'])) : null,
        itemCount: Number(r['itemCount'] ?? 0),
        subtotalAmount: Number(r['subtotalAmount'] ?? 0),
        currency: String(r['currency'] ?? 'BDT'),
        status: AbandonedCartStatusVO.create(String(r['status'] ?? 'abandoned')),
        reminder: AbandonedCartReminderVO.create(Number(r['reminderCount'] ?? 0)),
        abandonedAt: new Date(String(r['abandonedAt'])),
        recoveredAt: r['recoveredAt'] ? new Date(String(r['recoveredAt'])) : null,
      },
      new Date(String(r['createdAt'])).toISOString(),
      new Date(String(r['updatedAt'])).toISOString(),
      null,
    );
  }

  async findById(id: AbandonedCartIdVO): Promise<AbandonedCartEntity | null> {
    const raw = await this.prisma.abandonedCart.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AbandonedCartEntity[]> {
    const rows = await this.prisma.abandonedCart.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AbandonedCartEntity): Promise<AbandonedCartEntity> {
    const data = {
      cartId: entity.cartId.value,
      userId: entity.userId?.value ?? null,
      itemCount: entity.itemCount,
      subtotalAmount: entity.subtotalAmount,
      currency: entity.currency,
      status: entity.status.value,
      reminderCount: entity.reminder.count,
      abandonedAt: entity.abandonedAt,
      recoveredAt: entity.recoveredAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.abandonedCart.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AbandonedCartIdVO): Promise<void> {
    await this.prisma.abandonedCart.delete({ where: { id: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<readonly AbandonedCartEntity[]> {
    const rows = await this.prisma.abandonedCart.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findPendingReminders(before: Date): Promise<readonly AbandonedCartEntity[]> {
    const rows = await this.prisma.abandonedCart.findMany({
      where: {
        status: 'abandoned',
        recoveredAt: null,
        abandonedAt: { lte: before },
      },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
