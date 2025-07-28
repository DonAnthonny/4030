import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // یا آدرس دقیق کلاینت
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
})
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly jwtService: JwtService) {}

  handleConnection(client: Socket) {
    try {
      const token = client.handshake.query.token;
      const tokenStr = Array.isArray(token) ? token[0] : token;

      if (!tokenStr) {
        console.log('توکن ارسال نشده، اتصال قطع شد');
        client.disconnect(true);
        return;
      }

      const payload = this.jwtService.verify(tokenStr);
      client.data.user = payload;
      console.log('کاربر متصل شد:', payload);
    } catch (error) {
      console.log('توکن نامعتبر، اتصال قطع شد:', error.message);
      client.disconnect(true);
    }
  }

  handleDisconnect(client: Socket) {
    console.log('کاربر قطع اتصال کرد:', client.id);
  }

  handleMessage(client: Socket, message: string) {
    console.log(`پیام دریافت شده از ${client.data.user?.phone || client.id}:`, message);
    client.emit('messageResponse', `Server got your message: ${message}`);
  }

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }
}
