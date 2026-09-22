import { Injectable } from '@nestjs/common';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { SavedForLaterEntity } from '../../../../domain/entities/saved-for-later.entity';
import { SavedItemIdVO } from '../../../../domain/value-objects/primitives/saved-item-id.vo';
import { SavedItemStatusVO } from '../../../../domain/value-objects/primitives/saved-item-status.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo';
import type { SavedForLaterRepository } from '../../../../domain/repositories/saved-for-later.repository.interface';

@Injectable()
export class SavedForLaterPrismaRepository
  extends BasePrismaRepository<SavedForLaterEntity, SavedItemIdVO>
  implements SavedForLaterRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: unknown): SavedForLaterEntity {
    const r = raw as Record<string, unknown>;
    return SavedForLaterEntity.reconstitute(
      SavedItemIdVO.create(String(r['id'])),
      {
        userId: UserIdVO.create(String(r['userId'])),
        productId: ProductIdVO.create(String(r['productId'])),
        variantId: r['variantId'] ? VariantIdVO.create(String(r['variantId'])) : null,
        quantity: Number(r['quantity'] ?? 1),
        unitPrice: 0,
        currency: 'BDT',
        status: SavedItemStatusVO.create(String(r['status'] ?? 'saved')),
      },
      new Date(String(r['createdAt'])).toISOString(),
      new Date(String(r['updatedAt'])).toISOString(),
      r['deletedAt'] ? new Date(String(r['deletedAt'])).toISOString() : null,
    );
  }

  async findById(id: SavedItemIdVO): Promise<SavedForLaterEntity | null> {
    const raw = await this.prisma.savedItem.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SavedForLaterEntity[]> {
    const rows = await this.prisma.savedItem.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: SavedForLaterEntity): Promise<SavedForLaterEntity> {
    const data = {
      userId: entity.userId.value,
      productId: entity.productId.value,
      variantId: entity.variantId?.value ?? null,
      quantity: entity.quantity,
      status: entity.status.value,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.savedItem.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, cartId: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: SavedItemIdVO): Promise<void> {
    await this.prisma.savedItem.delete({ where: { id: id.value } });
  }

  async findByUserId(userId: UserIdVO): Promise<readonly SavedForLaterEntity[]> {
    const rows = await this.prisma.savedItem.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findActiveByUser(userId: UserIdVO): Promise<readonly SavedForLaterEntity[]> {
    const rows = await this.prisma.savedItem.findMany({
      where: { userId: userId.value, status: 'saved' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
