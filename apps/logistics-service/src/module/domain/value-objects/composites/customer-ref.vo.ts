/**
 * CustomerRefVO — id + name + phone + optional email
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import type { Phone, Email, UserId } from '@vubon/shared-types/common';

export interface CustomerRefValue {
  readonly userId?: UserId;
  readonly name: string;
  readonly phone: Phone;
  readonly email?: Email;
}

export class CustomerRefVO extends BaseVO<CustomerRefValue> {
  private constructor(value: CustomerRefValue) { super(value); }

  static create(input: {
    userId?: string;
    name: string;
    phone: string;
    email?: string;
  }): CustomerRefVO {
    const name = input.name.trim();
    if (name.length < 2 || name.length > 150) {
      throw new ValidationError('Customer name must be 2-150 chars', 'name');
    }
    const phone = input.phone.trim();
    if (!phone) {
      throw new ValidationError('Customer phone required', 'phone');
    }
    return new CustomerRefVO({
      userId: input.userId as UserId | undefined,
      name,
      phone: phone as Phone,
      email: input.email?.trim().toLowerCase() as Email | undefined,
    });
  }

  static reconstitute(value: CustomerRefValue): CustomerRefVO {
    return new CustomerRefVO(value);
  }

  get userId(): UserId | undefined { return this.value.userId; }
  get name(): string { return this.value.name; }
  get phone(): Phone { return this.value.phone; }
  get email(): Email | undefined { return this.value.email; }

  isGuest(): boolean { return this.value.userId === undefined; }
  hasEmail(): boolean { return this.value.email !== undefined; }
}
