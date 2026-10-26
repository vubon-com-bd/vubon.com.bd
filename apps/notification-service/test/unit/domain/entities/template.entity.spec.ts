import { TemplateEntity } from '@domain/entities/template.entity.js';
import { TemplateVO } from '@domain/composites/template.vo.js';
import { TemplateRenderVO } from '@domain/composites/template-render.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { TemplateNameVO } from '@domain/primitives/template-name.vo.js';
import { TemplateContentVO } from '@domain/primitives/template-content.vo.js';
import { TemplateFormatVO } from '@domain/primitives/template-format.vo.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = '2025-01-15T10:00:00.000Z';

const variable = (name: string, required = true) =>
  TemplateVariableVO.create({ name, type: 'string', required });

const makeVO = (overrides: any = {}) =>
  TemplateVO.create({
    id: TemplateIdVO.create(IDS.templateId),
    name: TemplateNameVO.create('Order Confirmation'),
    slug: 'order-confirmation',
    type: NotificationTypeVO.create('promotional'),
    status: 'draft' as const,
    format: TemplateFormatVO.html(),
    body: TemplateContentVO.create('<p>Hi {{userName}}</p>'),
    variables: [variable('userName')],
    locale: 'en',
    version: 1,
    ...overrides,
  });

describe('TemplateEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('creates valid entity with event', () => {
      const entity = TemplateEntity.create({
        id: TemplateIdVO.create(IDS.templateId),
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.id).toBe(IDS.templateId);
      expect(entity.isDraft()).toBe(true);
      expect(entity.version).toBe(1);
      expect(entity.domainEvents.length).toBe(1);
    });

    it('rejects non-draft status', () => {
      expect(() =>
        TemplateEntity.create({
          id: TemplateIdVO.create(IDS.templateId),
          vo: makeVO({ status: 'active' }),
          now: NOW,
        }),
      ).toThrow(ValidationError);
    });

    it('rejects transactional without subject', () => {
      expect(() =>
        TemplateEntity.create({
          id: TemplateIdVO.create(IDS.templateId),
          vo: makeVO({ type: NotificationTypeVO.create('transactional') }),
          now: NOW,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('rebuilds from state', () => {
      const entity = TemplateEntity.reconstitute({
        id: IDS.templateId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO(),
          renderedHistory: [],
        },
      });
      expect(entity.id).toBe(IDS.templateId);
      expect(entity.isDraft()).toBe(true);
    });
  });

  describe('activate()', () => {
    it('transitions draft → active', () => {
      const entity = TemplateEntity.create({
        id: TemplateIdVO.create(IDS.templateId),
        vo: makeVO(),
        now: NOW,
      });
      entity.activate(NOW);
      expect(entity.isActive()).toBe(true);
    });

    it('rejects creation of transactional template without subject', () => {
      // Invariant fires at create() time — this is the correct behavior
      expect(() =>
        TemplateEntity.create({
          id: TemplateIdVO.create(IDS.templateId),
          vo: makeVO({ type: NotificationTypeVO.create('transactional') }),
          now: NOW,
        }),
      ).toThrow(ValidationError);
    });

    it('rejects activate from active', () => {
      const entity = TemplateEntity.reconstitute({
        id: IDS.templateId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: 'active' }), renderedHistory: [] },
      });
      expect(() => entity.activate(NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('deactivate()', () => {
    it('transitions active → inactive', () => {
      const entity = TemplateEntity.reconstitute({
        id: IDS.templateId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: 'active' }), renderedHistory: [] },
      });
      entity.deactivate(NOW);
      expect(entity.isInactive()).toBe(true);
    });
  });

  describe('deprecate()', () => {
    it('transitions active → deprecated', () => {
      const entity = TemplateEntity.reconstitute({
        id: IDS.templateId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: 'active' }), renderedHistory: [] },
      });
      entity.deprecate(NOW);
      expect(entity.isDeprecated()).toBe(true);
    });
  });

  describe('archive()', () => {
    it('transitions draft → archived', () => {
      const entity = TemplateEntity.create({
        id: TemplateIdVO.create(IDS.templateId),
        vo: makeVO(),
        now: NOW,
      });
      entity.archive('no longer needed', NOW);
      expect(entity.isArchived()).toBe(true);
    });

    it('archive from invalid state throws', () => {
      const entity = TemplateEntity.reconstitute({
        id: IDS.templateId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: 'archived' }), renderedHistory: [] },
      });
      expect(() => entity.archive(undefined, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('updateBody()', () => {
    it('updates body and emits event', () => {
      const entity = TemplateEntity.create({
        id: TemplateIdVO.create(IDS.templateId),
        vo: makeVO(),
        now: NOW,
      });
      const eventsBefore = entity.domainEvents.length;
      entity.updateBody(TemplateContentVO.create('new body'), NOW);
      // Method ran successfully — more events emitted
      expect(entity.domainEvents.length).toBeGreaterThan(eventsBefore);
      // Body was updated on the VO
      expect(entity.vo.body.value).toBe('new body');
    });

    it('rejects update on archived', () => {
      const entity = TemplateEntity.reconstitute({
        id: IDS.templateId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: 'archived' }), renderedHistory: [] },
      });
      expect(() => entity.updateBody(TemplateContentVO.create('x'), NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('recordRender()', () => {
    it('appends to history + emits event', () => {
      const entity = TemplateEntity.create({
        id: TemplateIdVO.create(IDS.templateId),
        vo: makeVO(),
        now: NOW,
      });
      const render = TemplateRenderVO.create({
        templateId: TemplateIdVO.create(IDS.templateId),
        body: 'rendered',
        missingVariables: [],
        renderedAt: NOW,
        locale: 'en',
      });
      entity.recordRender(render, NOW);
      expect(entity.renderedHistory.length).toBe(1);
    });
  });

  describe('predicates', () => {
    it('state predicates work', () => {
      const entity = TemplateEntity.create({
        id: TemplateIdVO.create(IDS.templateId),
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.isDraft()).toBe(true);
      expect(entity.isActive()).toBe(false);
      expect(entity.isInactive()).toBe(false);
      expect(entity.isArchived()).toBe(false);
      expect(entity.isDeprecated()).toBe(false);
      expect(entity.isUsable()).toBe(false);
      expect(entity.canBeDeleted()).toBe(true);
    });
  });

  describe('getters', () => {
    it('exposes all fields', () => {
      const entity = TemplateEntity.reconstitute({
        id: IDS.templateId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO(), renderedHistory: [] },
      });
      expect(entity.id).toBe(IDS.templateId);
      expect(entity.templateId.value).toBe(IDS.templateId);
      expect(entity.vo).toBeDefined();
      expect(entity.status).toBe('draft');
      expect(entity.templateVersion).toBe(1);
      expect(entity.version).toBe(0); // AggregateRoot event count
      expect(entity.renderedHistory).toEqual([]);
    });
  });
});
