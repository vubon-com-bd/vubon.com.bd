/**
 * BrandService
 */
import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { IBrandService } from '../interfaces/brand.service.interface.js';
import { BRAND_REPOSITORY, type BrandRepository } from '../../../domain/repositories/brand.repository.interface.js';
import { BrandEntity } from '../../../domain/entities/brand.entity.js';
import { BrandNameVO } from '../../../domain/value-objects/primitives/brand-name.vo.js';
import { BrandSlugVO } from '../../../domain/value-objects/primitives/brand-slug.vo.js';
import { BrandLogoVO } from '../../../domain/value-objects/primitives/brand-logo.vo.js';
import { BrandMapper } from '../../mappers/brand.mapper.js';
import { BRAND_STATUS } from '@vubon/shared-constants/business/product';
import type { CreateBrandRequestDTO } from '../../dtos/requests/brand/create-brand.dto.js';
import type { UpdateBrandRequestDTO } from '../../dtos/requests/brand/update-brand.dto.js';
import type { BrandResponseDTO } from '../../dtos/responses/brand-response.dto.js';
import { BrandNotFoundApplicationError, BrandSlugConflictError } from '../../errors/brand.errors.js';

@Injectable()
export class BrandService implements IBrandService {
  constructor(@Inject(BRAND_REPOSITORY) private readonly brandRepo: BrandRepository) {}

  async create(dto: CreateBrandRequestDTO, actorId: string): Promise<BrandResponseDTO> {
    const slug = BrandSlugVO.create(dto.slug);
    if (await this.brandRepo.existsBySlug(slug)) throw new BrandSlugConflictError(dto.slug);
    const now = new Date().toISOString();
    const brand = BrandEntity.create({
      id: randomUUID(),
      now,
      props: {
        name: BrandNameVO.create(dto.name),
        slug,
        description: dto.description,
        logo: dto.logoUrl ? BrandLogoVO.create(dto.logoUrl) : BrandLogoVO.empty(),
        website: dto.website,
        status: BRAND_STATUS.ACTIVE,
        isFeatured: false,
        productCount: 0,
        country: dto.country,
      },
    });
    await this.brandRepo.save(brand);
    void actorId;
    return BrandMapper.toResponse(brand);
  }

  async update(dto: UpdateBrandRequestDTO, actorId: string): Promise<BrandResponseDTO> {
    const brand = await this.brandRepo.findById(dto.brandId);
    if (!brand) throw new BrandNotFoundApplicationError(dto.brandId);
    brand.update({
      name: dto.name ? BrandNameVO.create(dto.name) : undefined,
      description: dto.description,
      logo: dto.logoUrl ? BrandLogoVO.create(dto.logoUrl) : undefined,
      website: dto.website,
      country: dto.country,
    }, actorId);
    await this.brandRepo.save(brand);
    return BrandMapper.toResponse(brand);
  }

  async remove(brandId: string, actorId: string): Promise<void> {
    const brand = await this.brandRepo.findById(brandId);
    if (!brand) throw new BrandNotFoundApplicationError(brandId);
    brand.softDelete(actorId);
    await this.brandRepo.save(brand);
  }

  async activate(brandId: string, actorId: string): Promise<BrandResponseDTO> {
    const brand = await this.brandRepo.findById(brandId);
    if (!brand) throw new BrandNotFoundApplicationError(brandId);
    brand.activate(actorId);
    await this.brandRepo.save(brand);
    return BrandMapper.toResponse(brand);
  }

  async deactivate(brandId: string, actorId: string): Promise<BrandResponseDTO> {
    const brand = await this.brandRepo.findById(brandId);
    if (!brand) throw new BrandNotFoundApplicationError(brandId);
    brand.deactivate(actorId);
    await this.brandRepo.save(brand);
    return BrandMapper.toResponse(brand);
  }

  async feature(brandId: string, actorId: string): Promise<BrandResponseDTO> {
    const brand = await this.brandRepo.findById(brandId);
    if (!brand) throw new BrandNotFoundApplicationError(brandId);
    brand.feature();
    await this.brandRepo.save(brand);
    void actorId;
    return BrandMapper.toResponse(brand);
  }

  async getById(brandId: string): Promise<BrandResponseDTO | null> {
    const brand = await this.brandRepo.findById(brandId);
    return brand ? BrandMapper.toResponse(brand) : null;
  }

  async getBySlug(slug: string): Promise<BrandResponseDTO | null> {
    const brand = await this.brandRepo.findBySlug(BrandSlugVO.create(slug));
    return brand ? BrandMapper.toResponse(brand) : null;
  }

  async listFeatured(limit?: number): Promise<readonly BrandResponseDTO[]> {
    const brands = await this.brandRepo.findFeatured(limit);
    return BrandMapper.toResponseList(brands);
  }
}
