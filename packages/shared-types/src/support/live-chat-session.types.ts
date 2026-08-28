/**
 * Live Chat Session Types
 * Type definitions for live chat sessions based on shared-constants
 * @module LiveChatSessionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support live-chat
// ============================================================
import {
  // Live Chat Session
  LIVE_CHAT_SESSION,
  LiveChatSessionType,
  LiveChatSessionStatus,
  LiveChatSessionPriority,
  LiveChatSessionEvent,
  liveChatSessionGetTypeLabel,
  liveChatSessionGetStatusLabel,
  liveChatSessionGetPriorityLabel,
  liveChatSessionIsActive,
  liveChatSessionIsEnded,
  liveChatSessionCanTransfer,
  liveChatSessionCanEscalate,
  // Live Chat Status
  LiveChatStatusType,
  LiveChatStatusCategory,
  LiveChatStatusColor,
  LiveChatStatusIcon,
  LiveChatStatusTransition,
} from '@vubon/shared-constants';

// ============================================================
// Live Chat Session Extended Types
// ============================================================

/**
 * Live chat session
 */
export interface LiveChatSession extends BaseEntity, Timestamp {
  id: ID;
  chatId: ID;
  userId: ID;
  agentId?: ID;
  type: LiveChatSessionType;
  status: LiveChatSessionStatus;
  priority: LiveChatSessionPriority;
  isActive: boolean;
  isEnded: boolean;
  canTransfer: boolean;
  canEscalate: boolean;
  startedAt: Date;
  endedAt?: Date;
  duration?: number;
  events: LiveChatSessionEvent[];
  metadata?: Metadata;
}

/**
 * Live chat session filter
 */
export interface LiveChatSessionFilter {
  ids?: ID[];
  chatIds?: ID[];
  userIds?: ID[];
  agentIds?: ID[];
  types?: LiveChatSessionType[];
  statuses?: LiveChatSessionStatus[];
  priorities?: LiveChatSessionPriority[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isEnded?: boolean;
  canTransfer?: boolean;
  canEscalate?: boolean;
  searchTerm?: string;
}

/**
 * Live chat session statistics
 */
export interface LiveChatSessionStatistics {
  chatId: ID;
  totalSessions: number;
  activeSessions: number;
  endedSessions: number;
  byType: Record<LiveChatSessionType, number>;
  byStatus: Record<LiveChatSessionStatus, number>;
  byPriority: Record<LiveChatSessionPriority, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  mostFrequentType: LiveChatSessionType;
  mostFrequentStatus: LiveChatSessionStatus;
  mostFrequentPriority: LiveChatSessionPriority;
  transferRate: number;
  escalationRate: number;
}

/**
 * Live chat session summary
 */
export interface LiveChatSessionSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSessions: number;
  active: number;
  ended: number;
  byType: Record<LiveChatSessionType, number>;
  byStatus: Record<LiveChatSessionStatus, number>;
  byPriority: Record<LiveChatSessionPriority, number>;
  sessionTrend: {
    date: Date;
    total: number;
    active: number;
    ended: number;
  }[];
  topTypes: {
    type: LiveChatSessionType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LiveChatSessionStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: LiveChatSessionPriority;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageDuration: number;
    transferRate: number;
    escalationRate: number;
  };
}

/**
 * Live chat session configuration
 */
export interface LiveChatSessionConfiguration {
  enabled: boolean;
  defaultType: LiveChatSessionType;
  defaultStatus: LiveChatSessionStatus;
  defaultPriority: LiveChatSessionPriority;
  maxSessionsPerUser: number;
  maxSessionsPerAgent: number;
  allowTransfer: boolean;
  allowEscalation: boolean;
  autoEnd: boolean;
  autoEndAfterMinutes: number;
  requireAgent: boolean;
  requireUser: boolean;
  notificationOnStart: boolean;
  notificationOnEnd: boolean;
  notificationOnTransfer: boolean;
  notificationOnEscalation: boolean;
  alertConfig?: LiveChatSessionAlertConfig;
}

/**
 * Live chat session alert configuration
 */
export interface LiveChatSessionAlertConfig {
  enabled: boolean;
  queueOverflowAlert: boolean;
  queueOverflowThreshold: number;
  longWaitAlert: boolean;
  longWaitThreshold: number;
  highPriorityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Live chat session history
 */
export interface LiveChatSessionHistory extends BaseEntity, Timestamp {
  id: ID;
  sessionId: ID;
  chatId: ID;
  userId: ID;
  action:
    | 'start'
    | 'end'
    | 'transfer'
    | 'escalate'
    | 'priority_change'
    | 'status_change'
    | 'agent_join'
    | 'agent_leave';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Live chat session validation
 */
export interface LiveChatSessionValidation {
  isValid: boolean;
  sessionId: ID;
  chatId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Live chat session export
 */
export interface LiveChatSessionExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html';
  filter: LiveChatSessionFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Live Chat Session
  LIVE_CHAT_SESSION,
  LiveChatSessionType,
  LiveChatSessionStatus,
  LiveChatSessionPriority,
  LiveChatSessionEvent,
  liveChatSessionGetTypeLabel,
  liveChatSessionGetStatusLabel,
  liveChatSessionGetPriorityLabel,
  liveChatSessionIsActive,
  liveChatSessionIsEnded,
  liveChatSessionCanTransfer,
  liveChatSessionCanEscalate,
  // Live Chat Status
  LiveChatStatusType,
  LiveChatStatusCategory,
  LiveChatStatusColor,
  LiveChatStatusIcon,
  LiveChatStatusTransition,
};
