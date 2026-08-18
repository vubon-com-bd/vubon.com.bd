/**
 * সার্ভে সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * সার্ভে আইডি প্রিফিক্স
 */
export const SURVEY_ID_PREFIX = 'SVY';

/**
 * সার্ভে নম্বর ফরম্যাট
 */
export const SURVEY_NUMBER_FORMAT = 'SVY-{year}{month}{day}-{sequence}';

/**
 * ম্যাক্সিমাম প্রশ্ন পার সার্ভে
 */
export const MAX_QUESTIONS_PER_SURVEY = 50;

/**
 * মিনিমাম প্রশ্ন পার সার্ভে
 */
export const MIN_QUESTIONS_PER_SURVEY = 1;

/**
 * ডিফল্ট সার্ভে টাইমআউট (মিনিটে)
 */
export const DEFAULT_SURVEY_TIMEOUT = 30;

/**
 * সার্ভে রেসপন্স লিমিট
 */
export const SURVEY_RESPONSE_LIMIT = 10000;

/**
 * ডিফল্ট সার্ভে থিম
 */
export const DEFAULT_SURVEY_THEME = 'light';

/**
 * সার্ভে রেসপন্স রেট থ্রেশহোল্ড (%)
 */
export const SURVEY_RESPONSE_RATE_THRESHOLD = 30;

/**
 * সার্ভে অ্যানালিটিক্স রিফ্রেশ টাইম (মিনিটে)
 */
export const SURVEY_ANALYTICS_REFRESH_TIME = 15;

/**
 * সার্ভে টাইপ
 */
export const SURVEY_TYPE = {
  CUSTOMER_SATISFACTION: 'customer_satisfaction',
  PRODUCT_FEEDBACK: 'product_feedback',
  EMPLOYEE_SATISFACTION: 'employee_satisfaction',
  MARKET_RESEARCH: 'market_research',
  EVENT_FEEDBACK: 'event_feedback',
  TRAINING_FEEDBACK: 'training_feedback',
  NPS: 'nps',
  CES: 'ces',
  CSAT: 'csat',
  GENERAL: 'general',
} as const;

/**
 * সার্ভে টাইপের ডিসপ্লে নাম
 */
export const SURVEY_TYPE_DISPLAY_NAMES = {
  [SURVEY_TYPE.CUSTOMER_SATISFACTION]: 'গ্রাহক সন্তুষ্টি',
  [SURVEY_TYPE.PRODUCT_FEEDBACK]: 'পণ্য ফিডব্যাক',
  [SURVEY_TYPE.EMPLOYEE_SATISFACTION]: 'কর্মচারী সন্তুষ্টি',
  [SURVEY_TYPE.MARKET_RESEARCH]: 'বাজার গবেষণা',
  [SURVEY_TYPE.EVENT_FEEDBACK]: 'ইভেন্ট ফিডব্যাক',
  [SURVEY_TYPE.TRAINING_FEEDBACK]: 'প্রশিক্ষণ ফিডব্যাক',
  [SURVEY_TYPE.NPS]: 'এনপিএস',
  [SURVEY_TYPE.CES]: 'সিইএস',
  [SURVEY_TYPE.CSAT]: 'সিএসএটি',
  [SURVEY_TYPE.GENERAL]: 'সাধারণ',
} as const;

/**
 * সার্ভে স্ট্যাটাস
 */
export const SURVEY_STATUS = {
  DRAFT: 'draft',
  ACTIVE: 'active',
  PAUSED: 'paused',
  CLOSED: 'closed',
  ARCHIVED: 'archived',
  SCHEDULED: 'scheduled',
} as const;

/**
 * সার্ভে স্ট্যাটাসের ডিসপ্লে নাম
 */
export const SURVEY_STATUS_DISPLAY_NAMES = {
  [SURVEY_STATUS.DRAFT]: 'খসড়া',
  [SURVEY_STATUS.ACTIVE]: 'সক্রিয়',
  [SURVEY_STATUS.PAUSED]: 'বিরতি',
  [SURVEY_STATUS.CLOSED]: 'বন্ধ',
  [SURVEY_STATUS.ARCHIVED]: 'আর্কাইভড',
  [SURVEY_STATUS.SCHEDULED]: 'নির্ধারিত',
} as const;

