/**
 * PreferenceMatrixEntity — Child of Preference
 * @module notification-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { PreferenceMatrixVO } from '@domain/composites/preference-matrix.vo.js';
import type { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';

export interface PreferenceMatrixEntityProps {
  readonly preferenceId: PreferenceIdVO;
  readonly matrix: PreferenceMatrixVO;
}

export class PreferenceMatrixEntity extends BaseEntity<string> {
  private props: PreferenceMatrixEntityProps;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: PreferenceMatrixEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);
    this.props = props;
  }

  static create(params: {
    id: string;
    preferenceId: PreferenceIdVO;
    matrix: PreferenceMatrixVO;
    now: string;
  }): PreferenceMatrixEntity {
    return new PreferenceMatrixEntity(params.id, params.now, params.now, {
      preferenceId: params.preferenceId,
      matrix: params.matrix,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: PreferenceMatrixEntityProps;
  }): PreferenceMatrixEntity {
    return new PreferenceMatrixEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }

  get preferenceId(): PreferenceIdVO { return this.props.preferenceId; }
  get matrix(): PreferenceMatrixVO { return this.props.matrix; }
}
