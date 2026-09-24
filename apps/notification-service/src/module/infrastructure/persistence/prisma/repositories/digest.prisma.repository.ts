import { Injectable } from '@nestjs/common';
import { Digest as PrismaDigest } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { DigestEntity } from '../../../../domain/entities/digest.entity';
import { DigestIdVO } from '../../../../domain/value-objects/primitives/digest-id.vo';
import { DigestStatusVO } from '../../../../domain/value-objects/primitives/digest-status.vo';
import { DigestTypeVO } from '../../../../domain/value-objects/primitives/digest-type.vo';
import { DigestPeriodVO } from '../../../../domain/value-objects/primitives/digest-period.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { DigestRepository } from '../../../../domain/repositories/digest.repository.interface';

@Injectable()
export class DigestPrismaRepository
  extends BasePrismaRepository<DigestEntity, DigestIdVO>
  implements DigestRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaDigest): DigestEntity {
    return DigestEntity.reconstitute(
      DigestIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        type: DigestTypeVO.create(raw.type),
        status: DigestStatusVO.create(raw.status),
        period: DigestPeriodVO.create(raw.period),
        scheduledAt: raw.scheduledAt,
        sentAt: raw.sentAt,
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: DigestIdVO): Promise<DigestEntity | null> {
    const raw = await this.prisma.digest.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DigestEntity[]> {
    const rows = await this.prisma.digest.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: DigestEntity): Promise<DigestEntity> {
    const data = {
      userId: entity.userId.value,
      type: entity.type.value,
      status: entity.status.value,
      period: entity.period.value,
      scheduledAt: entity.scheduledAt,
      sentAt: entity.sentAt,
    };
    const raw = await this.prisma.digest.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: DigestIdVO): Promise<void> {
    await this.prisma.digest.delete({ where: { id: id.value } });
  }

  async findActive(): Promise<readonly DigestEntity[]> {
    const rows = await this.prisma.digest.findMany({
      where: { status: { in: ['pending', 'scheduled'] } },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByType(type: DigestTypeVO): Promise<readonly DigestEntity[]> {
    const rows = await this.prisma.digest.findMany({
      where: { type: type.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findDue(now: Date): Promise<readonly DigestEntity[]> {
    const rows = await this.prisma.digest.findMany({
      where: { scheduledAt: { lte: now }, status: 'pending' },
      orderBy: { scheduledAt: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByUser(userId: UserIdVO): Promise<readonly DigestEntity[]> {
    const rows = await this.prisma.digest.findMany({
      where: { userId: userId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