/**
 * সার্ভে স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const SURVEY_STATUS_COLORS = {
  [SURVEY_STATUS.DRAFT]: '#95a5a6',
  [SURVEY_STATUS.ACTIVE]: '#2ecc71',
  [SURVEY_STATUS.PAUSED]: '#f39c12',
  [SURVEY_STATUS.CLOSED]: '#e74c3c',
  [SURVEY_STATUS.ARCHIVED]: '#7f8c8d',
  [SURVEY_STATUS.SCHEDULED]: '#3498db',
} as const;

/**
 * সার্ভে প্রশ্ন টাইপ
 */
export const SURVEY_QUESTION_TYPE = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  RADIO: 'radio',
  CHECKBOX: 'checkbox',
  DROPDOWN: 'dropdown',
  RATING: 'rating',
  NPS: 'nps',
  CES: 'ces',
  CSAT: 'csat',
  LIKERT: 'likert',
  DATE: 'date',
  TIME: 'time',
  EMAIL: 'email',
  PHONE: 'phone',
  NUMBER: 'number',
  FILE: 'file',
  MATRIX: 'matrix',
  SLIDER: 'slider',
  RANKING: 'ranking',
  CONSENT: 'consent',
} as const;

/**
 * সার্ভে প্রশ্ন টাইপের ডিসপ্লে নাম
 */
export const SURVEY_QUESTION_TYPE_DISPLAY_NAMES = {
  [SURVEY_QUESTION_TYPE.TEXT]: 'সংক্ষিপ্ত টেক্সট',
  [SURVEY_QUESTION_TYPE.TEXTAREA]: 'দীর্ঘ টেক্সট',
  [SURVEY_QUESTION_TYPE.RADIO]: 'রেডিও',
  [SURVEY_QUESTION_TYPE.CHECKBOX]: 'চেকবক্স',
  [SURVEY_QUESTION_TYPE.DROPDOWN]: 'ড্রপডাউন',
  [SURVEY_QUESTION_TYPE.RATING]: 'রেটিং',
  [SURVEY_QUESTION_TYPE.NPS]: 'এনপিএস',
  [SURVEY_QUESTION_TYPE.CES]: 'সিইএস',
  [SURVEY_QUESTION_TYPE.CSAT]: 'সিএসএটি',
  [SURVEY_QUESTION_TYPE.LIKERT]: 'লাইকার্ট',
  [SURVEY_QUESTION_TYPE.DATE]: 'তারিখ',
  [SURVEY_QUESTION_TYPE.TIME]: 'সময়',
  [SURVEY_QUESTION_TYPE.EMAIL]: 'ইমেইল',
  [SURVEY_QUESTION_TYPE.PHONE]: 'ফোন',
  [SURVEY_QUESTION_TYPE.NUMBER]: 'সংখ্যা',
  [SURVEY_QUESTION_TYPE.FILE]: 'ফাইল আপলোড',
  [SURVEY_QUESTION_TYPE.MATRIX]: 'ম্যাট্রিক্স',
  [SURVEY_QUESTION_TYPE.SLIDER]: 'স্লাইডার',
  [SURVEY_QUESTION_TYPE.RANKING]: 'র্যাঙ্কিং',
  [SURVEY_QUESTION_TYPE.CONSENT]: 'সম্মতি',
} as const;

/**
 * সার্ভে রেসপন্স স্ট্যাটাস
 */
export const SURVEY_RESPONSE_STATUS = {
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  ABANDONED: 'abandoned',
  EXPIRED: 'expired',
} as const;

/**
 * সার্ভে ডিফল্ট সেটিংস
 */
export const SURVEY_DEFAULT_SETTINGS = {
  maxQuestions: MAX_QUESTIONS_PER_SURVEY,
  minQuestions: MIN_QUESTIONS_PER_SURVEY,
  timeout: DEFAULT_SURVEY_TIMEOUT,
  responseLimit: SURVEY_RESPONSE_LIMIT,
  theme: DEFAULT_SURVEY_THEME,
  responseRateThreshold: SURVEY_RESPONSE_RATE_THRESHOLD,
  analyticsRefreshTime: SURVEY_ANALYTICS_REFRESH_TIME,
} as const;

/**
 * সার্ভে ভ্যালিডেশন রুলস
 */
