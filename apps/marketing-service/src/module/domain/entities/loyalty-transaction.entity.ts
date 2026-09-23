import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { LoyaltyTransactionVO } from '../value-objects/composites/loyalty-transaction.vo';
import { LoyaltyIdVO } from '../value-objects/primitives/loyalty-id.vo';

export interface LoyaltyTransactionEntityProps {
  readonly loyaltyId: LoyaltyIdVO;
  readonly transaction: LoyaltyTransactionVO;
}

export class LoyaltyTransactionEntity extends BaseEntity<string> {
  private readonly _loyaltyId: LoyaltyIdVO;
  private readonly _transaction: LoyaltyTransactionVO;

  private constructor(
    id: string,
    props: LoyaltyTransactionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._loyaltyId = props.loyaltyId;
    this._transaction = props.transaction;
  }

  static create(props: LoyaltyTransactionEntityProps): LoyaltyTransactionEntity {
    const now = new Date().toISOString();
    return new LoyaltyTransactionEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: LoyaltyTransactionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): LoyaltyTransactionEntity {
    return new LoyaltyTransactionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get loyaltyId(): LoyaltyIdVO { return this._loyaltyId; }
  get transaction(): LoyaltyTransactionVO { return this._transaction; }
}
