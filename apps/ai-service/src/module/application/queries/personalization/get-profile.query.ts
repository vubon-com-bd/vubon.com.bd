import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetProfileQuery extends BaseQuery {
  readonly type = 'ai.personalization.get-profile';
  constructor(public readonly userId: string) { super(); }
}
