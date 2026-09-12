/**
 * ID Constants
 * @module shared-constants/common/id
 */

export const ID_CONST = {
  TYPES: {
    UUID: 'uuid',
    NUMBER: 'number',
    STRING: 'string',
  } as const,

  UUID_VERSION: 4,

  NUMBER: {
    MIN: 1,
    MAX: Number.MAX_SAFE_INTEGER,
  },

  LIST: {
    MIN_ITEMS: 1,
    MAX_ITEMS: 100,
  },
} as const;

export type IdType = (typeof ID_CONST.TYPES)[keyof typeof ID_CONST.TYPES];
