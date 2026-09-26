import { CreateModelHandler } from '../../../application/commands/model/create-model.handler';
import { UpdateModelHandler } from '../../../application/commands/model/update-model.handler';
import { DeployModelHandler } from '../../../application/commands/model/deploy-model.handler';
import { DeprecateModelHandler } from '../../../application/commands/model/deprecate-model.handler';
import { TestModelHandler } from '../../../application/commands/model/test-model.handler';

export const ModelCommandHandlers = [
  CreateModelHandler,
  UpdateModelHandler,
  DeployModelHandler,
  DeprecateModelHandler,
  TestModelHandler,
];
