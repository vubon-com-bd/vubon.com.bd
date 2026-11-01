/**
 * Template Query Handlers Barrel
 * @module notification-service/modules/template/queries
 */
import { GetTemplateHandler } from '@application/queries/template/get-template.handler.js';
import { GetTemplateBySlugHandler } from '@application/queries/template/get-template-by-slug.handler.js';
import { ListTemplatesHandler } from '@application/queries/template/list-templates.handler.js';

export const TEMPLATE_QUERY_HANDLERS = [
  GetTemplateHandler,
  GetTemplateBySlugHandler,
  ListTemplatesHandler,
] as const;

export {
  GetTemplateHandler,
  GetTemplateBySlugHandler,
  ListTemplatesHandler,
};
