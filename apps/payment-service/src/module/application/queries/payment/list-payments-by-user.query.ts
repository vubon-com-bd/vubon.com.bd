import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { PaymentListOptionsDTO } from '../../services/interfaces/payment.service.interface.js';

export class ListPaymentsByUserQuery extends BaseQuery {
  readonly type = 'payment.list_by_user';
  constructor(
    public readonly userId: string,
    public readonly options: PaymentListOptionsDTO,
  ) {
    super();
  }
}
