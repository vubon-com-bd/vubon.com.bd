/**
 * লাইভ চ্যাট সিস্টেমের মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * চ্যাট আইডি প্রিফিক্স
 */
export const CHAT_ID_PREFIX = 'CHT';

/**
 * চ্যাট নম্বর ফরম্যাট
 */
export const CHAT_NUMBER_FORMAT = 'CHT-{timestamp}-{sequence}';

/**
 * চ্যাট সেশন টাইমআউট (মিনিটে)
 */
export const CHAT_SESSION_TIMEOUT = 30;

/**
 * ম্যাক্সিমাম কনকারেন্ট চ্যাট
 */
export const MAX_CONCURRENT_CHATS = 5;

/**
 * টাইপিং ইন্ডিকেটর টাইমআউট (সেকেন্ডে)
 */
export const TYPING_INDICATOR_TIMEOUT = 5;

/**
 * চ্যাট হ্যান্ডশেক টাইমআউট (সেকেন্ডে)
 */
export const CHAT_HANDSHAKE_TIMEOUT = 10;

/**
 * ডিফল্ট চ্যাট রেসপন্স টাইম (সেকেন্ডে)
 */
export const DEFAULT_CHAT_RESPONSE_TIME = 30;

/**
 * চ্যাট ট্রান্সফার টাইমআউট (সেকেন্ডে)
 */
export const CHAT_TRANSFER_TIMEOUT = 15;

/**
 * চ্যাট রেটিং থ্রেশহোল্ড (%)
 */
export const CHAT_RATING_THRESHOLD = 70;

/**
 * চ্যাট স্ট্যাটাস
 */
export const CHAT_STATUS = {
  INITIATED: 'initiated',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ACTIVE: 'active',
  PAUSED: 'paused',
  TRANSFERRING: 'transferring',
  CLOSED: 'closed',
  ARCHIVED: 'archived',
  TIMED_OUT: 'timed_out',
  REJECTED: 'rejected',
} as const;

/**
 * চ্যাট স্ট্যাটাসের ডিসপ্লে নাম
 */
export const CHAT_STATUS_DISPLAY_NAMES = {
  [CHAT_STATUS.INITIATED]: 'শুরু হয়েছে',
  [CHAT_STATUS.CONNECTING]: 'সংযোগ স্থাপন হচ্ছে',
  [CHAT_STATUS.CONNECTED]: 'সংযুক্ত',
  [CHAT_STATUS.ACTIVE]: 'সক্রিয়',
  [CHAT_STATUS.PAUSED]: 'বিরতিপ্রাপ্ত',
  [CHAT_STATUS.TRANSFERRING]: 'স্থানান্তর হচ্ছে',
  [CHAT_STATUS.CLOSED]: 'বন্ধ',
  [CHAT_STATUS.ARCHIVED]: 'আর্কাইভড',
  [CHAT_STATUS.TIMED_OUT]: 'সময় শেষ',
  [CHAT_STATUS.REJECTED]: 'প্রত্যাখ্যাত',
} as const;

/**
 * চ্যাট স্ট্যাটাসের রঙের কোড (হেক্স)
 */
export const CHAT_STATUS_COLORS = {
  [CHAT_STATUS.INITIATED]: '#95a5a6',
  [CHAT_STATUS.CONNECTING]: '#3498db',
  [CHAT_STATUS.CONNECTED]: '#1abc9c',
  [CHAT_STATUS.ACTIVE]: '#2ecc71',
  [CHAT_STATUS.PAUSED]: '#f39c12',
  [CHAT_STATUS.TRANSFERRING]: '#e67e22',
  [CHAT_STATUS.CLOSED]: '#7f8c8d',
  [CHAT_STATUS.ARCHIVED]: '#95a5a6',
  [CHAT_STATUS.TIMED_OUT]: '#e74c3c',
  [CHAT_STATUS.REJECTED]: '#c0392b',
} as const;

/**
 * চ্যাট টাইপ
 */
export const CHAT_TYPE = {
  USER_SUPPORT: 'user_support',
  SALES: 'sales',
  TECHNICAL: 'technical',
  BILLING: 'billing',
  GENERAL: 'general',
  EMERGENCY: 'emergency',
} as const;

/**
 * চ্যাট টাইপের ডিসপ্লে নাম
 */
