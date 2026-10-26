import { TemplateValidatorService } from '@domain/services/template-validator.service.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const v = (name: string, required = true) =>
  TemplateVariableVO.create({ name, type: 'string', required });

describe('TemplateValidatorService', () => {
  describe('validate()', () => {
    it('accepts valid template with matching variables', () => {
      const result = TemplateValidatorService.validate({
        body: 'Hi {{name}}',
        declaredVariables: [v('name')],
      });
      expect(result.valid).toBe(true);
    });

    it('rejects undeclared variable', () => {
      const result = TemplateValidatorService.validate({
        body: 'Hi {{unknown}}',
        declaredVariables: [v('name')],
      });
      expect(result.valid).toBe(false);
      expect(result.issues.some((i) => i.code === 'UNDECLARED_VARIABLE')).toBe(true);
    });

    it('warns on unused variable', () => {
      const result = TemplateValidatorService.validate({
        body: 'Hi {{name}}',
        declaredVariables: [v('name'), v('unused')],
      });
      expect(result.issues.some((i) => i.code === 'UNUSED_VARIABLE')).toBe(true);
    });

    it('rejects empty body', () => {
      const result = TemplateValidatorService.validate({
        body: '',
        declaredVariables: [],
      });
      expect(result.valid).toBe(false);
      expect(result.issues.some((i) => i.code === 'EMPTY_BODY')).toBe(true);
    });

    it('detects unbalanced braces', () => {
      const result = TemplateValidatorService.validate({
        body: 'Hi {{name}',
        declaredVariables: [v('name')],
      });
      expect(result.valid).toBe(false);
      expect(result.issues.some((i) => i.code === 'UNBALANCED_BRACES')).toBe(true);
    });

    it('detects script tag by default', () => {
      const result = TemplateValidatorService.validate({
        body: '<script>alert(1)</script>',
        declaredVariables: [],
      });
      expect(result.valid).toBe(false);
      expect(result.issues.some((i) => i.code === 'SCRIPT_TAG')).toBe(true);
    });

    it('allows script tag when allowHtml=true', () => {
      const result = TemplateValidatorService.validate({
        body: 'Hi {{name}}',
        declaredVariables: [v('name')],
        allowHtml: true,
      });
      expect(result.valid).toBe(true);
    });

    it('detects javascript: URL', () => {
      const result = TemplateValidatorService.validate({
        body: 'Click <a href="javascript:void">here</a>',
        declaredVariables: [],
      });
      expect(result.valid).toBe(false);
      expect(result.issues.some((i) => i.code === 'JAVASCRIPT_URL')).toBe(true);
    });

    it('detects iframe tag', () => {
      const result = TemplateValidatorService.validate({
        body: '<iframe src="x"></iframe>',
        declaredVariables: [],
      });
      expect(result.issues.some((i) => i.code === 'IFRAME_TAG')).toBe(true);
    });

    it('detects inline event handler', () => {
      const result = TemplateValidatorService.validate({
        body: '<div onclick="alert(1)">Hi</div>',
        declaredVariables: [],
      });
      expect(result.issues.some((i) => i.code === 'EVENT_HANDLER')).toBe(true);
    });

    it('validates subject when provided', () => {
      const result = TemplateValidatorService.validate({
        body: 'Body',
        subject: 'Hi {{subject_var}}',
        declaredVariables: [],
      });
      expect(result.issues.some((i) => i.code === 'UNDECLARED_VARIABLE')).toBe(true);
    });
  });

  describe('assertValid()', () => {
    it('throws on invalid template', () => {
      expect(() =>
        TemplateValidatorService.assertValid({
          body: '',
          declaredVariables: [],
        }),
      ).toThrow(BusinessRuleError);
    });

    it('does not throw on valid template', () => {
      expect(() =>
        TemplateValidatorService.assertValid({
          body: 'Hi {{name}}',
          declaredVariables: [v('name')],
        }),
      ).not.toThrow();
    });
  });
});
