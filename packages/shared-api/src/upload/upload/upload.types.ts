export interface UploadFileRequest {
  readonly file: Blob | File;
  readonly filename?: string;
  readonly contentType?: string;
  readonly metadata?: Record<string, string>;
  readonly onProgress?: (progress: UploadProgress) => void;
}

export interface UploadProgress {
  readonly loaded: number;
  readonly total: number;
  readonly percent: number;
}

export interface UploadedFile {
  readonly id: string;
  readonly url: string;
  readonly filename: string;
  readonly contentType: string;
  readonly size: number;
  readonly uploadedAt: string;
  readonly checksum?: string;
}

export interface UploadResponse {
  readonly file: UploadedFile;
}
