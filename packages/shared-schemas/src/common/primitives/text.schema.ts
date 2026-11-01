/**
 * Text Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';
import { VALIDATION } from '@vubon/shared-constants/common';

export const ShortTextSchema = z
  .string()
  .trim()
  .min(1, 'Text is required')
  .max(255, 'Text is too long');

export const DescriptionSchema = z
  .string()
  .trim()
  .max(VALIDATION.DESCRIPTION_MAX_LENGTH, 'Description is too long');

export const CommentSchema = z
  .string()
  .trim()
  .min(1, 'Comment is required')
  .max(VALIDATION.COMMENT_MAX_LENGTH, 'Comment is too long');

export const NoteSchema = z.string().trim().max(2000, 'Note is too long');

export type ShortTextSchemaType = z.infer<typeof ShortTextSchema>;
export type DescriptionSchemaType = z.infer<typeof DescriptionSchema>;
export type CommentSchemaType = z.infer<typeof CommentSchema>;
