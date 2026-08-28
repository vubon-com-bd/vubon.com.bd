/**
 * Media Folder Types
 * Type definitions for media folders based on shared-constants
 * @module MediaFolderTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Slug } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants media
// ============================================================
import {
  // Media Core
  ContentMediaType,
  ContentMediaStatus,
  ContentMediaFormat,
} from '@vubon/shared-constants';

// ============================================================
// Media Folder Extended Types
// ============================================================

/**
 * Media Folder
 */
export interface MediaFolder extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  slug: Slug;
  description?: string;
  parentId?: ID;
  path: string;
  depth: number;
  children: MediaFolder[];
  mediaCount: number;
  totalSize: number;
  isActive: boolean;
  isPublic: boolean;
  metadata?: Metadata;
}

/**
 * Media Folder Filter
 */
export interface MediaFolderFilter {
  ids?: ID[];
  userIds?: ID[];
  parentIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isPublic?: boolean;
  hasChildren?: boolean;
  hasParent?: boolean;
  minMediaCount?: number;
  maxMediaCount?: number;
  minTotalSize?: number;
  maxTotalSize?: number;
  searchTerm?: string;
  slug?: string;
}

/**
 * Media Folder Statistics
 */
export interface MediaFolderStatistics {
  userId: ID;
  totalFolders: number;
  activeFolders: number;
  publicFolders: number;
  rootFolders: number;
  leafFolders: number;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalMediaCount: number;
  averageMediaCount: number;
  maxMediaCount: number;
  minMediaCount: number;
  totalSize: number;
  averageSize: number;
  maxSize: number;
  minSize: number;
  averageDepth: number;
  maxDepth: number;
  foldersWithChildren: number;
  foldersWithoutChildren: number;
}

/**
 * Media Folder Summary
 */
export interface MediaFolderSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalFolders: number;
  active: number;
  public: number;
  root: number;
  leaf: number;
  folderTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topFolders: {
    folder: MediaFolder;
    mediaCount: number;
    size: number;
  }[];
  depthDistribution: {
    depth: number;
    count: number;
  }[];
}

/**
 * Media Folder Configuration
 */
export interface MediaFolderConfiguration {
  enabled: boolean;
  defaultVisibility: 'public' | 'private';
  maxDepth: number;
  maxFoldersPerUser: number;
  maxMediaPerFolder: number;
  requireUniqueName: boolean;
  requireUniqueSlug: boolean;
  autoGenerateSlug: boolean;
  allowNestedFolders: boolean;
  allowEmptyFolders: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: MediaFolderAlertConfig;
}

/**
 * Media Folder Alert Configuration
 */
export interface MediaFolderAlertConfig {
  enabled: boolean;
  duplicateNameAlert: boolean;
  duplicateSlugAlert: boolean;
  depthLimitAlert: boolean;
  maxFolderAlert: boolean;
  maxFolderThreshold: number;
  maxMediaAlert: boolean;
  maxMediaThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Media Folder History
 */
export interface MediaFolderHistory extends BaseEntity, Timestamp {
  id: ID;
  folderId: ID;
  userId: ID;
  action: 'create' | 'update' | 'move' | 'delete' | 'restore' | 'visibility_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Media Folder Validation
 */
export interface MediaFolderValidation {
  isValid: boolean;
  folderId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Media Folder Path
 */
export interface MediaFolderPath {
  folderId: ID;
  path: string[];
  depth: number;
  breadcrumbs: {
    name: string;
    slug: Slug;
    id: ID;
  }[];
}

/**
 * Media Folder Tree
 */
export interface MediaFolderTree {
  root: MediaFolder;
  children: MediaFolderTree[];
  depth: number;
  totalNodes: number;
  totalMedia: number;
  totalSize: number;
}

/**
 * Media Folder Export
 */
export interface MediaFolderExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: MediaFolderFilter;
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
  // Media Core
  ContentMediaType,
  ContentMediaStatus,
  ContentMediaFormat,
};
