import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { PaymentListOptionsDTO } from '../../services/interfaces/payment.service.interface.js';

export class ListPaymentsQuery extends BaseQuery {
  readonly type = 'payment.list';
  constructor(public readonly options: PaymentListOptionsDTO) {
    super();
  }
}
