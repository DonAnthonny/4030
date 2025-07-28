
// src/auth/otp.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {
  private otpStore = new Map<string, string>();

  generateOtp(phone: string): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otpStore.set(phone, otp);
    console.log(`OTP for ${phone}: ${otp}`);
    return otp;
  }

  verifyOtp(phone: string, otp: string): boolean {
    const stored = this.otpStore.get(phone);
    return stored === otp;
  }
}
