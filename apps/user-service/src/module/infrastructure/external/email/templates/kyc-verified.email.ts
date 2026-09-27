/**
 * KYC Verified Email Template
 */
export interface KycVerifiedEmailVariables {
  readonly userName: string;
  readonly verifiedAt: string;
}

export const KycVerifiedEmailTemplate = {
  name: 'kyc-verified',
  subjectKey: 'email.kycVerified.subject',
  subjectFallback: 'Your KYC has been verified',
  variables: {
    userName: '{{user_name}}',
    verifiedAt: '{{verified_at}}',
  },
  buildVariables(input: KycVerifiedEmailVariables): Record<string, string> {
    return {
      user_name: input.userName,
      verified_at: input.verifiedAt,
    };
  },
} as const;
