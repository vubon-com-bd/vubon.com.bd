export interface AttributionResult {
  readonly affiliateId: string;
  readonly orderId: string;
  readonly weight: number;
}

export class AffiliateAttributionService {
  lastClick(affiliateId: string, orderId: string): AttributionResult {
    return { affiliateId, orderId, weight: 1 };
  }

  linear(affiliateIds: readonly string[], orderId: string): readonly AttributionResult[] {
    const weight = affiliateIds.length > 0 ? 1 / affiliateIds.length : 0;
    return affiliateIds.map((id) => ({ affiliateId: id, orderId, weight }));
  }
}
