import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPersonalizationsQuery extends BaseQuery {
  readonly type = 'ai.personalization.list';
  constructor(public readonly userId: string) { super(); }
}
