/**
 * File Upload/Download API Types
 * @module shared-types/common/api
 */

export interface FileUploadRequest {
  readonly filename: string;
  readonly mimetype: string;
  readonly size: number;
  readonly encoding?: string;
}

export interface FileUploadResponse {
  readonly success: boolean;
  readonly fileId: string;
  readonly url: string;
  readonly size: number;
  readonly mimetype: string;
  readonly uploadedAt: string;
}

export interface FileDownloadRequest {
  readonly fileId: string;
  readonly disposition?: 'inline' | 'attachment';
}
