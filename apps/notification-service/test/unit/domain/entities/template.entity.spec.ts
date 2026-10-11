/**
 * TemplateEntity — lifecycle tests
 */
import { describe, it, expect } from '@jest/globals';
import { TemplateEntity } from '../../../../src/module/domain/entities/template.entity.js';
import { TemplateNameVO } from '../../../../src/module/domain/value-objects/primitives/template-name.vo.js';
import { TemplateTypeVO } from '../../../../src/module/domain/value-objects/primitives/template-type.vo.js';
import { TemplateCategoryVO } from '../../../../src/module/domain/value-objects/primitives/template-category.vo.js';
import { TemplateLocaleVO } from '../../../../src/module/domain/value-objects/primitives/template-locale.vo.js';
import { FIXED_TEMPLATE_ID, FIXED_USER_ID } from '../../../helpers/test-factories.js';

function buildTemplate(): TemplateEntity {
  return TemplateEntity.create({
    id: FIXED_TEMPLATE_ID,
    now: new Date().toISOString(),
    props: {
      name: TemplateNameVO.create('Order Confirmation'),
      slug: 'order-confirmation',
      type: TemplateTypeVO.email(),
      category: TemplateCategoryVO.order(),
      locale: TemplateLocaleVO.en(),
      subject: 'Order #{{orderNumber}} confirmed',
      body: 'Hi {{customerName}}, your order #{{orderNumber}} is confirmed.',
      variables: [],
      createdBy: FIXED_USER_ID,
    },
  });
}

describe('TemplateEntity', () => {
  it('should create in draft status', () => {
    const entity = buildTemplate();
    expect(entity.isDraft()).toBe(true);
    expect(entity.version).toBe(1);
  });

  it('should require subject for email templates', () => {
    expect(() =>
      TemplateEntity.create({
        id: FIXED_TEMPLATE_ID,
        now: new Date().toISOString(),
        props: {
          name: TemplateNameVO.create('T'),
          slug: 't',
          type: TemplateTypeVO.email(),
          category: TemplateCategoryVO.order(),
          locale: TemplateLocaleVO.en(),
          body: 'body',
          variables: [],
          createdBy: FIXED_USER_ID,
        },
      }),
    ).toThrow();
  });

  it('should activate from draft', () => {
    const entity = buildTemplate();
    entity.activate('admin');
    expect(entity.isActive()).toBe(true);
  });

  it('should not activate from active state', () => {
    const entity = buildTemplate();
    entity.activate('admin');
    expect(() => entity.activate('admin')).toThrow();
  });

  it('should deactivate active template', () => {
    const entity = buildTemplate();
    entity.activate('admin');
    entity.deactivate('admin', 'no longer used');
    expect(entity.status.value).toBe('inactive');
  });

  it('should deprecate', () => {
    const entity = buildTemplate();
    entity.deprecate('admin', undefined, 'replaced');
    expect(entity.isDeprecated()).toBe(true);
  });

  it('should archive', () => {
    const entity = buildTemplate();
    entity.archive('admin');
    expect(entity.isArchived()).toBe(true);
  });

  it('should create version', () => {
    const entity = buildTemplate();
    entity.createVersion('admin');
    expect(entity.version).toBe(2);
  });

  it('should update mutable fields', () => {
    const entity = buildTemplate();
    entity.update(
      { subject: 'New Subject', body: 'New body' },
      'admin',
    );
    expect(entity.subject).toBe('New Subject');
    expect(entity.body).toBe('New body');
  });

  it('should not update archived template', () => {
    const entity = buildTemplate();
    entity.archive('admin');
    expect(() => entity.update({ body: 'x' }, 'admin')).toThrow();
  });
});
