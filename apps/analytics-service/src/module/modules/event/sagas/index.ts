import type { Provider } from '@nestjs/common';
/**
 * Event Sagas Barrel
 */
import { EventProcessingSaga } from '../../../application/sagas/event-processing.saga.js';

export const EVENT_SAGAS = [EventProcessingSaga] as Provider[];

export { EventProcessingSaga };
