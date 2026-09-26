/**
 * Storage Types
 * @module shared-types/infrastructure
 *
 * File / object storage abstraction।
 */

import type {
  FILE_TYPE,
  IMAGE_FORMAT,
  VIDEO_FORMAT,
  AUDIO_FORMAT,
  DOCUMENT_FORMAT,
} from '@vubon/shared-constants/common';

export type FileType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];
export type ImageFormat = (typeof IMAGE_FORMAT)[keyof typeof IMAGE_FORMAT];
export type VideoFormat = (typeof VIDEO_FORMAT)[keyof typeof VIDEO_FORMAT];
export type AudioFormat = (typeof AUDIO_FORMAT)[keyof typeof AUDIO_FORMAT];
export type DocumentFormat = (typeof DOCUMENT_FORMAT)[keyof typeof DOCUMENT_FORMAT];

export interface StorageFile {
  readonly id: string;
  readonly filename: string;
  readonly originalName: string;
  readonly mimetype: string;
  readonly size: number;
  readonly path: string;
  readonly url: string;
  readonly type: FileType;
  readonly checksum?: string;
  readonly uploadedAt: string;
  readonly uploadedBy?: string;
}

export interface StorageOptions {
  readonly path?: string;
  readonly bucket?: string;
  readonly public?: boolean;
  readonly contentType?: string;
  readonly metadata?: Readonly<Record<string, string>>;
}

export interface StorageUploadResult {
  readonly fileId: string;
  readonly url: string;
  readonly path: string;
  readonly size: number;
  readonly checksum: string;
}

export interface StorageProvider {
  upload(file: unknown, options?: StorageOptions): Promise<StorageUploadResult>;
  delete(fileId: string): Promise<void>;
  getUrl(fileId: string): Promise<string>;
  exists(fileId: string): Promise<boolean>;
}
