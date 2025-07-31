import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RequestOtpDto } from './dto/request-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')
  @ApiOperation({ summary: 'درخواست کد OTP' })
  @ApiResponse({ status: 201, description: 'کد OTP ارسال شد.' })
  requestOtp(@Body() dto: RequestOtpDto) {
    return this.authService.requestOtp(dto.phone, dto.type);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'تایید کد OTP و ورود/ثبت‌نام' })
  @ApiResponse({ status: 201, description: 'توکن JWT صادر شد.' })
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto);
  }
}
