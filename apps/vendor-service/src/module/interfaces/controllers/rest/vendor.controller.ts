/**
 * VendorController — REST endpoints for vendor core
 * @module vendor-service/interfaces/controllers/rest
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseController } from '@vubon/shared-kernel/interfaces/controllers';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import {
  CurrentUser,
  type CurrentUserShape,
} from '@vubon/shared-kernel/interfaces/decorators';
import { Public } from '@vubon/shared-kernel/interfaces/decorators';

// Commands
import { RegisterVendorCommand } from '../../../application/commands/vendor/register-vendor.command.js';
import { UpdateVendorCommand } from '../../../application/commands/vendor/update-vendor.command.js';
import { DeleteVendorCommand } from '../../../application/commands/vendor/delete-vendor.command.js';

// Queries
import { GetVendorQuery } from '../../../application/queries/vendor/get-vendor.query.js';
import { GetVendorBySlugQuery } from '../../../application/queries/vendor/get-vendor-by-slug.query.js';
import { GetMyVendorQuery } from '../../../application/queries/vendor/get-my-vendor.query.js';
import { ListVendorsQuery } from '../../../application/queries/vendor/list-vendors.query.js';
import { SearchVendorsQuery } from '../../../application/queries/vendor/search-vendors.query.js';
import { GetVendorStatsQuery } from '../../../application/queries/vendor/get-vendor-stats.query.js';

// HTTP DTOs
import {
  RegisterVendorHttpDTO,
  UpdateVendorHttpDTO,
  ListVendorsHttpQueryDTO,
  VendorStatsHttpQueryDTO,
  DeleteVendorHttpDTO,
} from '../../dtos/requests/vendor.request.dto.js';
import type {
  VendorHttpResponseDTO,
  VendorPublicHttpResponseDTO,
  VendorListHttpResponseDTO,
  VendorStatsHttpResponseDTO,
  VendorInitiateHttpResponseDTO,
  VendorDetailHttpResponseDTO,
} from '../../dtos/responses/vendor.response.dto.js';

// Mappers
import { VendorControllerMapper } from '../../mappers/vendor.controller.mapper.js';

// Guards
import { OwnVendorGuard } from '../../guards/own-vendor.guard.js';

// Interceptors
import { VendorCacheInterceptor } from '../../interceptors/vendor-cache.interceptor.js';

// Decorators
import { IdempotencyHeader } from '../../decorators/idempotency-key.decorator.js';

// Swagger
import {
  ApiRegisterVendor,
  ApiGetVendor,
  ApiUpdateVendor,
  ApiListVendors,
} from '../../swagger/vendor.swagger.js';

@ApiTags('vendors')
@ApiBearerAuth('bearer')
@Controller('vendors')
@UseGuards(JwtAuthGuard)
@UseInterceptors(VendorCacheInterceptor)
export class VendorController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
    super();
  }

  // ═══════════ COMMANDS ═══════════
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiRegisterVendor()
  async register(
    @Body() dto: RegisterVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
    @IdempotencyHeader() idempotencyKey?: string,
  ): Promise<VendorInitiateHttpResponseDTO> {
    const appDto = VendorControllerMapper.toRegisterAppDto(dto);
    return this.commandBus.execute(
      new RegisterVendorCommand(
        {
          ...appDto,
          ...(idempotencyKey ? { idempotencyKey } : {}),
        },
        user.userId,
        user.userId,
      ),
    );
  }

  @Patch(':id')
  @ApiUpdateVendor()
  @UseGuards(OwnVendorGuard)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<VendorHttpResponseDTO> {
    const patch = VendorControllerMapper.toUpdateAppDto(dto);
    return this.commandBus.execute(
      new UpdateVendorCommand({ vendorId: id, patch }, user.userId),
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(OwnVendorGuard)
  @ApiOperation({ summary: 'Soft delete a vendor' })
  async delete(
    @Param('id') id: string,
    @Body() dto: DeleteVendorHttpDTO,
    @CurrentUser() user: CurrentUserShape,
  ): Promise<void> {
    await this.commandBus.execute(
      new DeleteVendorCommand({
        vendorId: id,
        force: dto.force,
        reason: dto.reason,
        actorId: user.userId,
      }),
    );
  }

  // ═══════════ QUERIES ═══════════
  @Get()
  @ApiListVendors()
  async list(
    @Query() q: ListVendorsHttpQueryDTO,
  ): Promise<VendorListHttpResponseDTO> {
    const options = VendorControllerMapper.toListOptions(q);
    return this.queryBus.execute(new ListVendorsQuery(options));
  }

  @Get('me')
  @ApiOperation({ summary: 'Get my vendor' })
  async me(
    @CurrentUser() user: CurrentUserShape,
  ): Promise<VendorHttpResponseDTO> {
    return this.queryBus.execute(new GetMyVendorQuery(user.userId));
  }

  @Get('search')
  @Public()
  @ApiOperation({ summary: 'Search vendors' })
  async search(
    @Query('q') term: string,
    @Query('limit') limit?: string,
  ): Promise<readonly import('../../dtos/responses/vendor.response.dto.js').VendorSummaryHttpResponseDTO[]> {
    const parsed = limit ? Number(limit) : 20;
    return this.queryBus.execute(new SearchVendorsQuery(term, parsed));
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get vendor stats' })
  async stats(
    @Query() q: VendorStatsHttpQueryDTO,
  ): Promise<VendorStatsHttpResponseDTO> {
    const filter = VendorControllerMapper.toStatsFilter(q);
    return this.queryBus.execute(new GetVendorStatsQuery(filter));
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Get vendor by slug' })
  async bySlug(
    @Param('slug') slug: string,
  ): Promise<VendorHttpResponseDTO> {
    return this.queryBus.execute(new GetVendorBySlugQuery(slug));
  }

  @Get(':id/public')
  @Public()
  @ApiOperation({ summary: 'Get public vendor view' })
  async publicView(
    @Param('id') id: string,
  ): Promise<VendorPublicHttpResponseDTO> {
    return this.queryBus.execute(new GetVendorQuery(id));
  }

  @Get(':id/detail')
  @UseGuards(OwnVendorGuard)
  @ApiOperation({ summary: 'Get vendor detail with children' })
  async detail(
    @Param('id') id: string,
  ): Promise<VendorDetailHttpResponseDTO> {
    return this.queryBus.execute(new GetVendorQuery(id));
  }

  @Get(':id')
  @ApiGetVendor()
  async getById(
    @Param('id') id: string,
  ): Promise<VendorHttpResponseDTO> {
    return this.queryBus.execute(new GetVendorQuery(id));
  }
}
