import {
  Body,
  Controller,
  Delete,
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
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces';
import { AddContactCommand } from '../../../application/commands/user/add-contact.command';
import { DeleteContactCommand } from '../../../application/commands/user/delete-contact.command';
import { GetUserContactQuery } from '../../../application/queries/user/get-user-contact.query';
import { ListUserContactsQuery } from '../../../application/queries/user/list-user-contacts.query';
import { ContactCreateRequestDTO } from '../../dtos/requests/contact.request.dto';

@ApiTags('Contacts')
@Controller('users/contacts')
@UseGuards(JwtAuthGuard)
export class UserContactController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListUserContactsQuery(user.userId));
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<unknown> {
    return this.queryBus.execute(new GetUserContactQuery(id));
  }

  @Post()
  async add(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: ContactCreateRequestDTO,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddContactCommand(user.userId, body.phone, body.email),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteContactCommand(id));
  }
}
