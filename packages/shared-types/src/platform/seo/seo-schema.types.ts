/**
 * SEO Schema Types
 * @module shared-types/platform/seo
 */

import type { SEO_SCHEMA_TYPE, SEO_SCHEMA_FORMAT } from '@vubon/shared-constants/platform';

export type SeoSchemaTypeValue = (typeof SEO_SCHEMA_TYPE)[keyof typeof SEO_SCHEMA_TYPE];

export type SeoSchemaFormatValue = (typeof SEO_SCHEMA_FORMAT)[keyof typeof SEO_SCHEMA_FORMAT];

export interface SeoSchema {
  readonly type: SeoSchemaTypeValue;
  readonly format: SeoSchemaFormatValue;
  readonly data: Readonly<Record<string, unknown>>;
  readonly isValid: boolean;
  readonly validatedAt?: string;
}

export interface SeoSchemaValidation {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
}
