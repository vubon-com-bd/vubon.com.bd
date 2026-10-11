// commands/template/index.ts
export * from './create-template.command.js';
export * from './create-template.handler.js';
export * from './update-template.command.js';
export * from './update-template.handler.js';
export * from './activate-template.command.js';
export * from './activate-template.handler.js';
export * from './deactivate-template.command.js';
export * from './deactivate-template.handler.js';
export * from './deprecate-template.command.js';
export * from './deprecate-template.handler.js';
export * from './archive-template.command.js';
export * from './archive-template.handler.js';
export * from './create-template-version.command.js';
export * from './create-template-version.handler.js';
export * from './render-template.command.js';
export * from './render-template.handler.js';

import { CreateTemplateHandler } from './create-template.handler.js';
import { UpdateTemplateHandler } from './update-template.handler.js';
import { ActivateTemplateHandler } from './activate-template.handler.js';
import { DeactivateTemplateHandler } from './deactivate-template.handler.js';
import { DeprecateTemplateHandler } from './deprecate-template.handler.js';
import { ArchiveTemplateHandler } from './archive-template.handler.js';
import { CreateTemplateVersionHandler } from './create-template-version.handler.js';
import { RenderTemplateHandler } from './render-template.handler.js';

export const TEMPLATE_COMMAND_HANDLERS = [
  CreateTemplateHandler,
  UpdateTemplateHandler,
  ActivateTemplateHandler,
  DeactivateTemplateHandler,
  DeprecateTemplateHandler,
  ArchiveTemplateHandler,
  CreateTemplateVersionHandler,
  RenderTemplateHandler,
] as const;
