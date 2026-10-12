/**
 * SubmitVerificationRequestDto — trigger verification process
 * @module vendor-service/application/dtos/requests
 */
export class SubmitVerificationRequestDto {
  vendorId!: string;
  documents!: Array<{
    type: string;
    url: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
    documentNumber?: string;
    issuedAt?: string;
    expiresAt?: string;
  }>;
  idempotencyKey?: string;
}
