import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { DimensionIdVO } from '../value-objects/primitives/dimension-id.vo';
import { DimensionNameVO } from '../value-objects/primitives/dimension-name.vo';

export interface DimensionEntityProps {
  readonly name: DimensionNameVO;
  readonly cardinality: number;
  readonly cardinalityHistory: readonly number[];
}

const MAX_HISTORY = 20;
const HIGH_CARDINALITY_THRESHOLD = 1000;

export class DimensionEntity extends AggregateRoot<DimensionIdVO> {
  private readonly _name: DimensionNameVO;
  private readonly _cardinality: number;
  private readonly _cardinalityHistory: readonly number[];

  private constructor(
    id: DimensionIdVO,
    props: DimensionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._cardinality = props.cardinality;
    this._cardinalityHistory = Object.freeze([...props.cardinalityHistory]);
  }

  static create(props: {
    readonly name: DimensionNameVO;
    readonly cardinality: number;
  }): DimensionEntity {
    if (props.cardinality < 0) {
      throw new Error('Cardinality cannot be negative');
    }
    const now = new Date().toISOString();
    const id = DimensionIdVO.create(crypto.randomUUID());
    return new DimensionEntity(
      id,
      {
        name: props.name,
        cardinality: props.cardinality,
        cardinalityHistory: [props.cardinality],
      },
      now,
      now,
      null,
    );
  }

  static reconstitute(
    id: DimensionIdVO,
    props: DimensionEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): DimensionEntity {
    return new DimensionEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  /**
   * Update cardinality with rolling history (max 20 points).
   */
  updateCardinality(cardinality: number): DimensionEntity {
    if (cardinality < 0) {
      throw new Error('Cardinality cannot be negative');
    }
    const history = [...this._cardinalityHistory, cardinality].slice(-MAX_HISTORY);
    return new DimensionEntity(
      this.id,
      {
        name: this._name,
        cardinality,
        cardinalityHistory: history,
      },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get name(): DimensionNameVO { return this._name; }
  get cardinality(): number { return this._cardinality; }
  get cardinalityHistory(): readonly number[] { return this._cardinalityHistory; }

  get isHighCardinality(): boolean {
    return this._cardinality > HIGH_CARDINALITY_THRESHOLD;
  }

  get isLowCardinality(): boolean {
    return this._cardinality <= 20;
  }

  /**
   * Moving average of cardinality.
   */
  get movingAverage(): number {
    if (this._cardinalityHistory.length === 0) return 0;
    const sum = this._cardinalityHistory.reduce((a, b) => a + b, 0);
    return sum / this._cardinalityHistory.length;
  }

  /**
   * Stddev of cardinality.
   */
  get standardDeviation(): number {
    if (this._cardinalityHistory.length < 2) return 0;
    const mean = this.movingAverage;
    const variance =
      this._cardinalityHistory.reduce((s, v) => s + Math.pow(v - mean, 2), 0) /
      this._cardinalityHistory.length;
    return Math.sqrt(variance);
  }

  /**
   * Cardinality growth rate (latest vs. first, %).
   */
  get growthRate(): number {
    if (this._cardinalityHistory.length < 2) return 0;
    const first = this._cardinalityHistory[0]!;
    const last = this._cardinalityHistory[this._cardinalityHistory.length - 1]!;
    if (first === 0) return last === 0 ? 0 : 100;
    return ((last - first) / first) * 100;
  }

  /**
   * Is the cardinality growing unusually fast (> 50% growth).
   */
  get isGrowing(): boolean {
    return this.growthRate > 50;
  }

  /**
   * Auto-warning: needs attention if high-cardinality or rapidly growing.
   */
  get needsAttention(): boolean {
    return this.isHighCardinality || this.isGrowing;
  }

  private _toProps(): DimensionEntityProps {
    return {
      name: this._name,
      cardinality: this._cardinality,
      cardinalityHistory: this._cardinalityHistory,
    };
  }
}
