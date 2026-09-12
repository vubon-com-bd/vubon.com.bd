import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const AI_MODEL_TYPE = {
  TYPES: {
    ...COMMON_TYPES,
    COLLABORATIVE_FILTERING: 'collaborative_filtering',
    CONTENT_BASED: 'content_based',
    HYBRID: 'hybrid',
    DEEP_LEARNING: 'deep_learning',
    NEURAL_NETWORK: 'neural_network',
    TRANSFORMER: 'transformer',
    BERT: 'bert',
    GPT: 'gpt',
    CLIP: 'clip',
    RESNET: 'resnet',
    CNN: 'cnn',
    RNN: 'rnn',
    LSTM: 'lstm',
    GRU: 'gru',
    XGBOOST: 'xgboost',
    RANDOM_FOREST: 'random_forest',
    SVM: 'svm',
    KMEANS: 'kmeans',
    DBSCAN: 'dbscan',
    PCA: 'pca',
    TSNE: 'tsne',
  },
} as const;
