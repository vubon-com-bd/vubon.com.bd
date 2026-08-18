/**
 * লাইভ চ্যাট সেশন সংক্রান্ত কনস্ট্যান্টসমূহ
 */

/**
 * সেশন আইডি প্রিফিক্স
 */
export const SESSION_ID_PREFIX = 'CHS';

/**
 * সেশন নম্বর ফরম্যাট
 */
export const SESSION_NUMBER_FORMAT = 'CHS-{timestamp}-{sequence}';

/**
 * সেশন টাইমআউট (মিনিটে)
 */
export const SESSION_TIMEOUT = 30;

/**
 * সেশন ট্রান্সফার টাইমআউট (সেকেন্ডে)
 */
export const SESSION_TRANSFER_TIMEOUT = 15;

/**
 * সেশন ডিসকানেক্ট টাইমআউট (সেকেন্ডে)
 */
export const SESSION_DISCONNECT_TIMEOUT = 10;

/**
 * সেশন রেটিং টাইমআউট (মিনিটে)
 */
export const SESSION_RATING_TIMEOUT = 5;

/**
 * সেশন আর্কাইভ পিরিয়ড (দিনে)
 */
export const SESSION_ARCHIVE_PERIOD = 90;

/**
 * সেশন সারাংশ জেনারেশন রুলস
 */
export const SESSION_SUMMARY_RULES = {
  maxLength: 500,
  includeMetadata: true,
  includeTranscript: true,
  includeRating: true,
  includeDuration: true,
  includeAgentInfo: true,
  format: 'markdown',
} as const;

/**
 * সেশন টাইপ
 */
export const SESSION_TYPE = {
  USER_SUPPORT: 'user_support',
  SALES: 'sales',
  TECHNICAL: 'technical',
  BILLING: 'billing',
  GENERAL: 'general',
  EMERGENCY: 'emergency',
} as const;

/**
 * সেশন স্ট্যাটাস
 */
export const SESSION_STATUS = {
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
  WAITING: 'waiting',
} as const;

/**
 * সেশন ইভেন্ট টাইপ
 */
export const SESSION_EVENT_TYPES = {
  CREATED: 'session_created',
  CONNECTED: 'session_connected',
  MESSAGE_SENT: 'message_sent',
  MESSAGE_RECEIVED: 'message_received',
  TYPING_STARTED: 'typing_started',
  TYPING_STOPPED: 'typing_stopped',
  TRANSFERRED: 'session_transferred',
  CLOSED: 'session_closed',
  TIMED_OUT: 'session_timed_out',
  RATED: 'session_rated',
  PAUSED: 'session_paused',
  RESUMED: 'session_resumed',
  ARCHIVED: 'session_archived',
} as const;

/**
 * সেশন মেটাডেটা ফরম্যাট
 */
export const SESSION_METADATA_FORMAT = {
  version: '1.0.0',
  fields: [
    'sessionId',
    'userId',
    'agentId',
    'type',
    'status',
    'startedAt',
    'endedAt',
    'duration',
    'rating',
    'transcript',
  ],
} as const;

/**
 * সেশন ডিফল্ট সেটিংস
 */
export const SESSION_DEFAULT_SETTINGS = {
  sessionTimeout: SESSION_TIMEOUT,
  transferTimeout: SESSION_TRANSFER_TIMEOUT,
  disconnectTimeout: SESSION_DISCONNECT_TIMEOUT,
  ratingTimeout: SESSION_RATING_TIMEOUT,
  archivePeriod: SESSION_ARCHIVE_PERIOD,
  summaryRules: SESSION_SUMMARY_RULES,
} as const;

/**
 * সেশন ভ্যালিডেশন রুলস
 */
export const SESSION_VALIDATION_RULES = {
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
  transcript: {
    maxLength: 100000,
  },
} as const;

export type SessionIdPrefix = typeof SESSION_ID_PREFIX;
export type SessionType = (typeof SESSION_TYPE)[keyof typeof SESSION_TYPE];
export type SessionStatus = (typeof SESSION_STATUS)[keyof typeof SESSION_STATUS];
export type SessionEventType = (typeof SESSION_EVENT_TYPES)[keyof typeof SESSION_EVENT_TYPES];

