/**
 * CheckoutSessionEntity — tracks an active checkout session with token
 * @module order-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CheckoutIdVO } from '../value-objects/primitives/checkout-id.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';

export interface CheckoutSessionEntityProps {
  readonly checkoutId: CheckoutIdVO;
  readonly customerId: CustomerIdVO;
  readonly token: string;
  readonly ipAddress?: string;
  readonly userAgent?: string;
  readonly stepData?: Readonly<Record<string, unknown>>;
  readonly expiresAt: string;
}

export class CheckoutSessionEntity extends BaseEntity<string> {
  private _stepData?: Readonly<Record<string, unknown>>;
  private readonly _checkoutId: CheckoutIdVO;
  private readonly _customerId: CustomerIdVO;
  private readonly _token: string;
  private readonly _ipAddress?: string;
  private readonly _userAgent?: string;
  private readonly _expiresAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CheckoutSessionEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._checkoutId = props.checkoutId;
    this._customerId = props.customerId;
    this._token = props.token;
    this._ipAddress = props.ipAddress;
    this._userAgent = props.userAgent;
    this._stepData = props.stepData;
    this._expiresAt = props.expiresAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._token || this._token.length < 16) {
      throw new ValidationError('Session token must be at least 16 chars', 'token');
    }
  }

  get checkoutId(): CheckoutIdVO { return this._checkoutId; }
  get customerId(): CustomerIdVO { return this._customerId; }
  get token(): string { return this._token; }
  get ipAddress(): string | undefined { return this._ipAddress; }
  get userAgent(): string | undefined { return this._userAgent; }
  get stepData(): Readonly<Record<string, unknown>> | undefined { return this._stepData; }
  get expiresAt(): string { return this._expiresAt; }

  isExpired(now: Date = new Date()): boolean {
    return now.getTime() > Date.parse(this._expiresAt);
  }

  get remainingMs(): number {
    return Math.max(0, Date.parse(this._expiresAt) - Date.now());
  }

  updateStepData(data: Readonly<Record<string, unknown>>, now: string): void {
    this._stepData = data;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    props: CheckoutSessionEntityProps;
    now: string;
  }): CheckoutSessionEntity {
    return new CheckoutSessionEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: CheckoutSessionEntityProps;
  }): CheckoutSessionEntity {
    return new CheckoutSessionEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
