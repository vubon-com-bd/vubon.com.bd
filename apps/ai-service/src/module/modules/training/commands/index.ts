import { StartTrainingHandler } from '../../../application/commands/training/start-training.handler';
import { PauseTrainingHandler } from '../../../application/commands/training/pause-training.handler';
import { CancelTrainingHandler } from '../../../application/commands/training/cancel-training.handler';
import { EvaluateModelHandler } from '../../../application/commands/training/evaluate-model.handler';

export const TrainingCommandHandlers = [
  StartTrainingHandler,
  PauseTrainingHandler,
  CancelTrainingHandler,
  EvaluateModelHandler,
];
