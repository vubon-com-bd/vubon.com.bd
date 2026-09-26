import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SimilarityIdVO } from '../primitives/similarity-id.vo';

export interface SimilarityMatchProps {
  readonly vectorId: string;
  readonly score: number;
}

export interface SimilarityResultProps {
  readonly id: SimilarityIdVO;
  readonly queryVectorId: string;
  readonly matches: readonly SimilarityMatchProps[];
  readonly threshold: number;
}

export class SimilarityResultVO extends BaseVO<SimilarityResultProps> {
  static create(props: SimilarityResultProps): SimilarityResultVO {
    if (props.threshold < 0 || props.threshold > 1) {
      throw new Error('SimilarityResult: threshold must be in [0,1]');
    }
    for (const match of props.matches) {
      if (match.score < 0 || match.score > 1) {
        throw new Error(`SimilarityResult: match score must be in [0,1], got ${match.score}`);
      }
    }
    return new SimilarityResultVO(props);
  }

  private constructor(props: SimilarityResultProps) {
    super(
      Object.freeze({
        ...props,
        matches: Object.freeze(props.matches.map((m) => Object.freeze({ ...m }))),
      }),
    );
  }

  get id(): SimilarityIdVO { return this.value.id; }
  get queryVectorId(): string { return this.value.queryVectorId; }
  get matches(): readonly SimilarityMatchProps[] { return this.value.matches; }
  get threshold(): number { return this.value.threshold; }

  topMatch(): SimilarityMatchProps | null {
    return this.value.matches[0] ?? null;
  }

  size(): number {
    return this.value.matches.length;
  }
}
