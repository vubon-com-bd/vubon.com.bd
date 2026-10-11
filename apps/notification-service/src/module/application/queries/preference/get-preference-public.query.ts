import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPreferencePublicQuery extends BaseQuery {
  readonly type = 'preference.get_public';
  constructor(public readonly userId: string) { super(); }
}
