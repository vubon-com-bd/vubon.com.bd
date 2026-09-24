import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/chat', cors: { origin: '*' } })
export class ChatWebSocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(ChatWebSocketGateway.name);

  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket): void {
    const token = client.handshake.auth?.token as string | undefined;
    if (!token) {
      this.logger.warn(`Unauthorized: ${client.id}`);
      client.disconnect();
      return;
    }
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('room:join')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string },
  ): void {
    void client.join(data.room);
  }

  @SubscribeMessage('chat:message:send')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatId: string; content: string; type?: string },
  ): void {
    this.server.to(`ticket:${data.chatId}`).emit('chat:message:receive', {
      chatId: data.chatId,
      content: data.content,
      type: data.type ?? 'text',
      senderId: client.id,
      sentAt: new Date().toISOString(),
    });
  }
}
