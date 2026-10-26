/**
 * Webhook + In-App Providers — Unit Tests
 * @module notification-service/test/unit/infrastructure/providers
 *
 * Covers: 4 webhook + 2 in-app providers
 * Target: 90% statements, 80% branches, 90% functions, 90% lines
 */
import { HttpWebhookProvider } from '@infrastructure/providers/webhook/http.provider.js';
import { SlackWebhookProvider } from '@infrastructure/providers/webhook/slack.provider.js';
import { DiscordWebhookProvider } from '@infrastructure/providers/webhook/discord.provider.js';
import { TelegramWebhookProvider } from '@infrastructure/providers/webhook/telegram.provider.js';

import { WebsocketInAppProvider } from '@infrastructure/providers/in-app/websocket.provider.js';
import { SseInAppProvider } from '@infrastructure/providers/in-app/sse.provider.js';

const basicWebhookInput = {
  url: 'https://example.com/hook',
  method: 'POST' as const,
  payload: { test: true },
  secret: 'super_secret_1234567890',
};

const basicInAppInput = {
  userId: '11111111-1111-1111-1111-111111111111',
  notificationId: '33333333-3333-3333-3333-333333333333',
  title: 'Title',
  body: 'Body',
};

// ═══════════════════════════════════════════════════════════
// 1. HttpWebhookProvider
// ═══════════════════════════════════════════════════════════
describe('HttpWebhookProvider', () => {
  let provider: HttpWebhookProvider;

  beforeEach(() => {
    provider = new HttpWebhookProvider();
  });

  it('metadata — name + channel + priority', () => {
    expect(provider.metadata.name).toBe('http');
    expect(provider.metadata.channel).toBe('webhook');
    expect(provider.metadata.priority).toBe(1);
  });

  it('isEnabled — true when WEBHOOK_CONFIG enabled (default)', () => {
    expect(provider.isEnabled()).toBe(true);
  });

  it('sign — produces HMAC-SHA256 hex', () => {
    const sig = provider.sign('payload', 'secret');
    expect(sig).toMatch(/^[a-f0-9]{64}$/);
  });

  it('sign — deterministic for same input', () => {
    const sig1 = provider.sign('payload', 'secret');
    const sig2 = provider.sign('payload', 'secret');
    expect(sig1).toBe(sig2);
  });

  it('sign — different secret produces different signature', () => {
    const sig1 = provider.sign('payload', 'secret1');
    const sig2 = provider.sign('payload', 'secret2');
    expect(sig1).not.toBe(sig2);
  });

  it('health — valid', async () => {
    const health = await provider.health();
    expect(health.providerName).toBe('http');
  });
});

// ═══════════════════════════════════════════════════════════
// 2. SlackWebhookProvider
// ═══════════════════════════════════════════════════════════
describe('SlackWebhookProvider', () => {
  let provider: SlackWebhookProvider;

  beforeEach(() => {
    provider = new SlackWebhookProvider();
  });

  it('metadata — name + priority', () => {
    expect(provider.metadata.name).toBe('slack');
    expect(provider.metadata.priority).toBe(2);
  });

  it('isEnabled — always true', () => {
    expect(provider.isEnabled()).toBe(true);
  });

  it('send — rejects invalid Slack URL', async () => {
    const result = await provider.send(basicWebhookInput);
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('INVALID_SLACK_URL');
  });

  it('sign — produces HMAC-SHA256 hex', () => {
    const sig = provider.sign('payload', 'secret');
    expect(sig).toMatch(/^[a-f0-9]{64}$/);
  });

  it('health — valid', async () => {
    const health = await provider.health();
    expect(health.providerName).toBe('slack');
  });
});

// ═══════════════════════════════════════════════════════════
// 3. DiscordWebhookProvider
// ═══════════════════════════════════════════════════════════
describe('DiscordWebhookProvider', () => {
  let provider: DiscordWebhookProvider;

  beforeEach(() => {
    provider = new DiscordWebhookProvider();
  });

  it('metadata — name + priority', () => {
    expect(provider.metadata.name).toBe('discord');
    expect(provider.metadata.priority).toBe(3);
  });

  it('isEnabled — always true', () => {
    expect(provider.isEnabled()).toBe(true);
  });

  it('send — rejects invalid Discord URL', async () => {
    const result = await provider.send(basicWebhookInput);
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('INVALID_DISCORD_URL');
  });

  it('sign — produces HMAC', () => {
    expect(provider.sign('payload', 'secret')).toMatch(/^[a-f0-9]{64}$/);
  });

  it('health — valid', async () => {
    const health = await provider.health();
    expect(health.providerName).toBe('discord');
  });
});

