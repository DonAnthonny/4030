// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SmsModule } from './sms/sms.module';
import { WebsocketModule } from './websocket/websocket.module';
import { DriverModule } from './driver/driver.module';
import { DriverService } from './driver/services/driver.service';
import { DriverController } from './driver/controllers/driver.controller';
import { DriverAuthModule } from './driverAuth/driver-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    SmsModule,
    WebsocketModule,
    DriverModule,
    DriverAuthModule, // ✅ این ماژول همه چیز رو داره
  ],
})
export class AppModule {}

