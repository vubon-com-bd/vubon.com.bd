/**
 * VendorProfileController — REST endpoints for vendor profile
 * @module vendor-service/interfaces/controllers/rest
 */
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { CurrentUser, type CurrentUserShape } from '@vubon/shared-kernel/interfaces/decorators';

import { UpdateProfileCommand } from '../../../application/commands/vendor/update-profile.command.js';
import { GetVendorQuery } from '../../../application/queries/vendor/get-vendor.query.js';
import { UpdateVendorHttpDTO } from '../../dtos/requests/vendor.request.dto.js';
import type { VendorHttpResponseDTO } from '../../dtos/responses/vendor.response.dto.js';
import { VendorControllerMapper } from '../../mappers/vendor.controller.mapper.js';

@ApiTags('vendor-profile')
@ApiBearerAuth('bearer')
@Controller('vendors/:vendorId/profile')
@UseGuards(JwtAuthGuard)
export class VendorProfileController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  @Patch()
  @ApiOperation({ summary: 'Update vendor profile' })
  async update(
    @Param('vendorId') vendorId: string,
    @Body() dto: UpdateVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<VendorHttpResponseDTO> {
    return this.commandBus.execute(
      new UpdateProfileCommand(
        { vendorId, ...VendorControllerMapper.toUpdateAppDto(dto) },
        user.userId,
      ),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get vendor profile' })
  async get(@Param('vendorId') vendorId: string): Promise<VendorHttpResponseDTO> {
    return this.queryBus.execute(new GetVendorQuery(vendorId));
  }
}
