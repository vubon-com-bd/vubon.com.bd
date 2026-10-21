/**
 * ListPaymentsQuery
 * @module payment-service/application/queries/payment
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type {
  PaymentListFilterDTO,
} from '@application/services/interfaces/payment.service.interface.js';

export class ListPaymentsQuery extends BaseQuery {
  readonly type = 'payment.payment.list';
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly filter?: PaymentListFilterDTO,
    public readonly sortBy?: 'createdAt' | 'updatedAt' | 'amount' | 'status',
    public readonly sortDir?: 'asc' | 'desc',
  ) {
    super();
  }
}
