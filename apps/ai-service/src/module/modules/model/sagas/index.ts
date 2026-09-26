import { ModelTrainingSaga } from '../../../application/sagas/model-training.saga';
import { ModelDeploymentSaga } from '../../../application/sagas/model-deployment.saga';
import { ModelDriftDetectionSaga } from '../../../application/sagas/model-drift-detection.saga';

export const ModelSagas = [
  ModelTrainingSaga,
  ModelDeploymentSaga,
  ModelDriftDetectionSaga,
];
