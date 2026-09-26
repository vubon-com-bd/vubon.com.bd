/**
 * TicketCategoryIdVO — Reference to ticket category
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO (cross-entity reference by ID only)
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const CATEGORY_ID_PREFIX = 'tcat_';
const CATEGORY_ID_MIN_LENGTH = 6;
const CATEGORY_ID_MAX_LENGTH = 64;

export class TicketCategoryIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TicketCategoryIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('TicketCategoryId must be a string', 'ticketCategoryId');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('TicketCategoryId cannot be empty', 'ticketCategoryId');
    }
    if (trimmed.length < CATEGORY_ID_MIN_LENGTH) {
      throw new ValidationError(
        `TicketCategoryId too short (min ${CATEGORY_ID_MIN_LENGTH})`,
        'ticketCategoryId',
      );
    }
    if (trimmed.length > CATEGORY_ID_MAX_LENGTH) {
      throw new ValidationError(
        `TicketCategoryId too long (max ${CATEGORY_ID_MAX_LENGTH})`,
        'ticketCategoryId',
      );
    }
    return new TicketCategoryIdVO(trimmed);
  }

  static generate(slug: string): TicketCategoryIdVO {
    if (!slug || slug.trim().length === 0) {
      throw new ValidationError('TicketCategoryId slug required', 'ticketCategoryId');
    }
    const normalized = slug.trim().toLowerCase().replace(/\s+/g, '_');
    return TicketCategoryIdVO.create(`${CATEGORY_ID_PREFIX}${normalized}`);
  }
}
