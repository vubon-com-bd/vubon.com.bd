/**
 * টিকেট সন্তুষ্টি জরিপ সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সন্তুষ্টি স্কোর
 */
export const SATISFACTION_SCORE = {
  VERY_SATISFIED: 'very_satisfied',
  SATISFIED: 'satisfied',
  NEUTRAL: 'neutral',
  DISSATISFIED: 'dissatisfied',
  VERY_DISSATISFIED: 'very_dissatisfied',
} as const;

/**
 * সন্তুষ্টি স্কোরের ডিসপ্লে নাম
 */
export const SATISFACTION_SCORE_DISPLAY_NAMES = {
  [SATISFACTION_SCORE.VERY_SATISFIED]: 'অত্যন্ত সন্তুষ্ট',
  [SATISFACTION_SCORE.SATISFIED]: 'সন্তুষ্ট',
  [SATISFACTION_SCORE.NEUTRAL]: 'নিরপেক্ষ',
  [SATISFACTION_SCORE.DISSATISFIED]: 'অসন্তুষ্ট',
  [SATISFACTION_SCORE.VERY_DISSATISFIED]: 'অত্যন্ত অসন্তুষ্ট',
} as const;

/**
 * সন্তুষ্টি স্কোরের রঙের কোড (হেক্স)
 */
export const SATISFACTION_SCORE_COLORS = {
  [SATISFACTION_SCORE.VERY_SATISFIED]: '#2ecc71', // সবুজ
  [SATISFACTION_SCORE.SATISFIED]: '#27ae60', // গাঢ় সবুজ
  [SATISFACTION_SCORE.NEUTRAL]: '#f39c12', // হলুদ
  [SATISFACTION_SCORE.DISSATISFIED]: '#e67e22', // কমলা
  [SATISFACTION_SCORE.VERY_DISSATISFIED]: '#e74c3c', // লাল
} as const;

/**
 * সন্তুষ্টি স্কোরের আইকন (অনুষঙ্গিক নাম)
 */
export const SATISFACTION_SCORE_ICONS = {
  [SATISFACTION_SCORE.VERY_SATISFIED]: 'smile',
  [SATISFACTION_SCORE.SATISFIED]: 'smile',
  [SATISFACTION_SCORE.NEUTRAL]: 'meh',
  [SATISFACTION_SCORE.DISSATISFIED]: 'frown',
  [SATISFACTION_SCORE.VERY_DISSATISFIED]: 'frown',
} as const;

/**
 * সন্তুষ্টি স্কোরের সংখ্যাসূচক মান
 */
export const SATISFACTION_SCORE_VALUES = {
  [SATISFACTION_SCORE.VERY_SATISFIED]: 5,
  [SATISFACTION_SCORE.SATISFIED]: 4,
  [SATISFACTION_SCORE.NEUTRAL]: 3,
  [SATISFACTION_SCORE.DISSATISFIED]: 2,
  [SATISFACTION_SCORE.VERY_DISSATISFIED]: 1,
} as const;

/**
 * সন্তুষ্টি স্কোরের ইমোজি
 */
export const SATISFACTION_SCORE_EMOJIS = {
  [SATISFACTION_SCORE.VERY_SATISFIED]: '😊',
  [SATISFACTION_SCORE.SATISFIED]: '🙂',
  [SATISFACTION_SCORE.NEUTRAL]: '😐',
  [SATISFACTION_SCORE.DISSATISFIED]: '🙁',
  [SATISFACTION_SCORE.VERY_DISSATISFIED]: '😞',
} as const;

/**
 * ডিফল্ট সন্তুষ্টি জরিপ প্রশ্ন
 */
export const SATISFACTION_DEFAULT_QUESTIONS = {
  OVERALL: 'আপনি আমাদের সাপোর্ট সার্ভিসে কতটুকু সন্তুষ্ট?',
  RESPONSE_TIME: 'আমাদের রেসপন্স টাইম নিয়ে আপনার মতামত কী?',
  RESOLUTION: 'আমাদের সমাধানের মান নিয়ে আপনার মতামত কী?',
  AGENT: 'আমাদের এজেন্টের সাথে আপনার অভিজ্ঞতা কেমন ছিল?',
  RECOMMEND: 'আপনি কি আমাদের সার্ভিস অন্যদের কাছে সুপারিশ করবেন?',
} as const;

