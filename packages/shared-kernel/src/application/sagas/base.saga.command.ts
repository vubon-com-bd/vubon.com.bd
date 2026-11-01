/**
 * Base Saga Command
 * @module shared-kernel/application/sagas
 *
 * Pure abstraction — কোনো external import নেই।
 */
export abstract class BaseSagaCommand {
  abstract readonly type: string;
  readonly sagaId?: string;
  readonly issuedAt: Date = new Date();
}
