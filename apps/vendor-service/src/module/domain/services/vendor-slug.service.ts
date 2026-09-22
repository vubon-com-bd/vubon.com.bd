import { VendorNameVO } from '../value-objects/primitives/vendor-name.vo';
import { VendorSlugVO } from '../value-objects/primitives/vendor-slug.vo';
import type { VendorRepository } from '../repositories/vendor.repository.interface';

export class VendorSlugService {
  constructor(private readonly vendorRepo: VendorRepository) {}

  async generate(name: VendorNameVO): Promise<VendorSlugVO> {
    const baseSlug = name.value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    let slug = VendorSlugVO.create(baseSlug);
    let counter = 1;
    while (await this.vendorRepo.existsBySlug(slug)) {
      slug = VendorSlugVO.create(`${baseSlug}-${counter++}`);
    }
    return slug;
  }
}
