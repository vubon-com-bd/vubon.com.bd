/**
 * Command Types
 * @module shared-kernel/application/commands
 *
 * Pure types — কোনো external import নেই।
 */
export interface CommandResult<T = unknown> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
}

export interface CommandMetadata {
  readonly commandId: string;
  readonly issuedAt: number;
  readonly issuerId?: string;
}

export type CommandHandlerFn<TCommand = unknown, TResult = unknown> = (
  command: TCommand
) => Promise<TResult>;
