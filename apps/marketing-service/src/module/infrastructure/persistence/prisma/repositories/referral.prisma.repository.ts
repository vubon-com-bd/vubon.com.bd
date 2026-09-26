import { Injectable } from '@nestjs/common';
import { Referral as PrismaReferral } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ReferralEntity } from '../../../../domain/entities/referral.entity';
import { ReferralIdVO } from '../../../../domain/value-objects/primitives/referral-id.vo';
import { ReferralCodeVO } from '../../../../domain/value-objects/primitives/referral-code.vo';
import { ReferralStatusVO } from '../../../../domain/value-objects/primitives/referral-status.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { ReferralRepository } from '../../../../domain/repositories/referral.repository.interface';

@Injectable()
export class ReferralPrismaRepository
  extends BasePrismaRepository<ReferralEntity, ReferralIdVO>
  implements ReferralRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaReferral): ReferralEntity {
    return ReferralEntity.reconstitute(
      ReferralIdVO.create(raw.id),
      {
        referrerId: UserIdVO.create(raw.referrerId),
        refereeId: raw.refereeId ? UserIdVO.create(raw.refereeId) : null,
        code: ReferralCodeVO.create(raw.code),
        status: ReferralStatusVO.create(raw.status),
        convertedAt: raw.convertedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: ReferralIdVO): Promise<ReferralEntity | null> {
    const raw = await this.prisma.referral.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ReferralEntity[]> {
    const rows = await this.prisma.referral.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ReferralEntity): Promise<ReferralEntity> {
    const data = {
      referrerId: entity.referrerId.value,
      refereeId: entity.refereeId?.value ?? null,
      code: entity.code.value,
      status: entity.status.value,
      convertedAt: entity.convertedAt,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.referral.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ReferralIdVO): Promise<void> {
    await this.prisma.referral.delete({ where: { id: id.value } });
  }

  async findByCode(code: ReferralCodeVO): Promise<ReferralEntity | null> {
    const raw = await this.prisma.referral.findUnique({ where: { code: code.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByReferrer(referrerId: UserIdVO): Promise<readonly ReferralEntity[]> {
    const rows = await this.prisma.referral.findMany({
      where: { referrerId: referrerId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
