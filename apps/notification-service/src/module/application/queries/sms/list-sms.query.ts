import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ListSmsRequestDTO } from '../../dtos/requests/sms/sms.dto.js';

export class ListSmsQuery extends BaseQuery {
  readonly type = 'sms.list';
  constructor(public readonly options: ListSmsRequestDTO) { super(); }
}
