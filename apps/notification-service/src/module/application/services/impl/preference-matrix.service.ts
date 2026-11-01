/**
 * PreferenceMatrixService
 * @module notification-service/application/services/impl
 */
import { Inject, Injectable } from '@nestjs/common';

import {
  PREFERENCE_MATRIX_REPOSITORY,
  type PreferenceMatrixRepository,
} from '@domain/repositories/preference-matrix.repository.interface.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';

import { PreferenceMapper } from '@application/mappers/preference.mapper.js';
import type {
  IPreferenceMatrixService,
} from '@application/services/interfaces/preference-matrix.service.interface.js';
import type { PreferenceMatrixResponseDTO } from '@application/dtos/responses/preference-response.dto.js';

@Injectable()
export class PreferenceMatrixService implements IPreferenceMatrixService {
  constructor(
    @Inject(PREFERENCE_MATRIX_REPOSITORY)
    private readonly repo: PreferenceMatrixRepository,
  ) {}

  async getByUser(userId: string): Promise<PreferenceMatrixResponseDTO> {
    const entity = await this.repo.findLatestSnapshot(userId);
    if (!entity) {
      return {
        userId,
        channels: {},
        categories: {},
        quietHours: null,
        timezone: 'Asia/Dhaka',
        locale: 'en',
      };
    }
    return PreferenceMapper.matrixVOToResponse(entity.matrix);
  }

  async getSnapshot(userId: string): Promise<PreferenceMatrixResponseDTO | null> {
    const entity = await this.repo.findLatestSnapshot(userId);
    if (!entity) return null;
    return PreferenceMapper.matrixVOToResponse(entity.matrix);
  }

  async getHistory(userId: string, limit = 10): Promise<readonly PreferenceMatrixResponseDTO[]> {
    // userId here maps to preferenceId in the repo
    const items = await this.repo.findHistory(userId, limit);
    return items.map((e) => PreferenceMapper.matrixVOToResponse(e.matrix));
  }

  // Suppress unused
  static readonly _vo = PreferenceIdVO;
}
