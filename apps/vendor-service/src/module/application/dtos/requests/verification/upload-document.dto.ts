export class UploadDocumentRequestDto {
  vendorId!: string;
  type!: string;
  url!: string;
  number?: string;
  expiresAt?: string;
}
