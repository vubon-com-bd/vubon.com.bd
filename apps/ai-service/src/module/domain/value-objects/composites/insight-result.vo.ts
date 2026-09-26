import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InsightConfidenceVO } from '../primitives/insight-confidence.vo';

export interface InsightFindingProps {
  readonly label: string;
  readonly value: number;
  readonly unit: string | null;
}

export interface InsightResultProps {
  readonly findings: readonly InsightFindingProps[];
  readonly confidence: InsightConfidenceVO;
  readonly summary: string;
}

export class InsightResultVO extends BaseVO<InsightResultProps> {
  static create(props: InsightResultProps): InsightResultVO {
    if (props.summary.trim().length === 0) {
      throw new Error('InsightResult: summary cannot be empty');
    }
    return new InsightResultVO(props);
  }

  private constructor(props: InsightResultProps) {
    super(
      Object.freeze({
        ...props,
        findings: Object.freeze(props.findings.map((f) => Object.freeze({ ...f }))),
      }),
    );
  }

  get findings(): readonly InsightFindingProps[] { return this.value.findings; }
  get confidence(): InsightConfidenceVO { return this.value.confidence; }
  get summary(): string { return this.value.summary; }

  isHighConfidence(): boolean {
    return this.value.confidence.isHigh();
  }

  findingCount(): number {
    return this.value.findings.length;
  }
}
