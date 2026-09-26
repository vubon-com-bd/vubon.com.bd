import { Injectable } from '@nestjs/common';
import { PaymentGateway as PrismaPaymentGateway } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { PaymentGatewayEntity } from '../../../../domain/entities/payment-gateway.entity';
import { PaymentGatewayVO } from '../../../../domain/value-objects/primitives/payment-gateway.vo';
import type { PaymentGatewayRepository } from '../../../../domain/repositories/payment-gateway.repository.interface';

@Injectable()
export class PaymentGatewayPrismaRepository
  extends BasePrismaRepository<PaymentGatewayEntity, string>
  implements PaymentGatewayRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaPaymentGateway): PaymentGatewayEntity {
    return PaymentGatewayEntity.reconstitute(
      raw.id,
      {
        gateway: PaymentGatewayVO.create(raw.gateway),
        status: raw.status,
        env: raw.env,
        isLocal: raw.isLocal,
        supportedCurrencies: raw.supportedCurrencies,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<PaymentGatewayEntity | null> {
    const raw = await this.prisma.paymentGateway.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PaymentGatewayEntity[]> {
    const rows = await this.prisma.paymentGateway.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: PaymentGatewayEntity): Promise<PaymentGatewayEntity> {
    const data = {
      gateway: entity.gateway.value,
      status: entity.status,
      env: entity.env,
      isLocal: entity.isLocal,
      supportedCurrencies: [...entity.supportedCurrencies],
      updatedAt: new Date(),
    };
    const raw = await this.prisma.paymentGateway.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.paymentGateway.delete({ where: { id } });
  }

  async findByGateway(gateway: string): Promise<PaymentGatewayEntity | null> {
    const raw = await this.prisma.paymentGateway.findUnique({
      where: { gateway },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findActive(): Promise<readonly PaymentGatewayEntity[]> {
    const rows = await this.prisma.paymentGateway.findMany({
      where: { status: 'active' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}
