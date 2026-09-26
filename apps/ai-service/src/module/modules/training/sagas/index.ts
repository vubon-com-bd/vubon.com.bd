import { ModelTrainingSaga } from '../../../application/sagas/model-training.saga';
import { ModelDeploymentSaga } from '../../../application/sagas/model-deployment.saga';

export const TrainingSagas = [ModelTrainingSaga, ModelDeploymentSaga];
