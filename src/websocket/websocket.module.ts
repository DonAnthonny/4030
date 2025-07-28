import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { WebsocketGateway } from './websocket.gateway';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallbackSecretForTest',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
