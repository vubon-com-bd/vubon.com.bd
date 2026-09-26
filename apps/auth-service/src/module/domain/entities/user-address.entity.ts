/**
 * UserAddressEntity — A single user address
 * @module auth-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';

export interface UserAddressEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly label: string;
  readonly line1: string;
  readonly line2?: string;
  readonly division: string;
  readonly district: string;
  readonly upazila: string;
  readonly postalCode: string;
  readonly isDefault: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class UserAddressEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _label: string;
  private _line1: string;
  private _line2?: string;
  private _division: string;
  private _district: string;
  private _upazila: string;
  private _postalCode: string;
  private _isDefault: boolean;

  private constructor(props: UserAddressEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._label = props.label;
    this._line1 = props.line1;
    this._line2 = props.line2;
    this._division = props.division;
    this._district = props.district;
    this._upazila = props.upazila;
    this._postalCode = props.postalCode;
    this._isDefault = props.isDefault;
  }

  static create(props: UserAddressEntityProps): UserAddressEntity {
    if (!/^\d{4}$/.test(props.postalCode)) {
      throw new Error('Postal code must be 4 digits');
    }
    if (!props.line1.trim()) {
      throw new Error('Address line1 is required');
    }
    return new UserAddressEntity(props);
  }

  get label(): string { return this._label; }
  get line1(): string { return this._line1; }
  get line2(): string | undefined { return this._line2; }
  get division(): string { return this._division; }
  get district(): string { return this._district; }
  get upazila(): string { return this._upazila; }
  get postalCode(): string { return this._postalCode; }
  get isDefault(): boolean { return this._isDefault; }

  markDefault(): void { this._isDefault = true; }
  unmarkDefault(): void { this._isDefault = false; }

  updateLines(line1: string, line2?: string): void {
    if (!line1.trim()) throw new Error('line1 required');
    this._line1 = line1;
    this._line2 = line2;
  }
}
