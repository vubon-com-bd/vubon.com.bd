/**
 * BroadcastResultEntity — Child of Broadcast
 * @module notification-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { BroadcastResultVO } from '@domain/composites/broadcast-result.vo.js';
import type { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';

export interface BroadcastResultEntityProps {
  readonly broadcastId: BroadcastIdVO;
  readonly result: BroadcastResultVO;
}

export class BroadcastResultEntity extends BaseEntity<string> {
  private props: BroadcastResultEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: BroadcastResultEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    broadcastId: BroadcastIdVO;
    result: BroadcastResultVO;
    now: string;
  }): BroadcastResultEntity {
    return new BroadcastResultEntity(params.id, params.now, params.now, {
      broadcastId: params.broadcastId,
      result: params.result,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: BroadcastResultEntityProps;
  }): BroadcastResultEntity {
    return new BroadcastResultEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }

  get broadcastId(): BroadcastIdVO { return this.props.broadcastId; }
  get result(): BroadcastResultVO { return this.props.result; }
  get deliveryRate(): number { return this.props.result.deliveryRate; }
  get openRate(): number { return this.props.result.openRate; }
  get clickRate(): number { return this.props.result.clickRate; }
}
