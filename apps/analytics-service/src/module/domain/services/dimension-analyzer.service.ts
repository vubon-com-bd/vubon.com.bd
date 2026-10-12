/**
 * Dimension Analyzer Service
 * @module analytics-service/domain/services
 *
 * GROUP BY dimension analysis.
 * Business Rule:
 * - Sort by metric descending
 * - Top N filter
 * - Percentage share
 */
export interface DimensionEntry {
  readonly dimensionKey: string;
  readonly dimensionValue: string;
  readonly metricValue: number;
}

export interface DimensionGroup {
  readonly key: string;
  readonly value: string;
  readonly value_: number;
  readonly sharePercent: number;
  readonly rank: number;
}

export class DimensionAnalyzerService {
  /**
   * Group and rank entries
   */
  analyze(entries: readonly DimensionEntry[]): readonly DimensionGroup[] {
    if (entries.length === 0) return [];

    // Sum by key
    const grouped = new Map<string, { value: string; total: number }>();
    for (const e of entries) {
      const existing = grouped.get(e.dimensionKey);
      if (existing) {
        existing.total += e.metricValue;
      } else {
        grouped.set(e.dimensionKey, {
          value: e.dimensionValue,
          total: e.metricValue,
        });
      }
    }

    const grandTotal = Array.from(grouped.values()).reduce(
      (s, g) => s + g.total,
      0
    );

    // Sort by total descending
    const sorted = Array.from(grouped.entries())
      .sort((a, b) => b[1].total - a[1].total)
      .map(([key, g], i) => ({
        key,
        value: g.value,
        value_: Math.round(g.total * 100) / 100,
        sharePercent:
          grandTotal > 0
            ? Math.round((g.total / grandTotal) * 10000) / 100
            : 0,
        rank: i + 1,
      }));

    return sorted;
  }

  /**
   * Top N dimensions
   */
  topN(entries: readonly DimensionEntry[], n: number): readonly DimensionGroup[] {
    return this.analyze(entries).slice(0, n);
  }

  /**
   * Others bucket: Top N + "Other" group
   */
  topNWithOthers(
    entries: readonly DimensionEntry[],
    n: number
  ): readonly DimensionGroup[] {
    const sorted = this.analyze(entries);
    if (sorted.length <= n) return sorted;

    const top = sorted.slice(0, n);
    const rest = sorted.slice(n);
    const othersValue = rest.reduce((s, d) => s + d.value_, 0);
    const othersShare = rest.reduce((s, d) => s + d.sharePercent, 0);

    return [
      ...top,
      {
        key: '__other__',
        value: 'Other',
        value_: Math.round(othersValue * 100) / 100,
        sharePercent: Math.round(othersShare * 100) / 100,
        rank: n + 1,
      },
    ];
  }

  /**
   * Compare two periods
   */
  comparePeriods(
    before: readonly DimensionEntry[],
    after: readonly DimensionEntry[]
  ): readonly {
    readonly key: string;
    readonly value: string;
    readonly beforeValue: number;
    readonly afterValue: number;
    readonly changePercent: number;
  }[] {
    const beforeMap = new Map(
      this.analyze(before).map((d) => [d.key, d.value_])
    );
    const afterMap = new Map(
      this.analyze(after).map((d) => [d.key, d.value_])
    );

    const allKeys = new Set([...beforeMap.keys(), ...afterMap.keys()]);
    const result: {
      key: string;
      value: string;
      beforeValue: number;
      afterValue: number;
      changePercent: number;
    }[] = [];

    for (const key of allKeys) {
      const beforeVal = beforeMap.get(key) ?? 0;
      const afterVal = afterMap.get(key) ?? 0;
      const change =
        beforeVal === 0
          ? afterVal === 0 ? 0 : 100
          : Math.round(((afterVal - beforeVal) / beforeVal) * 10000) / 100;

      result.push({
        key,
        value: before.find((e) => e.dimensionKey === key)?.dimensionValue ??
               after.find((e) => e.dimensionKey === key)?.dimensionValue ?? key,
        beforeValue: beforeVal,
        afterValue: afterVal,
        changePercent: change,
      });
    }

    return result.sort((a, b) => b.afterValue - a.afterValue);
  }
}
