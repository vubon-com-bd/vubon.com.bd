import { TemplateVO } from '@domain/composites/template.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { TemplateNameVO } from '@domain/primitives/template-name.vo.js';
import { TemplateContentVO } from '@domain/primitives/template-content.vo.js';
import { TemplateFormatVO } from '@domain/primitives/template-format.vo.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const variable = (name: string, required = true) =>
  TemplateVariableVO.create({ name, type: 'string', required });

const makeProps = (overrides: any = {}) => ({
  id: TemplateIdVO.create(IDS.templateId),
  name: TemplateNameVO.create('Order Confirmation'),
  slug: 'order-confirmation',
  type: NotificationTypeVO.create('transactional'),
  status: 'active' as const,
  format: TemplateFormatVO.html(),
  body: TemplateContentVO.create('<p>Hi {{userName}}</p>'),
  variables: [variable('userName')],
  locale: 'en',
  version: 1,
  ...overrides,
});

describe('TemplateVO', () => {
  describe('create()', () => {
    it('creates valid template', () => {
      const vo = TemplateVO.create(makeProps());
      expect(vo.slug).toBe('order-confirmation');
      expect(vo.version).toBe(1);
    });

    it('rejects empty slug', () => {
      expect(() => TemplateVO.create(makeProps({ slug: '' }))).toThrow(ValidationError);
    });

    it('rejects version < 1', () => {
      expect(() => TemplateVO.create(makeProps({ version: 0 }))).toThrow(ValidationError);
    });

    it('rejects invalid status', () => {
      expect(() => TemplateVO.create(makeProps({ status: 'garbage' as any }))).toThrow(ValidationError);
    });

    it('rejects undeclared variable in body', () => {
      expect(() =>
        TemplateVO.create(
          makeProps({
            body: TemplateContentVO.create('Hi {{userName}} {{undeclared}}'),
            variables: [variable('userName')],
          }),
        ),
      ).toThrow(ValidationError);
    });

    it('rejects required variable with default', () => {
      expect(() =>
        TemplateVO.create(
          makeProps({
            variables: [
              TemplateVariableVO.create({
                name: 'userName',
                type: 'string',
                required: true,
                defaultValue: 'x',
              }),
            ],
          }),
        ),
      ).toThrow(ValidationError);
    });

    it('accepts optional with subject', () => {
      const vo = TemplateVO.create(
        makeProps({ subject: TemplateContentVO.create('Hello {{userName}}') }),
      );
      expect(vo.hasSubject()).toBe(true);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = TemplateVO.reconstitute(makeProps());
      expect(vo.id).toBeDefined();
    });
  });

  describe('status predicates', () => {
    it.each([
      ['draft', 'isDraft'],
      ['active', 'isActive'],
      ['inactive', 'isInactive'],
      ['archived', 'isArchived'],
      ['deprecated', 'isDeprecated'],
    ] as const)('%s → %s', (status, pred) => {
      const vo = TemplateVO.reconstitute(makeProps({ status }));
      expect((vo[pred] as () => boolean)()).toBe(true);
    });

    it('isUsable for active', () => {
      expect(TemplateVO.reconstitute(makeProps({ status: 'active' })).isUsable()).toBe(true);
      expect(TemplateVO.reconstitute(makeProps({ status: 'draft' })).isUsable()).toBe(false);
    });

    it('canBeDeleted for draft/archived', () => {
      expect(TemplateVO.reconstitute(makeProps({ status: 'draft' })).canBeDeleted()).toBe(true);
      expect(TemplateVO.reconstitute(makeProps({ status: 'archived' })).canBeDeleted()).toBe(true);
      expect(TemplateVO.reconstitute(makeProps({ status: 'active' })).canBeDeleted()).toBe(false);
    });
  });

  describe('canTransitionTo — state machine', () => {
    it('draft → active/archived', () => {
      const vo = TemplateVO.reconstitute(makeProps({ status: 'draft' }));
      expect(vo.canTransitionTo('active')).toBe(true);
      expect(vo.canTransitionTo('archived')).toBe(true);
    });

    it('active → inactive/deprecated/archived', () => {
      const vo = TemplateVO.reconstitute(makeProps({ status: 'active' }));
      expect(vo.canTransitionTo('inactive')).toBe(true);
      expect(vo.canTransitionTo('deprecated')).toBe(true);
      expect(vo.canTransitionTo('archived')).toBe(true);
    });

    it('archived is terminal', () => {
      expect(TemplateVO.reconstitute(makeProps({ status: 'archived' })).canTransitionTo('active')).toBe(false);
    });
  });

  describe('requiresSubject / hasSubject', () => {
    it('requiresSubject for transactional', () => {
      const vo = TemplateVO.reconstitute(makeProps({ type: NotificationTypeVO.transactional() }));
      expect(vo.requiresSubject()).toBe(true);
    });

    it('requiresSubject for security', () => {
      const vo = TemplateVO.reconstitute(
        makeProps({ type: NotificationTypeVO.security() }),
      );
      expect(vo.requiresSubject()).toBe(true);
    });

    it('requiresSubject false for promotional', () => {
      const vo = TemplateVO.reconstitute(
        makeProps({ type: NotificationTypeVO.promotional() }),
      );
      expect(vo.requiresSubject()).toBe(false);
    });

    it('hasSubject false when missing', () => {
      expect(TemplateVO.reconstitute(makeProps()).hasSubject()).toBe(false);
    });
  });

  describe('requiredVariables', () => {
    it('filters required variables', () => {
      const vo = TemplateVO.reconstitute(
        makeProps({
          variables: [variable('a', true), variable('b', false)],
          body: TemplateContentVO.create('{{a}} {{b}}'),
        }),
      );
      expect(vo.requiredVariables.length).toBe(1);
      expect(vo.requiredVariables[0]?.name).toBe('a');
    });
  });

  describe('withStatus / withVersion', () => {
    const base = TemplateVO.reconstitute(makeProps());

    it('withStatus returns new VO', () => {
      const updated = base.withStatus('archived');
      expect(updated.status).toBe('archived');
    });

    it('withVersion returns new VO', () => {
      const updated = base.withVersion(2);
      expect(updated.version).toBe(2);
    });
  });

  describe('getters', () => {
    const vo = TemplateVO.reconstitute(makeProps());
    it('exposes all properties', () => {
      expect(vo.id).toBeDefined();
      expect(vo.name).toBeDefined();
      expect(vo.slug).toBe('order-confirmation');
      expect(vo.type).toBeDefined();
      expect(vo.status).toBe('active');
      expect(vo.format).toBeDefined();
      expect(vo.subject).toBeUndefined();
      expect(vo.body).toBeDefined();
      expect(vo.variables.length).toBe(1);
      expect(vo.locale).toBe('en');
      expect(vo.version).toBe(1);
    });
  });
});
