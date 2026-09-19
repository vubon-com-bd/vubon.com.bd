export type KycStatus = 'pending' | 'submitted' | 'approved' | 'rejected';

export interface KycDocument {
  readonly type: 'nid' | 'passport' | 'driving_license' | 'utility_bill';
  readonly frontUrl?: string;
  readonly backUrl?: string;
  readonly selfieUrl?: string;
}

export interface KycSubmissionRequest {
  readonly documents: readonly KycDocument[];
  readonly fullName: string;
  readonly dateOfBirth: string;
  readonly address: string;
}

export interface KycSubmissionResponse {
  readonly submissionId: string;
  readonly status: KycStatus;
  readonly submittedAt: string;
}
