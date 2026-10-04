/**
 * KYC Rejected Email Template
 */
export interface KycRejectedEmailVariables {
  readonly userName: string;
  readonly reason: string;
  readonly retryUrl: string;
}

export const KycRejectedEmailTemplate = {
  name: 'kyc-rejected',
  subjectKey: 'email.kycRejected.subject',
  subjectFallback: 'Your KYC submission needs attention',
  variables: {
    userName: '{{user_name}}',
    reason: '{{reason}}',
    retryUrl: '{{retry_url}}',
  },
  buildVariables(input: KycRejectedEmailVariables): Record<string, string> {
    return {
      user_name: input.userName,
      reason: input.reason,
      retry_url: input.retryUrl,
    };
  },
} as const;
