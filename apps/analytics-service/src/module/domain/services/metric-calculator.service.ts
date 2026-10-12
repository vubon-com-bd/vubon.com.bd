/**
 * Metric Calculator Service
 * @module analytics-service/domain/services
 *
 * Derived metric computation (e-commerce analytics)।
 * Business Rule:
 * - CTR = clicks / impressions × 100
 * - AOV = revenue / orders
 * - Conversion rate = conversions / sessions × 100
 * - ROAS = revenue / ad_spend
 * - ROI = (revenue - cost) / cost × 100
 */
export interface MetricInputs {
  readonly impressions?: number;
  readonly clicks?: number;
  readonly sessions?: number;
  readonly users?: number;
  readonly orders?: number;
  readonly conversions?: number;
  readonly revenue?: number;
  readonly cost?: number;
  readonly adSpend?: number;
  readonly newUsers?: number;
}

export interface CalculatedMetrics {
  readonly ctr?: number;
  readonly cpc?: number;
  readonly cpm?: number;
  readonly cpa?: number;
  readonly aov?: number;
  readonly arpu?: number;
  readonly conversionRate?: number;
  readonly bounceRate?: number;
  readonly roas?: number;
  readonly roi?: number;
  readonly cac?: number;
  readonly pagesPerSession?: number;
}

export class MetricCalculatorService {
  /**
   * Compute all derived metrics possible from inputs
   */
  computeAll(input: MetricInputs, pageViews?: number): CalculatedMetrics {
    return Object.freeze({
      ctr: this.ctr(input.clicks, input.impressions),
      cpc: this.cpc(input.cost, input.clicks),
      cpm: this.cpm(input.cost, input.impressions),
      cpa: this.cpa(input.cost, input.conversions),
      aov: this.aov(input.revenue, input.orders),
      arpu: this.arpu(input.revenue, input.users),
      conversionRate: this.conversionRate(input.conversions, input.sessions),
      roas: this.roas(input.revenue, input.adSpend),
      roi: this.roi(input.revenue, input.cost),
      cac: this.cac(input.cost, input.newUsers),
      pagesPerSession: this.pagesPerSession(pageViews, input.sessions),
    });
  }

  ctr(clicks?: number, impressions?: number): number | undefined {
    if (clicks === undefined || !impressions) return undefined;
    return this.round(clicks / impressions * 100);
  }

  cpc(cost?: number, clicks?: number): number | undefined {
    if (cost === undefined || !clicks) return undefined;
    return this.round(cost / clicks);
  }

  cpm(cost?: number, impressions?: number): number | undefined {
    if (cost === undefined || !impressions) return undefined;
    return this.round((cost / impressions) * 1000);
  }

  cpa(cost?: number, conversions?: number): number | undefined {
    if (cost === undefined || !conversions) return undefined;
    return this.round(cost / conversions);
  }

  aov(revenue?: number, orders?: number): number | undefined {
    if (revenue === undefined || !orders) return undefined;
    return this.round(revenue / orders);
  }

  arpu(revenue?: number, users?: number): number | undefined {
    if (revenue === undefined || !users) return undefined;
    return this.round(revenue / users);
  }

  conversionRate(conversions?: number, sessions?: number): number | undefined {
    if (conversions === undefined || !sessions) return undefined;
    return this.round((conversions / sessions) * 100);
  }

  bounceRate(bounces?: number, sessions?: number): number | undefined {
    if (bounces === undefined || !sessions) return undefined;
    return this.round((bounces / sessions) * 100);
  }

  roas(revenue?: number, adSpend?: number): number | undefined {
    if (revenue === undefined || !adSpend) return undefined;
    return this.round(revenue / adSpend);
  }

  roi(revenue?: number, cost?: number): number | undefined {
    if (revenue === undefined || !cost) return undefined;
    return this.round(((revenue - cost) / cost) * 100);
  }

  cac(cost?: number, newUsers?: number): number | undefined {
    if (cost === undefined || !newUsers) return undefined;
    return this.round(cost / newUsers);
  }

  pagesPerSession(pageViews?: number, sessions?: number): number | undefined {
    if (pageViews === undefined || !sessions) return undefined;
    return this.round(pageViews / sessions);
  }

  /**
   * Customer Lifetime Value (simple)
   */
  clv(aov?: number, purchaseFrequency?: number, customerLifespanYears?: number): number | undefined {
    if (aov === undefined || !purchaseFrequency || !customerLifespanYears) return undefined;
    return this.round(aov * purchaseFrequency * customerLifespanYears);
  }

  /**
   * Churn rate
   */
  churnRate(churnedUsers?: number, totalUsers?: number): number | undefined {
    if (churnedUsers === undefined || !totalUsers) return undefined;
    return this.round((churnedUsers / totalUsers) * 100);
  }

  /**
   * Engagement rate
   */
  engagementRate(engagedSessions?: number, totalSessions?: number): number | undefined {
    if (engagedSessions === undefined || !totalSessions) return undefined;
    return this.round((engagedSessions / totalSessions) * 100);
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
