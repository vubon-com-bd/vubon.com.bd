import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AiSearchIdVO } from '../primitives/ai-search-id.vo';
import { SearchTypeVO } from '../primitives/search-type.vo';
import { SearchModelVO } from '../primitives/search-model.vo';
import { SearchStatusVO } from '../primitives/search-status.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { SearchResultVO } from './search-result.vo';

export interface AiSearchProps {
  readonly id: AiSearchIdVO;
  readonly userId: UserIdVO | null;
  readonly type: SearchTypeVO;
  readonly model: SearchModelVO;
  readonly status: SearchStatusVO;
  readonly result: SearchResultVO;
}

export class AiSearchVO extends BaseVO<AiSearchProps> {
  static create(props: AiSearchProps): AiSearchVO {
    return new AiSearchVO(props);
  }

  private constructor(props: AiSearchProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): AiSearchIdVO { return this.value.id; }
  get userId(): UserIdVO | null { return this.value.userId; }
  get type(): SearchTypeVO { return this.value.type; }
  get model(): SearchModelVO { return this.value.model; }
  get status(): SearchStatusVO { return this.value.status; }
  get result(): SearchResultVO { return this.value.result; }

  isSemantic(): boolean {
    return this.value.type.isSemantic();
  }

  isCompleted(): boolean {
    return this.value.status.isCompleted();
  }
}