export const CHAT_TYPE_DISPLAY_NAMES = {
  [CHAT_TYPE.USER_SUPPORT]: 'ব্যবহারকারী সাপোর্ট',
  [CHAT_TYPE.SALES]: 'বিক্রয়',
  [CHAT_TYPE.TECHNICAL]: 'প্রযুক্তিগত',
  [CHAT_TYPE.BILLING]: 'বিলিং',
  [CHAT_TYPE.GENERAL]: 'সাধারণ',
  [CHAT_TYPE.EMERGENCY]: 'জরুরি',
} as const;

/**
 * চ্যাট প্রায়োরিটি
 */
export const CHAT_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

/**
 * চ্যাট প্রায়োরিটির ডিসপ্লে নাম
 */
export const CHAT_PRIORITY_DISPLAY_NAMES = {
  [CHAT_PRIORITY.LOW]: 'নিম্ন',
  [CHAT_PRIORITY.MEDIUM]: 'মাঝারি',
  [CHAT_PRIORITY.HIGH]: 'উচ্চ',
  [CHAT_PRIORITY.URGENT]: 'জরুরি',
} as const;

/**
 * চ্যাট প্রায়োরিটির রঙের কোড (হেক্স)
 */
export const CHAT_PRIORITY_COLORS = {
  [CHAT_PRIORITY.LOW]: '#3498db',
  [CHAT_PRIORITY.MEDIUM]: '#f39c12',
  [CHAT_PRIORITY.HIGH]: '#e67e22',
  [CHAT_PRIORITY.URGENT]: '#e74c3c',
} as const;

/**
 * চ্যাট ইভেন্ট টাইপ
 */
export const CHAT_EVENT_TYPES = {
  INITIATED: 'chat_initiated',
  CONNECTED: 'chat_connected',
  MESSAGE_SENT: 'message_sent',
  MESSAGE_RECEIVED: 'message_received',
  TYPING_STARTED: 'typing_started',
  TYPING_STOPPED: 'typing_stopped',
  TRANSFERRED: 'chat_transferred',
  CLOSED: 'chat_closed',
  TIMED_OUT: 'chat_timed_out',
  RATED: 'chat_rated',
} as const;

/**
 * চ্যাট রেটিং স্কেল
 */
export const CHAT_RATING_SCALE = {
  MIN: 1,
  MAX: 5,
} as const;

/**
 * চ্যাট রেটিং লেবেল
 */
export const CHAT_RATING_LABELS = {
  1: 'খুব খারাপ',
  2: 'খারাপ',
  3: 'মাঝারি',
  4: 'ভালো',
  5: 'খুব ভালো',
} as const;

/**
 * চ্যাট ডিফল্ট সেটিংস
 */
export const CHAT_DEFAULT_SETTINGS = {
  sessionTimeout: CHAT_SESSION_TIMEOUT,
  maxConcurrentChats: MAX_CONCURRENT_CHATS,
  typingTimeout: TYPING_INDICATOR_TIMEOUT,
  handshakeTimeout: CHAT_HANDSHAKE_TIMEOUT,
  defaultResponseTime: DEFAULT_CHAT_RESPONSE_TIME,
  transferTimeout: CHAT_TRANSFER_TIMEOUT,
  ratingThreshold: CHAT_RATING_THRESHOLD,
} as const;

/**
 * চ্যাট ভ্যালিডেশন রুলস
 */
export const CHAT_VALIDATION_RULES = {
  message: {
    minLength: 1,
    maxLength: 10000,
    required: true,
  },
  attachments: {
    maxFiles: 5,
    maxSizeMB: 10,
    allowedTypes: ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'],
  },
} as const;

export type ChatIdPrefix = typeof CHAT_ID_PREFIX;
export type ChatStatus = (typeof CHAT_STATUS)[keyof typeof CHAT_STATUS];
export type ChatType = (typeof CHAT_TYPE)[keyof typeof CHAT_TYPE];
export type ChatPriority = (typeof CHAT_PRIORITY)[keyof typeof CHAT_PRIORITY];
export type ChatEventType = (typeof CHAT_EVENT_TYPES)[keyof typeof CHAT_EVENT_TYPES];

