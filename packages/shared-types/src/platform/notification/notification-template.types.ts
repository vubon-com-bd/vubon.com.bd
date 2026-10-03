/**
 * Notification Template Types
 * @module shared-types/platform/notification
 */

import type {
  NOTIFICATION_TEMPLATE_TYPE,
  NOTIFICATION_TEMPLATE_STATUS,
  NOTIFICATION_TEMPLATE_CATEGORY,
} from '@vubon/shared-constants/platform';

export type NotificationTemplateTypeValue =
  (typeof NOTIFICATION_TEMPLATE_TYPE)[keyof typeof NOTIFICATION_TEMPLATE_TYPE];

export type NotificationTemplateStatusValue =
  (typeof NOTIFICATION_TEMPLATE_STATUS)[keyof typeof NOTIFICATION_TEMPLATE_STATUS];

export type NotificationTemplateCategoryValue =
  (typeof NOTIFICATION_TEMPLATE_CATEGORY)[keyof typeof NOTIFICATION_TEMPLATE_CATEGORY];

export interface NotificationTemplate {
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
  readonly variables: readonly TemplateVariable[];
  readonly version: number;
  readonly parentId?: string;
  readonly createdBy: string;
  readonly updatedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface TemplateVariable {
  readonly name: string;
  readonly type: 'string' | 'number' | 'boolean' | 'date' | 'url' | 'email';
  readonly required: boolean;
  readonly defaultValue?: string;
  readonly description?: string;
}

export interface TemplateRenderInput {
  readonly templateId: string;
  readonly data: Readonly<Record<string, unknown>>;
  readonly locale?: string;
}

export interface TemplateRenderResult {
  readonly subject?: string;
  readonly body: string;
  readonly bodyHtml?: string;
  readonly missingVariables?: readonly string[];
}
