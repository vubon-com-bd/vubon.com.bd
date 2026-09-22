import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { BrandServiceInterface } from '../interfaces/brand.service.interface';
import type { BrandRepository } from '../../../domain/repositories/brand.repository.interface';
import { BrandEntity } from '../../../domain/entities/brand.entity';
import { BrandIdVO } from '../../../domain/value-objects/primitives/brand-id.vo';
import { BrandNameVO } from '../../../domain/value-objects/primitives/brand-name.vo';
import { BrandSlugVO } from '../../../domain/value-objects/primitives/brand-slug.vo';
import { BrandLogoVO } from '../../../domain/value-objects/primitives/brand-logo.vo';
import { BrandOperationFailedError } from '../../errors/brand.errors';
import type { CreateBrandRequestDTO } from '../../dtos/requests/brand/create-brand.dto';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto';

@Injectable()
export class BrandService
  extends BaseService<BrandEntity, string>
  implements BrandServiceInterface
{
  readonly name = 'BrandService';

  constructor(
    private readonly brandRepo: BrandRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async create(input: CreateBrandRequestDTO): Promise<BrandResponseDTO> {
    const entity = BrandEntity.create({
      name: BrandNameVO.create(input.name),
      slug: BrandSlugVO.create(input.slug),
      logo: input.logo ? BrandLogoVO.create(input.logo) : null,
    });
    await this.brandRepo.save(entity);
    await this.publishEvents(entity);
    return this.toDTO(entity);
  }

  async update(brandId: string, name?: string, logo?: string | null): Promise<BrandResponseDTO> {
    let entity = await this.brandRepo.findById(BrandIdVO.create(brandId));
    if (!entity) throw new BrandOperationFailedError('brand not found');
    if (name) entity = entity.changeName(BrandNameVO.create(name));
    if (logo !== undefined) entity = entity.updateLogo(logo ? BrandLogoVO.create(logo) : null);
    await this.brandRepo.save(entity);
    await this.publishEvents(entity);
    return this.toDTO(entity);
  }

  async delete(brandId: string): Promise<void> {
    await this.brandRepo.delete(BrandIdVO.create(brandId));
  }

  async findById(brandId: string): Promise<BrandResponseDTO | null> {
    const entity = await this.brandRepo.findById(BrandIdVO.create(brandId));
    return entity ? this.toDTO(entity) : null;
  }

  async findBySlug(slug: string): Promise<BrandResponseDTO | null> {
    const entity = await this.brandRepo.findBySlug(BrandSlugVO.create(slug));
    return entity ? this.toDTO(entity) : null;
  }

  async list(): Promise<readonly BrandResponseDTO[]> {
    const rows = await this.brandRepo.findAll();
    return rows.map((r) => this.toDTO(r));
  }

  private toDTO(entity: BrandEntity): BrandResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      slug: entity.slug.value,
      logo: entity.logo?.value ?? null,
    } as unknown as BrandResponseDTO;
  }

  private async publishEvents(entity: BrandEntity): Promise<void> {
    const events = entity.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }
  }
}
