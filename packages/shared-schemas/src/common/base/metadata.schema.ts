/**
 * Metadata Schema
 * @module shared-schemas/common/base
 *
 * Generic metadata field — arbitrary key-value storage।
 */

import { z } from 'zod';

export const MetadataSchema = z.record(z.string(), z.unknown());

export const StrictMetadataSchema = z.record(z.string(), z.string());

export const TagsSchema = z.array(z.string().min(1).max(50)).max(20, 'Too many tags');

export type MetadataSchemaType = z.infer<typeof MetadataSchema>;
export type StrictMetadataSchemaType = z.infer<typeof StrictMetadataSchema>;
export type TagsSchemaType = z.infer<typeof TagsSchema>;
