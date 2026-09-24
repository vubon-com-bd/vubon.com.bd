import {
  Body,
  Controller,
  Get,
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
import { FileComplaintCommand } from '../../../application/commands/complaint/file-complaint.command';
import { ResolveComplaintCommand } from '../../../application/commands/complaint/resolve-complaint.command';
import { GetComplaintQuery } from '../../../application/queries/complaint/get-complaint.query';
import { ListComplaintsByUserQuery } from '../../../application/queries/complaint/list-complaints-by-user.query';
import { FileComplaintRequestDto } from '../../dtos/requests/complaint.request.dto';

@ApiTags('Complaints')
@Controller('complaints')
@UseGuards(JwtAuthGuard)
export class ComplaintController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async listMy(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListComplaintsByUserQuery(user.userId));
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetComplaintQuery(id));
  }

  @Post()
  async file(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: FileComplaintRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new FileComplaintCommand(user.userId, body.type, body.severity, body.content),
    );
  }

  @Post(':id/resolve')
  @Permissions(PERMISSION.ADMIN_MANAGE)
  async resolve(
    @Param('id') id: string,
    @Body() body: { resolution: string },
  ): Promise<void> {
    return this.commandBus.execute(new ResolveComplaintCommand(id, body.resolution));
  }
}
