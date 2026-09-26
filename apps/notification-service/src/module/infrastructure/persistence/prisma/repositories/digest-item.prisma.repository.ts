import { Injectable } from '@nestjs/common';
import { DigestItem as PrismaItem } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { DigestItemEntity } from '../../../../domain/entities/digest-item.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { DigestItemRepository } from '../../../../domain/repositories/digest-item.repository.interface';

@Injectable()
export class DigestItemPrismaRepository
  extends BasePrismaRepository<DigestItemEntity, string>
  implements DigestItemRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaItem): DigestItemEntity {
    return DigestItemEntity.reconstitute(
      raw.id,
      {
        digestId: raw.digestId,
        userId: UserIdVO.create(raw.userId),
        title: raw.title,
        body: raw.body,
        actionUrl: null,
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<DigestItemEntity | null> {
    const raw = await this.prisma.digestItem.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DigestItemEntity[]> {
    const rows = await this.prisma.digestItem.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: DigestItemEntity): Promise<DigestItemEntity> {
    const data = {
      digestId: entity.digestId,
      userId: entity.userId.value,
      title: entity.title,
      body: entity.body,
    };
    const raw = await this.prisma.digestItem.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.digestItem.delete({ where: { id } });
  }

  async findByDigestId(digestId: string): Promise<readonly DigestItemEntity[]> {
    const rows = await this.prisma.digestItem.findMany({
      where: { digestId },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findUndigested(userId: UserIdVO): Promise<readonly DigestItemEntity[]> {
    const rows = await this.prisma.digestItem.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
