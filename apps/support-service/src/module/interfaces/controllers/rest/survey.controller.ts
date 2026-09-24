import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CurrentUser,
  JwtAuthGuard,
  Permissions,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { PERMISSION } from '@vubon/shared-constants/common';
import { CreateSurveyCommand } from '../../../application/commands/survey/create-survey.command';
import { RespondSurveyCommand } from '../../../application/commands/survey/respond-survey.command';
import { CloseSurveyCommand } from '../../../application/commands/survey/close-survey.command';
import { GetSurveyQuery } from '../../../application/queries/survey/get-survey.query';
import { ListSurveysQuery } from '../../../application/queries/survey/list-surveys.query';
import {
  CreateSurveyRequestDto,
  RespondSurveyRequestDto,
} from '../../dtos/requests/survey.request.dto';

@ApiTags('Surveys')
@Controller('surveys')
@UseGuards(JwtAuthGuard)
export class SurveyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(): Promise<unknown> {
    return this.queryBus.execute(new ListSurveysQuery());
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetSurveyQuery(id));
  }

  @Post()
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async create(@Body() body: CreateSurveyRequestDto): Promise<unknown> {
    return this.commandBus.execute(
      new CreateSurveyCommand(body.title, body.type, body.questions),
    );
  }

  @Post(':id/respond')
  async respond(
    @Param('id') id: string,
    @CurrentUser() user: CurrentUserShape,
    @Body() body: RespondSurveyRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new RespondSurveyCommand(id, user.userId, body.answers),
    );
  }

  @Post(':id/close')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async close(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new CloseSurveyCommand(id));
  }
}
