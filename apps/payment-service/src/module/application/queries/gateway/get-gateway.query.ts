import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetGatewayQuery extends BaseQuery {
  readonly type = 'gateway.get';

  constructor(public readonly gateway: string) {
    super();
  }
}
