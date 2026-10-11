import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ListPushRequestDTO } from '../../dtos/requests/push/push.dto.js';

export class ListPushQuery extends BaseQuery {
  readonly type = 'push.list';
  constructor(public readonly options: ListPushRequestDTO) { super(); }
}
