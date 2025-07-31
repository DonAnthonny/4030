import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, IsOptional, Matches, IsIn } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({ example: '+989123456789', description: 'شماره موبایل' })
  @IsPhoneNumber('IR')
  phone: string;

  @ApiProperty({ example: '123456', description: 'کد OTP' })
  @IsString()
  otp: string;

  @ApiPropertyOptional({ example: 'علی', description: 'نام (فقط برای مسافر)' })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({ example: 'رضایی', description: 'نام خانوادگی (فقط برای مسافر)' })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({ example: '1234567890', description: 'کد ملی 10 رقمی (فقط برای مسافر)' })
  @IsOptional()
  @Matches(/^\d{10}$/, { message: 'کد ملی باید 10 رقم باشد.' })
  nationalCode?: string;

  @ApiPropertyOptional({ example: '1365/01/15', description: 'تاریخ تولد (اختیاری)' })
  @IsOptional()
  @Matches(/^\d{4}\/\d{2}\/\d{2}$/, { message: 'تاریخ تولد باید در قالب YYYY/MM/DD باشد.' })
  birthday?: string;

  @ApiPropertyOptional({ example: 'ABC123', description: 'کد معرف (اختیاری)' })
  @IsOptional()
  referralCode?: string;
}
