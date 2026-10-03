/**
 * KYC Submitted Email Template
 */
export interface KycSubmittedEmailVariables {
  readonly userName: string;
  readonly submittedAt: string;
  readonly estimatedReviewHours: number;
}

export const KycSubmittedEmailTemplate = {
  name: 'kyc-submitted',
  subjectKey: 'email.kycSubmitted.subject',
  subjectFallback: 'Your KYC has been submitted',
  variables: {
    userName: '{{user_name}}',
    submittedAt: '{{submitted_at}}',
    estimatedReviewHours: '{{estimated_review_hours}}',
  },
  buildVariables(input: KycSubmittedEmailVariables): Record<string, string> {
    return {
      user_name: input.userName,
      submitted_at: input.submittedAt,
      estimated_review_hours: String(input.estimatedReviewHours),
    };
  },
} as const;
