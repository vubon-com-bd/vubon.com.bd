import { TemplateVariableEntity } from '@domain/entities/template-variable.entity.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = '2025-01-15T10:00:00.000Z';

const variable = () =>
  TemplateVariableVO.create({ name: 'userName', type: 'string', required: true });

describe('TemplateVariableEntity (child)', () => {
  describe('create()', () => {
    it('creates with zero usageCount', () => {
      const entity = TemplateVariableEntity.create({
        id: 'v-1',
        templateId: TemplateIdVO.create(IDS.templateId),
        variable: variable(),
        now: NOW,
      });
      expect(entity.usageCount).toBe(0);
    });
  });

  describe('reconstitute()', () => {
    it('restores from DB', () => {
      const entity = TemplateVariableEntity.reconstitute({
        id: 'v-1',
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          templateId: TemplateIdVO.create(IDS.templateId),
          variable: variable(),
          usageCount: 5,
        },
      });
      expect(entity.usageCount).toBe(5);
    });
  });

  describe('incrementUsage()', () => {
    it('increments count', () => {
      const entity = TemplateVariableEntity.create({
        id: 'v-1',
        templateId: TemplateIdVO.create(IDS.templateId),
        variable: variable(),
        now: NOW,
      });
      entity.incrementUsage();
      expect(entity.usageCount).toBe(1);
      entity.incrementUsage();
      expect(entity.usageCount).toBe(2);
    });
  });

  describe('getters', () => {
    it('exposes fields', () => {
      const entity = TemplateVariableEntity.create({
        id: 'v-1',
        templateId: TemplateIdVO.create(IDS.templateId),
        variable: variable(),
        now: NOW,
      });
      expect(entity.templateId.value).toBe(IDS.templateId);
      expect(entity.variable.name).toBe('userName');
    });
  });
});