// ═══════════════════════════════════════════════════════════
// 4. TelegramWebhookProvider
// ═══════════════════════════════════════════════════════════
describe('TelegramWebhookProvider', () => {
  let provider: TelegramWebhookProvider;

  beforeEach(() => {
    provider = new TelegramWebhookProvider();
  });

  it('metadata — name + priority', () => {
    expect(provider.metadata.name).toBe('telegram');
    expect(provider.metadata.priority).toBe(4);
  });

  it('isEnabled — always true', () => {
    expect(provider.isEnabled()).toBe(true);
  });

  it('send — rejects invalid Telegram URL', async () => {
    const result = await provider.send(basicWebhookInput);
    expect(result.success).toBe(false);
    expect(result.errorCode).toBe('INVALID_TELEGRAM_URL');
  });

  it('sign — produces HMAC', () => {
    expect(provider.sign('payload', 'secret')).toMatch(/^[a-f0-9]{64}$/);
  });

  it('health — valid', async () => {
    const health = await provider.health();
    expect(health.providerName).toBe('telegram');
  });
});

// ═══════════════════════════════════════════════════════════
// 5. WebsocketInAppProvider
// ═══════════════════════════════════════════════════════════
describe('WebsocketInAppProvider', () => {
  let provider: WebsocketInAppProvider;

  beforeEach(() => {
    provider = new WebsocketInAppProvider();
  });

  it('metadata — name + channel + priority', () => {
    expect(provider.metadata.name).toBe('websocket');
    expect(provider.metadata.channel).toBe('in-app');
    expect(provider.metadata.priority).toBe(1);
  });

  it('isEnabled — always true', () => {
    expect(provider.isEnabled()).toBe(true);
  });

  it('send — user offline → queued', async () => {
    const result = await provider.send(basicInAppInput);
    expect(result.success).toBe(true);
    expect(result.status).toBe('queued');
  });

  it('registerConnection — connection stored', () => {
    provider.registerConnection({
      userId: basicInAppInput.userId,
      connectionId: 'conn-1',
      transport: 'websocket',
      connectedAt: new Date().toISOString(),
      lastPingAt: new Date().toISOString(),
    });
    expect(provider.isUserOnline(basicInAppInput.userId)).toBe(true);
    expect(provider.onlineUserCount()).toBe(1);
  });

  it('send — user online → delivered', async () => {
    provider.registerConnection({
      userId: basicInAppInput.userId,
      connectionId: 'conn-1',
      transport: 'websocket',
      connectedAt: new Date().toISOString(),
      lastPingAt: new Date().toISOString(),
    });
    const result = await provider.send(basicInAppInput);
    expect(result.success).toBe(true);
    expect(result.status).toBe('delivered');
  });

  it('unregisterConnection — removes connection', () => {
    provider.registerConnection({
      userId: basicInAppInput.userId,
      connectionId: 'conn-1',
      transport: 'websocket',
      connectedAt: new Date().toISOString(),
      lastPingAt: new Date().toISOString(),
    });
    provider.unregisterConnection(basicInAppInput.userId, 'conn-1');
    expect(provider.isUserOnline(basicInAppInput.userId)).toBe(false);
  });

  it('health — valid', async () => {
    const health = await provider.health();
    expect(health.providerName).toBe('websocket');
  });
});

// ═══════════════════════════════════════════════════════════
// 6. SseInAppProvider
// ═══════════════════════════════════════════════════════════
describe('SseInAppProvider', () => {
  let provider: SseInAppProvider;

  beforeEach(() => {
    provider = new SseInAppProvider();
  });

  it('metadata — name + priority', () => {
    expect(provider.metadata.name).toBe('sse');
    expect(provider.metadata.priority).toBe(2);
  });

  it('isEnabled — always true', () => {
    expect(provider.isEnabled()).toBe(true);
  });

  it('send — user offline → queued', async () => {
    const result = await provider.send(basicInAppInput);
    expect(result.success).toBe(true);
    expect(result.status).toBe('queued');
  });

  it('registerEmitter — emitter stored', () => {
    provider.registerEmitter({
      userId: basicInAppInput.userId,
      emitterId: 'emit-1',
      send: jest.fn(),
      close: jest.fn(),
    });
    expect(provider.isUserOnline(basicInAppInput.userId)).toBe(true);
  });

  it('send — user online → delivered', async () => {
    const send = jest.fn();
    provider.registerEmitter({
      userId: basicInAppInput.userId,
      emitterId: 'emit-1',
      send,
      close: jest.fn(),
    });
    const result = await provider.send(basicInAppInput);
    expect(result.success).toBe(true);
    expect(result.status).toBe('delivered');
    expect(send).toHaveBeenCalled();
  });

  it('send — emitter error swallowed', async () => {
    const send = jest.fn(() => {
      throw new Error('emitter down');
    });
    provider.registerEmitter({
      userId: basicInAppInput.userId,
      emitterId: 'emit-1',
      send,
      close: jest.fn(),
    });
    const result = await provider.send(basicInAppInput);
    expect(result.success).toBe(true);
  });

  it('unregisterEmitter — removes', () => {
    provider.registerEmitter({
      userId: basicInAppInput.userId,
      emitterId: 'emit-1',
      send: jest.fn(),
      close: jest.fn(),
    });
    provider.unregisterEmitter(basicInAppInput.userId, 'emit-1');
    expect(provider.isUserOnline(basicInAppInput.userId)).toBe(false);
  });

  it('health — valid', async () => {
    const health = await provider.health();
    expect(health.providerName).toBe('sse');
  });
});

