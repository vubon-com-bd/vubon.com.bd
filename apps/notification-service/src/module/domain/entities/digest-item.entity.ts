/**
 * DigestItemEntity — Child of Digest
 * @module notification-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { DigestItemVO } from '@domain/composites/digest-item.vo.js';
import type { DigestIdVO } from '@domain/primitives/digest-id.vo.js';

export interface DigestItemEntityProps {
  readonly digestId: DigestIdVO;
  readonly item: DigestItemVO;
}

export class DigestItemEntity extends BaseEntity<string> {
  private props: DigestItemEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DigestItemEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    digestId: DigestIdVO;
    item: DigestItemVO;
    now: string;
  }): DigestItemEntity {
    return new DigestItemEntity(params.id, params.now, params.now, {
      digestId: params.digestId,
      item: params.item,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: DigestItemEntityProps;
  }): DigestItemEntity {
    return new DigestItemEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }

  get digestId(): DigestIdVO { return this.props.digestId; }
  get item(): DigestItemVO { return this.props.item; }
  get isUrgent(): boolean { return this.props.item.isUrgent(); }
}
