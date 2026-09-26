import { Module } from '@nestjs/common';
import { ModelTrainingWorker } from './model-training.worker';
import { ModelEvaluationWorker } from './model-evaluation.worker';
import { ModelDeploymentWorker } from './model-deployment.worker';
import { EmbeddingGeneratorWorker } from './embedding-generator.worker';
import { VectorIndexingWorker } from './vector-indexing.worker';
import { VectorIndexRebuildWorker } from './vector-index-rebuild.worker';
import { RecommendationGeneratorWorker } from './recommendation-generator.worker';
import { PersonalizationBuilderWorker } from './personalization-builder.worker';
import { ClusteringWorker } from './clustering.worker';
import { ForecastGeneratorWorker } from './forecast-generator.worker';
import { InsightGeneratorWorker } from './insight-generator.worker';
import { DriftDetectorWorker } from './drift-detector.worker';
import { AnalyticsProcessorWorker } from './analytics-processor.worker';

const WORKERS = [
  ModelTrainingWorker,
  ModelEvaluationWorker,
  ModelDeploymentWorker,
  EmbeddingGeneratorWorker,
  VectorIndexingWorker,
  VectorIndexRebuildWorker,
  RecommendationGeneratorWorker,
  PersonalizationBuilderWorker,
  ClusteringWorker,
  ForecastGeneratorWorker,
  InsightGeneratorWorker,
  DriftDetectorWorker,
  AnalyticsProcessorWorker,
];

@Module({
  providers: [...WORKERS],
  exports: [...WORKERS],
})
export class WorkersModule {}
