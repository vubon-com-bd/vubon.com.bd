import { Injectable } from '@nestjs/common';
import { Affiliate as PrismaAffiliate } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { AffiliateEntity } from '../../../../domain/entities/affiliate.entity';
import { AffiliateIdVO } from '../../../../domain/value-objects/primitives/affiliate-id.vo';
import { AffiliateCodeVO } from '../../../../domain/value-objects/primitives/affiliate-code.vo';
import { AffiliateStatusVO } from '../../../../domain/value-objects/primitives/affiliate-status.vo';
import { AffiliateCommissionVO } from '../../../../domain/value-objects/primitives/affiliate-commission.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { AffiliateRepository } from '../../../../domain/repositories/affiliate.repository.interface';

@Injectable()
export class AffiliatePrismaRepository
  extends BasePrismaRepository<AffiliateEntity, AffiliateIdVO>
  implements AffiliateRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAffiliate): AffiliateEntity {
    return AffiliateEntity.reconstitute(
      AffiliateIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        code: AffiliateCodeVO.create(raw.code),
        status: AffiliateStatusVO.create(raw.status),
        commission: AffiliateCommissionVO.create(String(raw.commission)),
        approvedAt: raw.approvedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: AffiliateIdVO): Promise<AffiliateEntity | null> {
    const raw = await this.prisma.affiliate.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly AffiliateEntity[]> {
    const rows = await this.prisma.affiliate.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: AffiliateEntity): Promise<AffiliateEntity> {
    const data = {
      userId: entity.userId.value,
      code: entity.code.value,
      status: entity.status.value,
      commission: Number(entity.commission.value),
      approvedAt: entity.approvedAt,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.affiliate.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: AffiliateIdVO): Promise<void> {
    await this.prisma.affiliate.delete({ where: { id: id.value } });
  }

  async findByCode(code: AffiliateCodeVO): Promise<AffiliateEntity | null> {
    const raw = await this.prisma.affiliate.findUnique({ where: { code: code.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByUser(userId: UserIdVO): Promise<AffiliateEntity | null> {
    const raw = await this.prisma.affiliate.findUnique({ where: { userId: userId.value } });
    return raw ? this.toDomain(raw) : null;
  }
}
