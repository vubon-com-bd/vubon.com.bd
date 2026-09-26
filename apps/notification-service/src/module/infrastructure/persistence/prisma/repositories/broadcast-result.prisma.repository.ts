import { Injectable } from '@nestjs/common';
import { BroadcastResult as PrismaResult } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { BroadcastResultEntity } from '../../../../domain/entities/broadcast-result.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { DeliveryStatusVO } from '../../../../domain/value-objects/primitives/delivery-status.vo';
import { DeliveryErrorVO } from '../../../../domain/value-objects/primitives/delivery-error.vo';
import type { BroadcastResultRepository } from '../../../../domain/repositories/broadcast-result.repository.interface';

@Injectable()
export class BroadcastResultPrismaRepository
  extends BasePrismaRepository<BroadcastResultEntity, string>
  implements BroadcastResultRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaResult): BroadcastResultEntity {
    return BroadcastResultEntity.reconstitute(
      raw.id,
      {
        broadcastId: raw.broadcastId,
        userId: UserIdVO.create(raw.userId),
        status: DeliveryStatusVO.create(raw.status),
        deliveredAt: raw.deliveredAt,
        error: raw.error ? DeliveryErrorVO.create(raw.error) : null,
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<BroadcastResultEntity | null> {
    const raw = await this.prisma.broadcastResult.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly BroadcastResultEntity[]> {
    const rows = await this.prisma.broadcastResult.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: BroadcastResultEntity): Promise<BroadcastResultEntity> {
    const data = {
      broadcastId: entity.broadcastId,
      userId: entity.userId.value,
      status: entity.status.value,
      deliveredAt: entity.deliveredAt,
      error: entity.error?.value ?? null,
    };
    const raw = await this.prisma.broadcastResult.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.broadcastResult.delete({ where: { id } });
  }

  async findByBroadcastId(broadcastId: string): Promise<readonly BroadcastResultEntity[]> {
    const rows = await this.prisma.broadcastResult.findMany({
      where: { broadcastId },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async countByStatus(broadcastId: string, status: string): Promise<number> {
    return this.prisma.broadcastResult.count({
      where: { broadcastId, status },
    });
  }
}
