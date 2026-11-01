/**
 * GatewayResolverService — maps gateway id → adapter
 * @module payment-service/infrastructure/gateways
 *
 * Provides:
 *   - resolve(id): single adapter lookup
 *   - resolveForPayment(entity): adapter based on payment.gateway
 *   - enabledGateways(): all enabled gateway ids
 */
import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  PAYMENT_GATEWAY_ADAPTERS,
  type IPaymentGatewayAdapter,
} from './base/gateway.interface.js';
import type { PaymentEntity } from '@domain/entities/payment.entity';

@Injectable()
export class GatewayResolverService {
  private readonly logger = new Logger(GatewayResolverService.name);
  private readonly registry: Map<string, IPaymentGatewayAdapter>;

  constructor(
    @Inject(PAYMENT_GATEWAY_ADAPTERS)
    private readonly adapters: readonly IPaymentGatewayAdapter[],
  ) {
    this.registry = new Map(adapters.map((a) => [a.gatewayId, a]));
    this.logger.log(
      `Gateway resolver initialised — registered: ${[...this.registry.keys()].join(', ')}`,
    );
  }

  /**
   * Resolve an adapter by gateway id.
   * Throws NotFoundException if adapter not registered.
   */
  resolve(gatewayId: string): IPaymentGatewayAdapter {
    const adapter = this.registry.get(gatewayId);
    if (!adapter) {
      throw new NotFoundException(`Gateway "${gatewayId}" not registered`);
    }
    if (!adapter.isEnabled()) {
      this.logger.warn(`Gateway "${gatewayId}" disabled by config`);
    }
    return adapter;
  }

  /**
   * Resolve the adapter associated with a payment entity.
   * Returns null if payment has no gateway (e.g., COD without provider).
   */
  resolveForPayment(payment: PaymentEntity): IPaymentGatewayAdapter | null {
    if (!payment.provider) return null;
    return this.resolve(payment.provider.provider);
  }

  /** All enabled gateway ids. */
  enabledGateways(): readonly string[] {
    return [...this.registry.values()]
      .filter((a) => a.isEnabled())
      .map((a) => a.gatewayId);
  }

  /** All registered gateway ids (enabled + disabled). */
  allGateways(): readonly string[] {
    return [...this.registry.keys()];
  }

  /** Quick check without throwing. */
  has(gatewayId: string): boolean {
    return this.registry.has(gatewayId);
  }
}
