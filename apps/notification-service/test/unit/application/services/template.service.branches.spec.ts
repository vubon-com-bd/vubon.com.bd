import { describe, it, expect, beforeEach } from '@jest/globals';
import { TemplateService } from '../../../../src/module/application/services/impl/template.service.js';
import { TemplateEntity } from '../../../../src/module/domain/entities/template.entity.js';
import { TemplateNameVO } from '../../../../src/module/domain/value-objects/primitives/template-name.vo.js';
import { TemplateTypeVO } from '../../../../src/module/domain/value-objects/primitives/template-type.vo.js';
import { TemplateCategoryVO } from '../../../../src/module/domain/value-objects/primitives/template-category.vo.js';
import { TemplateLocaleVO } from '../../../../src/module/domain/value-objects/primitives/template-locale.vo.js';
import { TemplateVariableVO } from '../../../../src/module/domain/value-objects/composites/template-variable.vo.js';
import { TemplateVariableNameVO } from '../../../../src/module/domain/value-objects/primitives/template-variable-name.vo.js';
import { FIXED_TEMPLATE_ID, FIXED_USER_ID } from '../../../helpers/test-factories.js';
import { makeTemplateRepo, makeEventBridge } from '../../../helpers/mock-services.js';

function build(): TemplateEntity {
  return TemplateEntity.create({
    id: FIXED_TEMPLATE_ID, now: new Date().toISOString(),
    props: {
      name: TemplateNameVO.create('Order'),
      slug: 'order',
      type: TemplateTypeVO.email(),
      category: TemplateCategoryVO.order(),
      locale: TemplateLocaleVO.en(),
      subject: 'S {{x}}',
      body: 'B {{name}}',
      bodyHtml: '<p>B {{name}}</p>',
      variables: [TemplateVariableVO.reconstitute({
        name: TemplateVariableNameVO.create('name'), type: 'string', required: true,
      })],
      createdBy: FIXED_USER_ID,
    },
  });
}

describe('TemplateService branches', () => {
  let repo: ReturnType<typeof makeTemplateRepo>;
  let svc: TemplateService;
  beforeEach(() => {
    repo = makeTemplateRepo();
    svc = new TemplateService(repo as never, makeEventBridge() as never);
  });

  it('create ok', async () => {
    await svc.create({
      name: 'Test', slug: 't', type: 'email', category: 'order', locale: 'en',
      subject: 'S', body: 'B', variables: [],
    } as never, 'admin');
    expect(repo.save).toHaveBeenCalled();
  });

  it('create slug conflict', async () => {
    repo.findBySlugAndLocale.mockResolvedValueOnce(build());
    await expect(svc.create({
      name: 'T', slug: 'order', type: 'email', category: 'order', locale: 'en',
      subject: 'S', body: 'B', variables: [],
    } as never)).rejects.toThrow();
  });

  it('update not found', async () => {
    await expect(svc.update({ templateId: FIXED_TEMPLATE_ID, body: 'x' } as never, 'admin')).rejects.toThrow();
  });

  it('update all fields', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.update({
      templateId: FIXED_TEMPLATE_ID,
      name: 'New', category: 'payment', subject: 's2', body: 'b2',
      bodyHtml: '<p>b2</p>', variables: [{ name: 'x', type: 'string', required: false }],
    } as never, 'admin');
  });

  it('update without optional fields', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.update({ templateId: FIXED_TEMPLATE_ID } as never, 'admin');
  });

  it('activate not found', async () => {
    await expect(svc.activate({ templateId: FIXED_TEMPLATE_ID } as never, 'admin')).rejects.toThrow();
  });

  it('activate ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.activate({ templateId: FIXED_TEMPLATE_ID } as never, 'admin');
  });

  it('deactivate not found', async () => {
    await expect(svc.deactivate({ templateId: FIXED_TEMPLATE_ID } as never, 'admin')).rejects.toThrow();
  });

  it('deactivate ok', async () => {
    const e = build();
    e.activate('admin');
    repo.findByIdVO.mockResolvedValueOnce(e);
    await svc.deactivate({ templateId: FIXED_TEMPLATE_ID, reason: 'x' } as never, 'admin');
  });

  it('deprecate not found', async () => {
    await expect(svc.deprecate({ templateId: FIXED_TEMPLATE_ID } as never, 'admin')).rejects.toThrow();
  });

  it('deprecate ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.deprecate({ templateId: FIXED_TEMPLATE_ID, reason: 'old' } as never, 'admin');
  });

  it('archive not found', async () => {
    await expect(svc.archive({ templateId: FIXED_TEMPLATE_ID } as never, 'admin')).rejects.toThrow();
  });

  it('archive ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.archive({ templateId: FIXED_TEMPLATE_ID } as never, 'admin');
  });

  it('createVersion not found', async () => {
    await expect(svc.createVersion({ templateId: FIXED_TEMPLATE_ID } as never, 'admin')).rejects.toThrow();
  });

  it('createVersion ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.createVersion({ templateId: FIXED_TEMPLATE_ID } as never, 'admin');
  });

  it('render not found', async () => {
    await expect(svc.render({ templateId: FIXED_TEMPLATE_ID, data: {} } as never)).rejects.toThrow();
  });

  it('render not usable (draft)', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await expect(svc.render({ templateId: FIXED_TEMPLATE_ID, data: { name: 'X' } } as never)).rejects.toThrow();
  });

  it('render active ok', async () => {
    const e = build();
    e.activate('admin');
    repo.findByIdVO.mockResolvedValueOnce(e);
    const r = await svc.render({ templateId: FIXED_TEMPLATE_ID, data: { name: 'X' } } as never);
    expect(r.body).toContain('X');
  });

  it('preview not found', async () => {
    await expect(svc.preview({ templateId: FIXED_TEMPLATE_ID } as never)).rejects.toThrow();
  });

  it('preview ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await svc.preview({ templateId: FIXED_TEMPLATE_ID, sampleData: { name: 'X' } } as never);
    expect(r.variables.length).toBe(1);
  });

  it('getById not found', async () => {
    await expect(svc.getById({ templateId: FIXED_TEMPLATE_ID } as never)).rejects.toThrow();
  });

  it('getById ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    const r = await svc.getById({ templateId: FIXED_TEMPLATE_ID } as never);
    expect(r.id).toBe(FIXED_TEMPLATE_ID);
  });

  it('getPublic not found', async () => {
    await expect(svc.getPublic({ templateId: FIXED_TEMPLATE_ID } as never)).rejects.toThrow();
  });

  it('getPublic ok', async () => {
    repo.findByIdVO.mockResolvedValueOnce(build());
    await svc.getPublic({ templateId: FIXED_TEMPLATE_ID } as never);
  });

  it('getBySlug not found', async () => {
    await expect(svc.getBySlug({ slug: 'x' } as never)).rejects.toThrow();
  });

  it('getBySlug without locale', async () => {
    repo.findBySlug.mockResolvedValueOnce(build());
    await svc.getBySlug({ slug: 'order' } as never);
  });

  it('getBySlug with locale', async () => {
    repo.findBySlugAndLocale.mockResolvedValueOnce(build());
    await svc.getBySlug({ slug: 'order', locale: 'en' } as never);
  });

  it('list', async () => {
    await svc.list({ page: 1, limit: 20 });
    expect(repo.findPaginated).toHaveBeenCalled();
  });
});
