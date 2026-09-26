import { Test } from '@nestjs/testing';
import { AuthOAuthController } from './auth-oauth.controller';

describe('AuthOAuthController', () => {
  let controller: AuthOAuthController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthOAuthController],
    }).compile();
    controller = moduleRef.get(AuthOAuthController);
  });

  it('should be defined', () => expect(controller).toBeDefined());

  it('authorize() returns provider + redirectUri', () => {
    const result = controller.authorize('google', 'https://x.com/cb');
    expect(result.provider).toBe('google');
    expect(result.redirectUri).toBe('https://x.com/cb');
  });

  it('callback() echoes provider', () => {
    const result = controller.callback({ provider: 'google', code: 'c', state: 's' });
    expect(result.provider).toBe('google');
  });
});
