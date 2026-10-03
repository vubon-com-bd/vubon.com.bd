import { StatusTransitionService } from '../../../../../src/module/infrastructure/services/internal/status-transition.service.js';

describe('StatusTransitionService (infra)', () => {
  let service: StatusTransitionService;

  beforeEach(() => {
    service = new StatusTransitionService();
  });

  it('canTransition()', () => {
    expect(service.canTransition('pending', 'confirmed')).toBe(true);
    expect(service.canTransition('pending', 'delivered')).toBe(false);
  });

  it('isFinal()', () => {
    expect(service.isFinal('delivered')).toBe(true);
    expect(service.isFinal('pending')).toBe(false);
  });

  it('isActive()', () => {
    expect(service.isActive('pending')).toBe(true);
    expect(service.isActive('failed')).toBe(false);
  });

  it('nextStatuses()', () => {
    expect(service.nextStatuses('pending')).toContain('confirmed');
  });

  it('previousStatuses()', () => {
    expect(service.previousStatuses('confirmed')).toContain('pending');
  });

  it('canCancel() / canShip() / canDeliver()', () => {
    expect(service.canCancel('pending')).toBe(true);
    expect(service.canShip('packed')).toBe(true);
    expect(service.canDeliver('shipped')).toBe(true);
  });

  it('canReturn() / canRefund()', () => {
    expect(service.canReturn('delivered')).toBe(true);
    expect(service.canRefund('cancelled')).toBe(true);
  });

  it('findPath()', () => {
    const path = service.findPath('pending', 'shipped');
    expect(path).toEqual(['pending', 'confirmed', 'processing', 'packed', 'shipped']);
  });
});
