import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class DeliveryErrorVO extends BaseCodeVO {
  private static readonly MAX_LENGTH = 1000;

  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeliveryErrorVO {
    BaseCodeVO.validateNonEmpty(raw, 'DeliveryError');
    if (raw.length > DeliveryErrorVO.MAX_LENGTH) {
      throw new Error(
        `DeliveryError too long (max ${DeliveryErrorVO.MAX_LENGTH})`,
      );
    }
    return new DeliveryErrorVO(raw);
  }
}
