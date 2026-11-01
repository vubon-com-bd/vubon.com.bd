/**
 * TemplateOwnerGuard — verifies template ownership (createdBy check)
 * @module notification-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS, ROLE } from '@vubon/shared-constants/common';

import {
  TEMPLATE_REPOSITORY,
  type TemplateRepository,
} from '@domain/repositories/template.repository.interface.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';

@Injectable()
export class TemplateOwnerGuard extends BaseGuard {
  constructor(
    @Inject(TEMPLATE_REPOSITORY)
    private readonly repo: TemplateRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: { userId?: string; roles?: readonly string[] };
    }>();

    const templateId = req.params?.['templateId'] ?? req.params?.['id'];
    if (!templateId) return true;

    const user = req.user;
    if (!user?.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }

    const isAdmin =
      user.roles?.includes(ROLE.ADMIN) ||
      user.roles?.includes(ROLE.SUPER_ADMIN);
    if (isAdmin) return true;

    const vo = TemplateIdVO.create(templateId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Template not found',
      });
    }

    // Templates are owned by admin/system — allow if active
    if (!entity.isUsable() && !entity.isDraft()) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: `Template status "${entity.status}" cannot be modified`,
      });
    }

    return true;
  }
}
