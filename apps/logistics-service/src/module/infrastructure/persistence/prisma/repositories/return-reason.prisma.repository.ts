import { Injectable } from '@nestjs/common';
import { ReturnReason as PrismaReturnReason } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ReturnReasonEntity } from '../../../../domain/entities/return-reason.entity';
import { ReturnReasonTypeVO } from '../../../../domain/value-objects/primitives/return-reason-type.vo';
import type { ReturnReasonRepository } from '../../../../domain/repositories/return-reason.repository.interface';

@Injectable()
export class ReturnReasonPrismaRepository
  extends BasePrismaRepository<ReturnReasonEntity, string>
  implements ReturnReasonRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaReturnReason): ReturnReasonEntity {
    return ReturnReasonEntity.reconstitute(
      raw.id,
      {
        code: raw.code,
        label: raw.label,
        type: ReturnReasonTypeVO.create(raw.type),
        status: raw.status,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<ReturnReasonEntity | null> {
    const raw = await this.prisma.returnReason.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ReturnReasonEntity[]> {
    const rows = await this.prisma.returnReason.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ReturnReasonEntity): Promise<ReturnReasonEntity> {
    const data = {
      code: entity.code,
      label: entity.label,
      type: entity.type.value,
      status: entity.status,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.returnReason.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.returnReason.delete({ where: { id } });
  }

  async findByType(type: string): Promise<readonly ReturnReasonEntity[]> {
    const rows = await this.prisma.returnReason.findMany({ where: { type } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByCode(code: string): Promise<ReturnReasonEntity | null> {
    const raw = await this.prisma.returnReason.findUnique({ where: { code } });
    return raw ? this.toDomain(raw) : null;
  }
}
