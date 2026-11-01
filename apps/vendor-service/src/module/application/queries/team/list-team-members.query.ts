import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { TeamListOptionsDTO } from '../../services/interfaces/vendor-team.service.interface.js';

export class ListTeamMembersQuery extends BaseQuery {
  readonly type = 'vendor.team.list_members';
  constructor(
    public readonly vendorId: string,
    public readonly options?: TeamListOptionsDTO,
  ) {
    super();
  }
}
