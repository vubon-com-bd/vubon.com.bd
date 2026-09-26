import { Injectable } from '@nestjs/common';
import { Verification as PrismaVerification } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VerificationEntity } from '../../../../domain/entities/verification.entity';
import { VerificationIdVO } from '../../../../domain/value-objects/primitives/verification-id.vo';
import { VerificationStatusVO } from '../../../../domain/value-objects/primitives/verification-status.vo';
import { VerificationMethodVO } from '../../../../domain/value-objects/primitives/verification-method.vo';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo';
import type { VerificationRepository } from '../../../../domain/repositories/verification.repository.interface';

@Injectable()
export class VerificationPrismaRepository
  extends BasePrismaRepository<VerificationEntity, VerificationIdVO>
  implements VerificationRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVerification): VerificationEntity {
    return VerificationEntity.reconstitute(
      VerificationIdVO.create(raw.id),
      {
        paymentId: PaymentIdVO.create(raw.paymentId),
        status: VerificationStatusVO.create(raw.status),
        method: VerificationMethodVO.create(raw.method),
        gatewaySignature: raw.gatewaySignature,
        verifiedAt: raw.verifiedAt,
        failureReason: raw.failureReason,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: VerificationIdVO): Promise<VerificationEntity | null> {
    const raw = await this.prisma.verification.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VerificationEntity[]> {
    const rows = await this.prisma.verification.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VerificationEntity): Promise<VerificationEntity> {
    const data = {
      paymentId: entity.paymentId.value,
      status: entity.status.value,
      method: entity.method.value,
      gatewaySignature: entity.gatewaySignature,
      verifiedAt: entity.verifiedAt,
      failureReason: entity.failureReason,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.verification.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: VerificationIdVO): Promise<void> {
    await this.prisma.verification.delete({ where: { id: id.value } });
  }

  async findByPaymentId(paymentId: PaymentIdVO): Promise<VerificationEntity | null> {
    const raw = await this.prisma.verification.findUnique({
      where: { paymentId: paymentId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
