import { TemplateRenderVO } from '@domain/composites/template-render.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

const makeProps = (overrides: any = {}) => ({
  templateId: TemplateIdVO.create(IDS.templateId),
  body: 'rendered body',
  missingVariables: [],
  renderedAt: DATES.now,
  locale: 'en',
  ...overrides,
});

describe('TemplateRenderVO', () => {
  describe('create()', () => {
    it('creates valid', () => {
      const vo = TemplateRenderVO.create(makeProps());
      expect(vo.body).toBe('rendered body');
    });

    it('accepts subject + bodyHtml', () => {
      const vo = TemplateRenderVO.create(
        makeProps({ subject: 'Hi', bodyHtml: '<p>Hi</p>' }),
      );
      expect(vo.subject).toBe('Hi');
      expect(vo.hasHtml).toBe(true);
    });

    it('rejects empty body', () => {
      expect(() => TemplateRenderVO.create(makeProps({ body: '' }))).toThrow(ValidationError);
    });

    it('rejects non-string body', () => {
      expect(() => TemplateRenderVO.create(makeProps({ body: 123 }))).toThrow(ValidationError);
    });

    it('rejects invalid renderedAt', () => {
      expect(() => TemplateRenderVO.create(makeProps({ renderedAt: 'garbage' }))).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = TemplateRenderVO.reconstitute(makeProps());
      expect(vo).toBeDefined();
    });
  });

  describe('predicates', () => {
    it('isComplete when no missing', () => {
      expect(TemplateRenderVO.create(makeProps()).isComplete).toBe(true);
    });

    it('hasMissing when missing variables exist', () => {
      const vo = TemplateRenderVO.create(makeProps({ missingVariables: ['a'] }));
      expect(vo.hasMissing).toBe(true);
    });

    it('hasHtml false when no html', () => {
      expect(TemplateRenderVO.create(makeProps()).hasHtml).toBe(false);
    });
  });

  describe('preview', () => {
    it('returns first 200 chars', () => {
      const longBody = 'a'.repeat(300);
      const vo = TemplateRenderVO.create(makeProps({ body: longBody }));
      expect(vo.preview.length).toBe(200);
    });

    it('returns full body if short', () => {
      const vo = TemplateRenderVO.create(makeProps({ body: 'short' }));
      expect(vo.preview).toBe('short');
    });
  });

  describe('getters', () => {
    const vo = TemplateRenderVO.create(makeProps());
    it('exposes all fields', () => {
      expect(vo.templateId).toBeDefined();
      expect(vo.subject).toBeUndefined();
      expect(vo.body).toBe('rendered body');
      expect(vo.bodyHtml).toBeUndefined();
      expect(vo.missingVariables).toEqual([]);
      expect(vo.renderedAt).toBe(DATES.now);
      expect(vo.locale).toBe('en');
    });
  });
});
