import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetCourierPublicQuery extends BaseQuery {
  readonly type = 'logistics.courier.get_public';
  constructor(public readonly courierId: string) { super(); }
}
