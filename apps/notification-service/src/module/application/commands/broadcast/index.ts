// commands/broadcast/index.ts
export * from './create-broadcast.command.js';
export * from './create-broadcast.handler.js';
export * from './update-broadcast.command.js';
export * from './update-broadcast.handler.js';
export * from './schedule-broadcast.command.js';
export * from './schedule-broadcast.handler.js';
export * from './start-broadcast.command.js';
export * from './start-broadcast.handler.js';
export * from './cancel-broadcast.command.js';
export * from './cancel-broadcast.handler.js';
export * from './test-broadcast.command.js';
export * from './test-broadcast.handler.js';

import { CreateBroadcastHandler } from './create-broadcast.handler.js';
import { UpdateBroadcastHandler } from './update-broadcast.handler.js';
import { ScheduleBroadcastHandler } from './schedule-broadcast.handler.js';
import { StartBroadcastHandler } from './start-broadcast.handler.js';
import { CancelBroadcastHandler } from './cancel-broadcast.handler.js';
import { TestBroadcastHandler } from './test-broadcast.handler.js';

export const BROADCAST_COMMAND_HANDLERS = [
  CreateBroadcastHandler,
  UpdateBroadcastHandler,
  ScheduleBroadcastHandler,
  StartBroadcastHandler,
  CancelBroadcastHandler,
  TestBroadcastHandler,
] as const;
