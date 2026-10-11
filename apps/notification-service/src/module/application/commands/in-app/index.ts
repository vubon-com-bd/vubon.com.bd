// commands/in-app/index.ts
export * from './send-in-app.command.js';
export * from './send-in-app.handler.js';
export * from './mark-in-app-read.command.js';
export * from './mark-in-app-read.handler.js';
export * from './dismiss-in-app.command.js';
export * from './dismiss-in-app.handler.js';
export * from './record-in-app-click.command.js';
export * from './record-in-app-click.handler.js';

import { SendInAppHandler } from './send-in-app.handler.js';
import { MarkInAppReadHandler } from './mark-in-app-read.handler.js';
import { DismissInAppHandler } from './dismiss-in-app.handler.js';
import { RecordInAppClickHandler } from './record-in-app-click.handler.js';

export const IN_APP_COMMAND_HANDLERS = [
  SendInAppHandler,
  MarkInAppReadHandler,
  DismissInAppHandler,
  RecordInAppClickHandler,
] as const;