/**
 * সন্তুষ্টি জরিপ টাইপ
 */
export const SATISFACTION_SURVEY_TYPES = {
  QUICK: 'quick',
  DETAILED: 'detailed',
  MINIMAL: 'minimal',
  NPS: 'nps',
} as const;

/**
 * সন্তুষ্টি জরিপ টাইপের ডিসপ্লে নাম
 */
export const SATISFACTION_SURVEY_TYPE_DISPLAY_NAMES = {
  [SATISFACTION_SURVEY_TYPES.QUICK]: 'দ্রুত জরিপ',
  [SATISFACTION_SURVEY_TYPES.DETAILED]: 'বিস্তারিত জরিপ',
  [SATISFACTION_SURVEY_TYPES.MINIMAL]: 'সংক্ষিপ্ত জরিপ',
  [SATISFACTION_SURVEY_TYPES.NPS]: 'এনপিএস জরিপ',
} as const;

/**
 * জরিপ পাঠানোর সময়
 */
export const SURVEY_SEND_TIMING = {
  ON_RESOLUTION: 'on_resolution',
  ON_CLOSE: 'on_close',
  AFTER_RESOLUTION: 'after_resolution',
  AFTER_CLOSE: 'after_close',
} as const;

/**
 * জরিপ পাঠানোর সময়ের ডিসপ্লে নাম
 */
export const SURVEY_SEND_TIMING_DISPLAY_NAMES = {
  [SURVEY_SEND_TIMING.ON_RESOLUTION]: 'সমাধানের সময়',
  [SURVEY_SEND_TIMING.ON_CLOSE]: 'ক্লোজের সময়',
  [SURVEY_SEND_TIMING.AFTER_RESOLUTION]: 'সমাধানের পর',
  [SURVEY_SEND_TIMING.AFTER_CLOSE]: 'ক্লোজের পর',
} as const;

/**
 * জরিপ পাঠানোর ডিফল্ট সময় (ঘন্টায়)
 */
export const SURVEY_SEND_DELAY_HOURS = {
  [SURVEY_SEND_TIMING.ON_RESOLUTION]: 0,
  [SURVEY_SEND_TIMING.ON_CLOSE]: 0,
  [SURVEY_SEND_TIMING.AFTER_RESOLUTION]: 1,
  [SURVEY_SEND_TIMING.AFTER_CLOSE]: 24,
} as const;

/**
 * জরিপের স্ট্যাটাস
 */
export const SURVEY_STATUS = {
  PENDING: 'pending',
  SENT: 'sent',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;

/**
 * এনপিএস (Net Promoter Score) ক্যাটাগরি
 */
export const NPS_CATEGORIES = {
  PROMOTER: 'promoter',
  PASSIVE: 'passive',
  DETRACTOR: 'detractor',
} as const;

/**
 * এনপিএস ক্যাটাগরির স্কোর রেঞ্জ
 */
export const NPS_SCORE_RANGES = {
  [NPS_CATEGORIES.PROMOTER]: { min: 9, max: 10 },
  [NPS_CATEGORIES.PASSIVE]: { min: 7, max: 8 },
  [NPS_CATEGORIES.DETRACTOR]: { min: 0, max: 6 },
} as const;

/**
 * এনপিএস ক্যাটাগরির ডিসপ্লে নাম
 */
export const NPS_CATEGORY_DISPLAY_NAMES = {
  [NPS_CATEGORIES.PROMOTER]: 'প্রোমোটার',
  [NPS_CATEGORIES.PASSIVE]: 'প্যাসিভ',
  [NPS_CATEGORIES.DETRACTOR]: 'ডিট্র্যাক্টর',
} as const;

/**
 * সন্তুষ্টি জরিপের ফিডব্যাক টাইপ
 */
export const SATISFACTION_FEEDBACK_TYPES = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  NEUTRAL: 'neutral',
  SUGGESTION: 'suggestion',
  COMPLAINT: 'complaint',
} as const;

/**
 * সন্তুষ্টি জরিপের স্ট্যাটিস্টিক্স
 */
export const SATISFACTION_STATISTICS = {
  AVERAGE_SCORE: 'average_score',
  TOTAL_RESPONSES: 'total_responses',
  RESPONSE_RATE: 'response_rate',
  DISTRIBUTION: 'distribution',
  NPS_SCORE: 'nps_score',
  TREND: 'trend',
} as const;

