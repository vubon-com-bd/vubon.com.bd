import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { PromptTemplateServiceInterface } from '../interfaces/prompt-template.service.interface';
import type { PromptTemplateRepository } from '../../../domain/repositories/prompt-template.repository.interface';
import { PromptTemplateEntity } from '../../../domain/entities/prompt-template.entity';
import { PromptIdVO } from '../../../domain/value-objects/primitives/prompt-id.vo';
import { PromptTemplateService as PromptTemplateDomainService } from '../../../domain/services/prompt-template.service';
import type { CreateTemplateRequestDTO } from '../../dtos/requests/prompt/create-template.dto';

@Injectable()
export class PromptTemplateService
  extends BaseService<PromptTemplateEntity, PromptIdVO>
  implements PromptTemplateServiceInterface
{
  readonly name = 'PromptTemplateService';

  constructor(
    private readonly templateRepo: PromptTemplateRepository,
    private readonly templateDomainService: PromptTemplateDomainService,
  ) {
    super();
  }

  async create(input: CreateTemplateRequestDTO): Promise<PromptTemplateEntity> {
    const role = String(input.role ?? 'user');

    const templateVO = this.templateDomainService.build({
      name: input.name,
      templateText: input.template,
      role,
    });

    const entity = PromptTemplateEntity.create({
      promptId: PromptIdVO.create(crypto.randomUUID()),
      template: templateVO,
    });

    await this.templateRepo.save(entity);
    return entity;
  }

  async findByPromptId(promptId: string): Promise<PromptTemplateEntity | null> {
    return this.templateRepo.findByPromptId(PromptIdVO.create(promptId));
  }
}
