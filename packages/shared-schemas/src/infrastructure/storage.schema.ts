/**
 * Storage Schema
 * @module shared-schemas/infrastructure
 *
 * File/object storage schema।
 */

import { z } from 'zod';
import { FILE_TYPE } from '@vubon/shared-constants/common';

export const FileTypeSchema = z.enum(Object.values(FILE_TYPE) as [string, ...string[]]);

export const StorageFileSchema = z.object({
  id: z.string().min(1),
  filename: z.string().min(1).max(255),
  originalName: z.string().min(1).max(255),
  mimetype: z.string().min(1).max(100),
  size: z.number().int().nonnegative(),
  path: z.string().min(1).max(1024),
  url: z.string().url(),
  type: FileTypeSchema,
  checksum: z.string().optional(),
  uploadedAt: z.string().datetime(),
  uploadedBy: z.string().optional(),
});

export const StorageOptionsSchema = z.object({
  path: z.string().max(1024).optional(),
  bucket: z.string().max(100).optional(),
  public: z.boolean().optional().default(false),
  contentType: z.string().max(100).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
});

export const StorageUploadResultSchema = z.object({
  fileId: z.string().min(1),
  url: z.string().url(),
  path: z.string().min(1),
  size: z.number().int().nonnegative(),
  checksum: z.string().min(1),
});

export type FileTypeSchemaType = z.infer<typeof FileTypeSchema>;
export type StorageFileSchemaType = z.infer<typeof StorageFileSchema>;
export type StorageOptionsSchemaType = z.infer<typeof StorageOptionsSchema>;
export type StorageUploadResultSchemaType = z.infer<typeof StorageUploadResultSchema>;
