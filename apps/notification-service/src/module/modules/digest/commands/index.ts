/**
 * Digest Command Handlers Barrel
 * @module notification-service/modules/digest/commands
 */
import { CreateDigestHandler } from '@application/commands/digest/create-digest.handler.js';
import { SendDigestHandler } from '@application/commands/digest/send-digest.handler.js';

export const DIGEST_COMMAND_HANDLERS = [
  CreateDigestHandler,
  SendDigestHandler,
] as const;

export { CreateDigestHandler, SendDigestHandler };
