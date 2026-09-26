import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class WidgetConfigVO extends BaseCodeVO {
  private static readonly MAX_SIZE = 16 * 1024; // 16KB

  static create(config: Record<string, unknown>): WidgetConfigVO {
    if (config === null || typeof config !== 'object') {
      throw new Error('WidgetConfig must be an object');
    }

    let serialized: string;
    try {
      serialized = JSON.stringify(config);
    } catch {
      throw new Error('WidgetConfig is not JSON-serializable');
    }

    if (serialized.length > WidgetConfigVO.MAX_SIZE) {
      throw new Error(`WidgetConfig too large: ${serialized.length}`);
    }

    return new WidgetConfigVO(serialized);
  }

  static empty(): WidgetConfigVO {
    return new WidgetConfigVO('{}');
  }

  private constructor(value: string) {
    super(value);
  }

  toObject(): Record<string, unknown> {
    return JSON.parse(this.value) as Record<string, unknown>;
  }

  merge(other: WidgetConfigVO): WidgetConfigVO {
    return WidgetConfigVO.create({ ...this.toObject(), ...other.toObject() });
  }
}
