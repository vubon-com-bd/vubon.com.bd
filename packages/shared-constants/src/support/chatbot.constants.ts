/**
 * চ্যাটবট সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * চ্যাটবট আইডি প্রিফিক্স
 */
export const CHATBOT_ID_PREFIX = 'CB';

/**
 * চ্যাটবট নম্বর ফরম্যাট
 */
export const CHATBOT_NUMBER_FORMAT = 'CB-{type}-{sequence}';

/**
 * ডিফল্ট চ্যাটবট নাম
 */
export const DEFAULT_CHATBOT_NAME = 'Vubon Assistant';

/**
 * চ্যাটবট টাইমআউট (মিনিটে)
 */
export const CHATBOT_TIMEOUT = 15;

/**
 * চ্যাটবট মেসেজ রেসপন্স টাইম (সেকেন্ডে)
 */
export const CHATBOT_RESPONSE_TIME = 2;

/**
 * চ্যাটবট ম্যাক্স কনভার্সেশন লেন্থ (মেসেজ সংখ্যা)
 */
export const CHATBOT_MAX_CONVERSATION_LENGTH = 100;

/**
 * চ্যাটবট লার্নিং রেট (0-1)
 */
export const CHATBOT_LEARNING_RATE = 0.1;

/**
 * চ্যাটবট কনফিডেন্স থ্রেশহোল্ড (%)
 */
export const CHATBOT_CONFIDENCE_THRESHOLD = 60;

/**
 * চ্যাটবট ফলব্যাক রেসপন্স
 */
export const CHATBOT_FALLBACK_RESPONSE =
  'আমি আপনার প্রশ্নের উত্তর দিতে পারছি না। দয়া করে অন্য ভাবে জিজ্ঞাসা করুন অথবা সাপোর্ট টিমের সাথে যোগাযোগ করুন।';

/**
 * চ্যাটবট টাইপ
 */
export const CHATBOT_TYPE = {
  SUPPORT: 'support',
  SALES: 'sales',
  TECHNICAL: 'technical',
  GENERAL: 'general',
  ONBOARDING: 'onboarding',
  FEEDBACK: 'feedback',
  FAQ: 'faq',
  SURVEY: 'survey',
} as const;

/**
 * চ্যাটবট টাইপের ডিসপ্লে নাম
 */
export const CHATBOT_TYPE_DISPLAY_NAMES = {
  [CHATBOT_TYPE.SUPPORT]: 'সাপোর্ট বট',
  [CHATBOT_TYPE.SALES]: 'সেলস বট',
  [CHATBOT_TYPE.TECHNICAL]: 'টেকনিক্যাল বট',
  [CHATBOT_TYPE.GENERAL]: 'জেনারেল বট',
  [CHATBOT_TYPE.ONBOARDING]: 'অনবোর্ডিং বট',
  [CHATBOT_TYPE.FEEDBACK]: 'ফিডব্যাক বট',
  [CHATBOT_TYPE.FAQ]: 'এফএকিউ বট',
  [CHATBOT_TYPE.SURVEY]: 'সার্ভে বট',
} as const;

/**
 * চ্যাটবট স্ট্যাটাস
 */
export const CHATBOT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  TRAINING: 'training',
  MAINTENANCE: 'maintenance',
  ERROR: 'error',
  DEPRECATED: 'deprecated',
} as const;

/**
 * চ্যাটবট স্ট্যাটাসের ডিসপ্লে নাম
 */
export const CHATBOT_STATUS_DISPLAY_NAMES = {
  [CHATBOT_STATUS.ACTIVE]: 'সক্রিয়',
  [CHATBOT_STATUS.INACTIVE]: 'নিষ্ক্রিয়',
  [CHATBOT_STATUS.TRAINING]: 'প্রশিক্ষণরত',
  [CHATBOT_STATUS.MAINTENANCE]: 'রক্ষণাবেক্ষণ',
  [CHATBOT_STATUS.ERROR]: 'ত্রুটি',
  [CHATBOT_STATUS.DEPRECATED]: 'অব্যবহৃত',
} as const;

/**
 * চ্যাটবট স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const CHATBOT_STATUS_COLORS = {
  [CHATBOT_STATUS.ACTIVE]: '#2ecc71',
  [CHATBOT_STATUS.INACTIVE]: '#95a5a6',
  [CHATBOT_STATUS.TRAINING]: '#3498db',
  [CHATBOT_STATUS.MAINTENANCE]: '#f39c12',
  [CHATBOT_STATUS.ERROR]: '#e74c3c',
  [CHATBOT_STATUS.DEPRECATED]: '#7f8c8d',
} as const;

/**
 * চ্যাটবট মেসেজ টাইপ
 */
export const CHATBOT_MESSAGE_TYPE = {
  TEXT: 'text',
  QUICK_REPLY: 'quick_reply',
  BUTTON: 'button',
  CAROUSEL: 'carousel',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  FILE: 'file',
  SYSTEM: 'system',
  TYPING: 'typing',
} as const;

/**
 * চ্যাটবট ইভেন্ট টাইপ
 */
export const CHATBOT_EVENT_TYPES = {
  MESSAGE_RECEIVED: 'message_received',
  MESSAGE_SENT: 'message_sent',
  INTENT_DETECTED: 'intent_detected',
  ENTITY_EXTRACTED: 'entity_extracted',
  FALLBACK_TRIGGERED: 'fallback_triggered',
  CONVERSATION_STARTED: 'conversation_started',
  CONVERSATION_ENDED: 'conversation_ended',
  USER_FEEDBACK: 'user_feedback',
  TRAINING_DATA_ADDED: 'training_data_added',
} as const;

