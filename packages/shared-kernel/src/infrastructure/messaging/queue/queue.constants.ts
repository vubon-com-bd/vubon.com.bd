/**
 * Queue Constants (re-export from shared-constants)
 * @module shared-kernel/infrastructure/messaging/queue
 *
 * Values আসে shared-constants/infrastructure/queue.constants থেকে।
 */
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export type QueueNameValue = (typeof QUEUE_NAME)[keyof typeof QUEUE_NAME];

export type QueuePriorityValue = (typeof QUEUE_PRIORITY)[keyof typeof QUEUE_PRIORITY];

export const QUEUE_NAMES = QUEUE_NAME;
export const QUEUE_PRIORITIES = QUEUE_PRIORITY;
