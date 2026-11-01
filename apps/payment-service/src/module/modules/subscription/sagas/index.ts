/**
 * Subscription Sagas — Barrel
 * @module payment-service/modules/subscription/sagas
 */
import { SubscriptionRenewalSaga } from '@application/sagas/subscription-renewal.saga';

export const SUBSCRIPTION_SAGAS = [SubscriptionRenewalSaga] as const;
