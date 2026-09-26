/**
 * TemplateResponseDTO
 * @module support-service/application/dtos/responses
 */
import type {
  SupportTemplateTypeValue,
  SupportTemplateStatusValue,
} from '@vubon/shared-types/support';

export interface TemplateVariableResponseDTO {
  readonly name: string;
  readonly type: 'string' | 'number' | 'boolean' | 'date';
  readonly required: boolean;
  readonly defaultValue?: string;
  readonly description?: string;
}

export interface TemplateResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly type: SupportTemplateTypeValue;
  readonly status: SupportTemplateStatusValue;
  readonly locale: string;
  readonly subject?: string;
  readonly body: string;
  readonly variables: readonly TemplateVariableResponseDTO[];
  readonly version: number;
  readonly createdBy: string;
  readonly updatedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
