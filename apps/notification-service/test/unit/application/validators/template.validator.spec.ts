import { TemplateValidator } from '@application/validators/template.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';
import { TEMPLATE_DTO } from '@application-fixtures/dtos.fixture.js';

describe('TemplateValidator', () => {
  it('validateCreate accepts valid', () => {
    expect(() => TemplateValidator.validateCreate(TEMPLATE_DTO.create)).not.toThrow();
  });

  it('validateCreate rejects empty', () => {
    expect(() => TemplateValidator.validateCreate({})).toThrow(ApplicationValidationError);
  });

  it('validateCreate rejects invalid slug', () => {
    expect(() => TemplateValidator.validateCreate({ ...TEMPLATE_DTO.create, slug: 'Invalid Slug!' }))
      .toThrow(ApplicationValidationError);
  });

  it('validateUpdate accepts valid', () => {
    expect(() => TemplateValidator.validateUpdate(TEMPLATE_DTO.update)).not.toThrow();
  });

  it('validateUpdate rejects empty body', () => {
    expect(() => TemplateValidator.validateUpdate({ templateId: TEMPLATE_DTO.update.templateId }))
      .toThrow(ApplicationValidationError);
  });

  it('validateTest accepts valid', () => {
    expect(() => TemplateValidator.validateTest(TEMPLATE_DTO.test)).not.toThrow();
  });

  it('validateTest rejects missing target', () => {
    expect(() => TemplateValidator.validateTest({ templateId: TEMPLATE_DTO.test.templateId, variables: {} }))
      .toThrow(ApplicationValidationError);
  });

  it('non-Zod error rethrown', () => {
    expect(() => TemplateValidator.validateCreate(null)).toThrow();
  });
});
