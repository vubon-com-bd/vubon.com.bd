/**
 * Broadcast Sagas Barrel
 * @module notification-service/modules/broadcast/sagas
 */
import { BroadcastProcessingSaga } from '@application/sagas/broadcast-processing.saga.js';

export const BROADCAST_SAGAS = [BroadcastProcessingSaga] as const;
export { BroadcastProcessingSaga };
