/**
 * Upload Document Request DTO
 * @module vendor-service/application/dtos/requests/verification
 */
export interface UploadDocumentRequestDTO {
  readonly vendorId: string;
  readonly type: string;
  readonly documentNumber?: string;
  readonly fileUrl: string;
  readonly fileName: string;
  readonly fileSize: number;
  readonly mimeType: string;
  readonly issuedAt?: string;
  readonly expiresAt?: string;
  readonly idempotencyKey?: string;
  readonly actorId?: string;
}
