import { Controller, Post, Body } from '@nestjs/common';
import { DriverAuthService } from './driver-auth.service';

@Controller('driver-auth')
export class DriverAuthController {
  constructor(private readonly driverAuthService: DriverAuthService) {}

  @Post('request-otp')
  async requestOtp(@Body() body: { phone: string; type: 'car' | 'vanet' | 'motor' }) {
    return this.driverAuthService.requestOtp(body.phone, body.type);
  }

  @Post('verify-otp')
  async verifyOtp(@Body() body: {
    phone: string;
    otp: string;
   
  }) {
    return this.driverAuthService.verifyOtp(body);
  }
}
