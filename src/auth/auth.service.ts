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

  async requestOtp(phone: string) {
    // اینجا OTP رو تولید و ارسال می‌کنیم (در عمل به ماژول SMS وصل می‌شه)
    const otp = this.otpService.generateOtp(phone);
    // ارسال پیامک
    // await this.smsService.sendSms(phone, `کد OTP شما: ${otp}`);
    return { message: `کد OTP برای ${phone} ارسال شد.` };
  }

 async verifyOtp(data: {
  phone: string;
  otp: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  referralCode?: string;
}) {
  const { phone, otp, firstName, lastName, email, referralCode } = data;

  const isValid = this.otpService.verifyOtp(phone, otp);
  if (!isValid) {
    throw new BadRequestException('کد OTP نادرست است.');
  }

  let user = await this.usersService.findByPhone(phone);

  if (user) {
    // کاربر قبلاً ثبت‌نام کرده → توکن بده
    const payload = { sub: user.id, phone: user.phone, role: user.role };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  } else {
    // کاربر جدید است → باید اطلاعات تکمیلی را وارد کرده باشد
    if (!firstName || !lastName) {
      throw new BadRequestException('کاربر جدید است. لطفاً نام و نام خانوادگی را وارد کنید.');
    }

    user = await this.usersService.create({
      phone,
      firstName,
      lastName,
      email,
      referralCode,
    });

    const payload = { sub: user.id, phone: user.phone, role: user.role };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
}