import { describe, it, expect } from '@jest/globals';
import { TemplateEntity } from '../../../../src/module/domain/entities/template.entity.js';
import { TemplateNameVO } from '../../../../src/module/domain/value-objects/primitives/template-name.vo.js';
import { TemplateTypeVO } from '../../../../src/module/domain/value-objects/primitives/template-type.vo.js';
import { TemplateCategoryVO } from '../../../../src/module/domain/value-objects/primitives/template-category.vo.js';
import { TemplateLocaleVO } from '../../../../src/module/domain/value-objects/primitives/template-locale.vo.js';
import { TemplateVariableVO } from '../../../../src/module/domain/value-objects/composites/template-variable.vo.js';
import { TemplateVariableNameVO } from '../../../../src/module/domain/value-objects/primitives/template-variable-name.vo.js';
import { NOTIFICATION_TEMPLATE } from '@vubon/shared-constants/platform/notification';
import { FIXED_TEMPLATE_ID, FIXED_USER_ID } from '../../../helpers/test-factories.js';

function build(): TemplateEntity {
  return TemplateEntity.create({
    id: FIXED_TEMPLATE_ID,
    now: new Date().toISOString(),
    props: {
      name: TemplateNameVO.create('Order Confirmation'),
      slug: 'order-confirmation',
      type: TemplateTypeVO.email(),
      category: TemplateCategoryVO.order(),
      locale: TemplateLocaleVO.en(),
      subject: 'Subject {{x}}',
      body: 'Hi {{customerName}}',
      bodyHtml: '<p>Hi {{customerName}}</p>',
      variables: [
        TemplateVariableVO.reconstitute({
          name: TemplateVariableNameVO.create('customerName'),
          type: 'string',
          required: true,
        }),
      ],
      createdBy: FIXED_USER_ID,
    },
  });
}

describe('TemplateEntity deeper coverage', () => {
  it('bodyHtml getter', () => {
    const e = build();
    expect(e.bodyHtml).toBeDefined();
  });

  it('locale getter', () => {
    const e = build();
    expect(e.locale.value).toBe('en');
  });

  it('createdBy getter', () => {
    const e = build();
    expect(e.createdBy).toBe(FIXED_USER_ID);
  });

  it('updatedBy undefined initially', () => {
    const e = build();
    expect(e.updatedBy).toBeUndefined();
  });

  it('hasVariable', () => {
    const e = build();
    expect(e.hasVariable('customerName')).toBe(true);
    expect(e.hasVariable('other')).toBe(false);
  });

  it('requiredVariables', () => {
    const e = build();
    expect(e.requiredVariables().length).toBe(1);
  });

  it('parentId undefined initially', () => {
    const e = build();
    expect(e.parentId).toBeUndefined();
  });

  it('isUsable when active', () => {
    const e = build();
    e.activate('admin');
    expect(e.isUsable()).toBe(true);
  });

  it('update name + category', () => {
    const e = build();
    e.update(
      {
        name: TemplateNameVO.create('New Name'),
        category: TemplateCategoryVO.payment(),
      },
      'admin',
    );
    expect(e.name.value).toBe('New Name');
    expect(e.category.value).toBe('payment');
  });

  it('update bodyHtml', () => {
    const e = build();
    e.update({ bodyHtml: '<p>new</p>' }, 'admin');
    expect(e.bodyHtml).toBe('<p>new</p>');
  });

  it('rejects body too large', () => {
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
          subject: 's',
          body: 'x'.repeat(NOTIFICATION_TEMPLATE.BODY_MAX_LENGTH + 1),
          variables: [],
          createdBy: FIXED_USER_ID,
        },
      }),
    ).toThrow();
  });

  it('rejects too many variables', () => {
    const vars = Array.from(
      { length: NOTIFICATION_TEMPLATE.MAX_VARIABLES + 1 },
      (_, i) => TemplateVariableVO.reconstitute({
        name: TemplateVariableNameVO.create(`v${i}`),
        type: 'string',
        required: false,
      }),
    );
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
          subject: 's',
          body: 'b',
          variables: vars,
          createdBy: FIXED_USER_ID,
        },
      }),
    ).toThrow();
  });

  it('rejects version < 1 via reconstitute props', () => {
    expect(() =>
      TemplateEntity.reconstitute({
        id: FIXED_TEMPLATE_ID,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        props: {
          name: TemplateNameVO.create('T'),
          slug: 't',
          type: TemplateTypeVO.email(),
          status: { value: 'draft', isDraft: () => true, isActive: () => false, isFinal: () => false, isUsable: () => false, isDeprecated: () => false, isArchived: () => false, isInactive: () => true } as never,
          category: TemplateCategoryVO.order(),
          locale: TemplateLocaleVO.en(),
          subject: 's',
          body: 'b',
          variables: [],
          version: 0,
          createdBy: FIXED_USER_ID,
        },
      }),
    ).toThrow();
  });

  it('createVersion increments', () => {
    const e = build();
    e.createVersion('admin');
    e.createVersion('admin');
    expect(e.version).toBe(3);
  });

  it('reconstitute with version', () => {
    const e = build();
    const re = TemplateEntity.reconstitute({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      props: {
        name: e.name,
        slug: e.slug,
        type: e.type,
        status: e.status,
        category: e.category,
        locale: e.locale,
        subject: e.subject,
        body: e.body,
        bodyHtml: e.bodyHtml,
        variables: e.variables,
        version: e.version,
        createdBy: e.createdBy,
      },
      version: 10,
    });
    expect(re.version).toBe(10);
  });
});
