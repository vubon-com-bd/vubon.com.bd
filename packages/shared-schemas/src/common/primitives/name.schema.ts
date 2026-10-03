/**
 * Name Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';
import { VALIDATION } from '@vubon/shared-constants/common';

export const NameSchema = z
  .string()
  .trim()
  .min(VALIDATION.NAME_MIN_LENGTH, 'Name is too short')
  .max(VALIDATION.NAME_MAX_LENGTH, 'Name is too long');

export const UsernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(VALIDATION.USERNAME_MIN_LENGTH, 'Username is too short')
  .max(VALIDATION.USERNAME_MAX_LENGTH, 'Username is too long')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscore');

export const TitleSchema = z
  .string()
  .trim()
  .min(1, 'Title is required')
  .max(VALIDATION.TITLE_MAX_LENGTH, 'Title is too long');

export type NameSchemaType = z.infer<typeof NameSchema>;
export type UsernameSchemaType = z.infer<typeof UsernameSchema>;
export type TitleSchemaType = z.infer<typeof TitleSchema>;
