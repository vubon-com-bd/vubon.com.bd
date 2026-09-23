import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>(['full_time', 'part_time', 'contract', 'freelance']);

export class DriverTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DriverTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid driver type: ${raw}`);
    }
    return new DriverTypeVO(raw);
  }
}
