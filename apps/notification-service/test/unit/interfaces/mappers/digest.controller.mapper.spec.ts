import { describe, it, expect } from '@jest/globals';
import { DigestControllerMapper } from '../../../../src/module/interfaces/mappers/digest.controller.mapper.js';

describe('DigestControllerMapper', () => {
  it('toCreateAppDto', () => {
    const dto = DigestControllerMapper.toCreateAppDto({
      userId: 'u', frequency: 'daily', type: 'summary',
      periodStart: '2026-10-04T00:00:00.000Z', periodEnd: '2026-10-11T00:00:00.000Z',
      itemIds: ['n1'], channel: 'email',
    } as never);
    expect(dto.frequency).toBe('daily');
    expect(dto.itemIds?.length).toBe(1);
  });

  it('toUpdateAppDto', () => {
    const dto = DigestControllerMapper.toUpdateAppDto('d-1', {
      frequency: 'weekly', type: 'detailed',
    } as never);
    expect(dto.digestId).toBe('d-1');
  });

  it('toGenerateAppDto', () => {
    const dto = DigestControllerMapper.toGenerateAppDto({
      userId: 'u', frequency: 'daily', type: 'summary',
    } as never);
    expect(dto.userId).toBe('u');
  });

  it('toSendAppDto', () => {
    const dto = DigestControllerMapper.toSendAppDto('d-1', { channel: 'email' } as never);
    expect(dto.channel).toBe('email');
  });

  it('toPreviewAppDto', () => {
    const dto = DigestControllerMapper.toPreviewAppDto({
      userId: 'u', frequency: 'daily',
    } as never);
    expect(dto.userId).toBe('u');
  });

  it('toListAppDto defaults + filters', () => {
    const o = DigestControllerMapper.toListAppDto({
      userId: 'u', status: 'sent', frequency: 'daily',
    } as never);
    expect(o.page).toBe(1);
    expect(o.filter?.status).toBe('sent');
  });
});
