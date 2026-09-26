/**
 * WebSocketModule — wires all gateways
 * @module support-service/modules/websocket
 */
import { Module } from '@nestjs/common';
import { SupportWebSocketGateway } from '../../infrastructure/websocket/websocket.gateway';
import { LiveChatModule } from '../live-chat';

@Module({
  imports: [LiveChatModule],
  providers: [SupportWebSocketGateway],
  exports: [SupportWebSocketGateway],
})
export class WebSocketModule {}
