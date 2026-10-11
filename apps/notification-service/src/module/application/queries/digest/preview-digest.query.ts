import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { DigestPreviewRequestDTO } from '../../dtos/requests/digest/digest.dto.js';

export class PreviewDigestQuery extends BaseQuery {
  readonly type = 'digest.preview';
  constructor(public readonly options: DigestPreviewRequestDTO) { super(); }
}
