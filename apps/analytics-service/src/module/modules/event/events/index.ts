import type { Provider } from '@nestjs/common';
/**
 * Event Domain Event Handlers Barrel
 *
 * These are CQRS-side effects responding to domain events
 * (published by EventEntity when state changes)।
 */
export const EVENT_DOMAIN_HANDLERS: readonly unknown[] = [] as Provider[];
