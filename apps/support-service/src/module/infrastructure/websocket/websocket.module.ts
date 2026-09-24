import { Module } from '@nestjs/common';
import { ChatWebSocketGateway } from './websocket.gateway';

@Module({
  providers: [ChatWebSocketGateway],
  exports: [ChatWebSocketGateway],
})
export class WebSocketModule {}
