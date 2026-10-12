/**
 * Funnel Analyzer Service
 * @module analytics-service/domain/services
 *
 * Funnel drop-off analytics + recommendations।
 */
import type { FunnelStepResult } from './funnel-builder.service.js';

export interface FunnelInsight {
  readonly overallConversionRate: number;
  readonly biggestDropOffStep: string | null;
  readonly biggestDropOffRate: number;
  readonly averageStepConversion: number;
  readonly criticalSteps: readonly string[];
  readonly recommendations: readonly string[];
}

export class FunnelAnalyzerService {
  /**
   * Generate insights from funnel steps
   */
  analyze(steps: readonly FunnelStepResult[]): FunnelInsight {
    if (steps.length === 0) {
      return {
        overallConversionRate: 0,
        biggestDropOffStep: null,
        biggestDropOffRate: 0,
        averageStepConversion: 0,
        criticalSteps: [],
        recommendations: [],
      };
    }

    const entry = steps[0].userCount;
    const final = steps[steps.length - 1].userCount;
    const overall = entry > 0 ? final / entry : 0;

    // Biggest drop-off
    let biggestDrop = 0;
    let biggestStep: string | null = null;
    for (const s of steps) {
      if (s.dropOffRate > biggestDrop) {
        biggestDrop = s.dropOffRate;
        biggestStep = s.stepName;
      }
    }

    // Average step conversion
    const avgConversion =
      steps.length > 1
        ? steps.slice(1).reduce((sum, s) => sum + s.conversionRate, 0) / (steps.length - 1)
        : 0;

    // Critical steps (conversion < 50%)
    const criticalSteps = steps
      .filter((s, i) => i > 0 && s.conversionRate < 0.5)
      .map((s) => s.stepName);

    // Recommendations
    const recommendations: string[] = [];
    if (biggestStep && biggestDrop > 0.5) {
      recommendations.push(`Investigate high drop-off at step "${biggestStep}"`);
    }
    if (criticalSteps.length > 0) {
      recommendations.push(`Critical steps: ${criticalSteps.join(', ')}`);
    }
    if (overall < 0.05) {
      recommendations.push('Overall conversion under 5% — review funnel UX');
    }
    if (avgConversion > 0.8 && overall < 0.5) {
      recommendations.push('Step-wise conversion high but overall low — check entry quality');
    }

    return {
      overallConversionRate: Math.round(overall * 10000) / 10000,
      biggestDropOffStep: biggestStep,
      biggestDropOffRate: Math.round(biggestDrop * 10000) / 10000,
      averageStepConversion: Math.round(avgConversion * 10000) / 10000,
      criticalSteps: Object.freeze(criticalSteps),
      recommendations: Object.freeze(recommendations),
    };
  }

  /**
   * Compare two funnels
   */
  compare(
    base: readonly FunnelStepResult[],
    compare: readonly FunnelStepResult[]
  ): readonly {
    readonly stepName: string;
    readonly baseConversion: number;
    readonly compareConversion: number;
    readonly delta: number;
  }[] {
    const results: {
      stepName: string;
      baseConversion: number;
      compareConversion: number;
      delta: number;
    }[] = [];

    for (let i = 0; i < Math.min(base.length, compare.length); i++) {
      const bc = base[i].conversionRate;
      const cc = compare[i].conversionRate;
      results.push({
        stepName: base[i].stepName,
        baseConversion: bc,
        compareConversion: cc,
        delta: Math.round((cc - bc) * 10000) / 10000,
      });
    }
    return results;
  }
}
