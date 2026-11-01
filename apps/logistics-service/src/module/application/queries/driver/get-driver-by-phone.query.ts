import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetDriverByPhoneQuery extends BaseQuery {
  readonly type = 'logistics.driver.by_phone';
  constructor(public readonly phone: string) { super(); }
}
