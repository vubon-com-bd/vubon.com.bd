export interface ChunkedInitRequest {
  readonly filename: string;
  readonly size: number;
  readonly contentType: string;
  readonly chunkSize?: number;
}

export interface ChunkedInitResponse {
  readonly uploadId: string;
  readonly chunkSize: number;
  readonly totalChunks: number;
  readonly expiresAt: string;
}

export interface ChunkUploadRequest {
  readonly uploadId: string;
  readonly chunkIndex: number;
  readonly chunk: Blob;
  readonly checksum?: string;
}

export interface ChunkUploadResponse {
  readonly uploadId: string;
  readonly chunkIndex: number;
  readonly received: boolean;
}

export interface ChunkedCompleteRequest {
  readonly uploadId: string;
  readonly checksums?: readonly string[];
}

export interface ChunkedCompleteResponse {
  readonly fileId: string;
  readonly url: string;
  readonly size: number;
}

export interface ChunkedAbortRequest {
  readonly uploadId: string;
}
