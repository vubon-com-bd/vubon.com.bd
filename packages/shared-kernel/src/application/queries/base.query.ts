/**
 * Base Query
 * @module shared-kernel/application/queries
 *
 * Pure abstraction — কোনো external import নেই।
 */
export abstract class BaseQuery {
  abstract readonly type: string;
  readonly timestamp: Date = new Date();
  readonly queryId: string;

  protected constructor() {
    this.queryId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}
