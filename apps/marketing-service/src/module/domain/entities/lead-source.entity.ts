import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { LeadSourceCompositeVO } from '../value-objects/composites/lead-source-composite.vo';
import { LeadIdVO } from '../value-objects/primitives/lead-id.vo';

export interface LeadSourceEntityProps {
  readonly leadId: LeadIdVO;
  readonly source: LeadSourceCompositeVO;
}

export class LeadSourceEntity extends BaseEntity<string> {
  private readonly _leadId: LeadIdVO;
  private readonly _source: LeadSourceCompositeVO;

  private constructor(
    id: string,
    props: LeadSourceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._leadId = props.leadId;
    this._source = props.source;
  }

  static create(props: LeadSourceEntityProps): LeadSourceEntity {
    const now = new Date().toISOString();
    return new LeadSourceEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: LeadSourceEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): LeadSourceEntity {
    return new LeadSourceEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get leadId(): LeadIdVO { return this._leadId; }
  get source(): LeadSourceCompositeVO { return this._source; }
}
