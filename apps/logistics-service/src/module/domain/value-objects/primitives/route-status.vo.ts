import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['active', 'inactive', 'optimized', 'suspended']);

export class RouteStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RouteStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid route status: ${raw}`);
    }
    return new RouteStatusVO(raw);
  }
}