/**
 * সন্তুষ্টি জরিপের ডিফল্ট সেটিংস
 */
export const SATISFACTION_DEFAULT_SETTINGS = {
  enabled: true,
  surveyType: SATISFACTION_SURVEY_TYPES.QUICK,
  sendTiming: SURVEY_SEND_TIMING.AFTER_RESOLUTION,
  sendDelayHours: SURVEY_SEND_DELAY_HOURS[SURVEY_SEND_TIMING.AFTER_RESOLUTION],
  questions: Object.values(SATISFACTION_DEFAULT_QUESTIONS),
  allowAnonymous: true,
  maxResponses: 1,
  expirationDays: 7,
  reminderEnabled: true,
  reminderDelayHours: 48,
  npsEnabled: true,
  ratingEnabled: true,
  commentEnabled: true,
} as const;

export type SatisfactionScore = (typeof SATISFACTION_SCORE)[keyof typeof SATISFACTION_SCORE];
export type SatisfactionSurveyType =
  (typeof SATISFACTION_SURVEY_TYPES)[keyof typeof SATISFACTION_SURVEY_TYPES];
export type SurveySendTiming = (typeof SURVEY_SEND_TIMING)[keyof typeof SURVEY_SEND_TIMING];
export type SurveyStatus = (typeof SURVEY_STATUS)[keyof typeof SURVEY_STATUS];
export type NPSCategory = (typeof NPS_CATEGORIES)[keyof typeof NPS_CATEGORIES];
export type SatisfactionFeedbackType =
  (typeof SATISFACTION_FEEDBACK_TYPES)[keyof typeof SATISFACTION_FEEDBACK_TYPES];
export type SatisfactionStatistic =
  (typeof SATISFACTION_STATISTICS)[keyof typeof SATISFACTION_STATISTICS];

export type SatisfactionScoreDisplayNames = typeof SATISFACTION_SCORE_DISPLAY_NAMES;
export type SatisfactionScoreColors = typeof SATISFACTION_SCORE_COLORS;
export type SatisfactionScoreIcons = typeof SATISFACTION_SCORE_ICONS;
export type SatisfactionScoreValues = typeof SATISFACTION_SCORE_VALUES;
export type SatisfactionScoreEmojis = typeof SATISFACTION_SCORE_EMOJIS;
export type SatisfactionDefaultQuestions = typeof SATISFACTION_DEFAULT_QUESTIONS;
export type SurveySendTimingDisplayNames = typeof SURVEY_SEND_TIMING_DISPLAY_NAMES;
export type SurveySendDelayHours = typeof SURVEY_SEND_DELAY_HOURS;
export type NPSCategoryDisplayNames = typeof NPS_CATEGORY_DISPLAY_NAMES;
export type NPSScoreRanges = typeof NPS_SCORE_RANGES;
export type SatisfactionDefaultSettings = typeof SATISFACTION_DEFAULT_SETTINGS;

export interface SatisfactionScoreConfig {
  score: SatisfactionScore;
  displayName: string;
  color: string;
  icon: string;
  value: number;
  emoji: string;
}

export interface SurveyQuestion {
  id: string;
  question: string;
  type: 'rating' | 'text' | 'select' | 'nps';
  required: boolean;
  options?: string[];
}

export interface SurveyConfig {
  id: string;
  type: SatisfactionSurveyType;
  displayName: string;
  questions: SurveyQuestion[];
  sendTiming: SurveySendTiming;
  sendDelayHours: number;
  expirationDays: number;
  reminderEnabled: boolean;
  reminderDelayHours: number;
  allowAnonymous: boolean;
  maxResponses: number;
  npsEnabled: boolean;
  ratingEnabled: boolean;
  commentEnabled: boolean;
}

export interface SatisfactionResponse {
  id: string;
  ticketId: string;
  surveyId: string;
  score: SatisfactionScore;
  npsScore?: number;
  comments?: string;
  feedbackType?: SatisfactionFeedbackType;
  respondedAt: Date;
  surveySentAt: Date;
  status: SurveyStatus;
}

/**
 * সন্তুষ্টি স্কোর কনফিগারেশন অবজেক্ট
 */
