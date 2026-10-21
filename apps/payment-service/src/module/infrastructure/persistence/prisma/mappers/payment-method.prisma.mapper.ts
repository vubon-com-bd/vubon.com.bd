/**
 * PaymentMethodPrismaMapper
 * @module payment-service/infrastructure/persistence/prisma/mappers
 */
import { PaymentMethodEntity } from '@domain/entities/payment-method.entity';
import { PaymentMethodTypeVO } from '@domain/primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { toIso } from './payment.prisma.mapper.js';

export interface PrismaPaymentMethodRow {
  id: string;
  method: string;
  methodType: string;
  provider: string | null;
  providerEnv: string | null;
  label: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class PaymentMethodPrismaMapper {
  static toDomain(raw: PrismaPaymentMethodRow): PaymentMethodEntity {
    return PaymentMethodEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: toIso(raw.deletedAt) ?? null,
      props: {
        type: PaymentMethodTypeVO.reconstitute(raw.method as never, raw.methodType as never),
        provider:
          raw.provider && raw.providerEnv
            ? PaymentMethodProviderVO.reconstitute(
                raw.provider as never,
                raw.providerEnv as never,
              )
            : undefined,
        label: raw.label,
        isActive: raw.isActive,
      },
    });
  }

  static toPersistence(entity: PaymentMethodEntity): Record<string, unknown> {
    return {
      id: entity.id,
      method: entity.type.method,
      methodType: entity.type.type,
      provider: entity.provider?.provider ?? null,
      providerEnv: entity.provider?.env ?? null,
      label: entity.label,
      isActive: entity.isActive,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
