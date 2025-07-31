// src/common/services/otp.service.ts
import { Injectable } from '@nestjs/common';

interface OtpRecord {
  code: string;
  expiresAt: number;
}

@Injectable()
export class OtpService {
  private otpStore = new Map<string, OtpRecord>();

  generateOtp(phone: string): string {
    const existing = this.otpStore.get(phone);
    const now = Date.now();

    if (existing && existing.expiresAt > now) {
      // اگر هنوز OTP قبلی معتبر است، همان را بازگردان
      return existing.code;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // مثل 4521
    const expiresAt = now + 2 * 60 * 1000; // اعتبار ۲ دقیقه
    this.otpStore.set(phone, { code: otp, expiresAt });

    return otp;
  }

  verifyOtp(phone: string, code: string): boolean {
    const record = this.otpStore.get(phone);
    const now = Date.now();

    if (!record || record.expiresAt < now || record.code !== code) {
      return false;
    }

    // حذف OTP پس از تأیید موفق
    this.otpStore.delete(phone);
    return true;
  }
}
