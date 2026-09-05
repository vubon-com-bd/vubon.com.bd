/**
 * Approval Config
 * অনুমোদন কনফিগারেশন
 */

export interface ApprovalConfig {
  enabled: boolean;
  status: {
    pending: string;
    approved: string;
    rejected: string;
    on_hold: string;
    needs_revision: string;
  };
  autoApprove: boolean;
  requireDocuments: string[];
  requireVerification: boolean;
  maxAttempts: number;
  reviewTimeout: number;
  defaults: {
    requireDocuments: string[];
    requireVerification: boolean;
    maxAttempts: number;
    reviewTimeout: number;
  };
}

export const approvalConfig: ApprovalConfig = {
  enabled: true,
  status: {
    pending: 'pending',
    approved: 'approved',
    rejected: 'rejected',
    on_hold: 'on_hold',
    needs_revision: 'needs_revision',
  },
  autoApprove: false,
  requireDocuments: ['nid', 'tradeLicense'],
  requireVerification: true,
  maxAttempts: 3,
  reviewTimeout: 7,
  defaults: {
    requireDocuments: ['nid', 'tradeLicense'],
    requireVerification: true,
    maxAttempts: 3,
    reviewTimeout: 7,
  },
} as const;

export type ApprovalConfigType = typeof approvalConfig;
