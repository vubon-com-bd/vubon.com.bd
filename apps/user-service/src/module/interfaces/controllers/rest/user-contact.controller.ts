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
import { AddContactCommand } from '../../../application/commands/contact/add-contact.command';
import { DeleteContactCommand } from '../../../application/commands/contact/delete-contact.command';
import { VerifyContactCommand } from '../../../application/commands/contact/verify-contact.command';
import { ListContactsQuery } from '../../../application/queries/contact/list-contacts.query';
import { AddContactRequestDto } from '../../dtos/requests/contact.request.dto';
import { ContactSwagger } from '../../swagger/contact.swagger';

@ApiTags('Contacts')
@Controller('users/contacts')
@UseGuards(JwtAuthGuard)
export class UserContactController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ContactSwagger.List()
  async list(@CurrentUser() user: CurrentUserShape): Promise<unknown> {
    return this.queryBus.execute(new ListContactsQuery(user.userId));
  }

  @Post()
  @ContactSwagger.Create()
  async add(
    @CurrentUser() user: CurrentUserShape,
    @Body() body: AddContactRequestDto,
  ): Promise<unknown> {
    return this.commandBus.execute(
      new AddContactCommand(user.userId, body.type, body.value),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteContactCommand(id));
  }

  @Post(':id/verify')
  @HttpCode(HttpStatus.NO_CONTENT)
  async verify(
    @Param('id') id: string,
    @Body() body: { code: string },
  ): Promise<unknown> {
    return this.commandBus.execute(new VerifyContactCommand(id, body.code));
  }
}