export interface ChatDefaultSettings {
  sessionTimeout: number;
  maxConcurrentChats: number;
  typingTimeout: number;
  handshakeTimeout: number;
  defaultResponseTime: number;
  transferTimeout: number;
  ratingThreshold: number;
}

export interface ChatValidationRules {
  message: {
    minLength: number;
    maxLength: number;
    required: boolean;
  };
  attachments: {
    maxFiles: number;
    maxSizeMB: number;
    allowedTypes: string[];
  };
}

export interface ChatMessage {
  id: string;
  chatId: string;
  sender: string;
  senderType: 'user' | 'agent' | 'system' | 'bot';
  message: string;
  type: 'text' | 'image' | 'file' | 'system' | 'typing' | 'read_receipt';
  attachments?: string[];
  readAt?: Date;
  deliveredAt?: Date;
  sentAt: Date;
  createdAt: Date;
  metadata?: Record<string, unknown>;
}

export interface ChatSession {
  id: string;
  userId?: string;
  agentId?: string;
  status: ChatStatus;
  type: ChatType;
  priority: ChatPriority;
  startedAt: Date;
  endedAt?: Date;
  lastActivityAt: Date;
  rating?: number;
  ratingComment?: string;
  transferredFrom?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatTransfer {
  id: string;
  chatId: string;
  fromAgent: string;
  toAgent: string;
  reason: string;
  status: 'pending' | 'accepted' | 'rejected' | 'timeout';
  requestedAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
}

/**
 * চ্যাট কনফিগারেশন
 */
export const CHAT_CONFIG = {
  idPrefix: CHAT_ID_PREFIX,
  numberFormat: CHAT_NUMBER_FORMAT,
  defaultSettings: CHAT_DEFAULT_SETTINGS,
  validationRules: CHAT_VALIDATION_RULES,
  statuses: CHAT_STATUS,
  types: CHAT_TYPE,
  priorities: CHAT_PRIORITY,
  ratingScale: CHAT_RATING_SCALE,
  ratingLabels: CHAT_RATING_LABELS,
  statusColors: CHAT_STATUS_COLORS,
  priorityColors: CHAT_PRIORITY_COLORS,
  statusDisplayNames: CHAT_STATUS_DISPLAY_NAMES,
} as const;

/**
 * চ্যাট স্ট্যাটাস ট্রানজিশন রুলস
 */
export const CHAT_STATUS_TRANSITIONS = {
  [CHAT_STATUS.INITIATED]: [CHAT_STATUS.CONNECTING, CHAT_STATUS.REJECTED, CHAT_STATUS.TIMED_OUT],
  [CHAT_STATUS.CONNECTING]: [CHAT_STATUS.CONNECTED, CHAT_STATUS.TIMED_OUT],
  [CHAT_STATUS.CONNECTED]: [CHAT_STATUS.ACTIVE, CHAT_STATUS.CLOSED, CHAT_STATUS.TIMED_OUT],
  [CHAT_STATUS.ACTIVE]: [CHAT_STATUS.PAUSED, CHAT_STATUS.TRANSFERRING, CHAT_STATUS.CLOSED],
  [CHAT_STATUS.PAUSED]: [CHAT_STATUS.ACTIVE, CHAT_STATUS.CLOSED],
  [CHAT_STATUS.TRANSFERRING]: [CHAT_STATUS.ACTIVE, CHAT_STATUS.CLOSED],
  [CHAT_STATUS.CLOSED]: [CHAT_STATUS.ARCHIVED],
  [CHAT_STATUS.ARCHIVED]: [],
  [CHAT_STATUS.TIMED_OUT]: [CHAT_STATUS.CLOSED],
  [CHAT_STATUS.REJECTED]: [CHAT_STATUS.CLOSED],
} as const;

/**
 * চ্যাট মেট্রিক্স
 */
export const CHAT_METRICS = {
  TOTAL: 'total',
  ACTIVE: 'active',
  WAITING: 'waiting',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
  AVG_RESPONSE_TIME: 'avg_response_time',
  AVG_RESOLUTION_TIME: 'avg_resolution_time',
  AVG_RATING: 'avg_rating',
  TRANSFER_RATE: 'transfer_rate',
} as const;

export type ChatMetric = (typeof CHAT_METRICS)[keyof typeof CHAT_METRICS];
