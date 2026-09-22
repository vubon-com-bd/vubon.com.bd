import { BrandEntity } from '../../domain/entities/brand.entity';
import type { BrandResponseDTO } from '../dtos/responses/brand-response.dto';

export class BrandMapper {
  static toResponse(entity: BrandEntity): BrandResponseDTO {
    return {
      id: entity.id.value,
      name: entity.name.value,
      slug: entity.slug.value,
      logo: entity.logo?.value ?? null,
    } as unknown as BrandResponseDTO;
  }
}
