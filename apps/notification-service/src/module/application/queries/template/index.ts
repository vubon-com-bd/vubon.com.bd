// queries/template/index.ts
export * from './get-template.query.js';
export * from './get-template.handler.js';
export * from './get-template-by-slug.query.js';
export * from './get-template-by-slug.handler.js';
export * from './get-template-public.query.js';
export * from './get-template-public.handler.js';
export * from './list-templates.query.js';
export * from './list-templates.handler.js';
export * from './preview-template.query.js';
export * from './preview-template.handler.js';

import { GetTemplateHandler } from './get-template.handler.js';
import { GetTemplateBySlugHandler } from './get-template-by-slug.handler.js';
import { GetTemplatePublicHandler } from './get-template-public.handler.js';
import { ListTemplatesHandler } from './list-templates.handler.js';
import { PreviewTemplateHandler } from './preview-template.handler.js';

export const TEMPLATE_QUERY_HANDLERS = [
  GetTemplateHandler,
  GetTemplateBySlugHandler,
  GetTemplatePublicHandler,
  ListTemplatesHandler,
  PreviewTemplateHandler,
] as const;
