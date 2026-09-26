import { Test } from '@nestjs/testing';
import { Auth2FaController } from './auth-2fa.controller';

describe('Auth2FaController', () => {
  let controller: Auth2FaController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [Auth2FaController],
    }).compile();
    controller = moduleRef.get(Auth2FaController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('enable() returns enabled state', () => {
    const result = controller.enable({ id: 'u-1' } as never, { method: 'totp' });
    expect(result.enabled).toBe(true);
    expect(result.method).toBe('totp');
  });

  it('disable() returns void', () => {
    expect(() => controller.disable({ id: 'u-1' } as never)).not.toThrow();
  });

  it('status() returns user status', () => {
    const result = controller.status({ id: 'u-1' } as never);
    expect(result.userId).toBe('u-1');
  });
});
