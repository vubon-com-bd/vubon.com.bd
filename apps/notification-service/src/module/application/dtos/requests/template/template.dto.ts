/**
 * Template Request DTOs
 * @module notification-service/application/dtos/requests/template
 */
import type {
  NotificationTemplateTypeValue,
  NotificationTemplateCategoryValue,
} from '@vubon/shared-types/platform/notification';

export interface TemplateVariableInputDTO {
  readonly name: string;
  readonly type: 'string' | 'number' | 'boolean' | 'date' | 'url' | 'email';
  readonly required: boolean;
  readonly defaultValue?: string;
  readonly description?: string;
}

export interface CreateTemplateRequestDTO {
  readonly name: string;
  readonly slug: string;
  readonly type: NotificationTemplateTypeValue;
  readonly category: NotificationTemplateCategoryValue;
  readonly locale: string;
  readonly subject?: string;
  readonly body: string;
  readonly bodyHtml?: string;
  readonly variables: readonly TemplateVariableInputDTO[];
}

export interface UpdateTemplateRequestDTO {
  readonly templateId: string;
  readonly name?: string;
  readonly category?: NotificationTemplateCategoryValue;
  readonly subject?: string;
  readonly body?: string;
  readonly bodyHtml?: string;
  readonly variables?: readonly TemplateVariableInputDTO[];
}

export interface RenderTemplateRequestDTO {
  readonly templateId: string;
  readonly data: Readonly<Record<string, unknown>>;
  readonly locale?: string;
}

export interface PreviewTemplateRequestDTO {
  readonly templateId: string;
  readonly sampleData?: Readonly<Record<string, unknown>>;
}

export interface GetTemplateRequestDTO {
  readonly templateId: string;
}

export interface GetTemplateBySlugRequestDTO {
  readonly slug: string;
  readonly locale?: string;
}

export interface ListTemplatesRequestDTO {
  readonly filter?: {
    readonly type?: string;
    readonly status?: string;
    readonly category?: string;
    readonly locale?: string;
    readonly search?: string;
  };
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'version';
  readonly sortDir?: 'asc' | 'desc';
}

export interface ActivateTemplateRequestDTO {
  readonly templateId: string;
}

export interface DeactivateTemplateRequestDTO {
  readonly templateId: string;
  readonly reason?: string;
}

export interface DeprecateTemplateRequestDTO {
  readonly templateId: string;
  readonly replacementTemplateId?: string;
  readonly reason?: string;
}

export interface ArchiveTemplateRequestDTO {
  readonly templateId: string;
}

export interface CreateTemplateVersionRequestDTO {
  readonly templateId: string;
}
