import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPromptQuery extends BaseQuery {
  readonly type = 'ai.prompt.get';
  constructor(public readonly promptId: string) { super(); }
}
