import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['shortest', 'fastest', 'cheapest', 'balanced']);

export class RouteOptimizationVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RouteOptimizationVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid route optimization: ${raw}`);
    }
    return new RouteOptimizationVO(raw);
  }
}
