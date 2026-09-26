import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { MarketingWorkflowVO } from '../value-objects/composites/marketing-workflow.vo';

export interface MarketingWorkflowEntityProps {
  readonly workflow: MarketingWorkflowVO;
}

export class MarketingWorkflowEntity extends BaseEntity<string> {
  private readonly _workflow: MarketingWorkflowVO;

  private constructor(
    id: string,
    props: MarketingWorkflowEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._workflow = props.workflow;
  }

  static create(props: MarketingWorkflowEntityProps): MarketingWorkflowEntity {
    const now = new Date().toISOString();
    return new MarketingWorkflowEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: MarketingWorkflowEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): MarketingWorkflowEntity {
    return new MarketingWorkflowEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get workflow(): MarketingWorkflowVO { return this._workflow; }
}
