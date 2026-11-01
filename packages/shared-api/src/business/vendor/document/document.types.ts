export type VendorDocumentType = 'trade_license' | 'tin' | 'vat' | 'bank_statement' | 'nid';

export interface VendorDocument {
  readonly id: string;
  readonly vendorId: string;
  readonly type: VendorDocumentType;
  readonly fileUrl: string;
  readonly status: 'pending' | 'approved' | 'rejected';
  readonly uploadedAt: string;
}

export interface DocumentListResponse {
  readonly documents: readonly VendorDocument[];
  readonly total: number;
}

export interface UploadDocumentRequest {
  readonly type: VendorDocumentType;
  readonly fileUrl: string;
}
