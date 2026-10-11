import { describe, it, expect, beforeEach } from '@jest/globals';
import { TemplateService } from '../../../../src/module/application/services/impl/template.service.js';
import { TemplateEntity } from '../../../../src/module/domain/entities/template.entity.js';
import { TemplateNameVO } from '../../../../src/module/domain/value-objects/primitives/template-name.vo.js';
import { TemplateTypeVO } from '../../../../src/module/domain/value-objects/primitives/template-type.vo.js';
import { TemplateCategoryVO } from '../../../../src/module/domain/value-objects/primitives/template-category.vo.js';
import { TemplateLocaleVO } from '../../../../src/module/domain/value-objects/primitives/template-locale.vo.js';
import { TemplateVariableNameVO } from '../../../../src/module/domain/value-objects/primitives/template-variable-name.vo.js';
import { TemplateVariableVO } from '../../../../src/module/domain/value-objects/composites/template-variable.vo.js';
import { FIXED_TEMPLATE_ID, FIXED_USER_ID } from '../../../../helpers/test-factories.js';
import { makeTemplateRepo, makeEventBridge } from '../../../../helpers/mock-services.js';

function build(): TemplateEntity {
  return TemplateEntity.create({
    id: FIXED_TEMPLATE_ID,
    now: new Date().toISOString(),
    props: {
      name: TemplateNameVO.create('Order Conf'),
      slug: 'order-conf',
      type: TemplateTypeVO.email(),
      category: TemplateCategoryVO.order(),
      locale: TemplateLocaleVO.en(),
      subject: 'S {{x}}',
      body: 'Hi {{name}}',
      variables: [
        TemplateVariableVO.reconstitute({
          name: TemplateVariableNameVO.create('name'),
          type: 'string',
          required: true,
        }),
      ],
      createdBy: FIXED_USER_ID,
    },
  });
}

function makeService() {
  const repo = makeTemplateRepo();
  const events = makeEventBridge();
  const svc = new TemplateService(repo as never, events as never);
  return { svc, repo, events };
}

