/**
 * Funnel Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Conversion funnel definition।
 * Business Rule:
 * - Ordered steps (2-20)
 * - Steps sequential (1, 2, 3, ...)
 * - Time window required
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { FunnelIdVO } from '../primitives/funnel-id.vo.js';
import { FunnelStepVO } from '../primitives/funnel-step.vo.js';
import { FunnelStageVO } from '../primitives/funnel-stage.vo.js';
import { TimeRangeVO } from './time-range.vo.js';

export interface FunnelVOProps {
  readonly id: FunnelIdVO;
  readonly name: string;
  readonly steps: readonly FunnelStepVO[];
  readonly range: TimeRangeVO;
  readonly stage?: FunnelStageVO;
}

export class FunnelVO extends BaseVO<FunnelVOProps> {
  private constructor(props: FunnelVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: FunnelVOProps): FunnelVO {
    if (!props.id || !props.name || !props.steps || !props.range) {
      throw new Error('FunnelVO requires id, name, steps, range');
    }

    if (props.steps.length < 2) {
      throw new Error('FunnelVO requires at least 2 steps');
    }

    if (props.steps.length > 20) {
      throw new Error('FunnelVO supports max 20 steps');
    }

    // Steps must be sequential
    const sortedSteps = [...props.steps].sort((a, b) => a.order - b.order);
    for (let i = 0; i < sortedSteps.length; i++) {
      if (sortedSteps[i].order !== i + 1) {
        throw new Error(
          `FunnelVO steps must be sequential starting at 1 (found gap at ${i + 1})`
        );
      }
    }

    return new FunnelVO({ ...props, steps: sortedSteps });
  }

  get id(): FunnelIdVO {
    return this.value.id;
  }

  get name(): string {
    return this.value.name;
  }

  get steps(): readonly FunnelStepVO[] {
    return this.value.steps;
  }

  get range(): TimeRangeVO {
    return this.value.range;
  }

  get stage(): FunnelStageVO | undefined {
    return this.value.stage;
  }

  stepCount(): number {
    return this.steps.length;
  }

  firstStep(): FunnelStepVO {
    return this.steps[0];
  }

  lastStep(): FunnelStepVO {
    return this.steps[this.steps.length - 1];
  }

  stepAt(order: number): FunnelStepVO | undefined {
    return this.steps.find((s) => s.order === order);
  }

  /** Number of conversion transitions */
  transitionCount(): number {
    return this.stepCount() - 1;
  }

  /** Funnel is AARRR based কিনা */
  isAarrr(): boolean {
    return this.stage !== undefined;
  }
}
