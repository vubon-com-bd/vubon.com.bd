/**
 * Support Template Types
 * @module shared-types/support
 */

import type { BaseEntity } from '../common/base';

export type SupportTemplateTypeValue =
  'email' | 'sms' | 'push' | 'in_app' | 'auto_reply' | 'signature' | 'macro';

export type SupportTemplateStatusValue = 'draft' | 'active' | 'inactive' | 'archived';

export interface SupportTemplate extends BaseEntity<string> {
  readonly name: string;
  readonly slug: string;
  readonly type: SupportTemplateTypeValue;
  readonly status: SupportTemplateStatusValue;
  readonly locale: string;
  readonly subject?: string;
  readonly body: string;
  readonly variables: readonly SupportTemplateVariable[];
  readonly version: number;
  readonly createdBy: string;
  readonly updatedBy?: string;
}

export interface SupportTemplateVariable {
  readonly name: string;
  readonly type: 'string' | 'number' | 'boolean' | 'date';
  readonly required: boolean;
  readonly defaultValue?: string;
  readonly description?: string;
}

export interface SupportTemplatePublic {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly type: SupportTemplateTypeValue;
  readonly status: SupportTemplateStatusValue;
  readonly locale: string;
  readonly version: number;
}
