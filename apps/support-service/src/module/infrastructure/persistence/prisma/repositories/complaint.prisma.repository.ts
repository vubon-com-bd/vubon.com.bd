import { Injectable } from '@nestjs/common';
import { Complaint as PrismaComplaint } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { ComplaintEntity } from '../../../../domain/entities/complaint.entity';
import { ComplaintIdVO } from '../../../../domain/value-objects/primitives/complaint-id.vo';
import { ComplaintTypeVO } from '../../../../domain/value-objects/primitives/complaint-type.vo';
import { ComplaintStatusVO } from '../../../../domain/value-objects/primitives/complaint-status.vo';
import { ComplaintSeverityVO } from '../../../../domain/value-objects/primitives/complaint-severity.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import type { ComplaintRepository } from '../../../../domain/repositories/complaint.repository.interface';

@Injectable()
export class ComplaintPrismaRepository
  extends BasePrismaRepository<ComplaintEntity, ComplaintIdVO>
  implements ComplaintRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaComplaint): ComplaintEntity {
    return ComplaintEntity.reconstitute(
      ComplaintIdVO.create(raw.id),
      {
        userId: UserIdVO.create(raw.userId),
        type: ComplaintTypeVO.create(raw.type),
        severity: ComplaintSeverityVO.create(raw.severity),
        status: ComplaintStatusVO.create(raw.status),
        content: raw.content,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: ComplaintIdVO): Promise<ComplaintEntity | null> {
    const raw = await this.prisma.complaint.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ComplaintEntity[]> {
    const rows = await this.prisma.complaint.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: ComplaintEntity): Promise<ComplaintEntity> {
    const data = {
      userId: entity.userId.value,
      type: entity.type.value,
      severity: entity.severity.value,
      status: entity.status.value,
      content: entity.content,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.complaint.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ComplaintIdVO): Promise<void> {
    await this.prisma.complaint.delete({ where: { id: id.value } });
  }

  async findByUser(userId: UserIdVO): Promise<readonly ComplaintEntity[]> {
    const rows = await this.prisma.complaint.findMany({ where: { userId: userId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findBySeverity(severity: ComplaintSeverityVO): Promise<readonly ComplaintEntity[]> {
    const rows = await this.prisma.complaint.findMany({
      where: { severity: severity.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
