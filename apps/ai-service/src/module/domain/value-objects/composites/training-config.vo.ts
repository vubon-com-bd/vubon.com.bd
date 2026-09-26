import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface TrainingConfigProps {
  readonly datasetId: string;
  readonly epochs: number;
  readonly batchSize: number;
  readonly learningRate: number;
  readonly validationSplit: number;
  readonly hyperparameters: Readonly<Record<string, string | number | boolean>>;
}

export class TrainingConfigVO extends BaseVO<TrainingConfigProps> {
  static create(props: TrainingConfigProps): TrainingConfigVO {
    if (props.epochs < 1) {
      throw new Error('TrainingConfig: epochs must be >= 1');
    }
    if (props.batchSize < 1) {
      throw new Error('TrainingConfig: batchSize must be >= 1');
    }
    if (props.learningRate <= 0 || props.learningRate > 1) {
      throw new Error('TrainingConfig: learningRate must be in (0, 1]');
    }
    if (props.validationSplit < 0 || props.validationSplit >= 1) {
      throw new Error('TrainingConfig: validationSplit must be in [0, 1)');
    }
    return new TrainingConfigVO(props);
  }

  private constructor(props: TrainingConfigProps) {
    super(
      Object.freeze({
        ...props,
        hyperparameters: Object.freeze({ ...props.hyperparameters }),
      }),
    );
  }

  get datasetId(): string { return this.value.datasetId; }
  get epochs(): number { return this.value.epochs; }
  get batchSize(): number { return this.value.batchSize; }
  get learningRate(): number { return this.value.learningRate; }
  get validationSplit(): number { return this.value.validationSplit; }
  get hyperparameters(): Readonly<Record<string, string | number | boolean>> {
    return this.value.hyperparameters;
  }

  getTrainSize(totalSamples: number): number {
    return Math.floor(totalSamples * (1 - this.value.validationSplit));
  }

  getValidationSize(totalSamples: number): number {
    return totalSamples - this.getTrainSize(totalSamples);
  }
}
