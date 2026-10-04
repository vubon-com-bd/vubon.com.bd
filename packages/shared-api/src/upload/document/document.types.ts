export interface DocumentUploadOptions {
  readonly allowedTypes?: readonly string[];
  readonly extractText?: boolean;
  readonly scanForViruses?: boolean;
}

export interface DocumentUploadResult {
  readonly id: string;
  readonly url: string;
  readonly filename: string;
  readonly size: number;
  readonly contentType: string;
  readonly extractedText?: string;
  readonly scanStatus?: 'clean' | 'infected' | 'pending';
}