export interface SessionSummaryRules {
  maxLength: number;
  includeMetadata: boolean;
  includeTranscript: boolean;
  includeRating: boolean;
  includeDuration: boolean;
  includeAgentInfo: boolean;
  format: 'markdown' | 'plain' | 'html';
}

export interface SessionMetadataFormat {
  version: string;
  fields: string[];
}

export interface SessionDefaultSettings {
  sessionTimeout: number;
  transferTimeout: number;
  disconnectTimeout: number;
  ratingTimeout: number;
  archivePeriod: number;
  summaryRules: SessionSummaryRules;
}

export interface SessionValidationRules {
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
  transcript: {
    maxLength: number;
  };
}

export interface SessionMessage {
  id: string;
  sessionId: string;
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

export interface SessionTransfer {
  id: string;
  sessionId: string;
  fromAgent: string;
  toAgent: string;
  reason: string;
  status: 'pending' | 'accepted' | 'rejected' | 'timeout';
  requestedAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
}

export interface SessionSummary {
  sessionId: string;
  title: string;
  content: string;
  format: 'markdown' | 'plain' | 'html';
  metadata: {
    duration: number;
    messageCount: number;
    rating?: number;
    agent: string;
    type: SessionType;
    status: SessionStatus;
    startedAt: Date;
    endedAt?: Date;
    tags?: string[];
  };
  transcript: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionAnalytics {
  sessionId: string;
  duration: number;
  messageCount: number;
  agentResponseTime: number;
  userResponseTime: number;
  transferCount: number;
  rating?: number;
  status: SessionStatus;
  createdAt: Date;
  endedAt?: Date;
}

/**
 * সেশন কনফিগারেশন
 */
export const SESSION_CONFIG = {
  idPrefix: SESSION_ID_PREFIX,
  numberFormat: SESSION_NUMBER_FORMAT,
  defaultSettings: SESSION_DEFAULT_SETTINGS,
  validationRules: SESSION_VALIDATION_RULES,
  types: SESSION_TYPE,
  statuses: SESSION_STATUS,
  eventTypes: SESSION_EVENT_TYPES,
  metadataFormat: SESSION_METADATA_FORMAT,
} as const;

/**
 * সেশন স্ট্যাটাস ট্রানজিশন রুলস
 */
export const SESSION_STATUS_TRANSITIONS = {
  [SESSION_STATUS.INITIATED]: [
    SESSION_STATUS.CONNECTING,
    SESSION_STATUS.REJECTED,
    SESSION_STATUS.TIMED_OUT,
  ],
  [SESSION_STATUS.CONNECTING]: [SESSION_STATUS.CONNECTED, SESSION_STATUS.TIMED_OUT],
  [SESSION_STATUS.CONNECTED]: [
    SESSION_STATUS.ACTIVE,
    SESSION_STATUS.CLOSED,
    SESSION_STATUS.TIMED_OUT,
  ],
  [SESSION_STATUS.ACTIVE]: [
    SESSION_STATUS.PAUSED,
    SESSION_STATUS.TRANSFERRING,
    SESSION_STATUS.CLOSED,
  ],
  [SESSION_STATUS.PAUSED]: [SESSION_STATUS.ACTIVE, SESSION_STATUS.CLOSED],
  [SESSION_STATUS.TRANSFERRING]: [SESSION_STATUS.ACTIVE, SESSION_STATUS.CLOSED],
  [SESSION_STATUS.CLOSED]: [SESSION_STATUS.ARCHIVED],
  [SESSION_STATUS.ARCHIVED]: [],
  [SESSION_STATUS.TIMED_OUT]: [SESSION_STATUS.CLOSED],
  [SESSION_STATUS.REJECTED]: [SESSION_STATUS.CLOSED],
  [SESSION_STATUS.WAITING]: [SESSION_STATUS.CONNECTING, SESSION_STATUS.TIMED_OUT],
} as const;

/**
 * সেশন মেট্রিক্স
 */
export const SESSION_METRICS = {
  TOTAL: 'total',
  ACTIVE: 'active',
  WAITING: 'waiting',
  COMPLETED: 'completed',
  CLOSED: 'closed',
  AVG_DURATION: 'avg_duration',
  AVG_RATING: 'avg_rating',
  TRANSFER_RATE: 'transfer_rate',
  AVG_RESPONSE_TIME: 'avg_response_time',
} as const;

export type SessionMetric = (typeof SESSION_METRICS)[keyof typeof SESSION_METRICS];
