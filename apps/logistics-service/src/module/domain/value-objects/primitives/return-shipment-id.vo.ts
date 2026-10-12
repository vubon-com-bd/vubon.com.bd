/**
 * ReturnShipmentId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export class ReturnShipmentIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ReturnShipmentIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ReturnShipmentId cannot be empty', 'returnShipmentId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('ReturnShipmentId must be a valid UUID', 'returnShipmentId');
    }
    return new ReturnShipmentIdVO(trimmed);
  }

  static reconstitute(raw: string): ReturnShipmentIdVO { return new ReturnShipmentIdVO(raw); }
}
