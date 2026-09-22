import { Injectable } from '@nestjs/common';
import { VendorPermissionEntity } from '../../../domain/entities/vendor-permission.entity';
import { PermissionIdVO } from '../../../domain/value-objects/primitives/permission-id.vo';
import type { VendorPermissionRepository } from '../../../domain/repositories/vendor-permission.repository.interface';

@Injectable()
export class VendorPermissionService {
  constructor(private readonly repo: VendorPermissionRepository) {}

  async findById(id: PermissionIdVO): Promise<VendorPermissionEntity | null> {
    return this.repo.findById(id);
  }

  async findAll(): Promise<readonly VendorPermissionEntity[]> {
    return this.repo.findAll();
  }

  async save(permission: VendorPermissionEntity): Promise<void> {
    await this.repo.save(permission);
  }
}
