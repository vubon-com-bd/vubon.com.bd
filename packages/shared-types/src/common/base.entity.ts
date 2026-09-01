import { STATUS } from '@vubon/shared-constants';

/**
 * Base Entity
 * সকল এন্টিটির বেস ক্লাস
 */
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

/**
 * Base Entity with Status
 * স্ট্যাটাস সহ বেস এন্টিটি
 */
export interface BaseEntityWithStatus extends BaseEntity {
  status:
    | typeof STATUS.ACTIVE
    | typeof STATUS.INACTIVE
    | typeof STATUS.PENDING
    | typeof STATUS.DELETED
    | typeof STATUS.SUSPENDED;
}

/**
 * Base Entity with Soft Delete
 * সফট ডিলিট সহ বেস এন্টিটি
 */
export interface BaseEntityWithSoftDelete extends BaseEntity {
  deletedAt: Date | null;
  isDeleted: boolean;
}
