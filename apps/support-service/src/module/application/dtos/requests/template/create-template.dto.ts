/**
 * CreateTemplateRequestDTO
 * @module support-service/application/dtos/requests/template
 */
import type { SupportTemplateTypeValue } from '@vubon/shared-types/support';

export interface TemplateVariableInput {
  readonly name: string;
  readonly type: 'string' | 'number' | 'boolean' | 'date';
  readonly required: boolean;
  readonly defaultValue?: string;
  readonly description?: string;
}

export interface CreateTemplateRequestDTO {
  readonly name: string;
  readonly slug: string;
  readonly type: SupportTemplateTypeValue;
  readonly locale?: string;
  readonly subject?: string;
  readonly body: string;
  readonly variables?: readonly TemplateVariableInput[];
  readonly createdBy: string;
}
