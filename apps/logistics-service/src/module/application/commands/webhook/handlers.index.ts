import { HandleSaParibahanWebhookHandler } from './handle-sa-paribahan-webhook.handler.js';
import { HandleSundarbanWebhookHandler } from './handle-sundarban-webhook.handler.js';
import { HandleRedxWebhookHandler } from './handle-redx-webhook.handler.js';
import { HandlePathaoWebhookHandler } from './handle-pathao-webhook.handler.js';
import { HandlePaperflyWebhookHandler } from './handle-paperfly-webhook.handler.js';
import { HandleSteadfastWebhookHandler } from './handle-steadfast-webhook.handler.js';
import { HandleDhlWebhookHandler } from './handle-dhl-webhook.handler.js';
import { HandleFedexWebhookHandler } from './handle-fedex-webhook.handler.js';
import { HandleUpsWebhookHandler } from './handle-ups-webhook.handler.js';
import { HandleAramexWebhookHandler } from './handle-aramex-webhook.handler.js';

export const WEBHOOK_COMMAND_HANDLERS = [
  HandleSaParibahanWebhookHandler,
  HandleSundarbanWebhookHandler,
  HandleRedxWebhookHandler,
  HandlePathaoWebhookHandler,
  HandlePaperflyWebhookHandler,
  HandleSteadfastWebhookHandler,
  HandleDhlWebhookHandler,
  HandleFedexWebhookHandler,
  HandleUpsWebhookHandler,
  HandleAramexWebhookHandler,
] as const;
