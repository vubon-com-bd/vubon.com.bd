import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { GetTemplateHandler } from '../../../../src/module/application/queries/template/get-template.handler.js';
import { GetTemplateQuery } from '../../../../src/module/application/queries/template/get-template.query.js';
import { GetTemplateBySlugHandler } from '../../../../src/module/application/queries/template/get-template-by-slug.handler.js';
import { GetTemplateBySlugQuery } from '../../../../src/module/application/queries/template/get-template-by-slug.query.js';
import { GetTemplatePublicHandler } from '../../../../src/module/application/queries/template/get-template-public.handler.js';
import { GetTemplatePublicQuery } from '../../../../src/module/application/queries/template/get-template-public.query.js';
import { ListTemplatesHandler } from '../../../../src/module/application/queries/template/list-templates.handler.js';
import { ListTemplatesQuery } from '../../../../src/module/application/queries/template/list-templates.query.js';
import { PreviewTemplateHandler } from '../../../../src/module/application/queries/template/preview-template.handler.js';
import { PreviewTemplateQuery } from '../../../../src/module/application/queries/template/preview-template.query.js';

function mockSvc() {
  const r = jest.fn().mockResolvedValue({ id: 't-1', slug: 's' });
  return {
    getById: r, getBySlug: r, getPublic: r,
    list: jest.fn().mockResolvedValue({ items: [], total: 0 }),
    preview: jest.fn().mockResolvedValue({ templateId: 't-1' }),
  } as never;
}

describe('Template query handlers', () => {
  let svc: ReturnType<typeof mockSvc>;
  beforeEach(() => { svc = mockSvc(); });
  it('GetTemplateHandler', async () => {
    await new GetTemplateHandler(svc).execute(new GetTemplateQuery('t-1'));
    expect(svc.getById).toHaveBeenCalled();
  });
  it('GetTemplateBySlugHandler', async () => {
    await new GetTemplateBySlugHandler(svc).execute(new GetTemplateBySlugQuery('slug', 'en'));
    expect(svc.getBySlug).toHaveBeenCalled();
  });
  it('GetTemplatePublicHandler', async () => {
    await new GetTemplatePublicHandler(svc).execute(new GetTemplatePublicQuery('t-1'));
    expect(svc.getPublic).toHaveBeenCalled();
  });
  it('ListTemplatesHandler', async () => {
    await new ListTemplatesHandler(svc).execute(new ListTemplatesQuery({ page: 1, limit: 20 } as never));
    expect(svc.list).toHaveBeenCalled();
  });
  it('PreviewTemplateHandler', async () => {
    await new PreviewTemplateHandler(svc).execute(new PreviewTemplateQuery({ templateId: 't-1' } as never));
    expect(svc.preview).toHaveBeenCalled();
  });
});
