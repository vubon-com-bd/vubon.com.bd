/**
 * @NotificationOwner() — marks a route requiring notification ownership
 * @module notification-service/interfaces/decorators
 *
 * Kernel's OwnerGuard reads this metadata and checks param.
 * Usage:
 *   @NotificationOwner()
 *   @Get(':id')
 *   getById(@Param('id') id: string) { ... }
 */
import { SetMetadata } from '@nestjs/common';
import { OWNER_PARAM_KEY } from '@vubon/shared-kernel/interfaces/guards';

const NOTIFICATION_OWNER_PARAM = 'id';

export const NotificationOwner = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWNER_PARAM_KEY, NOTIFICATION_OWNER_PARAM);
