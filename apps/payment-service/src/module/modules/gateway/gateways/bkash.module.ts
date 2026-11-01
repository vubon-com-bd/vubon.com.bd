/**
 * BkashModule — wrapper re-export
 * @module payment-service/modules/gateway/gateways
 *
 * Re-exports the infrastructure BkashModule so the feature-level
 * gateway aggregate can import a single module per gateway.
 */
export { BkashModule } from '@infrastructure/gateways/bkash/bkash.module';
