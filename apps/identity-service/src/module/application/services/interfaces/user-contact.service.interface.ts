/**
 * User Contact Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserContactEntity } from '../../../domain/entities/user-contact.entity.js';
import type { UserContactResponseDTO } from '../../dtos/responses/user-contact-response.dto.js';

export const USER_CONTACT_SERVICE = Symbol('USER_CONTACT_SERVICE');

export interface UserContactServiceInterface extends BaseServiceInterface<UserContactEntity, string> {
  listForUser(userId: string): Promise<readonly UserContactResponseDTO[]>;
  add(userId: string, input: Partial<UserContactResponseDTO>): Promise<UserContactResponseDTO>;
  update(contactId: string, patch: Partial<UserContactResponseDTO>): Promise<UserContactResponseDTO>;
  remove(contactId: string): Promise<void>;
  setPrimary(contactId: string): Promise<void>;
}
