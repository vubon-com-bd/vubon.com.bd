/**
 * Template Response DTOs
 * @module notification-service/application/dtos/responses
 */
import type {
  NotificationTemplateTypeValue,
  NotificationTemplateStatusValue,
  NotificationTemplateCategoryValue,
} from '@vubon/shared-types/platform/notification';

export interface TemplateVariableDTO {
  readonly name: string;
  readonly type: 'string' | 'number' | 'boolean' | 'date' | 'url' | 'email';
  readonly required: boolean;
  readonly defaultValue?: string;
  readonly description?: string;
}

export interface TemplateResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly type: NotificationTemplateTypeValue;
  readonly status: NotificationTemplateStatusValue;
  readonly category: NotificationTemplateCategoryValue;
  readonly locale: string;
  readonly subject?: string;
  readonly body: string;
  readonly bodyHtml?: string;
  readonly variables: readonly TemplateVariableDTO[];
  readonly version: number;
  readonly parentId?: string;
  readonly createdBy: string;
  readonly updatedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface TemplatePublicResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly type: NotificationTemplateTypeValue;
  readonly category: NotificationTemplateCategoryValue;
  readonly locale: string;
}

export interface TemplateListResponseDTO {
  readonly items: readonly TemplateResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface TemplateRenderResponseDTO {
  readonly subject?: string;
  readonly body: string;
  readonly bodyHtml?: string;
  readonly missingVariables: readonly string[];
  readonly resolvedVariables: readonly string[];
}

export interface TemplatePreviewResponseDTO {
  readonly templateId: string;
  readonly subject?: string;
  readonly body: string;
  readonly bodyHtml?: string;
  readonly variables: readonly TemplateVariableDTO[];
}
