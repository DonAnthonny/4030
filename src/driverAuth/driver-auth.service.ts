import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from '../auth/otp.service';
import { DriverService } from '../driver/services/driver.service';

interface PhoneMeta {
  role: 'driver';
  type: 'car' | 'vanet' | 'motor';
}

@Injectable()
export class DriverAuthService {
  private phoneMetaMap = new Map<string, PhoneMeta>();

  constructor(
    private readonly driverService: DriverService,
    private readonly jwtService: JwtService,
    private readonly otpService: OtpService,
  ) {}

  // ✅ 1. Request OTP for driver
  async requestOtp(phone: string, type: 'car' | 'vanet' | 'motor') {
    if (!phone || !type) {
      throw new BadRequestException('شماره تلفن و نوع وسیله الزامی است.');
    }

    this.phoneMetaMap.set(phone, { role: 'driver', type });

    const otp = this.otpService.generateOtp(phone);
    console.log(`🚖 [Driver OTP] برای ${phone}: ${otp}`);

    return { message: 'کد OTP با موفقیت ارسال شد.' };
  }

  // ✅ 2. Verify OTP for driver
  async verifyOtp({ phone, otp }: { phone: string; otp: string }) {
    if (!phone || !otp) {
      throw new BadRequestException('شماره تلفن و کد OTP الزامی است.');
    }

    if (!this.otpService.verifyOtp(phone, otp)) {
      throw new BadRequestException('کد OTP نادرست یا منقضی است.');
    }

    const meta = this.phoneMetaMap.get(phone);
    if (!meta) {
      throw new BadRequestException('لطفاً ابتدا درخواست کد OTP بدهید.');
    }

    let driver = await this.driverService.findByPhone(phone);

    // اگر راننده قبلاً وجود دارد → ورود
    if (driver) {
      const payload = { sub: driver._id, phone: driver.phone, role: 'driver' };
      const token = this.jwtService.sign(payload);
      return { access_token: token, role: 'driver', isNew: false };
    }

    // راننده جدید → ثبت‌نام با اطلاعات اولیه
    driver = await this.driverService.create({
      phone,
      type: meta.type,
    });

    const payload = { sub: driver._id, phone: driver.phone, role: 'driver' };
    const token = this.jwtService.sign(payload);
    return { access_token: token, role: 'driver', isNew: true };
  }
}
