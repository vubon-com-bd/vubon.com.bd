/**
 * Template Command Handlers Barrel
 * @module notification-service/modules/template/commands
 */
import { CreateTemplateHandler } from '@application/commands/template/create-template.handler.js';
import { UpdateTemplateHandler } from '@application/commands/template/update-template.handler.js';
import { TestTemplateHandler } from '@application/commands/template/test-template.handler.js';

export const TEMPLATE_COMMAND_HANDLERS = [
  CreateTemplateHandler,
  UpdateTemplateHandler,
  TestTemplateHandler,
] as const;

export {
  CreateTemplateHandler,
  UpdateTemplateHandler,
  TestTemplateHandler,
};