export const SATISFACTION_SCORE_CONFIGS: Record<SatisfactionScore, SatisfactionScoreConfig> = {
  [SATISFACTION_SCORE.VERY_SATISFIED]: {
    score: SATISFACTION_SCORE.VERY_SATISFIED,
    displayName: SATISFACTION_SCORE_DISPLAY_NAMES[SATISFACTION_SCORE.VERY_SATISFIED],
    color: SATISFACTION_SCORE_COLORS[SATISFACTION_SCORE.VERY_SATISFIED],
    icon: SATISFACTION_SCORE_ICONS[SATISFACTION_SCORE.VERY_SATISFIED],
    value: SATISFACTION_SCORE_VALUES[SATISFACTION_SCORE.VERY_SATISFIED],
    emoji: SATISFACTION_SCORE_EMOJIS[SATISFACTION_SCORE.VERY_SATISFIED],
  },
  [SATISFACTION_SCORE.SATISFIED]: {
    score: SATISFACTION_SCORE.SATISFIED,
    displayName: SATISFACTION_SCORE_DISPLAY_NAMES[SATISFACTION_SCORE.SATISFIED],
    color: SATISFACTION_SCORE_COLORS[SATISFACTION_SCORE.SATISFIED],
    icon: SATISFACTION_SCORE_ICONS[SATISFACTION_SCORE.SATISFIED],
    value: SATISFACTION_SCORE_VALUES[SATISFACTION_SCORE.SATISFIED],
    emoji: SATISFACTION_SCORE_EMOJIS[SATISFACTION_SCORE.SATISFIED],
  },
  [SATISFACTION_SCORE.NEUTRAL]: {
    score: SATISFACTION_SCORE.NEUTRAL,
    displayName: SATISFACTION_SCORE_DISPLAY_NAMES[SATISFACTION_SCORE.NEUTRAL],
    color: SATISFACTION_SCORE_COLORS[SATISFACTION_SCORE.NEUTRAL],
    icon: SATISFACTION_SCORE_ICONS[SATISFACTION_SCORE.NEUTRAL],
    value: SATISFACTION_SCORE_VALUES[SATISFACTION_SCORE.NEUTRAL],
    emoji: SATISFACTION_SCORE_EMOJIS[SATISFACTION_SCORE.NEUTRAL],
  },
  [SATISFACTION_SCORE.DISSATISFIED]: {
    score: SATISFACTION_SCORE.DISSATISFIED,
    displayName: SATISFACTION_SCORE_DISPLAY_NAMES[SATISFACTION_SCORE.DISSATISFIED],
    color: SATISFACTION_SCORE_COLORS[SATISFACTION_SCORE.DISSATISFIED],
    icon: SATISFACTION_SCORE_ICONS[SATISFACTION_SCORE.DISSATISFIED],
    value: SATISFACTION_SCORE_VALUES[SATISFACTION_SCORE.DISSATISFIED],
    emoji: SATISFACTION_SCORE_EMOJIS[SATISFACTION_SCORE.DISSATISFIED],
  },
  [SATISFACTION_SCORE.VERY_DISSATISFIED]: {
    score: SATISFACTION_SCORE.VERY_DISSATISFIED,
    displayName: SATISFACTION_SCORE_DISPLAY_NAMES[SATISFACTION_SCORE.VERY_DISSATISFIED],
    color: SATISFACTION_SCORE_COLORS[SATISFACTION_SCORE.VERY_DISSATISFIED],
    icon: SATISFACTION_SCORE_ICONS[SATISFACTION_SCORE.VERY_DISSATISFIED],
    value: SATISFACTION_SCORE_VALUES[SATISFACTION_SCORE.VERY_DISSATISFIED],
    emoji: SATISFACTION_SCORE_EMOJIS[SATISFACTION_SCORE.VERY_DISSATISFIED],
  },
};

/**
 * ডিফল্ট জরিপ কনফিগারেশন
 */
