/**
 * IVendorFeatureService — contract
 * @module vendor-service/application/services/interfaces
 */
export const VENDOR_FEATURE_SERVICE = Symbol('VENDOR_FEATURE_SERVICE');

export interface FeatureDTO {
  readonly id: string;
  readonly vendorId: string;
  readonly featureKey: string;
  readonly type: string;
  readonly isEnabled: boolean;
  readonly isActive: boolean;
  readonly limit?: number;
  readonly usedCount: number;
  readonly remaining: number | null;
  readonly usagePercent: number;
  readonly expiresAt?: string;
  readonly daysUntilExpiry: number | null;
}

export interface IVendorFeatureService {
  enable(vendorId: string, featureKey: string, actorId: string): Promise<FeatureDTO>;
  disable(vendorId: string, featureKey: string, reason: string, actorId: string): Promise<FeatureDTO>;
  consume(vendorId: string, featureKey: string, count?: number): Promise<FeatureDTO>;
  resetUsage(vendorId: string, featureKey: string, actorId: string): Promise<FeatureDTO>;
  setLimit(vendorId: string, featureKey: string, limit: number | null, actorId: string): Promise<FeatureDTO>;
  isEnabled(vendorId: string, featureKey: string): Promise<boolean>;
  getByKey(vendorId: string, featureKey: string): Promise<FeatureDTO | null>;
  listByVendor(vendorId: string): Promise<readonly FeatureDTO[]>;
  listEnabled(vendorId: string): Promise<readonly FeatureDTO[]>;
}
