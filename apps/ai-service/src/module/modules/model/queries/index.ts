import { GetModelHandler } from '../../../application/queries/model/get-model.handler';
import { ListModelsHandler } from '../../../application/queries/model/list-models.handler';
import { GetActiveModelHandler } from '../../../application/queries/model/get-active-model.handler';
import { GetModelPerformanceHandler } from '../../../application/queries/model/get-model-performance.handler';

export const ModelQueryHandlers = [
  GetModelHandler,
  ListModelsHandler,
  GetActiveModelHandler,
  GetModelPerformanceHandler,
];
