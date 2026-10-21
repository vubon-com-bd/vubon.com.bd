/**
 * VerificationPrismaMapper
 * @module payment-service/infrastructure/persistence/prisma/mappers
 */
import { VerificationEntity } from '@domain/entities/verification.entity';
import { VerificationIdVO } from '@domain/primitives/verification-id.vo';
import { VerificationStatusVO } from '@domain/primitives/verification-status.vo';
import { VerificationMethodVO } from '@domain/primitives/verification-method.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { toIso } from './payment.prisma.mapper.js';

export interface PrismaVerificationRow {
  id: string;
  paymentId: string;
  status: string;
  method: string;
  attempts: number;
  expiresAt: Date;
  verifiedAt: Date | null;
  failureReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class VerificationPrismaMapper {
  static toDomain(raw: PrismaVerificationRow): VerificationEntity {
    return VerificationEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: toIso(raw.deletedAt) ?? null,
      props: {
        paymentId: PaymentIdVO.reconstitute(raw.paymentId),
        status: VerificationStatusVO.create(raw.status),
        method: VerificationMethodVO.reconstitute(raw.method as never),
        attempts: raw.attempts,
        expiresAt: new Date(raw.expiresAt).toISOString(),
        verifiedAt: toIso(raw.verifiedAt),
        failureReason: raw.failureReason ?? undefined,
      },
    });
  }

  static toPersistence(entity: VerificationEntity): Record<string, unknown> {
    return {
      id: entity.id,
      paymentId: entity.paymentId.value,
      status: entity.status.value,
      method: entity.method.value,
      attempts: entity.attempts,
      expiresAt: new Date(entity.expiresAt),
      verifiedAt: entity.verifiedAt ? new Date(entity.verifiedAt) : null,
      failureReason: entity.failureReason ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
