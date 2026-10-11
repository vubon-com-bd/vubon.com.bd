// commands/digest/index.ts
export * from './create-digest.command.js';
export * from './create-digest.handler.js';
export * from './update-digest.command.js';
export * from './update-digest.handler.js';
export * from './generate-digest.command.js';
export * from './generate-digest.handler.js';
export * from './send-digest.command.js';
export * from './send-digest.handler.js';
export * from './cancel-digest.command.js';
export * from './cancel-digest.handler.js';

import { CreateDigestHandler } from './create-digest.handler.js';
import { UpdateDigestHandler } from './update-digest.handler.js';
import { GenerateDigestHandler } from './generate-digest.handler.js';
import { SendDigestHandler } from './send-digest.handler.js';
import { CancelDigestHandler } from './cancel-digest.handler.js';

export const DIGEST_COMMAND_HANDLERS = [
  CreateDigestHandler,
  UpdateDigestHandler,
  GenerateDigestHandler,
  SendDigestHandler,
  CancelDigestHandler,
] as const;