describe('TemplateService', () => {
  let ctx: ReturnType<typeof makeService>;
  beforeEach(() => { ctx = makeService(); });

  describe('create', () => {
    it('creates new template', async () => {
      const r = await ctx.svc.create({
        name: 'Test Template', slug: 'test-template', type: 'email', category: 'order', locale: 'en',
        subject: 'S', body: 'B', variables: [],
      } as never, 'admin');
      expect(r.slug).toBe('test-template');
    });

    it('throws when slug exists', async () => {
      ctx.repo.findBySlugAndLocale.mockResolvedValueOnce(build());
      await expect(ctx.svc.create({
        name: 'T', slug: 'order-conf', type: 'email', category: 'order', locale: 'en',
        subject: 'S', body: 'B', variables: [],
      } as never)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('throws when template not found', async () => {
      await expect(
        ctx.svc.update({ templateId: FIXED_TEMPLATE_ID, body: 'new' } as never, 'admin'),
      ).rejects.toThrow();
    });

    it('updates existing', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.update({
        templateId: FIXED_TEMPLATE_ID, body: 'new body',
      } as never, 'admin');
      expect(r.id).toBe(FIXED_TEMPLATE_ID);
    });

    it('updates with name + category + variables', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.update({
        templateId: FIXED_TEMPLATE_ID,
        name: 'New Name',
        category: 'payment',
        subject: 's2',
        bodyHtml: '<p>x</p>',
        variables: [{ name: 'sampleVariable', type: 'string', required: false }],
      } as never, 'admin');
      expect(r).toBeDefined();
    });
  });

  describe('activate', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.activate({ templateId: FIXED_TEMPLATE_ID } as never, 'admin'),
      ).rejects.toThrow();
    });

    it('activates existing', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.activate({ templateId: FIXED_TEMPLATE_ID } as never, 'admin');
      expect(r).toBeDefined();
    });
  });

  describe('deactivate', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.deactivate({ templateId: FIXED_TEMPLATE_ID, reason: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' } as never, 'admin'),
      ).rejects.toThrow();
    });
  });

  describe('deprecate', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.deprecate({ templateId: FIXED_TEMPLATE_ID } as never, 'admin'),
      ).rejects.toThrow();
    });

    it('deprecates existing', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.deprecate({
        templateId: FIXED_TEMPLATE_ID,
        replacementTemplateId: undefined,
        reason: 'old',
      } as never, 'admin');
      expect(r).toBeDefined();
    });
  });

  describe('archive', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.archive({ templateId: FIXED_TEMPLATE_ID } as never, 'admin'),
      ).rejects.toThrow();
    });

    it('archives existing', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.archive({ templateId: FIXED_TEMPLATE_ID } as never, 'admin');
      expect(r).toBeDefined();
    });
  });

  describe('createVersion', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.createVersion({ templateId: FIXED_TEMPLATE_ID } as never, 'admin'),
      ).rejects.toThrow();
    });

    it('creates version', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.createVersion({ templateId: FIXED_TEMPLATE_ID } as never, 'admin');
      expect(r).toBeDefined();
    });
  });

  describe('render', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.render({ templateId: FIXED_TEMPLATE_ID, data: {} } as never),
      ).rejects.toThrow();
    });

    it('throws when not usable', async () => {
      const t = build();
      ctx.repo.findByIdVO.mockResolvedValueOnce(t); // draft status
      await expect(
        ctx.svc.render({ templateId: FIXED_TEMPLATE_ID, data: { name: 'Rahim' } } as never),
      ).rejects.toThrow();
    });

    it('renders active template', async () => {
      const t = build();
      t.activate('admin');
      ctx.repo.findByIdVO.mockResolvedValueOnce(t);
      const r = await ctx.svc.render({
        templateId: FIXED_TEMPLATE_ID,
        data: { name: 'Rahim' },
      } as never);
      expect(r.body).toContain('Rahim');
    });
  });

  describe('preview', () => {
    it('throws when not found', async () => {
      await expect(
        ctx.svc.preview({ templateId: FIXED_TEMPLATE_ID } as never),
      ).rejects.toThrow();
    });

    it('returns preview with variables', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.preview({
        templateId: FIXED_TEMPLATE_ID,
        sampleData: { name: 'Test' },
      } as never);
      expect(r.templateId).toBe(FIXED_TEMPLATE_ID);
      expect(r.variables.length).toBe(1);
    });
  });

  describe('getById', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getById({ templateId: FIXED_TEMPLATE_ID } as never)).rejects.toThrow();
    });

    it('returns DTO', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.getById({ templateId: FIXED_TEMPLATE_ID } as never);
      expect(r.id).toBe(FIXED_TEMPLATE_ID);
    });
  });

  describe('getPublic', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getPublic({ templateId: FIXED_TEMPLATE_ID } as never)).rejects.toThrow();
    });

    it('returns public DTO', async () => {
      ctx.repo.findByIdVO.mockResolvedValueOnce(build());
      const r = await ctx.svc.getPublic({ templateId: FIXED_TEMPLATE_ID } as never);
      expect(r.slug).toBe('order-conf');
    });
  });

  describe('getBySlug', () => {
    it('throws when not found', async () => {
      await expect(ctx.svc.getBySlug({ slug: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' } as never)).rejects.toThrow();
    });

    it('returns by slug', async () => {
      ctx.repo.findBySlug.mockResolvedValueOnce(build());
      const r = await ctx.svc.getBySlug({ slug: 'order-conf' } as never);
      expect(r.slug).toBe('order-conf');
    });

    it('with locale', async () => {
      ctx.repo.findBySlugAndLocale.mockResolvedValueOnce(build());
      const r = await ctx.svc.getBySlug({ slug: 'order-conf', locale: 'en' } as never);
      expect(r.slug).toBe('order-conf');
    });
  });

  describe('list', () => {
    it('returns paginated', async () => {
      const r = await ctx.svc.list({ page: 1, limit: 20 });
      expect(r.total).toBe(0);
    });

    it('with all filters', async () => {
      const r = await ctx.svc.list({
        page: 1, limit: 20,
        sortBy: 'name', sortDir: 'asc',
        filter: { type: 'email', status: 'active', category: 'order', locale: 'en', search: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb' },
      } as never);
      expect(r).toBeDefined();
    });
  });
});