/**
 * চ্যাটবট ডিফল্ট সেটিংস
 */
export const CHATBOT_DEFAULT_SETTINGS = {
  defaultName: DEFAULT_CHATBOT_NAME,
  timeout: CHATBOT_TIMEOUT,
  responseTime: CHATBOT_RESPONSE_TIME,
  maxConversationLength: CHATBOT_MAX_CONVERSATION_LENGTH,
  learningRate: CHATBOT_LEARNING_RATE,
  confidenceThreshold: CHATBOT_CONFIDENCE_THRESHOLD,
  fallbackResponse: CHATBOT_FALLBACK_RESPONSE,
} as const;

/**
 * চ্যাটবট ভ্যালিডেশন রুলস
 */
export const CHATBOT_VALIDATION_RULES = {
  name: {
    minLength: 3,
    maxLength: 50,
    required: true,
  },
  message: {
    minLength: 1,
    maxLength: 10000,
    required: true,
  },
  trainingData: {
    minCount: 10,
    maxCount: 10000,
  },
  intent: {
    minLength: 3,
    maxLength: 50,
    required: true,
  },
} as const;

/**
 * চ্যাটবট মেট্রিক্স
 */
export const CHATBOT_METRICS = {
  TOTAL_CONVERSATIONS: 'total_conversations',
  TOTAL_MESSAGES: 'total_messages',
  AVG_RESPONSE_TIME: 'avg_response_time',
  INTENT_RECOGNITION_RATE: 'intent_recognition_rate',
  FALLBACK_RATE: 'fallback_rate',
  USER_SATISFACTION: 'user_satisfaction',
  ACTIVE_USERS: 'active_users',
} as const;

export type ChatbotIdPrefix = typeof CHATBOT_ID_PREFIX;
export type ChatbotType = (typeof CHATBOT_TYPE)[keyof typeof CHATBOT_TYPE];
export type ChatbotStatus = (typeof CHATBOT_STATUS)[keyof typeof CHATBOT_STATUS];
export type ChatbotMessageType = (typeof CHATBOT_MESSAGE_TYPE)[keyof typeof CHATBOT_MESSAGE_TYPE];
export type ChatbotEventType = (typeof CHATBOT_EVENT_TYPES)[keyof typeof CHATBOT_EVENT_TYPES];
export type ChatbotMetric = (typeof CHATBOT_METRICS)[keyof typeof CHATBOT_METRICS];

export interface ChatbotDefaultSettings {
  defaultName: string;
  timeout: number;
  responseTime: number;
  maxConversationLength: number;
  learningRate: number;
  confidenceThreshold: number;
  fallbackResponse: string;
}

export interface ChatbotValidationRules {
  name: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  message: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  trainingData: {
    minCount: number;
    maxCount: number;
  };
  intent: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
}

export interface ChatbotEntity {
  id: string;
  name: string;
  type: string;
  values: string[];
  synonyms?: Record<string, string[]>;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatbotConversation {
  id: string;
  chatbotId: string;
  userId?: string;
  sessionId: string;
  messages: {
    id: string;
    sender: 'user' | 'bot' | 'system';
    message: string;
    type: ChatbotMessageType;
    intent?: string;
    entities?: Record<string, string>;
    timestamp: Date;
  }[];
  status: 'active' | 'ended' | 'timeout';
  startedAt: Date;
  endedAt?: Date;
  feedback?: {
    rating: number;
    comment?: string;
  };
  metadata?: Record<string, unknown>;
}

export interface ChatbotTrainingData {
  id: string;
  chatbotId: string;
  intent: string;
  examples: string[];
  responses: string[];
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatbotAnalytics {
  chatbotId: string;
  totalConversations: number;
  totalMessages: number;
  avgResponseTime: number;
  intentRecognitionRate: number;
  fallbackRate: number;
  userSatisfaction: number;
  activeUsers: number;
  period: string;
  intents: {
    name: string;
    count: number;
    rate: number;
  }[];
}

/**
 * চ্যাটবট কনফিগারেশন
 */
export const CHATBOT_CONFIG = {
  idPrefix: CHATBOT_ID_PREFIX,
  numberFormat: CHATBOT_NUMBER_FORMAT,
  defaultSettings: CHATBOT_DEFAULT_SETTINGS,
  validationRules: CHATBOT_VALIDATION_RULES,
  types: CHATBOT_TYPE,
  statuses: CHATBOT_STATUS,
  messageTypes: CHATBOT_MESSAGE_TYPE,
  eventTypes: CHATBOT_EVENT_TYPES,
  statusColors: CHATBOT_STATUS_COLORS,
} as const;

/**
 * চ্যাটবট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const CHATBOT_STATUS_TRANSITIONS = {
  [CHATBOT_STATUS.ACTIVE]: ['inactive', 'maintenance', 'deprecated'],
  [CHATBOT_STATUS.INACTIVE]: ['active', 'training', 'deprecated'],
  [CHATBOT_STATUS.TRAINING]: ['active', 'inactive', 'error'],
  [CHATBOT_STATUS.MAINTENANCE]: ['active', 'inactive'],
  [CHATBOT_STATUS.ERROR]: ['inactive', 'training'],
  [CHATBOT_STATUS.DEPRECATED]: ['inactive'],
} as const;
