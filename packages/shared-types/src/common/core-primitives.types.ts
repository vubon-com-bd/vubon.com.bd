/**
 * Core Primitive Types
 * Basic type definitions used across the platform
 */

/**
 * Unique identifier types
 */
export type ID = string;
export type UUID = string;
export type Slug = string;

/**
 * Contact information types
 */
export type Email = string;
export type PhoneNumber = string;
export type Url = string;

/**
 * Date and time types
 */
export type Timestamp = Date;
export type ISODateString = string;
export type Timezone = string;

/**
 * Monetary types
 */
export type Currency = string;
export type Money = number;
export type Percentage = number;

/**
 * Generic types
 */
export type JsonObject = Record<string, unknown>;
export type JsonArray = unknown[];
export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

/**
 * Country and locale types
 */
export type CountryCode = string;
export type LanguageCode = string;
export type Locale = string;

/**
 * Status type for boolean-like states
 */
export type Status = 'active' | 'inactive' | 'pending' | 'deleted';

/**
 * Sort order type
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Nullable type helper
 */
export type Nullable<T> = T | null;

/**
 * Optional type helper
 */
export type Optional<T> = T | undefined;

/**
 * Deep partial type helper
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Deep required type helper
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Pick by type helper
 */
export type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

/**
 * Base Entity Interface
 * Common fields for all database entities
 */
export interface BaseEntity {
  /** Unique identifier */
  id: ID;
  /** Creation timestamp */
  createdAt: Timestamp;
  /** Last update timestamp */
  updatedAt: Timestamp;
  /** Soft delete timestamp (null if not deleted) */
  deletedAt: Nullable<Timestamp>;
}
