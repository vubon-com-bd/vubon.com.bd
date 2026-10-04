/**
 * GatewayResolverService — maps a gateway id → adapter instance
 * @module payment-service/infrastructure/gateways
 */
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  PAYMENT_GATEWAY_ADAPTERS,
  type IPaymentGatewayAdapter,
} from './payment-gateway.adapter.js';
import type { PaymentEntity } from '../../domain/entities/payment.entity.js';

@Injectable()
export class GatewayResolverService {
  private readonly logger = new Logger(GatewayResolverService.name);
  private readonly registry: Map<string, IPaymentGatewayAdapter>;

  constructor(
    @Inject(PAYMENT_GATEWAY_ADAPTERS)
    private readonly adapters: readonly IPaymentGatewayAdapter[],
  ) {
    this.registry = new Map(adapters.map((a) => [a.gatewayId, a]));
  }

  resolve(gatewayId: string): IPaymentGatewayAdapter {
    const adapter = this.registry.get(gatewayId);
    if (!adapter) {
      throw new NotFoundException(`Gateway adapter "${gatewayId}" not registered`);
    }
    if (!adapter.isEnabled()) {
      this.logger.warn(`Gateway "${gatewayId}" is not enabled by config`);
    }
    return adapter;
  }

  resolveForPayment(payment: PaymentEntity): IPaymentGatewayAdapter | null {
    if (!payment.gateway) return null;
    return this.resolve(payment.gateway.value);
  }

  /** Convenience: best-effort list of currently-enabled gateways. */
  enabledGateways(): readonly string[] {
    return [...this.registry.values()].filter((a) => a.isEnabled()).map((a) => a.gatewayId);
  }

  all(): readonly IPaymentGatewayAdapter[] {
    return this.adapters;
  }
}
