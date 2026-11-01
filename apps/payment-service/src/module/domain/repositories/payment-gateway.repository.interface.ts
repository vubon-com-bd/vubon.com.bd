/**
 * PaymentGateway Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { PaymentGatewayEntity } from '@domain/entities/payment-gateway.entity';

export const PAYMENT_GATEWAY_REPOSITORY = Symbol('PAYMENT_GATEWAY_REPOSITORY');

export interface PaymentGatewayListFilter {
  readonly provider?: string;
  readonly isActive?: boolean;
  readonly isMaintenance?: boolean;
  readonly currency?: string;
}

export interface PaymentGatewayListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'displayName';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PaymentGatewayListFilter;
}

export interface PaymentGatewayPaginationResult {
  readonly items: readonly PaymentGatewayEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface PaymentGatewayRepository
  extends BaseRepository<PaymentGatewayEntity, string> {
  findByProvider(provider: string): Promise<PaymentGatewayEntity | null>;
  findAvailable(): Promise<readonly PaymentGatewayEntity[]>;
  findByCurrency(currency: string): Promise<readonly PaymentGatewayEntity[]>;
  findPaginated(
    options: PaymentGatewayListOptions,
  ): Promise<PaymentGatewayPaginationResult>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
