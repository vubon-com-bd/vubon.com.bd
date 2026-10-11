import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ListEmailsRequestDTO } from '../../dtos/requests/email/email.dto.js';

export class ListEmailsQuery extends BaseQuery {
  readonly type = 'email.list';
  constructor(public readonly options: ListEmailsRequestDTO) { super(); }
}
