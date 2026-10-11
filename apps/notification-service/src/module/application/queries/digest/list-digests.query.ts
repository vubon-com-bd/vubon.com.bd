import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ListDigestsRequestDTO } from '../../dtos/requests/digest/digest.dto.js';

export class ListDigestsQuery extends BaseQuery {
  readonly type = 'digest.list';
  constructor(public readonly options: ListDigestsRequestDTO) { super(); }
}
