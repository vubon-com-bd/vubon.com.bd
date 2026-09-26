/**
 * SessionControllerMapper — Unit Tests
 */
import { SessionControllerMapper } from './session.controller.mapper';

const buildAppDto = () => ({
  sessionId: 'sess-1',
  userId: 'user-1',
  ipAddress: '192.168.1.1',
  userAgent: 'Mozilla/5.0',
  deviceId: 'dev-1',
  createdAt: '2024-01-01T00:00:00.000Z',
  expiresAt: '2024-01-01T01:00:00.000Z',
  isActive: true,
});

describe('SessionControllerMapper', () => {
  let mapper: SessionControllerMapper;

  beforeEach(() => {
    mapper = new SessionControllerMapper();
  });

  it('toResponse maps all fields', () => {
    const dto = mapper.toResponse(buildAppDto() as never);
    expect(dto.sessionId).toBe('sess-1');
    expect(dto.userId).toBe('user-1');
    expect(dto.ipAddress).toBe('192.168.1.1');
    expect(dto.isActive).toBe(true);
  });

  it('toResponse includes optional deviceId', () => {
    const dto = mapper.toResponse(buildAppDto() as never);
    expect(dto.deviceId).toBe('dev-1');
  });

  it('toResponse handles missing deviceId', () => {
    const dto = mapper.toResponse({ ...buildAppDto(), deviceId: undefined } as never);
    expect(dto.deviceId).toBeUndefined();
  });

  it('toResponse includes revokedAt if present', () => {
    const dto = mapper.toResponse({
      ...buildAppDto(),
      revokedAt: '2024-01-01T00:30:00.000Z',
    } as never);
    expect(dto.revokedAt).toBe('2024-01-01T00:30:00.000Z');
  });

  it('toResponseList maps list', () => {
    const list = [buildAppDto(), { ...buildAppDto(), sessionId: 'sess-2' }];
    const result = mapper.toResponseList(list as never);
    expect(result).toHaveLength(2);
    expect(result[1]?.sessionId).toBe('sess-2');
  });

  it('toResponseList returns empty for empty', () => {
    expect(mapper.toResponseList([])).toEqual([]);
  });
});
