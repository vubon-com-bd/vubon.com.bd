import { describe, it, expect } from '@jest/globals';
import { TemplateValidator } from '../../../../src/module/application/validators/template.validator.js';

const validTemplate = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'Order',
  slug: 'order',
  type: 'email',
  status: 'active',
  category: 'order',
  locale: 'en',
  subject: 'S',
  body: 'B',
  variables: [],
  version: 1,
  createdBy: '00000000-0000-0000-0000-000000000001',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('TemplateValidator', () => {
  it('validateTemplate ok', () => {
    expect(() => TemplateValidator.validateTemplate(validTemplate)).not.toThrow();
  });

  it('validateTemplate fails', () => {
    expect(() => TemplateValidator.validateTemplate({})).toThrow();
  });

  it('validateType ok', () => {
    expect(TemplateValidator.validateType('email')).toBe('email');
  });

  it('validateType fails', () => {
    expect(() => TemplateValidator.validateType('bad')).toThrow();
  });
});
