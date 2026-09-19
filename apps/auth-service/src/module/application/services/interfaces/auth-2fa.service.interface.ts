import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { Auth2FaEntity } from '../../../domain/entities/auth-2fa.entity';

export interface Auth2FaServiceInterface
  extends BaseServiceInterface<Auth2FaEntity, string> {
  enable(userId: string, method: string): Promise<void>;
  disable(userId: string): Promise<void>;
  verify(userId: string, code: string): Promise<boolean>;
}
