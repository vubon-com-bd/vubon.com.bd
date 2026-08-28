/**
 * Live Chat Types
 * Type definitions for live chat based on shared-constants
 * @module LiveChatTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants support live-chat
// ============================================================
import {
  // Live Chat Core
  LIVE_CHAT,
  LiveChatType,
  LiveChatStatus,
  LiveChatChannel,
  LiveChatTransferReason,
  liveChatGetTypeLabel,
  liveChatGetStatusLabel,
  liveChatGetChannelLabel,
  liveChatIsActive,
  liveChatIsEnded,
  liveChatCanTransfer,
  liveChatCanEscalate,
  // Live Chat Status
  LIVE_CHAT_STATUS,
  LiveChatStatusType,
  LiveChatStatusCategory,
  LiveChatStatusColor,
  LiveChatStatusIcon,
  LiveChatStatusTransition,
  liveChatStatusGetLabel,
  liveChatStatusIsActive,
  liveChatStatusIsEnded,
  liveChatStatusGetCategory,
  liveChatStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Live Chat Extended Types
// ============================================================

/**
 * Live chat
 */
export interface LiveChat extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  agentId?: ID;
  type: LiveChatType;
  status: LiveChatStatus;
  channel: LiveChatChannel;
  transferReason?: LiveChatTransferReason;
  isActive: boolean;
  isEnded: boolean;
  canTransfer: boolean;
  canEscalate: boolean;
  startedAt: Date;
  endedAt?: Date;
  duration?: number;
  metadata?: Metadata;
}

/**
 * Live chat filter
 */
export interface LiveChatFilter {
  ids?: ID[];
  userIds?: ID[];
  agentIds?: ID[];
  types?: LiveChatType[];
  statuses?: LiveChatStatus[];
  channels?: LiveChatChannel[];
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
 * Live chat statistics
 */
export interface LiveChatStatistics {
  totalChats: number;
  activeChats: number;
  endedChats: number;
  byType: Record<LiveChatType, number>;
  byStatus: Record<LiveChatStatus, number>;
  byChannel: Record<LiveChatChannel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  mostFrequentType: LiveChatType;
  mostFrequentStatus: LiveChatStatus;
  mostFrequentChannel: LiveChatChannel;
  transferRate: number;
  escalationRate: number;
}

/**
 * Live chat summary
 */
export interface LiveChatSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalChats: number;
  active: number;
  ended: number;
  byType: Record<LiveChatType, number>;
  byStatus: Record<LiveChatStatus, number>;
  byChannel: Record<LiveChatChannel, number>;
  chatTrend: {
    date: Date;
    total: number;
    active: number;
    ended: number;
  }[];
  topTypes: {
    type: LiveChatType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LiveChatStatus;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: LiveChatChannel;
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
 * Live chat configuration
 */
export interface LiveChatConfiguration {
  enabled: boolean;
  defaultType: LiveChatType;
  defaultStatus: LiveChatStatus;
  defaultChannel: LiveChatChannel;
  maxChatsPerAgent: number;
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
  alertConfig?: LiveChatAlertConfig;
}

/**
 * Live chat alert configuration
 */
export interface LiveChatAlertConfig {
  enabled: boolean;
  queueOverflowAlert: boolean;
  queueOverflowThreshold: number;
  longWaitAlert: boolean;
  longWaitThreshold: number;
  agentUnavailableAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Live chat history
 */
export interface LiveChatHistory extends BaseEntity, Timestamp {
  id: ID;
  chatId: ID;
  userId: ID;
  action:
    | 'start'
    | 'end'
    | 'transfer'
    | 'escalate'
    | 'agent_join'
    | 'agent_leave'
    | 'user_join'
    | 'user_leave';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Live chat validation
 */
export interface LiveChatValidation {
  isValid: boolean;
  chatId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Live chat export
 */
export interface LiveChatExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html';
  filter: LiveChatFilter;
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
  // Live Chat Core
  LIVE_CHAT,
  LiveChatType,
  LiveChatStatus,
  LiveChatChannel,
  LiveChatTransferReason,
  liveChatGetTypeLabel,
  liveChatGetStatusLabel,
  liveChatGetChannelLabel,
  liveChatIsActive,
  liveChatIsEnded,
  liveChatCanTransfer,
  liveChatCanEscalate,
  // Live Chat Status
  LIVE_CHAT_STATUS,
  LiveChatStatusType,
  LiveChatStatusCategory,
  LiveChatStatusColor,
  LiveChatStatusIcon,
  LiveChatStatusTransition,
  liveChatStatusGetLabel,
  liveChatStatusIsActive,
  liveChatStatusIsEnded,
  liveChatStatusGetCategory,
  liveChatStatusCanTransition,
};
