import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { TemplateRendererService } from '../../../../../src/module/infrastructure/services/internal/template-renderer.service.js';
import { TemplateEntity } from '../../../../../src/module/domain/entities/template.entity.js';
import { TemplateNameVO } from '../../../../../src/module/domain/value-objects/primitives/template-name.vo.js';
import { TemplateTypeVO } from '../../../../../src/module/domain/value-objects/primitives/template-type.vo.js';
import { TemplateCategoryVO } from '../../../../../src/module/domain/value-objects/primitives/template-category.vo.js';
import { TemplateLocaleVO } from '../../../../../src/module/domain/value-objects/primitives/template-locale.vo.js';
import { FIXED_TEMPLATE_ID, FIXED_USER_ID } from '../../../../helpers/test-factories.js';

function buildTemplate(): TemplateEntity {
  return TemplateEntity.create({
    id: FIXED_TEMPLATE_ID,
    now: new Date().toISOString(),
    props: {
      name: TemplateNameVO.create('Test'),
      slug: 'test',
      type: TemplateTypeVO.email(),
      category: TemplateCategoryVO.order(),
      locale: TemplateLocaleVO.en(),
      subject: 'Subject {{x}}',
      body: 'Body {{x}}',
      variables: [],
      createdBy: FIXED_USER_ID,
    },
  });
}

describe('TemplateRendererService', () => {
  let repo: { findByIdVO: ReturnType<typeof jest.fn> };
  let cache: {
    getRender: ReturnType<typeof jest.fn>;
    setRender: ReturnType<typeof jest.fn>;
  };
  let service: TemplateRendererService;

  beforeEach(() => {
    repo = { findByIdVO: jest.fn().mockResolvedValue(buildTemplate()) };
    cache = {
      getRender: jest.fn().mockResolvedValue(null),
      setRender: jest.fn().mockResolvedValue(undefined),
    };
    service = new TemplateRendererService(repo as never, cache as never);
  });

  it('renders when cache miss', async () => {
    const r = await service.render(FIXED_TEMPLATE_ID, { x: 'hello' });
    expect(r.body).toBe('Body hello');
    expect(cache.setRender).toHaveBeenCalled();
  });

  it('returns cached result', async () => {
    cache.getRender.mockResolvedValueOnce({
      subject: 'cached',
      body: 'cached-body',
      bodyHtml: undefined,
      missingVariables: [],
      resolvedVariables: [],
    });
    const r = await service.render(FIXED_TEMPLATE_ID, { x: 'hello' });
    expect(r.body).toBe('cached-body');
    expect(cache.setRender).not.toHaveBeenCalled();
  });

  it('throws when template missing', async () => {
    repo.findByIdVO.mockResolvedValueOnce(null);
    await expect(service.render('any', {})).rejects.toThrow();
  });

  it('does NOT cache when missing variables present', async () => {
    // Template uses {{x}}, but we provide empty data → x is missing
    await service.render(FIXED_TEMPLATE_ID, {});
    expect(cache.setRender).not.toHaveBeenCalled();
  });

  it('caches when all variables resolved', async () => {
    await service.render(FIXED_TEMPLATE_ID, { x: 'ok' });
    expect(cache.setRender).toHaveBeenCalled();
  });

  it('useCache=false skips cache lookup', async () => {
    await service.render(FIXED_TEMPLATE_ID, { x: 'cccccccc-cccc-cccc-cccc-cccccccccccc' }, undefined, false);
    expect(cache.getRender).not.toHaveBeenCalled();
  });
});
