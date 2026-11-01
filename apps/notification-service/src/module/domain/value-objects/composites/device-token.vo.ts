/**
 * DeviceTokensVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Multiple device tokens (for push fanout)।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { DeviceTokenVO as DeviceTokenPrimitive } from '@domain/primitives/device-token.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';

export interface DeviceTokenEntry {
  readonly token: DeviceTokenPrimitive;
  readonly platform: DevicePlatformVO;
}

export interface DeviceTokensVOProps {
  readonly entries: readonly DeviceTokenEntry[];
  readonly maxTokens: number;
}

export class DeviceTokensVO extends BaseVO<DeviceTokensVOProps> {
  private constructor(props: DeviceTokensVOProps) {
    super(Object.freeze(props));
  }

  static create(props: DeviceTokensVOProps): DeviceTokensVO {
    const vo = new DeviceTokensVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: DeviceTokensVOProps): DeviceTokensVO {
    return new DeviceTokensVO(props);
  }

  static empty(maxTokens = 10): DeviceTokensVO {
    return new DeviceTokensVO({
      entries: Object.freeze([]),
      maxTokens,
    });
  }

  protected validate(): void {
    const v = this.value;
    if (v.maxTokens < 1 || v.maxTokens > 100) {
      throw new ValidationError('maxTokens must be 1-100', 'maxTokens');
    }
    if (v.entries.length > v.maxTokens) {
      throw new ValidationError(
        `entries count ${v.entries.length} exceeds maxTokens ${v.maxTokens}`,
        'entries',
      );
    }
    const tokens = new Set<string>();
    for (const e of v.entries) {
      if (tokens.has(e.token.value)) {
        throw new ValidationError(`Duplicate device token`, 'entries');
      }
      tokens.add(e.token.value);
    }
  }

  get entries(): readonly DeviceTokenEntry[] { return this.value.entries; }
  get maxTokens(): number { return this.value.maxTokens; }
  get count(): number { return this.value.entries.length; }
  get isEmpty(): boolean { return this.count === 0; }
  get isFull(): boolean { return this.count >= this.value.maxTokens; }

  get androidTokens(): readonly DeviceTokenPrimitive[] {
    return this.value.entries.filter((e) => e.platform.value === 'android').map((e) => e.token);
  }

  get iosTokens(): readonly DeviceTokenPrimitive[] {
    return this.value.entries.filter((e) => e.platform.value === 'ios').map((e) => e.token);
  }

  get webTokens(): readonly DeviceTokenPrimitive[] {
    return this.value.entries.filter((e) => e.platform.value === 'web').map((e) => e.token);
  }

  has(token: string): boolean {
    return this.value.entries.some((e) => e.token.value === token);
  }

  add(entry: DeviceTokenEntry): DeviceTokensVO {
    return DeviceTokensVO.create({
      ...this.value,
      entries: Object.freeze([...this.value.entries, entry]),
    });
  }

  remove(token: string): DeviceTokensVO {
    return DeviceTokensVO.create({
      ...this.value,
      entries: Object.freeze(this.value.entries.filter((e) => e.token.value !== token)),
    });
  }

  allTokens(): readonly string[] {
    return this.value.entries.map((e) => e.token.value);
  }
}
