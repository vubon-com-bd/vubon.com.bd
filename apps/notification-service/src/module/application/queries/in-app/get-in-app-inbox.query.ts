import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { InAppInboxRequestDTO } from '../../dtos/requests/in-app/in-app.dto.js';

export class GetInAppInboxQuery extends BaseQuery {
  readonly type = 'in_app.inbox';
  constructor(public readonly options: InAppInboxRequestDTO) { super(); }
}
