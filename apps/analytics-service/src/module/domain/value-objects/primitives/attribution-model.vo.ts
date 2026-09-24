import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID_MODELS = new Set<string>([
  'first_touch', 'last_touch', 'linear', 'time_decay',
  'position_based', 'data_driven',
]);

export class AttributionModelVO extends BaseTypeVO<string> {
  static create(raw: string): AttributionModelVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_MODELS.has(normalized)) {
      throw new Error(`Invalid attribution model: ${raw}`);
    }
    return new AttributionModelVO(normalized);
  }

  static lastTouch(): AttributionModelVO {
    return new AttributionModelVO('last_touch');
  }

  private constructor(value: string) {
    super(value);
  }

  get isMultiTouch(): boolean {
    return ['linear', 'time_decay', 'position_based', 'data_driven']
      .includes(this.value);
  }

  /**
   * Calculate attribution weights for N touchpoints.
   * Returns array of weights (normalized to sum to 1.0).
   */
  weights(touchpointCount: number): readonly number[] {
    if (touchpointCount <= 0) return [];
    if (touchpointCount === 1) return [1];

    switch (this.value) {
      case 'first_touch': {
        const w = new Array<number>(touchpointCount).fill(0);
        w[0] = 1;
        return w;
      }
      case 'last_touch': {
        const w = new Array<number>(touchpointCount).fill(0);
        w[touchpointCount - 1] = 1;
        return w;
      }
      case 'linear':
        return new Array<number>(touchpointCount).fill(1 / touchpointCount);
      case 'time_decay': {
        const halfLife = touchpointCount / 2;
        const raw = Array.from({ length: touchpointCount }, (_, i) =>
          Math.pow(0.5, (touchpointCount - 1 - i) / halfLife),
        );
        const sum = raw.reduce((a, b) => a + b, 0);
        return raw.map((v) => v / sum);
      }
      case 'position_based': {
        if (touchpointCount === 2) return [0.5, 0.5];
        const w = new Array<number>(touchpointCount).fill(
          0.2 / Math.max(1, touchpointCount - 2),
        );
        w[0] = 0.4;
        w[touchpointCount - 1] = 0.4;
        return w;
      }
      case 'data_driven':
      default:
        return new Array<number>(touchpointCount).fill(1 / touchpointCount);
    }
  }
}
