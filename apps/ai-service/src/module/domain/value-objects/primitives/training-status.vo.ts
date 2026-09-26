import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { AI_TRAINING_STATUS } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_TRAINING_STATUS));

export class TrainingStatusVO extends BaseStatusVO<string> {
  static create(raw: string): TrainingStatusVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid training status: ${raw}`);
    }
    return new TrainingStatusVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isRunning(): boolean {
    return this.value === AI_TRAINING_STATUS.RUNNING;
  }

  isCompleted(): boolean {
    return this.value === AI_TRAINING_STATUS.COMPLETED;
  }

  isFailed(): boolean {
    return this.value === AI_TRAINING_STATUS.FAILED;
  }

  isTerminal(): boolean {
    const terminal: readonly string[] = [
      AI_TRAINING_STATUS.COMPLETED,
      AI_TRAINING_STATUS.FAILED,
      AI_TRAINING_STATUS.CANCELLED,
    ];
    return terminal.includes(this.value);
  }
}
