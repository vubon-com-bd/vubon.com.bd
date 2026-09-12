/**
 * Metadata Constants
 * @module shared-constants/common/metadata
 */

export const METADATA = {
  VERSION: 'version',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  CREATED_BY: 'createdBy',
  UPDATED_BY: 'updatedBy',
  TAGS: 'tags',
  NOTES: 'notes',
  CUSTOM: 'custom',

  // Rules
  VERSION_MIN: 1,
  VERSION_DEFAULT: 1,
  TAGS_MAX: 50,
  NOTES_MAX_LENGTH: 5000,
} as const;