// ═══════════════════════════════════════════════════════════
// COVERAGE BOOST — Real webhook send path
// ═══════════════════════════════════════════════════════════
const originalFetchWh = global.fetch;

function mockFetchWh(status = 200, body: unknown = {}): void {
  global.fetch = jest.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
    text: async () => JSON.stringify(body),
  })) as never;
}

function mockFetchRejectWh(): void {
  global.fetch = jest.fn(async () => {
    throw new Error('network down');
  }) as never;
}

afterEach(() => {
  global.fetch = originalFetchWh;
});

describe('Webhook providers — real send path', () => {
  describe('HttpWebhookProvider real send', () => {
    it('send — success', async () => {
      const p = new HttpWebhookProvider();
      mockFetchWh(200, { ok: true });
      const result = await p.send(basicWebhookInput);
      expect(result.success).toBe(true);
      expect(result.status).toBe('delivered');
    });

    it('send — 500 retryable', async () => {
      const p = new HttpWebhookProvider();
      mockFetchWh(500);
      const result = await p.send(basicWebhookInput);
      expect(result.success).toBe(false);
      expect(result.retryable).toBe(true);
    });

    it('send — 400 non-retryable', async () => {
      const p = new HttpWebhookProvider();
      mockFetchWh(400);
      const result = await p.send(basicWebhookInput);
      expect(result.success).toBe(false);
      expect(result.retryable).toBe(false);
    });

    it('send — network error', async () => {
      const p = new HttpWebhookProvider();
      mockFetchRejectWh();
      const result = await p.send(basicWebhookInput);
      expect(result.success).toBe(false);
      expect(result.errorCode).toBe('WEBHOOK_NETWORK_ERROR');
    });

    it('send — GET method (no body)', async () => {
      const p = new HttpWebhookProvider();
      mockFetchWh(200);
      const result = await p.send({ ...basicWebhookInput, method: 'GET' as const });
      expect(result.success).toBe(true);
    });
  });

  describe('SlackWebhookProvider real send', () => {
    it('send — valid Slack URL success', async () => {
      const p = new SlackWebhookProvider();
      mockFetchWh(200);
      const result = await p.send({
        ...basicWebhookInput,
        url: 'https://hooks.slack.com/services/T000/B000/XXXX',
      });
      expect(result.success).toBe(true);
    });

    it('send — HTTP 500', async () => {
      const p = new SlackWebhookProvider();
      mockFetchWh(500);
      const result = await p.send({
        ...basicWebhookInput,
        url: 'https://hooks.slack.com/services/T000/B000/XXXX',
      });
      expect(result.success).toBe(false);
    });

    it('send — network error', async () => {
      const p = new SlackWebhookProvider();
      mockFetchRejectWh();
      const result = await p.send({
        ...basicWebhookInput,
        url: 'https://hooks.slack.com/services/T000/B000/XXXX',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('DiscordWebhookProvider real send', () => {
    it('send — valid Discord URL success', async () => {
      const p = new DiscordWebhookProvider();
      mockFetchWh(200);
      const result = await p.send({
        ...basicWebhookInput,
        url: 'https://discord.com/api/webhooks/123/abc',
      });
      expect(result.success).toBe(true);
    });

    it('send — HTTP error', async () => {
      const p = new DiscordWebhookProvider();
      mockFetchWh(500);
      const result = await p.send({
        ...basicWebhookInput,
        url: 'https://discord.com/api/webhooks/123/abc',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('TelegramWebhookProvider real send', () => {
    it('send — valid Telegram URL success', async () => {
      const p = new TelegramWebhookProvider();
      mockFetchWh(200, { result: { message_id: 123 } });
      const result = await p.send({
        ...basicWebhookInput,
        url: 'https://api.telegram.org/bot123/sendMessage?chat_id=1',
      });
      expect(result.success).toBe(true);
    });

    it('send — HTTP error', async () => {
      const p = new TelegramWebhookProvider();
      mockFetchWh(500);
      const result = await p.send({
        ...basicWebhookInput,
        url: 'https://api.telegram.org/bot123/sendMessage?chat_id=1',
      });
      expect(result.success).toBe(false);
    });
  });
});