export const DEFAULT_SURVEY_CONFIGS: Record<SatisfactionSurveyType, SurveyConfig> = {
  [SATISFACTION_SURVEY_TYPES.QUICK]: {
    id: 'quick_survey',
    type: SATISFACTION_SURVEY_TYPES.QUICK,
    displayName: SATISFACTION_SURVEY_TYPE_DISPLAY_NAMES[SATISFACTION_SURVEY_TYPES.QUICK],
    questions: [
      {
        id: 'overall_rating',
        question: SATISFACTION_DEFAULT_QUESTIONS.OVERALL,
        type: 'rating',
        required: true,
      },
    ],
    sendTiming: SURVEY_SEND_TIMING.AFTER_RESOLUTION,
    sendDelayHours: SURVEY_SEND_DELAY_HOURS[SURVEY_SEND_TIMING.AFTER_RESOLUTION],
    expirationDays: 7,
    reminderEnabled: true,
    reminderDelayHours: 48,
    allowAnonymous: true,
    maxResponses: 1,
    npsEnabled: false,
    ratingEnabled: true,
    commentEnabled: false,
  },
  [SATISFACTION_SURVEY_TYPES.DETAILED]: {
    id: 'detailed_survey',
    type: SATISFACTION_SURVEY_TYPES.DETAILED,
    displayName: SATISFACTION_SURVEY_TYPE_DISPLAY_NAMES[SATISFACTION_SURVEY_TYPES.DETAILED],
    questions: [
      {
        id: 'overall_rating',
        question: SATISFACTION_DEFAULT_QUESTIONS.OVERALL,
        type: 'rating',
        required: true,
      },
      {
        id: 'response_time',
        question: SATISFACTION_DEFAULT_QUESTIONS.RESPONSE_TIME,
        type: 'rating',
        required: true,
      },
      {
        id: 'resolution',
        question: SATISFACTION_DEFAULT_QUESTIONS.RESOLUTION,
        type: 'rating',
        required: true,
      },
      {
        id: 'agent',
        question: SATISFACTION_DEFAULT_QUESTIONS.AGENT,
        type: 'rating',
        required: true,
      },
      {
        id: 'comments',
        question: 'আপনার কোনো মন্তব্য বা পরামর্শ থাকলে জানান',
        type: 'text',
        required: false,
      },
    ],
    sendTiming: SURVEY_SEND_TIMING.AFTER_CLOSE,
    sendDelayHours: SURVEY_SEND_DELAY_HOURS[SURVEY_SEND_TIMING.AFTER_CLOSE],
    expirationDays: 14,
    reminderEnabled: true,
    reminderDelayHours: 72,
    allowAnonymous: true,
    maxResponses: 1,
    npsEnabled: false,
    ratingEnabled: true,
    commentEnabled: true,
  },
  [SATISFACTION_SURVEY_TYPES.MINIMAL]: {
    id: 'minimal_survey',
    type: SATISFACTION_SURVEY_TYPES.MINIMAL,
    displayName: SATISFACTION_SURVEY_TYPE_DISPLAY_NAMES[SATISFACTION_SURVEY_TYPES.MINIMAL],
    questions: [
      {
        id: 'overall_rating',
        question: SATISFACTION_DEFAULT_QUESTIONS.OVERALL,
        type: 'rating',
        required: true,
      },
    ],
    sendTiming: SURVEY_SEND_TIMING.ON_RESOLUTION,
    sendDelayHours: SURVEY_SEND_DELAY_HOURS[SURVEY_SEND_TIMING.ON_RESOLUTION],
    expirationDays: 3,
    reminderEnabled: false,
    reminderDelayHours: 0,
    allowAnonymous: true,
    maxResponses: 1,
    npsEnabled: false,
    ratingEnabled: true,
    commentEnabled: false,
  },
  [SATISFACTION_SURVEY_TYPES.NPS]: {
    id: 'nps_survey',
    type: SATISFACTION_SURVEY_TYPES.NPS,
    displayName: SATISFACTION_SURVEY_TYPE_DISPLAY_NAMES[SATISFACTION_SURVEY_TYPES.NPS],
    questions: [
      {
        id: 'nps_score',
        question: 'আপনি কি আমাদের সার্ভিস অন্যদের কাছে সুপারিশ করবেন? (0-10)',
        type: 'nps',
        required: true,
      },
      {
        id: 'reason',
        question: 'আপনার স্কোরের কারণ জানাতে পারেন?',
        type: 'text',
        required: false,
      },
    ],
    sendTiming: SURVEY_SEND_TIMING.AFTER_RESOLUTION,
    sendDelayHours: SURVEY_SEND_DELAY_HOURS[SURVEY_SEND_TIMING.AFTER_RESOLUTION],
    expirationDays: 7,
    reminderEnabled: true,
    reminderDelayHours: 48,
    allowAnonymous: true,
    maxResponses: 1,
    npsEnabled: true,
    ratingEnabled: false,
    commentEnabled: true,
  },
};
