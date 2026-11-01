export const AI_MODEL_TYPE = {
  LLM: 'llm',
  CLASSIFICATION: 'classification',
  REGRESSION: 'regression',
  CLUSTERING: 'clustering',
  RECOMMENDATION: 'recommendation',
  RANKING: 'ranking',
  EMBEDDING: 'embedding',
  VISION: 'vision',
  SPEECH: 'speech',
  TRANSLATION: 'translation',
  SUMMARIZATION: 'summarization',
  GENERATION: 'generation',
  FORECASTING: 'forecasting',
  ANOMALY_DETECTION: 'anomaly_detection',
  SENTIMENT: 'sentiment',
  NER: 'ner',
  OBJECT_DETECTION: 'object_detection',
  IMAGE_GENERATION: 'image_generation',
} as const;

export type AiModelTypeType = (typeof AI_MODEL_TYPE)[keyof typeof AI_MODEL_TYPE];
