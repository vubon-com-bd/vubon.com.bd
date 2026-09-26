import {
  Controller, Get, Post, Body, Param,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { FeatureFlagGuard } from '../../guards/feature-flag.guard';
import { RateLimit } from '../../decorators/rate-limit.decorator';
import { FeatureFlag } from '../../decorators/feature-flag.decorator';
import { RecommendationSwagger } from '../../swagger/recommendation.swagger';
import {
  GenerateRecommendationRequestDTO,
  TrackClickRequestDTO,
  TrackConversionRequestDTO,
  SubmitFeedbackRequestDTO,
} from '../../dtos/requests/recommendation.request.dto';
import { RecommendationResponseDTO } from '../../dtos/responses/recommendation.response.dto';
import { GenerateRecommendationCommand } from '../../../application/commands/recommendation/generate-recommendation.command';
import { TrackClickCommand } from '../../../application/commands/recommendation/track-click.command';
import { TrackConversionCommand } from '../../../application/commands/recommendation/track-conversion.command';
import { SubmitFeedbackCommand } from '../../../application/commands/recommendation/submit-feedback.command';
import { GetRecommendationQuery } from '../../../application/queries/recommendation/get-recommendation.query';

type RecType = 'product' | 'content' | 'user' | 'trending' | 'similar' | 'personalized';
type RecStrategy =
  | 'collaborative_filtering'
  | 'content_based'
  | 'hybrid'
  | 'matrix_factorization'
  | 'popularity'
  | 'recently_viewed';

@ApiTags('AI Recommendations')
@Controller('v1/ai/recommendations')
@UseGuards(RateLimitGuard)
export class RecommendationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(FeatureFlagGuard)
  @FeatureFlag('aiRecommendation')
  @RateLimit({ max: 10, windowMs: 60000 })
  @RecommendationSwagger.Generate()
  async generate(@Body() dto: GenerateRecommendationRequestDTO): Promise<RecommendationResponseDTO> {
    return this.commandBus.execute(
      new GenerateRecommendationCommand({
        userId: dto.userId,
        type: (dto.type ?? 'personalized') as RecType,
        strategy: (dto.strategy ?? 'hybrid') as RecStrategy,
        limit: dto.limit ?? 10,
        sessionId: dto.sessionId,
      }),
    );
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<RecommendationResponseDTO> {
    return this.queryBus.execute(new GetRecommendationQuery(id));
  }

  @Post('track/click')
  @HttpCode(HttpStatus.NO_CONTENT)
  async trackClick(@Body() dto: TrackClickRequestDTO): Promise<void> {
    return this.commandBus.execute(
      new TrackClickCommand(dto.recommendationId, dto.userId, dto.productId),
    );
  }

  @Post('track/conversion')
  @HttpCode(HttpStatus.NO_CONTENT)
  async trackConversion(@Body() dto: TrackConversionRequestDTO): Promise<void> {
    return this.commandBus.execute(
      new TrackConversionCommand(dto.recommendationId, dto.userId, dto.productId, dto.orderId),
    );
  }

  @Post('feedback')
  @HttpCode(HttpStatus.NO_CONTENT)
  async submitFeedback(@Body() dto: SubmitFeedbackRequestDTO): Promise<void> {
    return this.commandBus.execute(
      new SubmitFeedbackCommand(dto.recommendationId, dto.userId, dto.productId, dto.rating),
    );
  }
}
