/**
 * টিমের স্ট্যাটাস সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * টিম স্ট্যাটাস (বিস্তারিত)
 */
export const TeamStatusExtended = {
  PENDING_APPROVAL: 'PENDING_APPROVAL',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  SUSPENDED: 'SUSPENDED',
  DISSOLVED: 'DISSOLVED',
} as const;

/**
 * টিম স্ট্যাটাস (বিস্তারিত) - ইউনিয়ন টাইপ
 */
export type TeamStatusExtendedValue = (typeof TeamStatusExtended)[keyof typeof TeamStatusExtended];

/**
 * ইনঅ্যাকটিভ রিজন অবজেক্ট
 */
export const InactiveReasons = {
  CLOSED: 'CLOSED',
  MERGED: 'MERGED',
  REORGANIZED: 'REORGANIZED',
  INACTIVITY: 'INACTIVITY',
  POLICY_VIOLATION: 'POLICY_VIOLATION',
} as const;

/**
 * ইনঅ্যাকটিভ রিজন - ইউনিয়ন টাইপ
 */
export type InactiveReasonValue = (typeof InactiveReasons)[keyof typeof InactiveReasons];

/**
 * অটো-আর্কাইভ দিন
 */
export const AutoArchiveDays = 365;

/**
 * টিম স্ট্যাটাস লেবেলসমূহ
 */
export const TeamStatusExtendedLabels: Record<TeamStatusExtendedValue, { en: string; bn: string }> =
  {
    [TeamStatusExtended.PENDING_APPROVAL]: {
      en: 'Pending Approval',
      bn: 'অনুমোদন অপেক্ষমাণ',
    },
    [TeamStatusExtended.ACTIVE]: {
      en: 'Active',
      bn: 'সক্রিয়',
    },
    [TeamStatusExtended.INACTIVE]: {
      en: 'Inactive',
      bn: 'নিষ্ক্রিয়',
    },
    [TeamStatusExtended.SUSPENDED]: {
      en: 'Suspended',
      bn: 'স্থগিত',
    },
    [TeamStatusExtended.DISSOLVED]: {
      en: 'Dissolved',
      bn: 'বিলুপ্ত',
    },
  };

/**
 * টিম স্ট্যাটাস রঙ কোডসমূহ
 */
export const TeamStatusExtendedColors: Record<TeamStatusExtendedValue, string> = {
  [TeamStatusExtended.PENDING_APPROVAL]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [TeamStatusExtended.ACTIVE]: 'bg-green-100 text-green-800 border-green-300',
  [TeamStatusExtended.INACTIVE]: 'bg-gray-100 text-gray-800 border-gray-300',
  [TeamStatusExtended.SUSPENDED]: 'bg-red-100 text-red-800 border-red-300',
  [TeamStatusExtended.DISSOLVED]: 'bg-gray-200 text-gray-900 border-gray-400',
};

/**
 * টিম স্ট্যাটাস ট্রানজিশন রুলস
 */
export const TeamStatusExtendedTransitions: Record<
  TeamStatusExtendedValue,
  TeamStatusExtendedValue[]
> = {
  [TeamStatusExtended.PENDING_APPROVAL]: [
    TeamStatusExtended.ACTIVE,
    TeamStatusExtended.SUSPENDED,
    TeamStatusExtended.DISSOLVED,
  ],
  [TeamStatusExtended.ACTIVE]: [
    TeamStatusExtended.INACTIVE,
    TeamStatusExtended.SUSPENDED,
    TeamStatusExtended.DISSOLVED,
  ],
  [TeamStatusExtended.INACTIVE]: [TeamStatusExtended.ACTIVE, TeamStatusExtended.DISSOLVED],
  [TeamStatusExtended.SUSPENDED]: [TeamStatusExtended.ACTIVE, TeamStatusExtended.DISSOLVED],
  [TeamStatusExtended.DISSOLVED]: [],
};

/**
 * ইনঅ্যাকটিভ রিজন লেবেলসমূহ
 */
export const InactiveReasonLabels: Record<InactiveReasonValue, { en: string; bn: string }> = {
  [InactiveReasons.CLOSED]: {
    en: 'Closed',
    bn: 'বন্ধ',
  },
  [InactiveReasons.MERGED]: {
    en: 'Merged',
    bn: 'একীভূত',
  },
  [InactiveReasons.REORGANIZED]: {
    en: 'Reorganized',
    bn: 'পুনর্গঠিত',
  },
  [InactiveReasons.INACTIVITY]: {
    en: 'Inactivity',
    bn: 'নিষ্ক্রিয়তা',
  },
  [InactiveReasons.POLICY_VIOLATION]: {
    en: 'Policy Violation',
    bn: 'নীতি লঙ্ঘন',
  },
};

/**
 * অ্যাকটিভ টিম স্ট্যাটাসসমূহ
 */
export const ACTIVE_TEAM_STATUSES: TeamStatusExtendedValue[] = [
  TeamStatusExtended.PENDING_APPROVAL,
  TeamStatusExtended.ACTIVE,
] as const;

/**
 * নিষ্ক্রিয় টিম স্ট্যাটাসসমূহ
 */
export const INACTIVE_TEAM_STATUSES: TeamStatusExtendedValue[] = [
  TeamStatusExtended.INACTIVE,
  TeamStatusExtended.SUSPENDED,
  TeamStatusExtended.DISSOLVED,
] as const;

/**
 * টিম অটো-আর্কাইভ সময় (দিন)
 */
export const TeamAutoArchiveInactiveDays = 30;

/**
 * টিম সাসপেনশন রিভিউ সময় (দিন)
 */
export const TeamSuspensionReviewDays = 7;

/**
 * টিম রিঅ্যাক্টিভেট সময় (দিন)
 */
export const TeamReactivateWindowDays = 90;
