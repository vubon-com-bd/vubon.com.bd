import {
  LockAccountHandler,
  UnlockAccountHandler,
} from '../../../application/commands/auth/index.js';

export const LOCK_COMMAND_HANDLERS = [
  LockAccountHandler,
  UnlockAccountHandler,
] as const;
