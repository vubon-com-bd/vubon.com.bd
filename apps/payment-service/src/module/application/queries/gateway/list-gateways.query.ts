/**
 * ListGatewaysQuery
 * @module payment-service/application/queries/gateway
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListGatewaysQuery extends BaseQuery {
  readonly type = 'payment.gateway.list';
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly filter?: {
      readonly isActive?: boolean;
      readonly isMaintenance?: boolean;
      readonly provider?: string;
      readonly currency?: string;
    },
  ) {
    super();
  }
}
