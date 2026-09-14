/**
 * Branded ID Types
 * @module shared-types/common/primitives
 *
 * সব entity-এর branded ID type।
 * প্রতিটা ID আলাদা nominal type — ভুল type mix করা যাবে না।
 */

import type { Branded } from '../utils/branded.types';

// ─────────────────────────────────────────────
// Auth & User
// ─────────────────────────────────────────────
export type AuthId = Branded<string, 'AuthId'>;
export type UserId = Branded<string, 'UserId'>;
export type SessionId = Branded<string, 'SessionId'>;
export type DeviceId = Branded<string, 'DeviceId'>;

// ─────────────────────────────────────────────
// Business — Product
// ─────────────────────────────────────────────
export type ProductId = Branded<string, 'ProductId'>;
export type CategoryId = Branded<string, 'CategoryId'>;
export type BrandId = Branded<string, 'BrandId'>;
export type CollectionId = Branded<string, 'CollectionId'>;
export type VariantId = Branded<string, 'VariantId'>;
export type ReviewId = Branded<string, 'ReviewId'>;

// ─────────────────────────────────────────────
// Business — Cart & Checkout
// ─────────────────────────────────────────────
export type CartId = Branded<string, 'CartId'>;
export type CartItemId = Branded<string, 'CartItemId'>;
export type CouponId = Branded<string, 'CouponId'>;
export type VoucherId = Branded<string, 'VoucherId'>;
export type CheckoutId = Branded<string, 'CheckoutId'>;

// ─────────────────────────────────────────────
// Business — Order & Payment
// ─────────────────────────────────────────────
export type OrderId = Branded<string, 'OrderId'>;
export type OrderItemId = Branded<string, 'OrderItemId'>;
export type PaymentId = Branded<string, 'PaymentId'>;
export type TransactionId = Branded<string, 'TransactionId'>;
export type RefundId = Branded<string, 'RefundId'>;

// ─────────────────────────────────────────────
// Business — Vendor
// ─────────────────────────────────────────────
export type VendorId = Branded<string, 'VendorId'>;
export type VendorPayoutId = Branded<string, 'VendorPayoutId'>;
export type VendorInvoiceId = Branded<string, 'VendorInvoiceId'>;

// ─────────────────────────────────────────────
// Business — Flash Sales
// ─────────────────────────────────────────────
export type FlashSaleId = Branded<string, 'FlashSaleId'>;
export type DealId = Branded<string, 'DealId'>;
export type BundleDealId = Branded<string, 'BundleDealId'>;

// ─────────────────────────────────────────────
// Business — Tax
// ─────────────────────────────────────────────
export type TaxId = Branded<string, 'TaxId'>;

// ─────────────────────────────────────────────
// Support
// ─────────────────────────────────────────────
export type TicketId = Branded<string, 'TicketId'>;
export type ConversationId = Branded<string, 'ConversationId'>;
export type MessageId = Branded<string, 'MessageId'>;
export type FaqId = Branded<string, 'FaqId'>;
export type KnowledgeBaseId = Branded<string, 'KnowledgeBaseId'>;
export type FeedbackId = Branded<string, 'FeedbackId'>;
export type ComplaintId = Branded<string, 'ComplaintId'>;
export type SurveyId = Branded<string, 'SurveyId'>;

// ─────────────────────────────────────────────
// Logistics
// ─────────────────────────────────────────────
export type ShipmentId = Branded<string, 'ShipmentId'>;
export type DeliveryId = Branded<string, 'DeliveryId'>;
export type CourierId = Branded<string, 'CourierId'>;
export type WarehouseId = Branded<string, 'WarehouseId'>;
export type FulfillmentId = Branded<string, 'FulfillmentId'>;
export type DispatchId = Branded<string, 'DispatchId'>;
export type VehicleId = Branded<string, 'VehicleId'>;
export type DriverId = Branded<string, 'DriverId'>;
export type RouteId = Branded<string, 'RouteId'>;
export type ZoneId = Branded<string, 'ZoneId'>;
export type PackageId = Branded<string, 'PackageId'>;
export type InsuranceId = Branded<string, 'InsuranceId'>;
export type ReturnShipmentId = Branded<string, 'ReturnShipmentId'>;

// ─────────────────────────────────────────────
// Platform
// ─────────────────────────────────────────────
export type NotificationId = Branded<string, 'NotificationId'>;
export type ReportId = Branded<string, 'ReportId'>;
export type DashboardId = Branded<string, 'DashboardId'>;
export type WidgetId = Branded<string, 'WidgetId'>;
export type SearchId = Branded<string, 'SearchId'>;

// ─────────────────────────────────────────────
// AI
// ─────────────────────────────────────────────
export type AiModelId = Branded<string, 'AiModelId'>;
export type AiPromptId = Branded<string, 'AiPromptId'>;
export type AiTrainingId = Branded<string, 'AiTrainingId'>;
export type AiInsightId = Branded<string, 'AiInsightId'>;

// ─────────────────────────────────────────────
// Marketing
// ─────────────────────────────────────────────
export type CampaignId = Branded<string, 'CampaignId'>;
export type PromotionId = Branded<string, 'PromotionId'>;
export type AffiliateId = Branded<string, 'AffiliateId'>;
export type ReferralId = Branded<string, 'ReferralId'>;
export type LeadId = Branded<string, 'LeadId'>;

// ─────────────────────────────────────────────
// Generic
// ─────────────────────────────────────────────
export type AddressId = Branded<string, 'AddressId'>;
export type FileId = Branded<string, 'FileId'>;
export type AuditId = Branded<string, 'AuditId'>;

// ─────────────────────────────────────────────
// Union & Alias
// ─────────────────────────────────────────────
export type EntityId = UserId | ProductId | OrderId | VendorId | string;

// ─────────────────────────────────────────────
// Convenience converters
// ─────────────────────────────────────────────
export const toUserId = (id: string): UserId => id as UserId;
export const toProductId = (id: string): ProductId => id as ProductId;
export const toOrderId = (id: string): OrderId => id as OrderId;
export const toShipmentId = (id: string): ShipmentId => id as ShipmentId;
export const toWarehouseId = (id: string): WarehouseId => id as WarehouseId;
export const toCourierId = (id: string): CourierId => id as CourierId;
export const toVehicleId = (id: string): VehicleId => id as VehicleId;
export const toDriverId = (id: string): DriverId => id as DriverId;
export const toRouteId = (id: string): RouteId => id as RouteId;
export const toTicketId = (id: string): TicketId => id as TicketId;
