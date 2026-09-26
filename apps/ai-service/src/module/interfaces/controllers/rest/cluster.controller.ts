import {
  Controller, Get, Post, Body, Param, HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { CreateClustersCommand } from '../../../application/commands/cluster/create-clusters.command';
import { GetClusterQuery } from '../../../application/queries/cluster/get-cluster.query';

interface CreateClustersRequestDTO {
  readonly vectorIds: readonly string[];
  readonly k: number;
  readonly algorithm?: string;
  readonly maxIterations?: number;
}

@ApiTags('AI Clustering')
@Controller('v1/ai/clusters')
@UseGuards(RateLimitGuard)
export class ClusterController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create clusters via k-means' })
  @ApiResponse({ status: 200, description: 'Clusters created' })
  async create(@Body() dto: CreateClustersRequestDTO): Promise<unknown> {
    return this.commandBus.execute(
      new CreateClustersCommand(
        {
          vectorIds: [...dto.vectorIds],
          k: dto.k,
          algorithm: (dto.algorithm ?? 'kmeans') as 'kmeans' | 'dbscan',
          maxIterations: dto.maxIterations ?? 100,
        },
        'system',
      ),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cluster by ID' })
  async getById(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetClusterQuery(id));
  }
}
