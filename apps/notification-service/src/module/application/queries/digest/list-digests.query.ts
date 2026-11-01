import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { DigestListOptionsDTO } from '@application/services/interfaces/digest.service.interface.js';

export class ListDigestsQuery extends BaseQuery {
  readonly type = 'notification.digest.list';
  constructor(public readonly options: DigestListOptionsDTO) { super(); }
}
