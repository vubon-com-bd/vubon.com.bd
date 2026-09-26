import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { TemplateVariableServiceInterface } from '../interfaces/template-variable.service.interface';
import type { TemplateVariableRepository } from '../../../domain/repositories/template-variable.repository.interface';
import { TemplateVariableEntity } from '../../../domain/entities/template-variable.entity';
import { TemplateIdVO } from '../../../domain/value-objects/primitives/template-id.vo';

@Injectable()
export class TemplateVariableService
  extends BaseService<TemplateVariableEntity, string>
  implements TemplateVariableServiceInterface
{
  readonly name = 'TemplateVariableService';

  constructor(private readonly repo: TemplateVariableRepository) {
    super();
  }

  async findByTemplateId(templateId: string): Promise<readonly TemplateVariableEntity[]> {
    return this.repo.findByTemplateId(TemplateIdVO.create(templateId));
  }
}
