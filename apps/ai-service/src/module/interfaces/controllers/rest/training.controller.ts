import {
  Controller, Get, Post, Body, Param,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminOnlyGuard } from '../../guards/admin-only.guard';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { FeatureFlagGuard } from '../../guards/feature-flag.guard';
import { FeatureFlag } from '../../decorators/feature-flag.decorator';
import {
  StartTrainingRequestDTO,
  EvaluateModelRequestDTO,
} from '../../dtos/requests/training.request.dto';
import { StartTrainingCommand } from '../../../application/commands/training/start-training.command';
import { EvaluateModelCommand } from '../../../application/commands/training/evaluate-model.command';
import { GetTrainingQuery } from '../../../application/queries/training/get-training.query';
import { ListTrainingsQuery } from '../../../application/queries/training/list-trainings.query';

type MetricName = 'accuracy' | 'precision' | 'recall' | 'f1' | 'rmse' | 'mae';

@ApiTags('AI Training')
@Controller('v1/ai/trainings')
@UseGuards(RateLimitGuard, FeatureFlagGuard)
@FeatureFlag('aiTraining')
export class TrainingController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('start')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminOnlyGuard)
  @ApiOperation({ summary: 'Start model training' })
  @ApiResponse({ status: 201, description: 'Training started' })
  async start(@Body() dto: StartTrainingRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new StartTrainingCommand(
        {
          modelId: dto.modelId,
          datasetId: dto.datasetId,
          epochs: dto.epochs ?? 10,
          batchSize: dto.batchSize ?? 32,
          learningRate: dto.learningRate ?? 0.001,
          validationSplit: dto.validationSplit ?? 0.2,
          hyperparameters: dto.hyperparameters,
        },
        'system',
      ),
    );
  }

  @Post('evaluate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminOnlyGuard)
  @ApiOperation({ summary: 'Evaluate model' })
  async evaluate(@Body() dto: EvaluateModelRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new EvaluateModelCommand(
        {
          modelId: dto.modelId,
          testDatasetId: dto.testDatasetId,
          metrics: (dto.metrics ?? ['accuracy']) as MetricName[],
        },
        'system',
      ),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List trainings' })
  async list(): Promise<unknown> {
    return this.queryBus.execute(new ListTrainingsQuery());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get training by ID' })
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetTrainingQuery(id));
  }
}
