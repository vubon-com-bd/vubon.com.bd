import {
  Controller, Get, Post, Patch, Body, Param, Query,
  HttpCode, HttpStatus, UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminOnlyGuard } from '../../guards/admin-only.guard';
import { RateLimitGuard } from '../../guards/rate-limit.guard';
import { RateLimit } from '../../decorators/rate-limit.decorator';
import {
  CreateModelRequestDTO,
  UpdateModelRequestDTO,
  DeployModelRequestDTO,
  DeprecateModelRequestDTO,
  TestModelRequestDTO,
} from '../../dtos/requests/model.request.dto';
import { ModelResponseDTO } from '../../dtos/responses/model.response.dto';
import { ModelSwagger } from '../../swagger/model.swagger';
import { CreateModelCommand } from '../../../application/commands/model/create-model.command';
import { UpdateModelCommand } from '../../../application/commands/model/update-model.command';
import { DeployModelCommand } from '../../../application/commands/model/deploy-model.command';
import { DeprecateModelCommand } from '../../../application/commands/model/deprecate-model.command';
import { TestModelCommand } from '../../../application/commands/model/test-model.command';
import { GetModelQuery } from '../../../application/queries/model/get-model.query';
import { ListModelsQuery } from '../../../application/queries/model/list-models.query';

@ApiTags('AI Models')
@Controller('v1/ai/models')
@UseGuards(RateLimitGuard)
export class ModelController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AdminOnlyGuard)
  @RateLimit({ max: 30, windowMs: 60000 })
  @ModelSwagger.Create()
  async create(@Body() dto: CreateModelRequestDTO): Promise<ModelResponseDTO> {
    return this.commandBus.execute(
      new CreateModelCommand(
        {
          name: dto.name,
          type: dto.type,
          providerId: dto.providerId,
          version: dto.version ?? '1.0.0',
          endpoint: dto.endpoint ?? null,
          description: dto.description ?? null,
        },
        'system',
      ),
    );
  }

  @Get()
  @ApiOperation({ summary: 'List AI models' })
  async list(
    @Query('status') status?: string,
    @Query('type') type?: string,
    @Query('limit') limit?: string,
  ): Promise<readonly ModelResponseDTO[]> {
    const parsed = limit ? Number(limit) : 50;
    return this.queryBus.execute(
      new ListModelsQuery(status, type, undefined, parsed, 0),
    );
  }

  @Get(':id')
  @ModelSwagger.Get()
  async getById(@Param('id') id: string): Promise<ModelResponseDTO> {
    return this.queryBus.execute(new GetModelQuery(id));
  }

  @Patch(':id')
  @UseGuards(AdminOnlyGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateModelRequestDTO,
  ): Promise<ModelResponseDTO> {
    return this.commandBus.execute(new UpdateModelCommand(id, dto, 'system'));
  }

  @Post(':id/deploy')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminOnlyGuard)
  @ModelSwagger.Deploy()
  async deploy(
    @Param('id') id: string,
    @Body() dto: DeployModelRequestDTO,
  ): Promise<ModelResponseDTO> {
    return this.commandBus.execute(
      new DeployModelCommand({ ...dto, modelId: id }, 'system'),
    );
  }

  @Post(':id/deprecate')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminOnlyGuard)
  async deprecate(
    @Param('id') id: string,
    @Body() dto: DeprecateModelRequestDTO,
  ): Promise<ModelResponseDTO> {
    return this.commandBus.execute(
      new DeprecateModelCommand({ ...dto, modelId: id }, 'system'),
    );
  }

  @Post(':id/test')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminOnlyGuard)
  async test(
    @Param('id') id: string,
    @Body() dto: TestModelRequestDTO,
  ): Promise<{ readonly passed: boolean; readonly results: readonly unknown[] }> {
    return this.commandBus.execute(
      new TestModelCommand(
        {
          modelId: id,
          inputs: dto.inputs.map((i) => ({ ...i })),
        },
        'system',
      ),
    );
  }
}
