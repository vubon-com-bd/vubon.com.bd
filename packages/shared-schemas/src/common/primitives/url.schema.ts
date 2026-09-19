/**
 * URL Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';
import { REGEX, VALIDATION } from '@vubon/shared-constants/common';

export const UrlSchema = z
  .string()
  .trim()
  .min(1, 'URL is required')
  .max(VALIDATION.URL_MAX_LENGTH, 'URL is too long')
  .regex(REGEX.URL, 'Invalid URL format');

export const OptionalUrlSchema = UrlSchema.optional();

export const ImageUrlSchema = UrlSchema;
export const VideoUrlSchema = UrlSchema;
export const DocumentUrlSchema = UrlSchema;

export type UrlSchemaType = z.infer<typeof UrlSchema>;
