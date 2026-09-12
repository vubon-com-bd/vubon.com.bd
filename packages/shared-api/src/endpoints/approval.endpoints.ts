/**
 * Approval API endpoint paths.
 * @module shared-api/endpoints/approval
 */

export const APPROVAL_ENDPOINTS = {
  LIST: '/approvals',
  CREATE: '/approvals',
  GET: (approvalId: string) => `/approvals/${approvalId}`,
  UPDATE: (approvalId: string) => `/approvals/${approvalId}`,
  APPROVE: (approvalId: string) => `/approvals/${approvalId}/approve`,
  REJECT: (approvalId: string) => `/approvals/${approvalId}/reject`,
  PENDING: '/approvals/pending',
  HISTORY: '/approvals/history',
  WORKFLOWS: '/approvals/workflows',
  WORKFLOW: (workflowId: string) => `/approvals/workflows/${workflowId}`,
} as const;
