/**
 * GetGatewayHealthQuery
 * @module payment-service/application/queries/gateway
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetGatewayHealthQuery extends BaseQuery {
  readonly type = 'payment.gateway.health';
  constructor() {
    super();
  }
}
