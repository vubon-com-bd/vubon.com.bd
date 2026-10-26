/**
 * TemplateModule — Unit tests
 */
import 'reflect-metadata';
import { TemplateModule } from '@modules/template/template.module.js';
import { TemplateController } from '@interfaces/controllers/rest/template.controller.js';
import { TEMPLATE_COMMAND_HANDLERS } from '@modules/template/commands/index.js';
import { TEMPLATE_QUERY_HANDLERS } from '@modules/template/queries/index.js';
import { TemplateService } from '@application/services/impl/template.service.js';
import { TEMPLATE_SERVICE } from '@application/services/interfaces/template.service.interface.js';

const readMeta = (key: string, target: unknown): unknown[] =>
  (Reflect.getMetadata(key, target) as unknown[] | undefined) ?? [];

describe('TemplateModule', () => {
  it('should be defined', () => expect(TemplateModule).toBeDefined());

  it('should register TemplateController', () => {
    expect(readMeta('controllers', TemplateModule)).toContain(TemplateController);
  });

  it('should provide TemplateService', () => {
    expect(readMeta('providers', TemplateModule)).toContain(TemplateService);
  });

  it('should bind TEMPLATE_SERVICE token', () => {
    const providers = readMeta('providers', TemplateModule);
    const tokenBinding = providers.find(
      (p) => typeof p === 'object' && p !== null && (p as { provide?: unknown }).provide === TEMPLATE_SERVICE,
    );
    expect(tokenBinding).toBeDefined();
  });

  it('should register all command + query handlers', () => {
    const providers = readMeta('providers', TemplateModule);
    for (const h of TEMPLATE_COMMAND_HANDLERS) expect(providers).toContain(h);
    for (const h of TEMPLATE_QUERY_HANDLERS) expect(providers).toContain(h);
  });

  it('should export TemplateService and token', () => {
    const exports = readMeta('exports', TemplateModule);
    expect(exports).toContain(TemplateService);
    expect(exports).toContain(TEMPLATE_SERVICE);
  });
});
