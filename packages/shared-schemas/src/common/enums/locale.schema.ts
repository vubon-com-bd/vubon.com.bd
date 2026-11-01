/**
 * Locale Schema
 * @module shared-schemas/common/enums
 */

import { z } from 'zod';
import { LOCALE, LANGUAGE, TIMEZONE } from '@vubon/shared-constants/common';

export const LocaleSchema = z.enum(Object.values(LOCALE) as [string, ...string[]]);

export const LanguageSchema = z.enum(Object.values(LANGUAGE) as [string, ...string[]]);

export const TimezoneSchema = z.enum(Object.values(TIMEZONE) as [string, ...string[]]);

export type LocaleSchemaType = z.infer<typeof LocaleSchema>;
export type LanguageSchemaType = z.infer<typeof LanguageSchema>;
export type TimezoneSchemaType = z.infer<typeof TimezoneSchema>;
