export interface Referral {
  readonly id: string;
  readonly referrerId: string;
  readonly refereeId?: string;
  readonly code: string;
  readonly status: 'pending' | 'completed' | 'expired';
  readonly rewardAmount?: number;
  readonly createdAt: string;
}

export interface ReferralStats {
  readonly totalInvites: number;
  readonly completedReferrals: number;
  readonly pendingReferrals: number;
  readonly totalRewards: number;
  readonly currency: string;
}

export interface InviteReferralRequest {
  readonly email?: string;
  readonly phone?: string;
  readonly message?: string;
}
