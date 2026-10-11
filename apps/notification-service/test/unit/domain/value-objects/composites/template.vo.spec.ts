import { describe, it, expect } from '@jest/globals';
import { TemplateVO } from '../../../../../src/module/domain/value-objects/composites/template.vo.js';
import { TemplateVariableVO } from '../../../../../src/module/domain/value-objects/composites/template-variable.vo.js';
import { TemplateIdVO } from '../../../../../src/module/domain/value-objects/primitives/template-id.vo.js';
import { TemplateNameVO } from '../../../../../src/module/domain/value-objects/primitives/template-name.vo.js';
import { TemplateTypeVO } from '../../../../../src/module/domain/value-objects/primitives/template-type.vo.js';
import { TemplateStatusVO } from '../../../../../src/module/domain/value-objects/primitives/template-status.vo.js';
import { TemplateCategoryVO } from '../../../../../src/module/domain/value-objects/primitives/template-category.vo.js';
import { TemplateLocaleVO } from '../../../../../src/module/domain/value-objects/primitives/template-locale.vo.js';
import { TemplateVariableNameVO } from '../../../../../src/module/domain/value-objects/primitives/template-variable-name.vo.js';
import { FIXED_TEMPLATE_ID, FIXED_USER_ID } from '../../../../helpers/test-factories.js';

function buildProps(overrides: Record<string, unknown> = {}) {
  return {
    id: TemplateIdVO.create(FIXED_TEMPLATE_ID),
    name: TemplateNameVO.create('Order Confirmation'),
    slug: 'order-confirmation',
    type: TemplateTypeVO.email(),
    status: TemplateStatusVO.active(),
    category: TemplateCategoryVO.order(),
    locale: TemplateLocaleVO.en(),
    subject: 'Order #{{n}}',
    body: 'Body text',
    variables: [],
    version: 1,
    createdBy: FIXED_USER_ID,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('TemplateVO', () => {
  it('create valid', () => {
    const vo = TemplateVO.create(buildProps());
    expect(vo.slug).toBe('order-confirmation');
    expect(vo.isUsable()).toBe(true);
  });
  it('rejects empty body', () => {
    expect(() => TemplateVO.create(buildProps({ body: '' }))).toThrow();
  });
  it('rejects email without subject', () => {
    expect(() => TemplateVO.create(buildProps({ subject: undefined }))).toThrow();
  });
  it('rejects version < 1', () => {
    expect(() => TemplateVO.create(buildProps({ version: 0 }))).toThrow();
  });
  it('hasVariable checks by name', () => {
    const vo = TemplateVO.reconstitute(buildProps({
      variables: [TemplateVariableVO.reconstitute({
        name: TemplateVariableNameVO.create('orderId'),
        type: 'string',
        required: true,
      })],
    }));
    expect(vo.hasVariable('orderId')).toBe(true);
    expect(vo.hasVariable('missing')).toBe(false);
  });
  it('requiredVariables filters required', () => {
    const vo = TemplateVO.reconstitute(buildProps({
      variables: [
        TemplateVariableVO.reconstitute({ name: TemplateVariableNameVO.create('a'), type: 'string', required: true }),
        TemplateVariableVO.reconstitute({ name: TemplateVariableNameVO.create('b'), type: 'string', required: false }),
      ],
    }));
    expect(vo.requiredVariables().length).toBe(1);
  });
  it('non-email skips subject validation', () => {
    const vo = TemplateVO.create(buildProps({
      type: TemplateTypeVO.sms(),
      subject: undefined,
    }));
    expect(vo.type.isSms()).toBe(true);
  });
});
