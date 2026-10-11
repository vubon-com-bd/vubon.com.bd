import { describe, it, expect } from '@jest/globals';
import { TemplateIdVO } from '../../../../src/module/domain/value-objects/primitives/template-id.vo.js';
import { FIXED_TEMPLATE_ID } from '../../../helpers/test-factories.js';

describe('TemplateIdVO', () => {
  it('create valid UUID', () => expect(TemplateIdVO.create(FIXED_TEMPLATE_ID).value).toBe(FIXED_TEMPLATE_ID));
  it('rejects empty', () => expect(() => TemplateIdVO.create('')).toThrow());
  it('rejects non-UUID', () => expect(() => TemplateIdVO.create('x')).toThrow());
  it('reconstitute', () => expect(TemplateIdVO.reconstitute('any').value).toBe('any'));
});
