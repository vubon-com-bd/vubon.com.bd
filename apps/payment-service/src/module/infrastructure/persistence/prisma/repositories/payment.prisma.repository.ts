import { Injectable } from '@nestjs/common';
import { Payment as PrismaPayment } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { PaymentEntity } from '../../../../domain/entities/payment.entity';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { PaymentAmountVO } from '../../../../domain/value-objects/primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '../../../../domain/value-objects/primitives/payment-currency.vo';
import { PaymentStatusVO } from '../../../../domain/value-objects/primitives/payment-status.vo';
import { PaymentTypeVO } from '../../../../domain/value-objects/primitives/payment-type.vo';
import { PaymentGatewayVO } from '../../../../domain/value-objects/primitives/payment-gateway.vo';
import { IdempotencyKeyVO } from '../../../../domain/value-objects/primitives/idempotency-key.vo';
import { GatewayReferenceVO } from '../../../../domain/value-objects/primitives/gateway-reference.vo';
import type { PaymentRepository } from '../../../../domain/repositories/payment.repository.interface';

@Injectable()
export class PaymentPrismaRepository
  extends BasePrismaRepository<PaymentEntity, PaymentIdVO>
  implements PaymentRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaPayment): PaymentEntity {
    return PaymentEntity.reconstitute(
      PaymentIdVO.create(raw.id),
      {
        orderId: OrderIdVO.create(raw.orderId),
        userId: UserIdVO.create(raw.userId),
        type: PaymentTypeVO.create(raw.type),
        status: PaymentStatusVO.create(raw.status),
        amount: PaymentAmountVO.create(Number(raw.amount)),
        currency: PaymentCurrencyVO.create(raw.currency),
        gateway: raw.gateway ? PaymentGatewayVO.create(raw.gateway) : null,
        gatewayPaymentId: raw.gatewayPaymentId,
        capturedAt: raw.capturedAt,
        failureReason: raw.failureReason,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: PaymentIdVO): Promise<PaymentEntity | null> {
    const raw = await this.prisma.payment.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PaymentEntity[]> {
    const rows = await this.prisma.payment.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PaymentEntity): Promise<PaymentEntity> {
    const data = {
      orderId: entity.orderId.value,
      userId: entity.userId.value,
      type: entity.type.value,
      status: entity.status.value,
      method: entity.type.value,
      gateway: entity.gateway?.value ?? null,
      amount: entity.amount.amount,
      currency: entity.currency.value,
      gatewayPaymentId: entity.gatewayPaymentId,
      capturedAt: entity.capturedAt,
      failureReason: entity.failureReason,
      updatedAt: new Date(),
      deletedAt: entity.deletedAt ? new Date(entity.deletedAt) : null,
    };
    const raw = await this.prisma.payment.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: PaymentIdVO): Promise<void> {
    await this.prisma.payment.delete({ where: { id: id.value } });
  }

  async findByIdempotencyKey(key: IdempotencyKeyVO): Promise<PaymentEntity | null> {
    const raw = await this.prisma.payment.findFirst({
      where: { idempotencyKey: key.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByOrderId(orderId: OrderIdVO): Promise<readonly PaymentEntity[]> {
    const rows = await this.prisma.payment.findMany({
      where: { orderId: orderId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByGatewayReference(ref: GatewayReferenceVO): Promise<PaymentEntity | null> {
    const raw = await this.prisma.payment.findFirst({
      where: { gatewayPaymentId: ref.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}
