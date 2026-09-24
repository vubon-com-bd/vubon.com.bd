import { Module } from '@nestjs/common';
import { ChatWebSocketGateway } from '../../infrastructure/websocket';

@Module({
  providers: [ChatWebSocketGateway],
  exports: [ChatWebSocketGateway],
})
export class WebSocketModule {}
