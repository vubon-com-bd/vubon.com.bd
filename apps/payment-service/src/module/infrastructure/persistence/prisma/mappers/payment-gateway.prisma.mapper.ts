/**
 * PaymentGatewayPrismaMapper
 * @module payment-service/infrastructure/persistence/prisma/mappers
 */
import { PaymentGatewayEntity } from '@domain/entities/payment-gateway.entity';
import { PaymentMethodProviderVO } from '@domain/primitives/payment-method-provider.vo';
import { toIso } from './payment.prisma.mapper.js';

export interface PrismaPaymentGatewayRow {
  id: string;
  provider: string;
  providerEnv: string;
  displayName: string;
  isActive: boolean;
  isMaintenance: boolean;
  supportedCurrencies: string[];
  minAmount: unknown;
  maxAmount: unknown;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toNum = (v: unknown): number => Number(v);

export class PaymentGatewayPrismaMapper {
  static toDomain(raw: PrismaPaymentGatewayRow): PaymentGatewayEntity {
    return PaymentGatewayEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: toIso(raw.deletedAt) ?? null,
      props: {
        provider: PaymentMethodProviderVO.reconstitute(
          raw.provider as never,
          raw.providerEnv as never,
        ),
        displayName: raw.displayName,
        isActive: raw.isActive,
        isMaintenance: raw.isMaintenance,
        supportedCurrencies: raw.supportedCurrencies,
        minAmount: toNum(raw.minAmount),
        maxAmount: toNum(raw.maxAmount),
      },
    });
  }

  static toPersistence(entity: PaymentGatewayEntity): Record<string, unknown> {
    return {
      id: entity.id,
      provider: entity.provider.provider,
      providerEnv: entity.provider.env,
      displayName: entity.displayName,
      isActive: entity.isActive,
      isMaintenance: entity.isMaintenance,
      supportedCurrencies: entity.supportedCurrencies,
      minAmount: entity.minAmount,
      maxAmount: entity.maxAmount,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}
