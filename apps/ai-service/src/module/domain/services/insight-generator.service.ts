import { InsightConfidenceVO } from '../value-objects/primitives/insight-confidence.vo';

export interface InsightInput {
  readonly target: string;
  readonly type: string;
  readonly findings: readonly {
    readonly label: string;
    readonly value: number;
    readonly unit: string | null;
  }[];
  readonly confidence: number;
}

export interface GeneratedInsight {
  readonly target: string;
  readonly type: string;
  readonly summary: string;
  readonly confidence: InsightConfidenceVO;
  readonly priority: 'low' | 'medium' | 'high' | 'critical';
}

export class InsightGeneratorService {
  generate(input: InsightInput): GeneratedInsight {
    const confidence = InsightConfidenceVO.create(input.confidence);
    const priority = this.determinePriority(input.confidence, input.findings.length);
    const summary = this.buildSummary(input);

    return {
      target: input.target,
      type: input.type,
      summary,
      confidence,
      priority,
    };
  }

  private determinePriority(
    confidence: number,
    findingCount: number,
  ): 'low' | 'medium' | 'high' | 'critical' {
    if (confidence >= 0.9 && findingCount >= 5) return 'critical';
    if (confidence >= 0.8) return 'high';
    if (confidence >= 0.5) return 'medium';
    return 'low';
  }

  private buildSummary(input: InsightInput): string {
    const header = `${input.type} on ${input.target}`;
    const lines = input.findings.map(
      (f) => `- ${f.label}: ${f.value}${f.unit ? ' ' + f.unit : ''}`,
    );
    return [header, ...lines].join('\n');
  }
}
