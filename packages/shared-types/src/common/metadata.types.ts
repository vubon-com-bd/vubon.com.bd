import { METADATA } from '@vubon/shared-constants';

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা ইন্টারফেস
export interface Metadata {
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
  version: number;
  tags?: string[];
  notes?: string;
  custom?: Record<string, unknown>; // any-এর বদলে unknown
}

// METADATA কনস্ট্যান্ট থেকে কী টাইপ
export type MetadataKey = keyof typeof METADATA;

// METADATA কনস্ট্যান্ট থেকে ভ্যালু টাইপ
export type MetadataValue = (typeof METADATA)[MetadataKey];

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা অপশন
export interface MetadataOptions {
  createdBy?: string;
  updatedBy?: string;
  version?: number;
  tags?: string[];
  notes?: string;
  custom?: Record<string, unknown>;
}

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা ফ্যাক্টরি
export type MetadataFactory = (options?: MetadataOptions) => Metadata;

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা ইউটিলিটি
export const MetadataUtils = {
  // নতুন মেটাডেটা তৈরি
  create: (options?: MetadataOptions): Metadata => {
    const now = new Date();
    return {
      createdAt: now,
      updatedAt: now,
      version: options?.version || 1,
      createdBy: options?.createdBy,
      updatedBy: options?.updatedBy,
      tags: options?.tags || [],
      notes: options?.notes,
      custom: options?.custom || {},
    };
  },

  // মেটাডেটা আপডেট
  update: (metadata: Metadata, updates: Partial<Metadata>): Metadata => {
    return {
      ...metadata,
      ...updates,
      updatedAt: new Date(),
      version: metadata.version + 1,
    };
  },

  // METADATA কনস্ট্যান্ট ব্যবহার করে ট্যাগ যোগ
  addTag: (metadata: Metadata, tag: string): Metadata => {
    const tags = metadata.tags || [];
    if (!tags.includes(tag)) {
      return {
        ...metadata,
        tags: [...tags, tag],
        updatedAt: new Date(),
      };
    }
    return metadata;
  },

  // METADATA কনস্ট্যান্ট ব্যবহার করে ট্যাগ রিমুভ
  removeTag: (metadata: Metadata, tag: string): Metadata => {
    const tags = metadata.tags || [];
    return {
      ...metadata,
      tags: tags.filter((t) => t !== tag),
      updatedAt: new Date(),
    };
  },

  // METADATA কনস্ট্যান্ট ব্যবহার করে কাস্টম ডেটা সেট
  setCustom: <T = unknown>(metadata: Metadata, key: string, value: T): Metadata => {
    return {
      ...metadata,
      custom: {
        ...metadata.custom,
        [key]: value,
      },
      updatedAt: new Date(),
    };
  },

  // METADATA কনস্ট্যান্ট ব্যবহার করে কাস্টম ডেটা পাওয়া
  getCustom: <T = unknown>(metadata: Metadata, key: string): T | undefined => {
    return metadata.custom?.[key] as T | undefined;
  },

  // METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা ভ্যালিডেশন
  validate: (metadata: Metadata): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!metadata.createdAt) {
      errors.push('createdAt is required');
    }
    if (!metadata.updatedAt) {
      errors.push('updatedAt is required');
    }
    if (metadata.version < 0) {
      errors.push('version must be a positive number');
    }
    if (metadata.createdAt && metadata.updatedAt && metadata.createdAt > metadata.updatedAt) {
      errors.push('createdAt cannot be after updatedAt');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },
};

// METADATA কনস্ট্যান্ট থেকে ডিফল্ট মেটাডেটা
export const DEFAULT_METADATA: Metadata = {
  createdAt: new Date(),
  updatedAt: new Date(),
  version: 1,
  tags: [],
  custom: {},
};

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা টাইপ
export type MetadataType = typeof METADATA;

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা কী
export type MetadataKeys = keyof typeof METADATA;

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা ভ্যালু
export type MetadataValues = (typeof METADATA)[MetadataKeys];

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা ম্যাপ
export type MetadataMap = Record<MetadataKeys, unknown>;

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা ট্রান্সফরমার
export type MetadataTransformer<T = unknown> = (metadata: Metadata) => T;

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা ফিল্টার
export type MetadataFilter = (metadata: Metadata) => boolean;

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা সর্টার
export type MetadataSorter = (a: Metadata, b: Metadata) => number;

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা গ্রুপার
export type MetadataGrouper = (metadata: Metadata) => string;

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা রিডিউসার
export type MetadataReducer<T> = (acc: T, metadata: Metadata) => T;

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা স্টেট
export interface MetadataState {
  metadata: Metadata;
  history: Metadata[];
  currentIndex: number;
}

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা স্টেট ফ্যাক্টরি
export type MetadataStateFactory = (metadata: Metadata) => MetadataState;

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা স্ন্যাপশট
export interface MetadataSnapshot {
  metadata: Metadata;
  timestamp: Date;
  version: number;
  hash: string;
}

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা স্ন্যাপশট ফ্যাক্টরি
export type MetadataSnapshotFactory = (metadata: Metadata) => MetadataSnapshot;

// METADATA কনস্ট্যান্ট ব্যবহার করে মেটাডেটা কনফিগ
export interface MetadataConfig {
  maxHistory: number;
  versionPrefix: string;
  defaultTags: string[];
}

// METADATA কনস্ট্যান্ট ব্যবহার করে ডিফল্ট কনফিগ
export const DEFAULT_METADATA_CONFIG: MetadataConfig = {
  maxHistory: 100,
  versionPrefix: 'v',
  defaultTags: [],
};