export const SURVEY_VALIDATION_RULES = {
  title: {
    minLength: 5,
    maxLength: 200,
    required: true,
  },
  description: {
    minLength: 0,
    maxLength: 1000,
    required: false,
  },
  questions: {
    maxCount: MAX_QUESTIONS_PER_SURVEY,
    minCount: MIN_QUESTIONS_PER_SURVEY,
  },
  options: {
    minOptions: 2,
    maxOptions: 10,
  },
} as const;

/**
 * সার্ভে ইভেন্ট টাইপ
 */
export const SURVEY_EVENT_TYPES = {
  CREATED: 'survey_created',
  UPDATED: 'survey_updated',
  ACTIVATED: 'survey_activated',
  PAUSED: 'survey_paused',
  CLOSED: 'survey_closed',
  ARCHIVED: 'survey_archived',
  RESPONSE_RECEIVED: 'survey_response_received',
  RESPONSE_COMPLETED: 'survey_response_completed',
} as const;

/**
 * সার্ভে মেট্রিক্স
 */
export const SURVEY_METRICS = {
  TOTAL_RESPONSES: 'total_responses',
  COMPLETED_RESPONSES: 'completed_responses',
  ABANDONED_RESPONSES: 'abandoned_responses',
  RESPONSE_RATE: 'response_rate',
  COMPLETION_RATE: 'completion_rate',
  AVERAGE_SCORE: 'average_score',
  NPS_SCORE: 'nps_score',
  CES_SCORE: 'ces_score',
  CSAT_SCORE: 'csat_score',
} as const;

export type SurveyIdPrefix = typeof SURVEY_ID_PREFIX;
export type SurveyType = (typeof SURVEY_TYPE)[keyof typeof SURVEY_TYPE];
export type SurveyStatus = (typeof SURVEY_STATUS)[keyof typeof SURVEY_STATUS];
export type SurveyQuestionType = (typeof SURVEY_QUESTION_TYPE)[keyof typeof SURVEY_QUESTION_TYPE];
export type SurveyResponseStatus =
  (typeof SURVEY_RESPONSE_STATUS)[keyof typeof SURVEY_RESPONSE_STATUS];
export type SurveyEventType = (typeof SURVEY_EVENT_TYPES)[keyof typeof SURVEY_EVENT_TYPES];
export type SurveyMetric = (typeof SURVEY_METRICS)[keyof typeof SURVEY_METRICS];

export interface SurveyDefaultSettings {
  maxQuestions: number;
  minQuestions: number;
  timeout: number;
  responseLimit: number;
  theme: string;
  responseRateThreshold: number;
  analyticsRefreshTime: number;
}

export interface SurveyValidationRules {
  title: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  description: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  questions: {
    maxCount: number;
    minCount: number;
  };
  options: {
    minOptions: number;
    maxOptions: number;
  };
}

export interface SurveyOption {
  id: string;
  label: string;
  value: string | number;
  order: number;
}

export interface SurveyQuestion {
  id: string;
  type: SurveyQuestionType;
  question: string;
  description?: string;
  options?: SurveyOption[];
  required: boolean;
  order: number;
  validation?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    regex?: string;
  };
  metadata?: Record<string, unknown>;
}

export interface SurveyResponse {
  id: string;
  surveyId: string;
  respondentId?: string;
  email?: string;
  answers: {
    questionId: string;
    value: string | number | string[] | boolean;
  }[];
  status: SurveyResponseStatus;
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  metadata?: Record<string, unknown>;
}

export interface SurveyAnalytics {
  totalResponses: number;
  completedResponses: number;
  abandonedResponses: number;
  responseRate: number;
  completionRate: number;
  averageScore: number;
  npsScore?: number;
  cesScore?: number;
  csatScore?: number;
  questionAnalytics: {
    questionId: string;
    responseCount: number;
    averageScore?: number;
    distribution?: Record<string, number>;
  }[];
  period: string;
}

/**
 * সার্ভে কনফিগারেশন
 */
export const SURVEY_CONFIG = {
  idPrefix: SURVEY_ID_PREFIX,
  numberFormat: SURVEY_NUMBER_FORMAT,
  defaultSettings: SURVEY_DEFAULT_SETTINGS,
  validationRules: SURVEY_VALIDATION_RULES,
  types: SURVEY_TYPE,
  statuses: SURVEY_STATUS,
  questionTypes: SURVEY_QUESTION_TYPE,
  responseStatuses: SURVEY_RESPONSE_STATUS,
  statusColors: SURVEY_STATUS_COLORS,
} as const;
