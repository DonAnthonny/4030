// src/driverAuth/driver-auth.module.ts
import { Module } from '@nestjs/common';
import { DriverAuthService } from './driver-auth.service';
import { DriverAuthController } from './driver-auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { DriverModule } from 'src/driver/driver.module';
import { OtpService } from 'src/auth/otp.service';

@Module({
  imports: [
     DriverModule,
    ConfigModule, // برای استفاده از configService
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1d' },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  providers: [DriverAuthService, OtpService],
  controllers: [DriverAuthController],
})
export class DriverAuthModule {}
