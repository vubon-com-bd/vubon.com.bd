/**
 * PaymentGatewayService
 * @module payment-service/application/services/impl
 */
import { Inject, Injectable, Logger } from '@nestjs/common';

import type {
  IPaymentGatewayService,
  GatewayHealthDTO,
  GatewayListOptionsDTO,
  GatewayListResponseDTO,
} from '@application/services/interfaces/payment-gateway.service.interface.js';
import {
  PAYMENT_GATEWAY_REPOSITORY,
  type PaymentGatewayRepository,
} from '@domain/repositories/payment-gateway.repository.interface.js';
import type { PaymentGatewayEntity } from '@domain/entities/payment-gateway.entity.js';
import { GatewayNotFoundError } from '@domain/errors/gateway.errors.js';

@Injectable()
export class PaymentGatewayService implements IPaymentGatewayService {
  private readonly logger = new Logger(PaymentGatewayService.name);

  constructor(
    @Inject(PAYMENT_GATEWAY_REPOSITORY)
    private readonly repo: PaymentGatewayRepository,
  ) {}

  async getByProvider(provider: string): Promise<PaymentGatewayEntity> {
    const entity = await this.repo.findByProvider(provider);
    if (!entity) throw new GatewayNotFoundError(provider);
    return entity;
  }

  async listAvailable(): Promise<readonly PaymentGatewayEntity[]> {
    return this.repo.findAvailable();
  }

  async listByCurrency(currency: string): Promise<readonly PaymentGatewayEntity[]> {
    return this.repo.findByCurrency(currency);
  }

  async list(options: GatewayListOptionsDTO): Promise<GatewayListResponseDTO> {
    const result = await this.repo.findPaginated({
      page: options.page,
      limit: options.limit,
      filter: options.filter,
    });
    return {
      items: result.items,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async getHealth(): Promise<readonly GatewayHealthDTO[]> {
    const gateways = await this.repo.findAvailable();
    const now = new Date().toISOString();
    return gateways.map((g) => ({
      gateway: g.provider.provider,
      status: g.isAvailable() ? 'healthy' : 'degraded',
      lastChecked: now,
    }));
  }
}
