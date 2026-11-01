/**
 * IPaymentGatewayService — contract
 * @module payment-service/application/services/interfaces
 */
import type { PaymentGatewayEntity } from '@domain/entities/payment-gateway.entity';

export const PAYMENT_GATEWAY_SERVICE = Symbol('PAYMENT_GATEWAY_SERVICE');

export interface GatewayHealthDTO {
  readonly gateway: string;
  readonly status: 'healthy' | 'degraded' | 'down';
  readonly latencyMs?: number;
  readonly lastChecked: string;
}

export interface GatewayListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly filter?: {
    readonly isActive?: boolean;
    readonly isMaintenance?: boolean;
    readonly provider?: string;
    readonly currency?: string;
  };
}

export interface GatewayListResponseDTO {
  readonly items: readonly PaymentGatewayEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface IPaymentGatewayService {
  getByProvider(provider: string): Promise<PaymentGatewayEntity>;
  listAvailable(): Promise<readonly PaymentGatewayEntity[]>;
  listByCurrency(currency: string): Promise<readonly PaymentGatewayEntity[]>;
  list(options: GatewayListOptionsDTO): Promise<GatewayListResponseDTO>;
  getHealth(): Promise<readonly GatewayHealthDTO[]>;
}
