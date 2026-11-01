/**
 * ListMethodsQuery
 * @module payment-service/application/queries/method
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListMethodsQuery extends BaseQuery {
  readonly type = 'payment.method.list';
  constructor(
    public readonly userId: string,
    public readonly page: number,
    public readonly limit: number,
    public readonly filter?: {
      readonly isActive?: boolean;
      readonly type?: string;
    },
  ) {
    super();
  }
}
