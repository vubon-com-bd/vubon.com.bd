/**
 * Widget Command Handlers Barrel
 */
import { AddWidgetHandler } from '../../../application/commands/dashboard/add-widget.handler.js';
import { RemoveWidgetHandler } from '../../../application/commands/dashboard/remove-widget.handler.js';

export const WIDGET_COMMAND_HANDLERS = [
  AddWidgetHandler,
  RemoveWidgetHandler,
] as const;

export { AddWidgetHandler, RemoveWidgetHandler };
