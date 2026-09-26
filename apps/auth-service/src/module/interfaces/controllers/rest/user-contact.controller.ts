/**
 * UserContactController
 * @module auth-service/interfaces/controllers/rest
 */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces';
import type { UserId } from '@vubon/shared-types/common';

import { AddContactCommand } from '../../../application/commands/user/add-contact.command';
import { UpdateContactCommand } from '../../../application/commands/user/update-contact.command';
import { DeleteContactCommand } from '../../../application/commands/user/delete-contact.command';
import { ListUserContactsQuery } from '../../../application/queries/user/list-user-contacts.query';
import { GetUserContactQuery } from '../../../application/queries/user/get-user-contact.query';
import {
  AddContactRequestDTO,
  UpdateContactRequestDTO,
} from '../../dtos/requests/contact.request.dto';
import { CurrentUser, type AuthenticatedUser } from '../../decorators/current-user.decorator';

@ApiTags('Users Contacts')
@Controller('users/contacts')
@UseGuards(JwtAuthGuard)
export class UserContactController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async list(@CurrentUser() user: AuthenticatedUser) {
    return this.queryBus.execute(new ListUserContactsQuery(user.id as UserId));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(
    @CurrentUser() user: AuthenticatedUser,
    @Body() body: AddContactRequestDTO,
  ) {
    return this.commandBus.execute(
      new AddContactCommand(user.id as UserId, body as never),
    );
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.queryBus.execute(new GetUserContactQuery(id));
  }

  @Put()
  async update(@Body() body: UpdateContactRequestDTO) {
    return this.commandBus.execute(
      new UpdateContactCommand(body as never),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(
      new DeleteContactCommand({ contactId: id }),
    );
  }
}
