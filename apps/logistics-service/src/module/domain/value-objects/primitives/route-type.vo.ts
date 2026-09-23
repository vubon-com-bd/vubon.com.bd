import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'direct',
  'via_warehouse',
  'multi_stop',
  'last_mile',
  'long_haul',
]);

export class RouteTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RouteTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid route type: ${raw}`);
    }
    return new RouteTypeVO(raw);
  }
}
