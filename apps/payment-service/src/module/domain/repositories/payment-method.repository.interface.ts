/**
 * PaymentMethod Repository Interface
 * @module payment-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { PaymentMethodEntity } from '@domain/entities/payment-method.entity';
import type { PaymentMethodIdVO } from '@domain/primitives/payment-method-id.vo';

export const PAYMENT_METHOD_REPOSITORY = Symbol('PAYMENT_METHOD_REPOSITORY');

export interface PaymentMethodListFilter {
  readonly type?: string;
  readonly provider?: string;
  readonly isActive?: boolean;
  readonly search?: string;
}

export interface PaymentMethodListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'label';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: PaymentMethodListFilter;
}

export interface PaymentMethodPaginationResult {
  readonly items: readonly PaymentMethodEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface PaymentMethodRepository
  extends BaseRepository<PaymentMethodEntity, string> {
  findByIdVO(id: PaymentMethodIdVO): Promise<PaymentMethodEntity | null>;
  findActive(): Promise<readonly PaymentMethodEntity[]>;
  findByType(type: string): Promise<readonly PaymentMethodEntity[]>;
  findByProvider(provider: string): Promise<readonly PaymentMethodEntity[]>;
  findPaginated(
    options: PaymentMethodListOptions,
  ): Promise<PaymentMethodPaginationResult>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
