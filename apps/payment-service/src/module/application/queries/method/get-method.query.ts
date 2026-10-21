/**
 * GetMethodQuery
 * @module payment-service/application/queries/method
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetMethodQuery extends BaseQuery {
  readonly type = 'payment.method.get';
  constructor(public readonly methodId: string) {
    super();
  }
}
