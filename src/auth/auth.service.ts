// src/auth/auth.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { OtpService } from './otp.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
  ) {}

  async requestOtp(phone: string, type: string | undefined) {
    const otp = this.otpService.generateOtp(phone);
    console.log(`OTP for ${phone}: ${otp}`);
    return { message: `کد OTP برای ${phone} ارسال شد.` };
  }

  async verifyOtp(data: {
    phone: string;
    otp: string;
    firstName?: string;
    lastName?: string;
    nationalCode?: string;
    birthday?: string;
    referralCode?: string;
  }) {
    const {
      phone,
      otp,
      firstName,
      lastName,
      nationalCode,
      birthday,
      referralCode,
    } = data;

    const isValid = this.otpService.verifyOtp(phone, otp);
    if (!isValid) {
      throw new BadRequestException('کد OTP نادرست است.');
    }

    let user = await this.usersService.findByPhone(phone);
    if (user) {
      const payload = { sub: user.id, phone: user.phone, role: user.role };
      const token = this.jwtService.sign(payload);
      return { access_token: token, role: user.role };
    }

    // اگر کاربر جدید است
    if (!firstName || !lastName || !nationalCode) {
      throw new BadRequestException(
        'کاربر جدید است. لطفاً نام، نام خانوادگی و کد ملی را وارد کنید.',
      );
    }

    user = await this.usersService.create({
      phone,
      firstName,
      lastName,
      nationalCode,
      birthday,
      referralCode,
      role: 'passenger',
    });

    const payload = { sub: user.id, phone: user.phone, role: user.role };
    const token = this.jwtService.sign(payload);
    return { access_token: token, role: user.role };
  }
}
