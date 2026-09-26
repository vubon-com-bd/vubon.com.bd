/**
 * AutoResponseService — Render auto-response from templates
 * @module support-service/domain/services
 */
import { SupportTemplateEntity } from '../entities/support-template.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface AutoResponseInput {
  readonly template: SupportTemplateEntity;
  readonly values: Readonly<Record<string, string | number>>;
}

export interface AutoResponseResult {
  readonly text: string;
  readonly templateId: string;
  readonly usageCount: number;
}

export class AutoResponseService {
  render(input: AutoResponseInput): AutoResponseResult {
    const { template, values } = input;
    if (!template.isActive) {
      throw new BusinessRuleError(
        'Template is inactive',
        'autoResponse.template_inactive',
      );
    }
    if (template.hasPlaceholders && !template.placeholders.every((p) => p in values)) {
      throw new BusinessRuleError(
        'Missing values for template placeholders',
        'autoResponse.missing_values',
      );
    }
    const text = template.render(values);
    return {
      text,
      templateId: template.id.value,
      usageCount: template.usageCount,
    };
  }

  canRender(template: SupportTemplateEntity, values: Readonly<Record<string, unknown>>): boolean {
    if (!template.isActive) return false;
    if (!template.hasPlaceholders) return true;
    return template.placeholders.every((p) => p in values);
  }
}
