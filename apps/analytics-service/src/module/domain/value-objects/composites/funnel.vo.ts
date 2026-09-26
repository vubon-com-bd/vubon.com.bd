import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { FunnelIdVO } from '../primitives/funnel-id.vo';
import { FunnelStepVO } from '../primitives/funnel-step.vo';

export interface FunnelProps {
  readonly funnelId: FunnelIdVO;
  readonly name: string;
  readonly steps: readonly FunnelStepVO[];
}

export class FunnelVO extends BaseVO<FunnelProps> {
  static create(props: FunnelProps): FunnelVO {
    if (props.steps.length < 2) {
      throw new Error('Funnel must have at least 2 steps');
    }
    const seen = new Set<string>();
    for (const step of props.steps) {
      if (seen.has(step.normalized)) {
        throw new Error(`Duplicate funnel step: ${step.value}`);
      }
      seen.add(step.normalized);
    }
    return new FunnelVO(
      Object.freeze({
        ...props,
        steps: Object.freeze([...props.steps]),
      }),
    );
  }

  private constructor(value: FunnelProps) {
    super(value);
  }

  get funnelId(): FunnelIdVO { return this.value.funnelId; }
  get name(): string { return this.value.name; }
  get steps(): readonly FunnelStepVO[] { return this.value.steps; }

  get stepCount(): number {
    return this.value.steps.length;
  }

  getStepAt(index: number): FunnelStepVO | null {
    return this.value.steps[index] ?? null;
  }
}
