// src/auth/dto/verify-otp.dto.ts
import { IsPhoneNumber, IsString, IsOptional, IsEmail } from 'class-validator';

export class VerifyOtpDto {
  @IsPhoneNumber('IR')
  phone: string;

  @IsString()
  otp: string;

  @IsOptional()
  firstName?: string;

  @IsOptional()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  referralCode?: string;
}
